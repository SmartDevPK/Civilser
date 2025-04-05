import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js"; // Assuming you have a utility for sending emails

dotenv.config();



const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
  return regex.test(password);
};

const register = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      gender, 
      registrationCode, 
      levelPostion, 
      mobileNumber, 
      password 
    } = req.body;

    const existingUser = await User.findOne({ 
      $or: [{ email }, { mobileNumber }] 
    });

    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: "Email or phone number already exists" 
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        success: false,
        message: "Please choose a stronger password. Try a mix of letters, numbers, and symbols."
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({ 
      name, 
      email, 
      gender, 
      registrationCode, 
      levelPostion, 
      mobileNumber, 
      password: hashedPassword 
    });

    await user.save();

    res.status(201).json({ 
      success: true, 
      message: "User registered successfully" 
    });

  } catch (err) {
    console.error("Registration error:", err);  
    res.status(500).json({ 
      success: false,
      message: "Registration failed", 
      error: err.message 
    });
  }
};



const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: err.message,
    });
  }
};



const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error",
      error: error.message 
    });
  }
};



const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email could not be sent"
      });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour

    await user.save();

    const resetUrl = `${req.protocol}://${req.get("host")}/resetpassword/${resetToken}`;

    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please go to this link to reset your password:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      <p>This link will expire in 1 hour.</p>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({
        success: true,
        message: "Email sent"
      });

    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      return res.status(500).json({
        success: false,
        message: "Email could not be sent"
      });
    }

  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message
    });
  }
};

const resetPassword = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token"
      });
    }

    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      message: "Password updated successfully"
    });

  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const updatedFields = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      updatedFields,
      {
        new: true,          
        runValidators: true 
      }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user
    });

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};



export { 
  register,
  login,
  getUserProfile,
  forgotPassword,
  resetPassword,
  updateUser
};
