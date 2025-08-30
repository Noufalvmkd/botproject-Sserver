

// const { User } = require("../models/userModel");
const UserModel = require("../models/userModel");
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

// const saltRounds = process.env.SALT_ROUNDS
const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
const JWT_SECRET = process.env.JWT_SECRET_KEY;


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
    }else{
      bcrypt.hash(password, saltRounds, async function(err, hash) {
    if(hash){
      const newUser = await UserModel.create({
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
      data: newUser,
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
const userLogin = async (req ,res )=>{
  try{
    console.log("hi user login")
  const { email , password} =req.body
  if(!email || !password){
    return res.status(400).json({message: "Email and password is required"})
  }
  const user = await UserModel.findOne({email})
  
  if (user){

    if (user.status==="inactive"){
    return res.status(401).json({message:"Account is inactive . please contact admin"})
  }
    bcrypt.compare(password , user.password, function(err , result){
      if (result){
        const token = jwt.sign({id: user._id , email: user.email , role:user.role}, JWT_SECRET,{expiresIn :"30d"});
        res.cookie('token', token,{maxAge : 30 * 24 * 60 * 60 * 1000 , httpOnly : true, sameSite:"None" , secure: true})
        res.json({"message": " Login successful" ,token})
      }else{
        res.status(401).json({"message": "invalid credential"})
      }
    });
  }else{
    res.status(400).json({"message": "invalid credential"})
  }
  
    
  }catch{
res.status(400).json({"message": "something error from server"})
  }
}



const userProfile = async (req,res,next)=>{
    try {
        const userId =req.user.id;

        const userData = await User.findById(userId).select('-password');
        return res.json({data:userData , message:"user profile fetched"});
    } catch (error) {
        return res.status(error.statusCode ||500).json({message:error.message || "internal server error"})
    }
}

const userLogout = async (req,res,next)=>{
    try {
        res.clearCookie("token")

        
        return res.json({message:"user Logged out successfuly"});
    } catch (error) {
        return res.status(error.statusCode ||500).json({message:error.message || "internal server error"})
    }
}

const checkUser = async (req,res,next)=>{
    try {
        return res.json({message: "user authorized"})
    } catch (error) {
        return res.status(error.statusCode ||500).json({message:error.message || "internal server error"})
    }
}

module.exports = { userSignup , userLogin , userProfile ,userLogout , checkUser};

