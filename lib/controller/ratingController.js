const dbRating = require('../dao/models/rating')
const dbProduct = require('../dao/models/product')
const ErrorUtil = require('../util/error')
const _ = require('ramda')
const Constants = require('../constants')
const Redis = require('../cache')
const Helper = require('../helper')
const Sync = require('../cache/syncProductRatings') 

const getproductRatings = async (productId) =>	{
	// check if product available
	const product = await dbProduct.products.findOne({productId: productId})
	if (_.isNil(product)) {
		return Promise.reject(ErrorUtil.buildError(code=400, message='Product does not exist'))
	}

	const isProductRedisSync = product.isRedisSync

	await Sync.syncProductRatings()

	//check if product ratings sync with redis
	if (!!isProductRedisSync) {
		// if ratings not synced, get ratings from mongoDb
		const productRating = Helper.getProductRatings(product.productId)
		return productRating
	} else {
		console.log('Success Sync')
	}
}

const addProductRating = async (productRating, productId, userId) => {
	const product = await dbProduct.products.findOne({productId: productId})
	if (_.isNil(product)) {
		return Promise.reject(ErrorUtil.buildError(code=400, message='Product does not exist'))
	}
	const existingproductRating = await dbRating.ratings.findOne({userId: userId, productId: productId})
	if (existingproductRating) {
		return Promise.reject(ErrorUtil.buildError(code=409, message='You have already rated this product'))
	}
	product.rating = Constants.REDISSYNC.STATE.FALSE
	product.save()
	await dbRating.ratings.create({rating:productRating, userId: userId, productId: productId})
}

module.exports = {
	getproductRatings,
	addProductRating
}
