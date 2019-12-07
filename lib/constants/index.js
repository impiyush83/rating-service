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
  },

  RATING: {
    TYPE: {
      ONESTAR: 'ONESTAR',
      TWOSTAR: 'TWOSTAR',
      THREESTAR:  'THREESTAR',
      FOURSTAR: 'FOURSTAR',
      FIVESTAR: 'FIVESTAR'
    }
  }

}

module.exports = Constants
