import React, { useEffect, useState } from "react";
import CountdownTimer from "../components/CountdownTimer";
import About from "./About";
import Objectives from "./Objectives";
import Vision from "./Vision";
import Donations from "./Donations";
import Committee from "./Committee";
import Faq from "./Faq";
import Map from "./Map";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Home() {
  const images = ["/hero4.png", "/hero2.png", "/hero3.png"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // Hook for navigation

  const goToRegister = () => {
    navigate("/register"); // Navigates to the register page
  };
  const goToDonate = () => {
    navigate("/donate"); // Navigates to the donate page
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <main className="min-h-screen flex flex-col bg-green-700 text-black text-sm sm:text-base">
      <div className="bg-white text-black">
        {/* Navbar */}
        {/* <Navbar /> */}
        {/* Image Slider */}
        <div
          className="relative w-full h-[400px] sm: h-[700px] md:h-[500px] transition-all duration-500"
          style={{
            backgroundImage: `url(${images[currentIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Green Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/40 to-green-900"></div>
          {/* Centered Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 gap-1">
            <h1 className="text-2xl text-center pt-32 mt-20 sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              International Civil Service Conference
            </h1>
            <div className="flex flex-col text-base text-center font-semibold mx-auto max-w-md md:max-w-lg lg:max-w-xl">
              Nigeria will host the maiden edition of an international Civil
              Service Conference from Wednesday, 25 to Friday, 27 June 2025 in
              Abuja, a significant event that aims to strengthen the capacity
              and effectiveness of the public sector through global dialogue and
              collaboration.
            </div>

            {/* Buttons */}
            <div className="mt-6 flex space-x-4">
              <button
                onClick={goToRegister}
                className="bg-white text-slate-600 hover:bg-gray-200 px-6 py-2 rounded-lg font-semibold"
              >
                Register Now
              </button>
              <button
                onClick={goToDonate}
                className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg text-white font-semibold"
              >
                Donate
              </button>
            </div>
            <div
              className="mt-4 md:mt-0 md:ml-auto flex items-center justify-center
     text-white text-xl font-bold px-6 py-3 rounded-lg"
            >
              <CountdownTimer />
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setCurrentIndex(index)}
              ></button>
            ))}
          </div>
        </div>
        <About />
        <Objectives />
        <Vision />
        <Donations />
        <Faq />
        <Map />
        <Footer />
        <div className="bg-blue-950 text-white text-center flex items-center justify-center px-4 py-6 md:py-8">
          <p className="text-sm md:text-sm lg:text-sm">
            &copy; 2025 International Civil Service Conference. All rights
            reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
