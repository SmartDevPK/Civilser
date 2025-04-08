import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    levelPosition: "",
    mobileNumber: "",
    gender: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Form validation
  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your full name"); 
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return false;
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.password) {
      toast.error("Please enter a password");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    if (!formData.registrationCode) {
      toast.error("Please enter your registration code");
      return false;
    }
    if (!formData.levelPosition) {
      toast.error("Please enter your level/position");
      return false;
    }
    if (!formData.mobileNumber) {
      toast.error("Please enter your mobile number");
      return false;
    }
    if (!formData.gender) {
      toast.error("Please select your gender");
      return false;
    }
    return true;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

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
        toast.success("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      
      if (error.response) {
        // Server responded with a status code outside 2xx range
        toast.error(error.response.data.message || "Registration failed. Please try again.");
      } else if (error.request) {
        // Request was made but no response received
        toast.error("No response from server. Please check your connection.");
      } else {
        // Something happened in setting up the request
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
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
      {/* Toast Container */}
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
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
                />
              </div>

              {/* Level/Position */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">
                  Level/Position <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="levelPosition"
                  placeholder="Enter your level"
                  className="w-full px-4 py-2 border bg-green-50 rounded-md focus:outline-none focus:border-green-500"
                  value={formData.levelPosition}
                  onChange={handleInputChange}
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
                  placeholder="Enter your password (min 6 characters)" 
                  className="w-full px-4 py-2 border bg-green-50 rounded-md focus:outline-none focus:border-green-500"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`mt-6 w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-300 ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}