import{User} from "../models/UserModel.js";
import jwt from "jsonwebtoken";

//authentication code 
 export const IsAuthenticated = async(req, res , next)=>{
    try{
         const token=req.cookies.jwt;
         console.log("token:",token);
         if(!token){
            return res.status(401).json({error:"user not found"});
         }
         const decoded =jwt.verify(token, process.env.JWT_SECRET_KEY);
         console.log("decoded Token", decoded);
         const user = await User.findById(decoded.userId);
         console.log("user found", user);
         if(!user){
            return res.status(404).json({error:"user not found"});
         }
         req.user = user;
         next();
    }catch(error){
       console.log("error in authentication", error);
       return res.status(401).json({error:"User not found"}); 
    }
};



//authorised user
export const IsAdmin = (...roles)=>{
    return (req, res, next)=>{
        if(!req.user||!roles.includes(req.user.role)){
            return res.status(403).json({error:`user with given role ${req.user?.role} not allowed`});
        }
        next();
    };

};
