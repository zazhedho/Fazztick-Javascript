const ctrl = {}
const model = require('../models/bookings')
const response = require('../helpers/respone')

ctrl.InsertBooking = async (req, res) => {
  try {
    const role = req.userRole.role
    if (role === 'admin') {
      const data = await model.InsertBookingData(req.body)
      return response(res, 200, data)
    } else {
      return response(res, 401, 'You dont have permission', true)
    }
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.GetBookings = async (req, res) => {
  try {
    const data = await model.GetBookingData()
    return response(res, 200, data)
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.GetBookingByid = async (req, res) => {
  try {
    const data = await model.GetBookingDataById(req.params)
    return response(res, 200, data)
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.UpdateBooking = async (req, res) => {
  try {
    const role = req.userRole.role
    if (role === 'admin') {
      const data = await model.UpdateBookingData({ ...req.params, ...req.body })
      return response(res, 200, data)
    } else {
      return response(res, 401, 'You dont have permission', true)
    }
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.DeleteBooking = async (req, res) => {
  try {
    const role = req.userRole.role
    if (role === 'admin') {
      const data = await model.DeleteBookingData(req.params)
      return response(res, 200, data)
    } else {
      return response(res, 401, 'You dont have permission', true)
    }
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

module.exports = ctrl
