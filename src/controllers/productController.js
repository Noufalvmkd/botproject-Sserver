
const Product = require("../models/productModel");
const  cloudinaryInstance  = require("../config/cloudinary");



// Add new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price,  rating, reviews } = req.body;  //image by multer
    let cloudinaryResponse;
    const adminId = req.admin.id;
    console.log( "hi" ,adminId)
    console.log("image===",req.file);

    if(req.file){
    cloudinaryResponse = await cloudinaryInstance.uploader.upload(req.file.path);
  }
    // console.log(cloudinaryResponse)

    const product = new Product({ name, description, price, rating, image: cloudinaryResponse.secure_url ,admin: adminId, reviews });
    await product.save();

    res.status(201).json({ message: "product created successfully", newProduct: product });
  } catch (err) {
    res.status(500).json({ message: "Failed to create product", error: err.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};

// Get single product by ID
const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(req.params.id);
    // console.log("Product ID:", id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error getting product", error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: "Error updating product", error: err.message });
  }
};

// ===========================
// DELETE PRODUCT (Admin only)
// ===========================
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deleted = await Product.findByIdAndDelete(productId);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
