const products = require('./products.json')
const users = require('./users.json')
const MongoConnection = require('../lib/dao/connect')
const dbProduct = require('../lib/dao/models/product')
const dbUser = require('../lib/dao/models/user')

const addProducts = async function (products) {
  // clear entries
  await dbProduct.products.deleteMany()
  // insert many
  await dbProduct.products.insertMany(products)
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
}

init().then(() => {
  console.log('setup success')
  process.exit(1)
}).catch((err) => {
  console.log(`error in setup: ${err}`)
  process.exit(1)
})
