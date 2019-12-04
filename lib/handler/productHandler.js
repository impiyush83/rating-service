const productController = require('../controller/productController')

const addProduct = function (req, res) {
  const requestBody = req.body
  productController.addProduct(requestBody).then(() => {
    return res.status(200).json({
      success: true,
      message: 'Success'
    })
  }).catch((err) => {
    return res.status(400).json(err)
  })
}

module.exports = {
  addProduct
}
