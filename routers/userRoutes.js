import express from "express";
import rateLimiter from "express-rate-limit";

import {
  forgotPassword,
  resetPassword,
  getUser,
  login,
  logout,
  signup,
  updatePassword,
  updateUser,
  verifyEmail,
  isLoggedIn,
} from "../controllers/authController.js";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

const router = express.Router();

router.post("/signup", apiLimiter, signup);
router.post("/login", apiLimiter, login);
router.get("/logout", logout);
router.get("/current-user", isLoggedIn);

router.get("/:id/:token", verifyEmail);

router.patch("/:id", updateUser);

router.patch("/update-password/:userId", updatePassword);

router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);

router.get("/:id", getUser);

export default router;
