const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/users')

router.get('/', ctrl.GetUsers)

// Registrasi User
router.post('/', ctrl.InsertUser)

module.exports = router
