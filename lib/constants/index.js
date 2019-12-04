'use strict'

const Constants = {

  BASE_URL: `/rating-service`,

  SERVER: {
    PORT: process.env.PORT || 3000
  },

  MONGO: {
    DATABASE: {
      NAME: 'rating-service',
      CONNECTION_URI: process.env.MONGODB_URI || `mongodb://localhost/rating-service`,
      TEST_CONNECTION_URI: `mongodb://localhost/rating-service-local`
    }
  }
}

module.exports = Constants
