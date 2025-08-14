import express from "express"
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    updateCurrentPassword,
    forgotPassword,
    resetPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar
} from "../controllers/auth.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = express.Router()

router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]),
    registerUser
)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJwt, logoutUser)

router.route("/forgot-password").post(forgotPassword)
router.route("/reset-password/:token").post(resetPassword)
router.route("/update-password").post(verifyJwt, updateCurrentPassword)
router.route("/refresh-token").post(refreshAccessToken)

router.route("/current-user").get(verifyJwt, getCurrentUser)
router.route("/update-details").patch(verifyJwt, updateAccountDetails)
router.route("/update-avatar").patch(verifyJwt, upload.single("avatar"), updateUserAvatar)

export default router
