'use strict'

const getAverageRatings = function(oneStar, twoStar, threeStar, fourStar, fiveStar)  {
    return (oneStar + twoStar + threeStar + fourStar + fiveStar) / 5
}

module.exports = {
    getAverageRatings
}