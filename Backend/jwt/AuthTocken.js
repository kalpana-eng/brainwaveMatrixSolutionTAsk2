import jwt from "jsonwebtoken";
import{User} from "../models/UserModel.js";

const createTokenAndSaveCookies = async(userId,res) =>{
    const token=jwt.sign ({userId},process.env.JWT_SECRET_KEY,{
        expiresIn:"8days"
    })
    res.cookie("jwt",token,{
        httpOnly:true, //xss
        //expires:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        secure:true,
        sameSite:"strict" //csrf protect
    })
    await User.findByIdAndUpdate(userId,{token});
    return token;
}

export default createTokenAndSaveCookies;