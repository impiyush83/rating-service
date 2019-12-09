'use strict'

const dbProduct = require('../dao/models/product')
const Helper = require('../helper')
const Redis = require('.')
const Constants = require('../constants')

const syncProductRatings = async () => {
    const products = await dbProduct.products.find({isRedisSync: false})
    console.log(products)
    products.forEach(async (product) => {
        const productId = product.productId
        const productRating = await Helper.getProductRatings(productId)
        product.isRedisSync = Constants.REDIS_SYNC.STATE.TRUE
        product.save()
        const redisClient = Redis.getClient()
        const cachedData = JSON.stringify(productRating)
        redisClient.set(productId, cachedData)
        }
    )
}


module.exports = {
    syncProductRatings
}