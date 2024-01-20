import express from "express";
import { registerUser, loginUser } from "../controllers/user_controller.js";
import { uploadImage } from "../middlewares/upload_middleware.js";

const router = express.Router();

router.post('/register_user', uploadImage, registerUser);
router.post('/login_user', loginUser);

export default router;