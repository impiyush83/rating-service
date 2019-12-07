const db = require('../dao/models/product')
const ErrorUtil = require('../util/error')

const addProduct= async (product) => {
  const Product = await db.cities.findOne({'productId': product.productId})
  if (Product) {
    return Promise.reject(ErrorUtil.buildError(409, 'Product already exists'))
  }
  await db.products.create(Product).catch((err) => {
    console.log(err)
  })
}

module.exports = {
  addProduct
}
