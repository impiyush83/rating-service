'use strict'

const expressJoi = require('express-joi')
const Constants = require('../constants')
const { celebrate, Joi, errors, Segments } = require('celebrate');

const addProductSchema = {
  [Segments.BODY]: Joi.object().keys({
    productId: Joi.string().required(),
    productName: Joi.string().required()
  })
}

const addUserSchema = {
  [Segments.BODY]: Joi.object().keys({
    userId: Joi.string().required(),
    userName: Joi.string().required()
  })
}

const addProductRatingSchema = {
  [Segments.BODY]: Joi.object().keys({
    userId: Joi.string().required(),
    rating: Joi.string().required().valid(
      Constants.RATING.TYPE.ONESTAR,
      Constants.RATING.TYPE.TWOSTAR,
      Constants.RATING.TYPE.THREESTAR,
      Constants.RATING.TYPE.FOURSTAR,
      Constants.RATING.TYPE.FIVESTAR
    )
  }),
  [Segments.PARAMS]: {
    productId: Joi.string().token().required()
  }
}

const getProductRatingsSchema = {
  [Segments.PARAMS]: {
    productId: Joi.string().token().required()
  }
}


module.exports = {
  addProductSchema: celebrate(addProductSchema),
  addUserSchema: celebrate(addUserSchema),
  addProductRatingSchema: celebrate(addProductRatingSchema),
  getProductRatingsSchema: celebrate(getProductRatingsSchema)
}
