import React, { useState } from "react";
import {
  FaUser,
  FaBook,
  FaPhone,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa"; // Import icons
import CoArmLogo from "../assets/CoArmLogo.png";
import WelcomePic from "../assets/WelcomePic.png"; // Replace with your actual image
import { useNavigate } from "react-router-dom";

export default function WelcomeSection() {
  const navigate = useNavigate(); // Hook for navigation

  const [selectedButton, setSelectedButton] = useState(null);

  const options = [
    { icon: <FaUser />, text: "Participant", path: "/register" },
    { icon: <FaBook />, text: "Booth Space", path: "/boothserviceregister" },
    { icon: <FaPhone />, text: "Others", path: "/register" },
  ];

  // Handle button click
  const handleButtonClick = (index) => {
    setSelectedButton(index);
  };

  // Navigate when Get Started is clicked
  const goToRegistrationSuccess = () => {
    if (selectedButton !== null) {
      navigate(options[selectedButton].path);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      {/* Left Side - Image (Hidden on small screens) */}
      <div className="w-full md:w-2/3 relative hidden md:block">
        {/* Image */}
        <img
          src={WelcomePic}
          alt="Welcome"
          className="w-full h-full object-cover"
        />

        {/* Green Gradient Overlay (Less Intense at the Top, Stronger at the Bottom) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/20 to-green-700/80"></div>
      </div>

      {/* Right Side - Content */}
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center px-6 md:px-10 bg-white py-12 md:py-0">
        {/* Logo (Centered) */}
        <img
          src={CoArmLogo}
          alt="Logo"
          className="w-20 md:w-24 h-20 md:h-24 mb-4"
        />

        {/* Welcome Text */}
        <h2 className="text-xl text-center md:text-left w-full mt-2 text-black font-bold">
          Welcome!
        </h2>
        <p className="text-gray-600 text-center md:text-left w-full mt-2">
          Choose who you are.
        </p>

        {/* Buttons Section */}
        <div className="w-full mt-6 flex flex-col space-y-3">
          {options.map((item, index) => (
            <button
              key={index}
              className="relative flex items-center w-full"
              onClick={() => handleButtonClick(index)}
            >
              <div
                className={`flex items-center justify-between bg-white text-gray-700 w-full py-2 px-5 md:py-3 rounded-lg border hover:border-green-500 transition ${
                  selectedButton === index
                    ? "bg-green-100 border-green-500"
                    : ""
                }`}
              >
                <div className="flex items-center">
                  <span
                    className={`mr-2 ${
                      selectedButton === index
                        ? "text-green-600"
                        : "text-green-500"
                    }`}
                  >
                    {item.icon}
                  </span>
                  {item.text}
                </div>

                {/* Green Tick Indicator */}
                {selectedButton === index && (
                  <span className="text-green-600">
                    <FaCheckCircle />
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Get Started Button */}
        <button
          onClick={goToRegistrationSuccess}
          className="mt-6 flex items-center justify-center w-full bg-green-600 text-white py-2 md:py-3 rounded-lg hover:bg-green-700 transition"
          disabled={selectedButton === null} // Disable if no selection
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
