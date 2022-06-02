const express = require('express');
const adminControllers =require('../contoller/adminControllers/adminControllers')
const router =express.Router()

router
     .route('/signup')
     .post(adminControllers.createAdmin)



router
     .route('/login')     
     .post(adminControllers.login)




module.exports = router 