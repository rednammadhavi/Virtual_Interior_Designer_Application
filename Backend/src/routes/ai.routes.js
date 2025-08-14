import express from "express"
import { aiRedesign } from "../controllers/ai.controller.js"

const router = express.Router()

router.route("/redesign").post(aiRedesign)

export default router
