'use strict'

const dbRating = require('../dao/models/rating')
const Constants = require('../constants')

const getAverageRatings = async (oneStar, twoStar, threeStar, fourStar, fiveStar) => {
    return (oneStar + twoStar + threeStar + fourStar + fiveStar) / 5
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
    return {
        fiveStar: fiveStarRatings,
        fourStar: fourStarRatings,
        threeStar: threeStarRatings,
        twoStar: twoStarRatings,
        oneStar: oneStarRatings,
        averageRating: averageProductRating
    }
} 

module.exports = {
    getAverageRatings,
    getProductRatings
}