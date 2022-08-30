const ctrl = {}
const model = require('../models/movies')
const response = require('../helpers/respone')

ctrl.InsertMovies = async (req, res) => {
  try {
    // Memanggil req.userRole dari middleware
    const role = req.userRole.role
    if (role === 'admin') {
      const images = 'http://localhost:8080/' + req.file.path
      const data = await model.InsertMoviesData({ ...req.body, images })
      return response(res, 200, data)
    } else {
      return response(res, 401, 'You dont have permission', true)
    }
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.GetMovies = async (req, res) => {
  try {
    const data = await model.GetMoviesData()
    return response(res, 200, data)
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.SortMovies = async (req, res) => {
  try {
    const data = await model.SortMoviesData()
    return response(res, 200, data)
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.GetMoviesByid = async (req, res) => {
  try {
    const data = await model.GetMoviesDataById(req.params)
    return response(res, 200, data)
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.FindMovies = async (req, res) => {
  try {
    const data = await model.FindMoviesData(req.query)
    return response(res, 200, data)
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.UpdateMovies = async (req, res) => {
  try {
    // Memanggil req.userRole dari middleware
    const role = req.userRole.role
    if (role === 'admin') {
      const images = req.file.path
        ? 'http://localhost:8080/' + req.file.path
        : null
      const data = await model.UpdateMoviesData({
        ...req.params,
        ...req.body,
        images
      })
      return response(res, 200, data)
    } else {
      return response(res, 401, 'You dont have permission', true)
    }
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.DeleteMovies = async (req, res) => {
  try {
    const role = req.userRole.role
    if (role === 'admin') {
      const data = await model.DeleteMoviesData(req.params)
      return response(res, 200, data)
    } else {
      return response(res, 401, 'You dont have permission', true)
    }
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

module.exports = ctrl
