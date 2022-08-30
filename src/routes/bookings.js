const express = require('express')
const router = express.Router()
const authCheck = require('../middleware/authCheck')
const ctrl = require('../controllers/bookings')

router.get('/:id_booking', authCheck, ctrl.GetBookingByid)
router.get('/', authCheck, ctrl.GetBookings)
router.post('/', authCheck, ctrl.InsertBooking)
router.patch('/:id_booking', authCheck, ctrl.UpdateBooking)
router.delete('/:id_booking', authCheck, ctrl.DeleteBooking)

module.exports = router
