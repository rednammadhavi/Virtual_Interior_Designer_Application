import express from "express";
import { getFurniture } from "../controllers/furniture.controller.js";

const router = express.Router();

router.route("/").get(getFurniture);

export default router;
