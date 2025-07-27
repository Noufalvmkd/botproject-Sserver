

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

const userLogin = async (req ,res )=>{
  try{
    console.log("hi user login")
  const { email , password} =req.body
  console.log( {email , password})
  if (!email || !password){
    res.status(400).json({message: " all field is reuired"})
    console.log("user not exist")
  }
  const userExist = await  User.findOne({email})
  console.log(userExist.email + "hi this is from db")
  if(!userExist){
    return res.status(400).json({message: "user not exist"})
    
  }
  const passwordMatch = userExist.password
  if(!passwordMatch){
    return res.status(401).json({message:" user not authenticated"})
  }
    
  }catch{

  }
}

const userProfile = async (req , res)=>{
   console.log("req.user =>", req.user);
try{
const userId = req.user.id;

const userData = await User.findById(userId).select('-password')
return res.json({data:userData , message : " user profile fetched"})
}catch(error){
return res.status(error.statusCode || 500).json({message:error.message || "internal sever error"})
}

}

module.exports = { userSignup , userLogin , userProfile};

