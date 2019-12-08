const userController = require('../controller/userController')

const addUser = function (req, res) {
  const requestBody = req.body
  userController.addUser(requestBody).then(() => {
    return res.status(200).json({
      success: true,
      message: 'Success'
    })
  }).catch((err) => {
    return res.status(400).json(err)
  })
}

module.exports = {
    addUser
}
