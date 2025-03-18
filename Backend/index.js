import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import blogRoute from "./routes/blogRoute.js";
const app = express();
dotenv.config();
const port = process.env.PORT;
const MONOGD_URL = process.env.MONOG_URI;

//middle
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
  useTempFiles: true,
  createParentPath:true,
  tempFileDir:"/temp/",
  limits: {fileSize:1000000},//1mb
})
);
//console.log(MONOGD_URL);
//DB code//
try{
   mongoose.connect(MONOGD_URL)
   console.log("Connected to mongoDB");
}
  catch (error) {
    console.log(error);
  }
  //define routes
  app.use("/api/users", userRoute);
   app.use("/api/blogs",blogRoute);
  //cloudinary
  cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_SECRET_KEY, // Click 'View API Keys' above to copy your API secret
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})