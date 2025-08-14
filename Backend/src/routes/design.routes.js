import express from "express"
import { saveDesign, getUserDesigns } from "../controllers/design.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = express.Router()

router.route("/").post(verifyJwt, upload.single("image"), saveDesign)
router.route("/").get(verifyJwt, getUserDesigns)

export default router
