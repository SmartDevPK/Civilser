import React from "react";
import NigerianCoatOfArms from "../assets/CoArmLogo.png";
import Ticketbg from "../assets/Ticketbg.png";
import Ticket from "../components/Ticket";
import { useNavigate } from "react-router-dom";

export default function RegistrationSuccess() {
  const navigate = useNavigate(); // Hook for navigation

  const goToHome = () => {
    navigate("/"); // Navigates to the welcome page
  };
  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      {/* Left Side - Image */}
      <div className="w-full md:w-2/5 relative hidden md:block">
        <img
          src={Ticketbg}
          alt="Office of the Head of Civil Service"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-700/60 to-transparent"></div>
      </div>

      {/* Right Side - Confirmation Message */}
      <div className="w-full md:w-3/5 flex flex-col items-center justify-center px-6 md:px-12 bg-white py-12 md:py-0">
        {/* Coat of Arms */}
        <img
          src={NigerianCoatOfArms}
          alt="Nigerian Coat of Arms"
          className="w-12 h-12 mb-4"
        />

        {/* Congratulations Message */}
        <h2 className="text-3xl font-bold text-green-700 text-center">
          Congratulations
        </h2>
        <p className="text-gray-600 text-center text-lg">You are Registered</p>
        <p className="text-gray-500 text-center text-sm mb-6">
          to be a part of the event.
        </p>

        {/* Ticket Display */}
        <div className="w-full max-w-md">
          <Ticket />
        </div>

        {/* Done Button */}
        <button
          onClick={goToHome}
          className="mt-6 w-40 bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
        >
          Done
        </button>
      </div>
    </div>
  );
}
