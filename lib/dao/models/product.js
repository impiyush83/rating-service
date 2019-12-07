'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  productId: {
    type: String,
    unique: true,
    required: true
  },
  productName: {
    type: String,
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
})

module.exports = {
  products: mongoose.model('products', productSchema)
}
