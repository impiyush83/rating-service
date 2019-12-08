const dbRating = require('../dao/models/rating')
const dbProduct = require('../dao/models/product')
const ErrorUtil = require('../util/error')
const _ = require('ramda')
const Constants = require('../constants')
const Redis = require('../cache')
const Helper = require('../helper')

const getproductRatings = async (productId) =>	{
	// check if product available
	const product = await dbProduct.products.findOne({productId: productId})
	if (_.isNil(product)) {
		return Promise.reject(ErrorUtil.buildError(code=400, message='Product does not exist'))
	}

	const isProductRedisSync = product.isRedisSync
	console.log(isProductRedisSync)

	//check if product ratings sync with redis
	if (!!isProductRedisSync) {
		// if ratings not synced, get ratings from mongoDb
		const fiveStarRatings = await dbRating.ratings.count({productId: productId, rating: Constants.RATING.TYPE.FIVESTAR})
		const fourStarRatings = await dbRating.ratings.count({productId: productId, rating: Constants.RATING.TYPE.FOURSTAR})
		const threeStarRatings = await dbRating.ratings.count({productId: productId, rating: Constants.RATING.TYPE.THREESTAR})
		const twoStarRatings = await dbRating.ratings.count({productId: productId, rating: Constants.RATING.TYPE.TWOSTAR})
		const oneStarRatings = await dbRating.ratings.count({productId: productId, rating: Constants.RATING.TYPE.ONESTAR})
		const averageProductRating = Helper.getAverageRatings(
			oneStarRatings,
			twoStarRatings,
			threeStarRatings,
			fourStarRatings,
			fiveStarRatings
		)
		return {
			fiveStar: fiveStarRatings,
			fourStar: fourStarRatings,
			threeStar: threeStarRatings,
			twoStar: twoStarRatings,
			oneStar: oneStarRatings,
			averageRating: averageProductRating
		}
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
