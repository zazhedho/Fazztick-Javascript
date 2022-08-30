const bcr = require('bcrypt')

const securePassword = async (password) => {
  try {
    const salt = await bcr.genSalt(10) // Generate salt 10 rounds
    const result = await bcr.hash(password, salt)
    return result
  } catch (error) {
    return error
  }
}

module.exports = securePassword
