
const express = require('express');
const { addReview , getProductReviews ,  deleteReview , getAverageRating } = require('../controllers/reviewController');
const  adminAuth  = require('../middlewares/userAuth');

const  userAuth  = require('../middlewares/userAuth');
// const { userAuth } = require('../middlewares/userAuth');

const router = express.Router();


router.post("/add-review", userAuth, addReview);
router.get("/get-course-reviews",getProductReviews);
router.delete('/delete-review',userAuth,deleteReview);
router.get('/get-avg-rating',getAverageRating);



module.exports = router ;