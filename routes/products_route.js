import express from "express";
import { getProducts, getProductById } from "../controllers/products_controller.js";

const router = express.Router();

router.get('/get_products', getProducts);
router.get('/get_product/:id', getProductById);

export default router;