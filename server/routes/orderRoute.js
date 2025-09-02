import express from "express"
import { createOrder, getAllOrders, updateOrderStatus } from "../controllers/orderController.js"
import { validateOrder } from "../middlewares/validationMiddleware.js"

const router = express.Router()

// Create new order
router.post("/", validateOrder, createOrder)

// Get all orders (for admin)
router.get("/", getAllOrders)

// Update order status (for admin)
router.patch("/:id/status", updateOrderStatus)

export default router