import express from "express";
import { registerUser } from "../controllers/user_controller.js";
import { uploadImage } from "../middlewares/upload_middleware.js";

const router = express.Router();

router.post('/register_user', uploadImage, registerUser);

export default router;