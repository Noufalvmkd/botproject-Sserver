import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const userAuth = (req, res, next)=>{
    try {
        const {token} = req.cookies;
        // console.log(req.cookies.token);


        if(!token){
            return res.status(401).json({message:"user not autherised" , success: false});
        }
        // console.log("Received Token:", token);

        const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
       
    
        

        if(!tokenVerified){
            return res.status(401).json({message:"user not authorized" , success: false})
        }
        req.user = tokenVerified;
        next();

    } catch (error) {
        console.log("JWT Error:",error.message);
       return res.status(401).json({message:error.message || "user authorization failed" , success:false}) 
    }
}