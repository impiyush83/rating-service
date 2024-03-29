const db = require('../dao/models/user')
const ErrorUtil = require('../util/error')

const addUser= async (user) => {
  const User = await db.users.findOne({'userId':user.userId})
  if (User) {
    return Promise.reject(ErrorUtil.buildError(409, 'User already exists'))
  }
  await db.users.create(user).catch((err) => {
    console.log(err)
  })
}

module.exports = {
  addUser
}
