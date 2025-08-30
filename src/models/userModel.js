const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"]
    },
    profile_pic: {
  type: String,
  trim: true,
  default: "https://via.placeholder.com/150" // fallback avatar
},

    role: {
      type: String,
      enum: ["admin", "user", "seller"],
      default: "user",
      required: true
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      minlength: [10, "Phone number must be 10 digits"],
      maxlength: [10, "Phone number must be 10 digits"]
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: true
    }
    
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
