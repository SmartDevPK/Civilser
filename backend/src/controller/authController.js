import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"


dotenv.config();

// Password validation function
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

    // Check if email or phone number already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { mobileNumber }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: "Email or phone number already exists" 
      });
    }

    // Validate password strength
    if (!validatePassword(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must be 8-16 characters and include uppercase, lowercase, number, and special character."
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  
    // Create and save new user
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
      error: "Registration failed", 
      message: err.message 
    });
  }
};

const login = async(req, res) => {
  try {
    const {email, password} = req.body;

    //  Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

     //  Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    //  Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Send success response with token
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
}


const getUserProfile = async (req, res) => {
  try {
     // req.user is set by the protect middleware
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
  }


export { register, login, getUserProfile };