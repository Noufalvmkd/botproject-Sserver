const { default: mongoose } = require("mongoose");


const reviewSchema = new mongoose.Schema({
    rating:{
        type: Number,
        required : [true , "rating is required"],
        min :[1 , "rating minimum one"],
        max :[5 , "rating should not exceed 5"],
    },
    feedback: {
        type : String,
        required : [true , "feedback is required"],
        minlength :[10 , "rating minimum one"],
        maxlength :[500 , "rating should not exceed 5"],
    },
    review_by: {
        type : mongoose.Schema.ObjectId,
        ref : "user",
        required :[true , "Reviewer is required"]
    }
},
{
    timestamps : true
})

const ReviewModel = mongoose.model("Review", reviewSchema)

module.exports = ReviewModel