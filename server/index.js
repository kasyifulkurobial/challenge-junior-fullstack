import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js"
import { connectDatabase } from "./config/database.js"
import reservationRoutes from "./routes/reservationRoute.js"
import caseRoutes from "./routes/caseRoute.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Security middleware
app.use(helmet())

// Rate limiting
const limiter = rateLimit({
       windowMs: 15 * 60 * 1000, // 15 minutes
       max: 100, // limit each IP to 100 requests per windowMs
       message: "Terlalu banyak request, coba lagi nanti",
})
app.use(limiter)

// CORS configuration
app.use(
       cors({
              origin: process.env.CLIENT_URL || "http://localhost:5173",
              credentials: true,
       }),
)

// Body parsing middleware
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

connectDatabase()

// Health check route
app.get("/api/health", (req, res) => {
       res.json({
              status: "OK",
              message: "Rumah Makan Server is running!",
              timestamp: new Date().toISOString(),
              environment: process.env.NODE_ENV || "development",
       })
})

// API Routes
app.use("/api/reservations", reservationRoutes)
app.use("/api", caseRoutes)

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
       console.log(`Server running on http://localhost:${PORT}`)
       console.log(`Health check: http://localhost:${PORT}/api/health`)
       console.log(`Environment: ${process.env.NODE_ENV || "development"}`)
})
