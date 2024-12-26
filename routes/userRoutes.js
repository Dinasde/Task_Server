const express = require('express')
const router = express.Router()
const {createUser,loginAdmin,getUsers,getAdmin} = require('../controllers/userController')

//registering the admin in database

router.post('/createUser',createUser)

//login route for Admin

router.post('/login',loginAdmin)


//Route for fetching users

router.get('/users',getUsers)

router.get('/admin',getAdmin)

module.exports = router;