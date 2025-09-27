
const express = require('express');
const { adminSignup , adminLogin ,adminProfile ,adminLogout, checkUser , updateUserStatus , checkAdmin } = require('../controllers/adminController');
const  adminAuth  = require('../middlewares/adminAuth');



const router =express.Router();


router.post('/signup', adminSignup);
//login
router.post('/login', adminLogin) // bcz new datas not adding (so can be used put)
//profile
router.get('/profile',adminAuth,adminProfile)
//Logout
router.put('/logout',adminAuth,adminLogout)
//check admin
router.get("/check-admin" , adminAuth ,checkAdmin)
router.get('/check-users' , adminAuth ,checkUser)
router.put('/update-user-status/:id', adminAuth, updateUserStatus)

//profileUpdate

//forgot password
//change password
//account deactivated

module.exports = router ;