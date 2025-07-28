const Review = require("../models/reviewModel");

// ➕ Create a new review
const createReview = async (req, res) => {
  try {
    const { rating, feedback, review_by, product } = req.body;

    if (!rating || !feedback || !review_by || !product) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newReview = await Review.create({
      rating,
      feedback,
      review_by,
      product
    });

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: "Failed to create review", error: error.message });
  }
};

// 📦 Get all reviews for a specific product
const getReviewsByProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const reviews = await Review.find({ product: productId })
      .populate("review_by", "email")
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
  }
};

module.exports = {
  createReview,
  getReviewsByProduct
};
