const mongoose = require("mongoose");
const Review = require("../models/reviewModel");
const Product = require("../models/productModel"); //optional
//  Add a new review
const addReview = async (req, res) => {
  try {
    
    const { productId, rating, comment } = req.body;
    const userId = req.user.id; // from userAuth middleware

    if (!productId || !rating) {
      return res.status(400).json({ message: "Product ID and rating are required" });
    }

    // check if user already reviewed this product
    const existingReview = await Review.findOne({ userId, productId });
    if (existingReview) {
      return res.status(400).json({ message: "You already reviewed this product" });
    }

    const review = new Review({
      userId,
      productId,
      rating,
      comment,
    });

    await review.save();

    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    console.error("Add Review Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//  Get all reviews for a product
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.query; // pass productId as query param ?productId=123

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const reviews = await Review.find({ productId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Get Product Reviews Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//  Delete a review
const deleteReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { reviewId } = req.body; // pass reviewId in body

    if (!reviewId) {
      return res.status(400).json({ message: "Review ID is required" });
    }

    const review = await Review.findOne({ _id: reviewId, userId });
    if (!review) {
      return res.status(404).json({ message: "Review not found or not authorized" });
    }

    await Review.deleteOne({ _id: reviewId });

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Delete Review Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//  Get average rating for a product
const getAverageRating = async (req, res) => {
  try {
    const { productId } = req.query; // pass productId as query param ?productId=123

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const result = await Review.aggregate([
      { $match: { productId: new mongoose.Types.ObjectId(productId) } },
      { $group: { _id: "$productId", avgRating: { $avg: "$rating" }, count: { $sum: 1 } } },
    ]);

    if (result.length === 0) {
      return res.status(200).json({ avgRating: 0, count: 0 });
    }

    res.status(200).json({ avgRating: result[0].avgRating, count: result[0].count });
  } catch (error) {
    console.error("Get Avg Rating Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addReview,
  getProductReviews,
  deleteReview,
  getAverageRating,
};
