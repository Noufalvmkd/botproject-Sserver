const express = require('express');
const { userSignup } = require('../controllers/userController');
// const { userAuth } = require('../middlewares/userAuth');

const router = express.Router();

// Signup
router.post('/signup', userSignup);

// // Login
// router.put('/login', userLogin);

// // Profile
// router.get('/profile',  userProfile);

// // Logout
// router.put('/logout',  userLogout);

// // Profile Update
// router.put('/update',  profileUpdate);

// Forgot password, change password, account deactivated — placeholders for now

module.exports = { userRouter: router }; // same meaning as "export { router as userRouter }"



//userAuth
//userLogin, userProfile, profileUpdate, userLogout