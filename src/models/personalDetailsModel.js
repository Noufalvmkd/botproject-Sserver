const mongoose = require('mongoose')

const personalDetailsSchema = new mongoose.Schema({
    age:{
        type : Number,
        required : [true, "Age is rewquired"],
    },
    gender:{
        type: String,
        required : false,

    },
    creation_date:{
        type: Date,
        required: ["user creation date is required"],
        default: Date.now
    }
    
   
},
{
 timestamps: true
})

const personalDetails = mongoose.model("personalDetails" ,personalDetailsSchema)

