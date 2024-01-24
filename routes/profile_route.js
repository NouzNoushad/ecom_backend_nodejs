import express from "express";
import { getProfile, updateProfile } from "../controllers/profile_controller.js";

const router = express.Router();

router.post('/get_profile', getProfile);
router.patch('/update_profile/:id', updateProfile);

export default router;