'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Constants = require('../../constants')

const productSchema = new Schema({
  productId: {
    type: String,
    unique: true,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  isRedisSync: {
    type: String,
    required: true,
    enum: [  
        Constants.REDISSYNC.STATE.TRUE,
        Constants.REDISSYNC.STATE.FALSE
    ],
    default: Constants.REDISSYNC.STATE.FALSE
  }
}, {
  versionKey: false,
  timestamps: true
})

module.exports = {
  products: mongoose.model('products', productSchema)
}
