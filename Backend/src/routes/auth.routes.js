import express from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    updateCurrentPassword,
    forgotPassword,
    resetPassword,
    getCurrentUser,
    updateAccountDetails
} from "../controllers/auth.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJwt, logoutUser);

router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);
router.route("/update-password").post(verifyJwt, updateCurrentPassword);
router.route("/refresh-token").post(refreshAccessToken);

router.route("/current-user").get(verifyJwt, getCurrentUser);
router.route("/update-details").patch(verifyJwt, updateAccountDetails);

export default router;
