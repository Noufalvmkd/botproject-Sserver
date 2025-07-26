const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required : [true , "Email is required"],
        unique : true,
        trim : true,
        lowercase : true
    },
    password : {
        type : String ,
        required : [true, "password is required"],
        minlength : [8 , "password must be atleast 8 characters"]

    },
    profile_pic :{
        type: String,
        trim : true,

    },
    role :{
        type : String,
        required : true,
        enum : ["admin" , "user", "seller"],
        default: "user"
    },
    phone :{
        type: String,
        required:[true , " phone number required"],
        minlength : [10 , "phone number must be at least 10 "],
        maxlength :[10 , "phone nuber should not exeed 13 digit"]
    },
    personal_details:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "personalDetails"
    },
    status: {
        type: String,
        required: true,
        enum:["active" , "inactive"]
    }, 
    timestamps : true
})

const UserModel = mongoose.model("user", userSchema)

module.exports = UserModel