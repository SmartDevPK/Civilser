import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Assets
import CoArmLogo from "../assets/CoArmLogo.png";
import RegisterPic from "../assets/RegisterPic.png";

export default function Registration() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    registrationCode: "",
    levelPostion: "",
    mobileNumber: "",
    gender: "",
  });

  const navigate = useNavigate();

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      if (response.data.success) {
        alert("Registration successful!");
        navigate("/login"); // Redirect to login page
      }
    } catch (error) {
      console.error("Full error:", {
        message: error.message,
        response: error.response?.data, 
        request: error.config?.data,  
      });
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      {/* Left Side - Image */}
      <div className="w-full md:w-2/5 relative h-full hidden md:block">
        <img
          src={RegisterPic}
          alt="Register"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-800/80"></div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full md:w-3/5 flex flex-col items-center justify-center px-6 py-12 bg-white">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src={CoArmLogo} alt="Logo" className="w-10 h-10" />
            <h2 className="text-2xl font-bold text-green-400">Register Now!</h2>
          </div>
          <p className="text-gray-600 max-w-lg mb-4">
            To be a part of the event. Fill the information carefully
          </p>
        </div>

        {/* Form Section */}
        <div className="w-full max-w-lg">
          <h3 className="text-lg font-semibold text-green-500 mb-4">
            Personal Information
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Full name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border rounded-md bg-green-50 focus:outline-none focus:border-green-500"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  className="w-full px-4 py-2 border bg-green-50 rounded-md focus:outline-none focus:border-green-500"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Email */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border bg-green-50 rounded-md focus:outline-none focus:border-green-500"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Ministry/Registration Code */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">
                  Ministry <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="registrationCode"
                  placeholder="Enter registration code"
                  className="w-full px-4 py-2 border bg-green-50 rounded-md focus:outline-none focus:border-green-500"
                  value={formData.registrationCode}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Level/Position */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">
                  Level/Position <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="levelPostion"
                  placeholder="Enter your level"
                  className="w-full px-4 py-2 border bg-green-50 rounded-md focus:outline-none focus:border-green-500"
                  value={formData.levelPostion}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Mobile Number */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="mobileNumber"
                  placeholder="Enter mobile number"
                  className="w-full px-4 py-2 border bg-green-50 rounded-md focus:outline-none focus:border-green-500"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password" 
                  className="w-full px-4 py-2 border bg-green-50 rounded-md focus:outline-none focus:border-green-500"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-6 w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-300"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}