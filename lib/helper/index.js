'use strict'

const dbRating = require('../dao/models/rating')
const Constants = require('../constants')
const Redis = require('../cache')

const getAverageRatings = async (oneStar, twoStar, threeStar, fourStar, fiveStar) => {
    const totalRatings = oneStar + twoStar + threeStar + fourStar + fiveStar
    const avgRating =  (oneStar * 1 + twoStar * 2 + threeStar * 3 + fourStar * 4 + fiveStar * 5) / totalRatings
    return Math.round(avgRating * 100) / 100
}

const getProductRatings = async (productId) => {
    const fiveStarRatings = await dbRating.ratings.countDocuments ({productId: productId, rating: Constants.RATING.TYPE.FIVESTAR})
    const fourStarRatings = await dbRating.ratings.countDocuments ({productId: productId, rating: Constants.RATING.TYPE.FOURSTAR})
    const threeStarRatings = await dbRating.ratings.countDocuments ({productId: productId, rating: Constants.RATING.TYPE.THREESTAR})
    const twoStarRatings = await dbRating.ratings.countDocuments ({productId: productId, rating: Constants.RATING.TYPE.TWOSTAR})
    const oneStarRatings = await dbRating.ratings.countDocuments ({productId: productId, rating: Constants.RATING.TYPE.ONESTAR})
    const averageProductRating = await getAverageRatings(
        oneStarRatings,
        twoStarRatings,
        threeStarRatings,
        fourStarRatings,
        fiveStarRatings
    )
    const productRating = {
        fiveStar: fiveStarRatings,
        fourStar: fourStarRatings,
        threeStar: threeStarRatings,
        twoStar: twoStarRatings,
        oneStar: oneStarRatings,
        averageRating: averageProductRating
    }
    return productRating
} 

module.exports = {
    getAverageRatings,
    getProductRatings
}