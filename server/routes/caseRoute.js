import express from "express"
import { getFruits, getComments } from "../controllers/caseController.js"

const router = express.Router()

router.get("/case1/fruits", getFruits)
router.get("/case2/comments", getComments)

export default router
