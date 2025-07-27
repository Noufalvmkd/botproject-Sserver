
const express = require("express");
const router = express.Router();

const { userRouter } = require('./userRoutes');
// const productRoutes = require('./productRoutes');
// const orderRoutes = require('./orderRoutes');
// const reviewRoutes = require('./reviewRoutes');
// const cartRoutes = require('./cartRoutes');





router.use('/user', userRouter);
// router.use('/products', productRoutes);
// router.use('/orders', orderRoutes);
// router.use('/reviews', reviewRoutes);
// router.use('/cart', cartRoutes);


// module.exports = {
//   apiRouter: router
// };

// module.exports = { apiRouter };
module.exports = router;

