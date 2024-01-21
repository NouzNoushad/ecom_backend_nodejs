import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/user_controller.js";
import { uploadImage } from "../middlewares/upload_middleware.js";
import {verifyToken } from "../middlewares/verify_token.js";

const router = express.Router();

router.post('/register_user', uploadImage, registerUser);
router.post('/login_user', loginUser);
router.get('/logout_user',verifyToken, logoutUser)

export default router;