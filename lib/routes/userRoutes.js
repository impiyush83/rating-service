'use strict'

const routes = require('express').Router()
const UserHandler = require('../handler/userHandler')
const Validator = require('../validator')


routes.post(`/user`, Validator.addUserSchema, UserHandler.addUser)

module.exports = routes
