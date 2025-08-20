const express = require('express');
const { userSignup , userLogin , userProfile, userLogout } = require('../controllers/userController');
const { userAuth } = require('../middlewares/userAuth');
// const { userAuth } = require('../middlewares/userAuth');

const router = express.Router();

// Signup
router.post('/signup', userSignup);

// // Login
router.post('/login', userLogin);

// // Profile
router.get('/profile',userAuth, userProfile);

router.put('/logout' ,userAuth,userLogout);

// // Logout
// router.put('/logout',  userLogout);

// // Profile Update
// router.put('/update',  profileUpdate);

// Forgot password, change password, account deactivated — placeholders for now

module.exports = router ; // same meaning as "export { router as userRouter }"



//userAuth
//userLogin, userProfile, profileUpdate, userLogout