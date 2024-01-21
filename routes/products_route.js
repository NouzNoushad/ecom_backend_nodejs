import express from "express";
import { getProducts } from "../controllers/products_controller.js";

const router = express.Router();

router.get('/get_products', getProducts);

export default router;