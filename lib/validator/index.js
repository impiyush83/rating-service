'use strict'

const joi = require('express-joi').Joi
const expressJoi = require('express-joi')

const addProductSchema = {
  productId: joi.types.String().required(),
  productName: joi.types.String().required(),
}

const addUserSchema = {
  userId: joi.types.String().required(),
  userName: joi.types.String().required(),
}

module.exports = {
  addProductSchema: expressJoi.joiValidate(addProductSchema),
  addUserSchema: expressJoi.joiValidate(addProductSchema)
}
