const ctrl = {}
const model = require('../models/users')
const hashing = require('../helpers/hash')
const response = require('../helpers/respone')

ctrl.InsertUser = async (req, res) => {
  try {
    const { username, password, role } = req.body
    const hashPassword = await hashing(password)

    const userDB = await model.GetByUsername({ username })
    if (userDB.length > 0) {
      return response(res, 401, `Username ${username} sudah terdaftar`, true)
    }
    const data = await model.InsertUsersData({
      username,
      hashPassword,
      role
    })
    return response(res, 200, data)
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.GetUsers = async (req, res) => {
  try {
    const data = await model.GetUsersData()
    return response(res, 200, data)
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

// ctrl.UpdateUser = async (req, res) => {
//   try {
//     const user_id = req.params
//     const data = await model.UpdateUserData(user_id, req.body)
//     return respone(res, 200, data)
//   } catch (error) {
//     return respone(res, 500, 'Terjadi kesalahan', true)
//   }
// }

// ctrl.DeleteUser = async (req, res) => {
//   try {
//     const id_schedule = req.params.id_schedule
//     const data = await model.DeleteUserData({ id_schedule })
//     return respone(res, 200, data)
//   } catch (error) {
//     return respone(res, 500, 'Terjadi kesalahan', true)
//   }
// }

module.exports = ctrl
