'use strict'

const dbProduct = require('../dao/models/product')
const Helper = require('../helper')
const Redis = require('../cache')
const Constants = require('../constants')

const syncProductRatings = async function () {
    const products = await dbProduct.products.find({isRedisSync: false})
    console.log(products)
    await products.forEach(async (product) => {
        const productId = product.productId
        console.log(productId)
        const productRating = await Helper.getProductRatings(productId)
        console.log('Handling insync')
        product.isRedisSync = Constants.REDIS_SYNC.STATE.TRUE
        product.save()
        console.log('Saving updated isRedisSync var')
        const redisClient = Redis.getClient()
        const cachedData = JSON.stringify(productRating)
        redisClient.set(productId, cachedData)
        console.log('Caching done !!!')
        }
    )
    console.log('Success')
}


module.exports = {
    syncProductRatings
}