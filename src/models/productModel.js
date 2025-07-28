const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true
    },
    description: {
      type: String,
      required: [true, "Description is required"]
    },
    price: {
      type: Number,
      required: [true, "Price is required"]
    },
    image: {
      type: String,
      required: [true, "Image URL is required"]
    },
    rating: {
      type: Number,
      default: 0
    },
    reviews: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
