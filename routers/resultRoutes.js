import express from "express";
import {
  createResult,
  getAllResults,
  getHighUserResult,
  getUserResults,
} from "../controllers/resultController.js";

import { protect } from "../controllers/authController.js";

const router = express.Router();

router.get("/", getAllResults);
router.post("/", protect, createResult);

router.get("/rank/:table", getHighUserResult);

router.get("/user-results", protect, getUserResults);

export default router;
