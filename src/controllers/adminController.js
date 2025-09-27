

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const User = require("../models/userModel")

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const adminSignup = async (req, res) => {
  try {
    console.log("hitted")
    const { email, password, profile_pic, role, phone, personal_details, status } = req.body;


    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "User already exists" });
    }else{
      bcrypt.hash(password, saltRounds, async function(err, hash) {
    if(hash){
      const newAdmin = await Admin.create({
  email,
  password : hash,
  profile_pic,
  role,
  phone,
  personal_details,
  status,
      })
      return res.status(201).json({
      message: "User registered successfully",
      data: newAdmin,
    });
    }else{
      res.status(400).json({ message: "try again" })
      
    }
});
    }

    // Create and save new user
//     const newUser = new User({
//   email,
//   password,
//   profile_pic,
//   role,
//   phone,
//   personal_details,
//   status,
// });

    // await newUser.save();

    

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error", error: error.message });
   
  }
};


//login
const adminLogin = async (req ,res )=>{
  try{
    console.log("hi admin login")
  const { email , password} =req.body
  if(!email || !password){
    return res.status(400).json({message: "Email and password is required"})
  }
  const admin = await Admin.findOne({email})
  
  if (admin){

    if (admin.status==="inactive"){
    return res.status(401).json({message:"Account is inactive . please contact super admin"})
  }
    bcrypt.compare(password , admin.password, function(err , result){
      if (result){
        const token = jwt.sign({id: admin._id , email: admin.email , role:admin.role}, JWT_SECRET,{expiresIn :"30d"});
        res.cookie('token', token,{maxAge : 30 * 24 * 60 * 60 * 1000 , httpOnly : true, sameSite:"None" , secure: true})
        res.json({"message": " Login successful" ,token})
      }else{
        res.status(401).json({"message": "invalid credential"})
      }
    });
  }else{
    res.status(400).json({"message": "invalid credential"})
  }
  
    
  }catch (error) {
  console.error(error); // so you can see the real reason in terminal
  res.status(500).json({ message: "something error from server", error: error.message });
}
}



const adminProfile = async (req,res,next)=>{
    try {
        const adminId =req.admin.id;

        const adminData = await Admin.findById(adminId).select('-password');
        return res.json({data:adminData , message:"admin profile fetched"});
    } catch (error) {
        return res.status(error.statusCode ||500).json({message:error.message || "internal server error"})
    }
}

const adminLogout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,       // use true in production with HTTPS
      sameSite: "None",   // required if frontend is on another domain
      path: "/",          // must match cookie set
    });

    return res.json({ message: "Admin Logged out successfully" });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "internal server error" });
  }
};

const checkUser = async (req, res) => {
  try {
    // Fetch all users
    const users = await User.find().select("-password"); // exclude passwords

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.json({
      success: true,
      users, // returns array of all users
    });
  } catch (error) {
    console.error("Get All Users Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

//update user status

const updateUserStatus = async (req, res) => {
  try {
    const { isActive } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      message: "User status updated",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Update User Status Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};


const checkAdmin = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const adminData = await Admin.findById(decoded.id).select("-password");

    if (!adminData) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.json({
      message: "Admin authorized",
      data: adminData,
    });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Invalid token" });
  }
};

module.exports = { adminSignup ,   adminLogin , adminProfile ,adminLogout , checkUser , updateUserStatus , checkAdmin};




















// const getAllUsers = async (req, res) => {
//   try {
//     const users = await UserModel.find().select("-password");
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to get users", error: error.message });
//   }
// };

// const deleteUser = async (req, res) => {
//   try {
//     await UserModel.findByIdAndDelete(req.params.id);
//     res.json({ message: "User deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete user", error: error.message });
//   }
// };

// module.exports = { getAllUsers, deleteUser };
