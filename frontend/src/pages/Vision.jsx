import React from "react";
import conference from "../assets/conference.png";
import { useNavigate } from "react-router-dom";
import Committee from "./Committee";

export default function Vision() {
  const navigate = useNavigate(); // Hook for navigation

  const goToDonate = () => {
    navigate("/donate"); // Navigates to the donate page
  };
  return (
    <div className="flex flex-col items-center justify-center p-10 mb-20 space-y-12">
      {/* First Section: Two Groups of Text + Image */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl bg-white p-8 gap-8 rounded-lg">
        {/* Left Column: Text Groups */}
        <div className="flex flex-col space-y-6 md:w-2/3">
          {/* First Text Group */}
          <div>
            <h3 className="text-sm uppercase font-bold text-black">
              Mission Statement
            </h3>
            <p className="text-black text-justify">
              "We provide a professional and efficient workforce that is
              merit-based, accountable, and responsive to the citizens and other
              stakeholders"
            </p>
          </div>

          {/* Second Text Group */}
          <div>
            <h3 className="text-sm uppercase font-bold text-black">
              Our Vision
            </h3>
            <p className="text-black text-justify">
              "To lead a world-class service for accelerated national
              development"
            </p>
          </div>
        </div>

        {/* Right Column: Image Section */}
        <div className="md:w-1/3">
          <img
            src={conference}
            alt="Our Goals"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Centered Text Below */}
      <Committee />

      {/* Black to Ash Gradient Section */}
      <div className="w-full max-w-6xl p-8 rounded-lg bg-gradient-to-r from-black to-gray-700 text-white flex flex-col md:flex-row items-center justify-between">
        {/* Large Text */}
        <h3 className="text-5xl font-semibold text-center md:text-left">
          Ready to work for us?
        </h3>

        {/* Button with Arrow */}
        <button
          onClick={goToDonate}
          className="mt-4 md:mt-0 flex items-center gap-2 bg-white text-black px-6 py-3 rounded-3xl hover:bg-green-600 transition"
        >
          Donate <span className="text-xl text-black">➜</span>
        </button>
      </div>
    </div>
  );
}
