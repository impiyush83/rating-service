'use strict'

const RatingHandler = require('../handler/ratingHandler')
const Validator = require('../validator')


const routes = require('express').Router()

routes.get(`/product/:productId/ratings`, RatingHandler.getProductRatings)
routes.post(`/product/:productId/ratings`, Validator.addProductRatingSchema, RatingHandler.addProductRating)

module.exports = routes
