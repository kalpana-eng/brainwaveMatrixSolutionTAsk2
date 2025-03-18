import express from 'express';
import { login,logout,register } from '../controller/userController.js';
import { IsAuthenticated } from '../middleware/AuthUser.js';
const router = express.Router();
router.post("/register",register);
router.post("/login", login);
router.get("/logout",IsAuthenticated,logout);

export default router;