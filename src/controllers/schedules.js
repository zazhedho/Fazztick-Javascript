const ctrl = {}
const model = require('../models/schedules')
const response = require('../helpers/respone')

ctrl.InsertSchedule = async (req, res) => {
  try {
    const role = req.userRole.role
    if (role === 'admin') {
      const data = await model.InsertScheduleData(req.body)
      return response(res, 200, data)
    } else {
      return response(res, 401, 'You dont have permission', true)
    }
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.GetSchedules = async (req, res) => {
  try {
    const data = await model.GetScheduleData()
    return response(res, 200, data)
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.GetScheduleByid = async (req, res) => {
  try {
    const data = await model.GetScheduleDataById(req.params)
    return response(res, 200, data)
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.UpdateSchedule = async (req, res) => {
  try {
    const role = req.userRole.role
    if (role === 'admin') {
      const data = await model.UpdateScheduleData({
        ...req.params,
        ...req.body
      })

      return response(res, 200, data)
    } else {
      return response(res, 401, 'You dont have permission', true)
    }
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.DeleteSchedule = async (req, res) => {
  try {
    const role = req.userRole.role
    if (role === 'admin') {
      const data = await model.DeleteScheduleData(req.params)
      return response(res, 200, data)
    } else {
      return response(res, 401, 'You dont have permission', true)
    }
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

module.exports = ctrl
