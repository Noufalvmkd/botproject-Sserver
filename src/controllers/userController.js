

const { User } = require("../models/userModel");

const userSignup = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create and save new user
    const newUser = new User({ name, email, password, mobile });
    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      data: newUser,
    });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { userSignup };

