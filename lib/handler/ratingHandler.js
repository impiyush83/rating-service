'use strict'

const ratingController = require('../controller/ratingController')

const getProductRatings = function (req,  res) {
  const productId = req.params.productId
  ratingController.getproductRatings(productId).then((rating) => {
      return res.status(200).json({
        success: true,
        message: 'Success',
        rating
      })
    }).catch((err) => {
      return res.status(400).json(err)
    })
}

const addProductRating = function (req, res) {
  const productRating = req.body.rating
  const productId = req.params.productId
  const userId = req.body.userId
  ratingController.addProductRating(productRating, productId, userId).then(() => {
    return res.status(200).json({
        success: true,
        message: 'Success'
      })
    }).catch((err) => {
      return res.status(400).json(err)
    })
}

module.exports = {
    getProductRatings,
    addProductRating
}
