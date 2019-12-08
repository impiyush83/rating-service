'use strict'

const Constants = {

  BASE_URL: `/rating-service`,

  GOOGLE_ACCOUNT_EMAIL_ADDRESS: process.env.GOOGLE_ACCOUNT_EMAIL_ADDRESS,

  GOOGLE_ACCOUNT_PASSWORD: process.env.GOOGLE_ACCOUNT_PASSWORD,

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

  REDIS: {
    REDIS_PORT: 6379,
    REDIS_URI: process.env.REDIS_URI || `localhost`,
    TEST_CONNECTION_URI: `localhost`
  },

  RATING: {
    TYPE: {
      ONESTAR: 'ONESTAR',
      TWOSTAR: 'TWOSTAR',
      THREESTAR:  'THREESTAR',
      FOURSTAR: 'FOURSTAR',
      FIVESTAR: 'FIVESTAR'
    }
  },

  REDIS_SYNC: {
    STATE: {
      TRUE: true,
      FALSE: false
    }
  }
}

module.exports = Constants
