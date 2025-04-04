import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import CoArmLogo from "../assets/CoArmLogo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get the current URL path

  return (
    <div className="bg-white text-black fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        {/* Logo & Title */}
        <div className="flex items-center space-x-2">
          <img src={CoArmLogo} alt="Logo" className="w-10 h-10" />
          <div className="flex flex-col leading-tight text-sm font-bold">
            <span className="text-sm text-red-600">THE PRESIDENCY</span>
            <span>OFFICE OF THE HEAD OF THE CIVIL</span>
            <span>SERVICE OF THE FEDERATION</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-10">
          <Link
            to="/"
            className={`border-b-2 transition duration-300 ${
              location.pathname === "/"
                ? "text-green-500 border-green-500"
                : "border-transparent hover:text-green-500 hover:border-green-500"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`border-b-2 transition duration-300 ${
              location.pathname === "/about"
                ? "text-green-500 border-green-500"
                : "border-transparent hover:text-green-500 hover:border-green-500"
            }`}
          >
            About
          </Link>
          <Link
            to="/welcome"
            className={`border-b-2 transition duration-300 ${
              location.pathname === "/welcome"
                ? "text-green-500 border-green-500"
                : "border-transparent hover:text-green-500 hover:border-green-500"
            }`}
          >
            Register
          </Link>
          <Link
            to="/login"
            className={`border-b-2 transition duration-300 ${
              location.pathname === "/login"
                ? "text-green-500 border-green-500"
                : "border-transparent hover:text-green-500 hover:border-green-500"
            }`}
          >
            Login
          </Link>
          <Link
            to="/faqs"
            className={`border-b-2 transition duration-300 ${
              location.pathname === "/faqs"
                ? "text-green-500 border-green-500"
                : "border-transparent hover:text-green-500 hover:border-green-500"
            }`}
          >
            FAQs
          </Link>
          <Link
            to="/donate"
            className={`border-b-2 transition duration-300 ${
              location.pathname === "/donate"
                ? "text-green-500 border-green-500"
                : "border-transparent hover:text-green-500 hover:border-green-500"
            }`}
          >
            Donate
          </Link>
          <Link
            to="/committee"
            className={`border-b-2 transition duration-300 ${
              location.pathname === "/committee"
                ? "text-green-500 border-green-500"
                : "border-transparent hover:text-green-500 hover:border-green-500"
            }`}
          >
            Contact us
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-white w-full px-6 py-4 space-y-4 transition-all duration-300">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className={`block text-lg w-full text-center py-2 border-b border-gray-200 ${
              location.pathname === "/"
                ? "text-green-500 font-bold"
                : "hover:text-green-500"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className={`block text-lg w-full text-center py-2 border-b border-gray-200 ${
              location.pathname === "/about"
                ? "text-green-500 font-bold"
                : "hover:text-green-500"
            }`}
          >
            About
          </Link>
          <Link
            to="/register"
            onClick={() => setIsOpen(false)}
            className={`block text-lg w-full text-center py-2 border-b border-gray-200 ${
              location.pathname === "/register"
                ? "text-green-500 font-bold"
                : "hover:text-green-500"
            }`}
          >
            Register
          </Link>
          <Link
            to="/faqs"
            onClick={() => setIsOpen(false)}
            className={`block text-lg w-full text-center py-2 border-b border-gray-200 ${
              location.pathname === "/faqs"
                ? "text-green-500 font-bold"
                : "hover:text-green-500"
            }`}
          >
            FAQs
          </Link>
          <Link
            to="/donate"
            onClick={() => setIsOpen(false)}
            className={`block text-lg w-full text-center py-2 border-b border-gray-200 ${
              location.pathname === "/donate"
                ? "text-green-500 font-bold"
                : "hover:text-green-500"
            }`}
          >
            Donate
          </Link>
          <Link
            to="/committee"
            onClick={() => setIsOpen(false)}
            className={`block text-lg w-full text-center py-2 border-b border-gray-200 ${
              location.pathname === "/committee"
                ? "text-green-500 font-bold"
                : "hover:text-green-500"
            }`}
          >
            Contact us
          </Link>
        </div>
      )}
    </div>
  );
}
