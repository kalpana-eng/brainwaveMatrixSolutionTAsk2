import mongoose from "mongoose";
//import validator from "validator";
const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    /*email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,"please enter a valid email"]
    },
    phone:{
        type:Number,
        required:true,
        minlength:10,
        maxlength:15,
        unique:true,
    },*/
    blogImage:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        },
    },
    category:{
        type:String,
        required:true,
    },
    about:{
        type:String,
        required:true,
        //enum:["user","admin"],
        //default:"student",
        maxlength:200,
    },
    /*password:{
        type:String,
        required:true,
        select:false,
        minlength:4,
   },
   token:{
    type:String,
    
   },*/
  adminName:{
    type:String,
   //required:true,
   },
   adminPhoto:{
    type:String,
    //required:true,
   },
   createdBy:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
   },
});
export const Blog=mongoose.model("Blog",blogSchema)