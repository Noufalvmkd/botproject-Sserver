
const express = require("express");
const router = express.Router();

const userRouter  = require('./userRoutes');
const adminRouter = require('./adminRoutes');
const productRouter = require('./productRoutes');
const cartRouter = require('./cartRoutes');
const orderRouter = require('./orderRoutes')
const reviewRouter = require('./reviewRoutes');






router.use('/user', userRouter);
router.use('/admin', adminRouter);
router.use('/products', productRouter);
router.use('/cart', cartRouter);
router.use("/review", reviewRouter);
router.use("/orders" , orderRouter)
// router.use('/reviews', reviewRoutes);



// module.exports = {
//   apiRouter: router
// };

// module.exports = { apiRouter };
module.exports = router;

