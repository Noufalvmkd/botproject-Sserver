

// const { User } = require("../models/userModel");
const User = require("../models/userModel");

const userSignup = async (req, res) => {
  try {
    console.log("hitted")
    const { email, password, profile_pic, role, phone, personal_details, status } = req.body;


    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create and save new user
    const newUser = new User({
  email,
  password,
  profile_pic,
  role,
  phone,
  personal_details,
  status,
});

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      data: newUser,
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error", error: error.message });
   
  }
};

module.exports = { userSignup };

