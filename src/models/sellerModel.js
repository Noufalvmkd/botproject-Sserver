const { default: mongoose } = require("mongoose");


const sellerSchema = new mongoose.Schema({
    seller_name:{
        type: String,
        required : [true , "name is required"],
        unique : true,
        trim: true

    },
    seller_image: {
        type: String,
        trim : true
    },
    location: {
        type : String,
        required : [true , " location is required"],
        maxlength: [500, "lcaction shoul not exceed 500 charactors"]
    }
},
{
    timestamps : true
})

const SellerModel = mongoose.model("user", sellerSchema)

module.exports = SellerModelModel