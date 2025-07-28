const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must not exceed 5"]
    },
    feedback: {
      type: String,
      required: [true, "Feedback is required"],
      minlength: [10, "Feedback must be at least 10 characters"],
      maxlength: [500, "Feedback must not exceed 500 characters"]
    },
    review_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: [true, "Reviewer is required"]
    },
    product: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Product",
  required: true
}

  },
  {
    timestamps: true
  }
);

const ReviewModel = mongoose.model("Review", reviewSchema);
module.exports = ReviewModel;
