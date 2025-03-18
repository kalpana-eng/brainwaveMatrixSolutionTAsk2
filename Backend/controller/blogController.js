import { Blog} from "../models/blogModel.js";
import { v2 as cloudinary } from 'cloudinary';
export const createBlog = async(req,res) => {
    try{
        console.log(req.files);
      //if(!req.files || Object.keys(req.files).length === 0){
      if(!req.files||!req.files.blogImage){  
      return res.status(400).json({message:"Blog image is required"});
    }
    
    const blogImage=req.files.blogImage;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    
    if(!allowedFormats.includes(blogImage.mimetype)){
        return res.status(400).json({message: "invalid image format"});
    }
    //user registartion krne wale code ... likna hai 
    const {title,category,about} = req.body;
    if(!title||!category||!about){
        return res.status(400).json({message: "title ,category and about are required"});
    }
    if(!req.user){
        return res.status(401).json({message:"Unauthorized:user not authenticated"});
    }
    const adminName = req.user.name;
    const adminPhoto =req.user.photo;
    const createdBy =req.user._id;

    const cloudinaryResponse=await cloudinary.uploader.upload(
        blogImage.tempFilePath
    );
    if(!cloudinaryResponse||cloudinaryResponse.error){
        console.error(cloudinaryResponse.error);
        return res.status(500).json({message:"failed to upload image"});
    } 
    //const hashPassword = await bcrypt.hash(password,10);
    const blogData = {title,about,category, adminName, adminPhoto, createdBy,blogImage:{
        public_id: cloudinaryResponse.public_id,
        url:cloudinaryResponse.url,
      },
       };
        const blog=await Blog.create(blogData);
         /**if(newUser){
            const token = await createTokenAndSaveCookies (newUser._id, res)
            console.log(token);*/
          return res.status(201).json({message: "Blog created successfully" , blog, }); 
         
    }catch(error){
    console.error(error);
    return res.status(500).json({error:"internal server error"});
    }
    };


    //code for  delete update of blog 
    export const deleteBlog= async(req,res)=>{

    }