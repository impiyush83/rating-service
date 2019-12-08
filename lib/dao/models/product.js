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
        Constants.REDIS_SYNC.STATE.TRUE,
        Constants.REDIS_SYNC.STATE.FALSE
    ],
    default: Constants.REDIS_SYNC.STATE.FALSE
  }
}, {
  versionKey: false,
  timestamps: true
})

module.exports = {
  products: mongoose.model('products', productSchema)
}
