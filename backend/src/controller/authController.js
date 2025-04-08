import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

dotenv.config();

// Utility Functions
const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
  return regex.test(password);
};

// Auth Controllers
const register = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      gender, 
      registrationCode, 
      levelPosition, 
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
      levelPosition, 
      mobileNumber, 
      password: hashedPassword 
    });

    await user.save();

    res.status(201).json({ 
      success: true, 
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
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

    if (!user.password) {
      return res.status(500).json({
        success: false,
        message: "User password is not set. Please contact support.",
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

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If registered, you'll get a reset link",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save({ validateBeforeSave: false });

    const resetLink = `http://localhost:5173/resetpassword/${resetToken}`;

    const message = `You requested a password reset. Please use the link below:\n\n${resetLink}\n\nLink expires in 10 minutes`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Password Reset Request",
        message,
      });

      res.status(200).json({
        success: true,
        message: "Password reset link sent to your email",
      });
    } catch (emailError) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      console.error("Email sending error:", emailError);
      res.status(500).json({
        success: false,
        message: "Failed to send password reset email. Please try again later.",
      });
    }

  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({
      success: false,
      message: "Server error during password reset request",
    });
  }
};


const resetPassword = async (req, res) => {
  try {
    const { token } = req.params; // Reset token from URL
    const { password } = req.body; // New password from request body

    console.log('Reset token received:', token);

    // Hash the token to match the stored hashed token in the database
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user with the matching reset token and ensure the token hasn't expired
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // If no user is found or the token is expired, return an error
    if (!user) {
      console.log('Token is invalid or has expired');
      return res.status(400).json({
        success: false,
        message: 'Token is invalid or has expired.',
      });
    }

    // Validate the new password (make sure to implement validatePassword function)
    if (!validatePassword(password)) {
      return res.status(400).json({
        success: false,
        message: 'Please choose a stronger password. Try a mix of letters, numbers, and symbols.',
      });
    }

    // Hash the new password and save it
    const saltRounds = 10;
    user.password = await bcrypt.hash(password, saltRounds);

    // Clear the reset token and expiry after successful password reset
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    // Save the updated user data
    await user.save();

    // Send success response
    return res.status(200).json({
      success: true,
      message: 'Password reset successful.',
    });
  } catch (err) {
    console.error('Error during password reset:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error during password reset.',
    });
  }
};



// User Profile Controllers
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