const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct

} = require("../controllers/productController");

router.post("/add-product", createProduct);       // POST /api/products
router.get("/get-all-product", getAllProducts);       // GET /api/products
router.get("/product-details/:id", getProductById);    // GET /api/products/:id
router.put("/update/:id", updateProduct);     // PUT /api/products/:id
router.delete("/remove-product/:id", deleteProduct);  // DELETE /api/products/:id


module.exports = router;
