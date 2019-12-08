'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Constants = require('../../constants')

const ratingSchema = new Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  productId: {
    type: String,
    required: true,
    index: true
  },
  rating: {
    type: String,
    required: true,
    enum: [
        Constants.RATING.TYPE.ONESTAR,
        Constants.RATING.TYPE.TWOSTAR,
        Constants.RATING.TYPE.FOURSTAR,
        Constants.RATING.TYPE.THREESTAR,
        Constants.RATING.TYPE.FIVESTAR
    ],
    index: true
  }
}, {
  versionKey: false,
  timestamps: true
})

module.exports = {
  ratings: mongoose.model('ratings', ratingSchema)
}
