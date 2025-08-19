import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import fs from 'fs'

const app = express()

const CORS_ORIGIN = process.env.CORS_ORIGIN || (process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5173')

app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))
app.use(cookieParser())

// ensure temp folder exists
const tempDir = path.resolve('./public/temp')
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true })
}

// routes
import authRoutes from "./routes/auth.routes.js"
import designRoutes from "./routes/design.routes.js"
import aiRoutes from "./routes/ai.routes.js"
import furnitureRoutes from "./routes/furniture.routes.js"

app.use("/api/auth", authRoutes)
app.use("/api/designs", designRoutes)
app.use("/api/ai", aiRoutes)
app.use("/api/furniture", furnitureRoutes)

// error handler
import { errorHandler } from "./middlewares/error.middleware.js"
app.use(errorHandler)

export { app }
