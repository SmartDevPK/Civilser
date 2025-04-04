import React from "react";
import CoArmLogo from "../assets/CoArmLogo.png";
import RegisterPic from "../assets/RegisterPic.png"; // Replace with your actual image
import { useNavigate } from "react-router-dom";

export default function BoothServiceRegister() {
  const navigate = useNavigate(); // Hook for navigation

  //   const goToWelcome = () => {
  //     navigate("/welcome"); // Navigates to the welcome page
  //   };
  const goToRegistrationSuccess = () => {
    navigate("/registrationsuccess"); // Navigates to the welcome page
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      {/* Left Side - Image (Less than half the screen) */}
      <div className="w-2/5 relative hidden md:block h-full">
        <img
          src={RegisterPic}
          alt="Register"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Green Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-800/80"></div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full md:w-3/5 flex flex-col items-center justify-center px-6 pt-32 mt-12 md:px-12 mt-36 bg-white py-12 md:py-0">
        {/* Logo and "Register Now!" */}
        <div className="flex items-center space-x-3 mb-4">
          <img src={CoArmLogo} alt="Logo" className="w-10 h-10" />
          <h2 className="text-2xl font-bold text-green-400">Register Now!</h2>
        </div>

        {/* Small Centered Text */}
        <p className="text-gray-600 text-center w-full max-w-lg mb-4">
          To be a part of the event. Fill the information carefully
        </p>

        {/* Personal Information Title */}
        <h3 className="text-lg font-semibold text-green-500 w-full">
          Personal Information
        </h3>

        {/* Form Fields */}
        <form className="w-full max-w-lg mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-gray-700 font-medium">
                Full name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border rounded-md bg-green-50 focus:outline-none focus:border-green-500"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-gray-700 font-medium">
                Gender <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="select Gender"
                className="w-full px-4 py-2 border bg-green-50 rounded-md focus:outline-none focus:border-green-500"
                required
              />
            </div>

            {/* Email */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-gray-700 font-medium">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border bg-green-50 rounded-md focus:outline-none focus:border-green-500"
                required
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-gray-700 font-medium">
                Booth service <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="Enter registration code"
                className="w-full px-4 py-2 border bg-green-50 rounded-md focus:outline-none focus:border-green-500"
                required
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-gray-700 font-medium">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="Enter mobile number"
                className="w-full px-4 py-2 border bg-green-50 rounded-md focus:outline-none focus:border-green-500"
                required
              />
            </div>
            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border bg-green-50 rounded-md focus:outline-none focus:border-green-500"
                required
              />
            </div>
          </div>

          {/* Register Button */}
          <button
            onClick={goToRegistrationSuccess}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
