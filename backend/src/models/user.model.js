import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  registrationCode: { type: String, required: true },
  levelPosition: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  password: { type: String, required: false },
  passwordResetToken: String, // Field for storing reset token
  passwordResetExpires: Date, // Field for storing token expiry time
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

export default User;
