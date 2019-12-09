const dbRating = require('../dao/models/rating')
const dbProduct = require('../dao/models/product')
const dbUser = require('../dao/models/user')
const ErrorUtil = require('../util/error')
const _ = require('ramda')
const Constants = require('../constants')
const Redis = require('../cache')
const Helper = require('../helper')
const {promisify} = require('util')

const getproductRatings = async (productId) =>	{
	const product = await dbProduct.products.findOne({productId: productId})
	if (_.isNil(product)) {
		return Promise.reject(ErrorUtil.buildError(code=400, message='Product does not exist'))
	}
	const redisClient = Redis.getClient()
	const getAsync = promisify(redisClient.get).bind(redisClient)
	const productRating = await getAsync(productId)
	// fallback pattern to get results from mongodb
	if (!productRating) {
		// mongo call
		const productRatingFromDb = await Helper.getProductRatings(productId)
		product.isProductRedisSync = Constants.REDIS_SYNC.STATE.TRUE
		product.save()
		return productRatingFromDb
	} else {
		// redis call 
		return JSON.parse(productRating)
	}
}

const addProductRating = async (productRating, productId, userId) => {

	const user = await dbUser.users.findOne({userId: userId})
	console.log(user)
	if (_.isNil(user)) {
		return Promise.reject(ErrorUtil.buildError(code=400, message='User does not exist'))
	}
	const product = await dbProduct.products.find({productId: productId})
	if (_.isNil(product)) {
		return Promise.reject(ErrorUtil.buildError(code=400, message='Product does not exist'))
	}
	const existingproductRating = await dbRating.ratings.findOne({userId: userId, productId: productId})
	if (existingproductRating) {
		return Promise.reject(ErrorUtil.buildError(code=409, message='You have already rated this product'))
	}
	await dbProduct.products.findOneAndUpdate({productId: productId}, {isRedisSync: Constants.REDIS_SYNC.STATE.FALSE})
	await dbRating.ratings.insertMany([{rating:productRating, userId: userId, productId: productId}])
}

module.exports = {
	getproductRatings,
	addProductRating
}
