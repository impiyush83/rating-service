'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Constants = require('./lib/constants')
const ProductRoutes = require('./lib/routes/ProductRoutes')
const UserRoutes = require('./lib/routes/UserRoutes')
const RatingRoutes = require('./lib/routes/RatingRoutes')
const MongoConnection = require('./lib/dao/connect')
const RedisConnection = require('./lib/cache')
const { celebrate, Joi, errors, Segments } = require('celebrate');

const _init = async function () {

  await MongoConnection.init()

  // Parse various different custom JSON types as JSON
  app.use(bodyParser.json({ type: 'application/json' }))

  // Connect all our routes to our application.
  app.use('/', ProductRoutes)
  app.use('/', UserRoutes)
  app.use('/', RatingRoutes)
  app.use(errors())

  // Turn on the server.
  app.listen(Constants.SERVER.PORT, () => console.log(`App listening on port ${Constants.SERVER.PORT}`))
}

try {
  _init()
} catch (err) {
  console.log(`Something went wrong while starting up the server. Exiting.\nError: ${JSON.stringify(err)}`)

  // Note: If something goes wrong while starting up the server (like mongo connection failure),
  // then server startup is terminated explicitly.
  process.exit(1)
}
