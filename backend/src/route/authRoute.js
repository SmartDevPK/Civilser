import express from "express";
import {
  register,
  login,
  getUserProfile,
  forgotPassword,
  resetPassword,
  updateUser
} from "../controller/authController.js";

import { protect } from "../utils/authMiddleware.js";

const router = express.Router();

// Auth Routes
router.post("/register", register);
router.post("/login", login);

// User Profile Routes
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUser);

// Password Recovery Routes
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);

export default router;
