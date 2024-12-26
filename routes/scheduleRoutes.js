const express = require('express')
const router = express.Router()
const  {createSchedule} = require('../controllers/scheduleController')
const {authenticateToken} = require('../middlewares/authorize')

//creating the Schedule 

router.post('/createSchedule',authenticateToken,createSchedule)






module.exports = router