'use strict'

const routes = require('express').Router()
const ProductHandler = require('../handler/productHandler')
const Validator = require('../validator')

routes.post(`/product`, Validator.addProductSchema, ProductHandler.addProduct)

module.exports = routes
