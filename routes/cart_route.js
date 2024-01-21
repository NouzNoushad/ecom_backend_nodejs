import express from "express";
import { createCart, getCarts, deleteCart } from "../controllers/cart_controller.js";

const router = express.Router();

router.post('/create_cart', createCart);
router.get('/get_carts', getCarts);
router.delete('/delete_cart/:id', deleteCart);

export default router;