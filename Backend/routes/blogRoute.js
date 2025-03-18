import express from 'express';
import { createBlog, deleteBlog } from '../controller/blogController.js';
import { IsAdmin,IsAuthenticated } from '../middleware/AuthUser.js';
const router = express.Router();
router.post("/create",IsAuthenticated,IsAdmin,createBlog);
router.delete("/delete/:Id",IsAuthenticated,IsAdmin("admin"),deleteBlog);

export default router;