import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const adminAuth = (req, res, next)=>{
    try {
        const token = req.cookies.token;
        console.log(req.cookies.token);


        if(!token){
            return res.status(401).json({message:"admin not autherised" , success: false});
        }
        console.log("Received Token:", token);

        const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.admin = tokenVerified
    
        

        if(!tokenVerified){
            return res.status(401).json({message:"admin not authorized" , success: false})
        }
        req.admin = tokenVerified;
        next();

    } catch (error) {
        console.log("JWT Error:",error.message);
       return res.status(401).json({message:error.message || "admin authorization failed" , success:false}) 
    }
}