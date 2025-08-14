import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { errorHandler } from "./middlewares/error.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))
app.use(cookieParser())

import authRoutes from "./routes/auth.routes.js"
import designRoutes from "./routes/design.routes.js"
import aiRoutes from "./routes/ai.routes.js"

app.use("/api/auth", authRoutes)
app.use("/api/designs", designRoutes)
app.use("/api/ai", aiRoutes)

app.use(errorHandler)

export { app }

