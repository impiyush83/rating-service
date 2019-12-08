'use strict'

const Constants = require('../constants')
const redisClient = require('redis')


const getClient = function (isTestCache) {
  const connectionURI = isTestCache ? Constants.REDIS.TEST_CONNECTION_URI : Constants.REDIS.REDIS_URI
  const connectionPort = Constants.REDIS.REDIS_PORT
  return redisClient.createClient(connectionPort, connectionURI)
}

module.exports = {
  getClient
}
