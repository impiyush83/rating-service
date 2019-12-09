'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Constants = require('./lib/constants')
const ProductRoutes = require('./lib/routes/ProductRoutes')
const UserRoutes = require('./lib/routes/UserRoutes')
const RatingRoutes = require('./lib/routes/RatingRoutes')
const MongoConnection = require('./lib/dao/connect')
const { celebrate, Joi, errors, Segments } = require('celebrate')
const CronMailer = require('./lib/cron')
const CronJob = require('cron').CronJob
const Sync = require('./lib/cache/syncProductRatings')

const _init = async function () {
  await MongoConnection.init()
  // Parse various different custom JSON types as JSON
  app.use(bodyParser.json({ type: 'application/json' }))

  // Connect all our routes to our application.
  app.use('/', ProductRoutes)
  app.use('/', UserRoutes)
  app.use('/', RatingRoutes)
  app.use(errors())

  // cron job start 
    // send a mail to admin after successful working of cron job 
  CronMailer.transporter.sendMail(CronMailer.mailOptions, function (error, info) {
      if (error) {
          console.log(error)
      }
  })
  
  // cron job to handle sync of ratings per 20 secs
  const job = new CronJob('*/20 * * * * *', async () => {
	  const d = new Date()
    console.log('Every Twenty Seconds:', d)
    await Sync.syncProductRatings()
  },null, true)
  console.log('After job instantiation');
  job.start()
  
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
