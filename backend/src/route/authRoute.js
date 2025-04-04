import express from "express";
import { protect } from "../utils/authMiddleware.js.js";
import {
    register, 
    login,   
    getUserProfile,
    forgotPassword,
    resetPassword
} from "../controller/authController.js";


const router = express.Router();


router.post("/register", register);

router.post("/login", login)

router.get("/profile", protect, getUserProfile)

router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);




export default router;