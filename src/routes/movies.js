const express = require('express')
const router = express.Router()
const authCheck = require('../middleware/authCheck')
const ctrl = require('../controllers/movies')
const upload = require('../middleware/upload')

router.get('/search', authCheck, ctrl.FindMovies)
router.get('/sort', authCheck, ctrl.SortMovies)
router.get('/:id_movie', authCheck, ctrl.GetMoviesByid)
router.get('/', authCheck, ctrl.GetMovies)
router.post('/', authCheck, upload.single('images'), ctrl.InsertMovies)
router.patch(
  '/:id_movie',
  authCheck,
  upload.single('images'),
  ctrl.UpdateMovies
)
router.delete('/:id_movie', authCheck, ctrl.DeleteMovies)

module.exports = router
