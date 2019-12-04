'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },
  userName: {
    type: String,
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
})

module.exports = {
  users: mongoose.model('users', userSchema)
}
