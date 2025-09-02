import express from "express"
import { getAllOrders, updateOrderStatus } from "../controllers/orderController.js"
import { getAllReservations, updateReservationStatus } from "../controllers/reservationController.js"

const router = express.Router()

// Order management routes
router.get("/orders", getAllOrders)
router.patch("/orders/:id/status", updateOrderStatus)

// Reservation management routes
router.get("/reservations", getAllReservations)
router.patch("/reservations/:id/status", updateReservationStatus)

export default router
