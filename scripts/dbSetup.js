const products = require('./products.json')
const users = require('./users.json')
const ratings = require('./ratings.json')
const MongoConnection = require('../lib/dao/connect')
const dbProduct = require('../lib/dao/models/product')
const dbUser = require('../lib/dao/models/user')
const dbRating = require('../lib/dao/models/rating')

const addProducts = async function (products) {
  // clear entries
  await dbProduct.products.deleteMany()
  // insert many
  await dbProduct.products.insertMany(products)
}

const addProductRatings = async function (ratings) {
  // clear entries
  await dbRating.ratings.deleteMany()

  // insert many ratings
  await dbRating.ratings.insertMany(ratings)
}

const addUsers = async function (users) {
  // clear entries
  await dbUser.users.deleteMany()
  // insert many
  await dbUser.users.insertMany(users)
}

const init = async () => {
  await MongoConnection.init()
  await addProducts(products)
  await addUsers(users)
  await addProductRatings(ratings)
}

init().then(() => {
  console.log('setup success')
  process.exit(1)
}).catch((err) => {
  console.log(`error in setup: ${err}`)
  process.exit(1)
})
