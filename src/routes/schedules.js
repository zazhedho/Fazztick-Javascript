const express = require('express')
const router = express.Router()
const authCheck = require('../middleware/authCheck')
const ctrl = require('../controllers/schedules')

router.get('/:id_schedule', authCheck, ctrl.GetScheduleByid)
router.get('/', authCheck, ctrl.GetSchedules)
router.post('/', authCheck, ctrl.InsertSchedule)
router.patch('/:id_schedule', authCheck, ctrl.UpdateSchedule)
router.delete('/:id_schedule', authCheck, ctrl.DeleteSchedule)

module.exports = router
