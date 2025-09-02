import express from "express"
import { createReservation, getReservations, updateReservationStatus } from "../controllers/reservationController.js"
import { validateReservation } from "../middlewares/validationMiddleware.js"

const router = express.Router()

router.post("/", validateReservation, createReservation)
router.get("/", getReservations)
router.patch("/:id/status", updateReservationStatus)

export default router
