const jwt = require('jsonwebtoken')
const respone = require('../helpers/respone')

const authValidate = (req, res, next) => {
  const { authtoken } = req.headers

  if (!authtoken) {
    return respone(res, 401, 'Perlu login')
  }
  jwt.verify(authtoken, process.env.JWT_KEYS, (err, decode) => {
    if (err) {
      return respone(res, 401, err, true)
    } else {
      // Menambahkan key userRole berisi decode ke dalam request
      req.userRole = decode
      next()
    }
  })
}

module.exports = authValidate
