import express from "express";
import {register, login, getUserProfile} from "../controller/authController.js";
import { protect } from "../utils/authMiddleware.js.js";

const router = express.Router();


router.post("/register", register);

router.post("/login", login)

router.get("/profile", protect, getUserProfile)




export default router;