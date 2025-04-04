import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  registrationCode: { type: String, required: true },
  levelPostion: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  password: { type: String, required: false }, 
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// Export Model
export default User;
