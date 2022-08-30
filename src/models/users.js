const model = {}
const db = require('../config/db')

// Menambahkan user pada database (Registrasi)
model.InsertUsersData = async (data) => {
  try {
    await db.query(
      'INSERT INTO public.users ( username, "password", role) VALUES($1, $2, $3)',
      [data.username, data.hashPassword, data.role]
    )
    return 'Insert user succesfully'
  } catch (error) {
    return error
  }
}

model.GetUsersData = async () => {
  try {
    const results = await db.query(
      'SELECT * FROM public.users ORDER BY created_at DESC'
    )
    return results.rows
  } catch (error) {
    return error
  }
}

// Model untuk authentication
model.GetByUsername = async (data) => {
  try {
    const results = await db.query(
      'SELECT * FROM public.users WHERE username = $1',
      [data.username]
    )
    return results.rows
  } catch (error) {
    return error
  }
}

module.exports = model
