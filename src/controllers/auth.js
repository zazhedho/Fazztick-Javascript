const ctrl = {}
const model = require('../models/users')
const jwt = require('jsonwebtoken')
const bcr = require('bcrypt')
const response = require('../helpers/respone')

// Generate Token JWT
const genToken = async (username, authRole) => {
  try {
    const payload = {
      user: username,
      role: authRole
    }

    const token = jwt.sign(payload, process.env.JWT_KEYS)

    const result = {
      message: 'Token created',
      token
    }

    return result
  } catch (error) {
    return error
  }
}

// Login
ctrl.login = async (req, res) => {
  try {
    const { username, password } = req.body

    // Mendapatkan semua kolom dari data user
    const user = await model.GetByUsername({ username })
    if (user.length <= 0) {
      return response(res, 401, 'Username tidak terdaftar', true)
    }

    // Untuk mendapatkan role user berdasarkan username
    const authRole = user[0].role

    // Untuk compare password dari database dengan password dari body (input)
    const check = await bcr.compare(password, user[0].password)
    if (!check) {
      return response(res, 401, 'Password yang Anda masukan salah', true)
    }

    // Untuk generate token
    const result = await genToken(username, authRole)
    return response(res, 200, result)
  } catch (error) {
    console.log(error)
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

module.exports = ctrl
