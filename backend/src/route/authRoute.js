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


router.post("/register", register);

router.post("/login", login);

router.get("/profile", protect, getUserProfile);

router.post("/forgotpassword", forgotPassword);

router.put("/resetpassword/:resettoken", resetPassword);

router.put("/profile", updateUser);
export default router;
