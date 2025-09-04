const express = require('express');
const { createProduct , getAllProducts , getProductById, updateProduct , deleteProduct } = require('../controllers/productController');
const  adminAuth  = require('../middlewares/adminAuth');
const upload = require('../middlewares/multer');
// const { userAuth } = require('../middlewares/userAuth');
// const { userAuth } = require('../middlewares/userAuth');

const router = express.Router();

// Signup
router.post('/create',adminAuth , upload.single("image"), createProduct);

// // Login
router.get('/getproducts', getAllProducts);

// // Profile
router.get('/getbyid/:id',getProductById);

router.put('/update' ,updateProduct);

router.put('/delete' ,deleteProduct);

// // Logout
// router.put('/logout',  userLogout);

// // Profile Update
// router.put('/update',  profileUpdate);

// Forgot password, change password, account deactivated — placeholders for now

module.exports = router ; // same meaning as "export { router as userRouter }"



//userAuth
//userLogin, userProfile, profileUpdate, userLogout