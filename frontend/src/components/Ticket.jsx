import React from "react";
import QrCode from "../assets/Qr Code.png";
import Barcode from "../assets/barcode2bg.png"; // Ensure this path is correct

export default function Ticket() {
  return (
    <div className="flex justify-center items-center w-full py-10">
      {/* Ticket Container */}
      <div className="bg-green-600 text-white rounded-lg shadow-lg w-full max-w-lg p-6 flex flex-col items-center">
        {/* Conference Title */}
        <h3 className="text-lg font-semibold text-center">
          International Civil Service Conference 2025
        </h3>

        {/* Ticket Section */}
        <div className="bg-green-700 rounded-xl w-full mt-4 px-6 py-6 flex items-center relative">
          {/* Left Side - Pin Code */}
          <div className="flex flex-col flex-1">
            <p className="text-sm">Your pin code is</p>
            <div className="bg-white text-gray-900 text-lg font-bold px-6 py-2 rounded-md mt-1">
              65456548
            </div>
          </div>

          {/* Center - QR Code */}
          <div className="flex-1 flex justify-center">
            <img
              src={QrCode}
              alt="QR Code"
              className="w-24 h-24 object-contain"
            />
          </div>

          {/* Right Side - Barcode */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <div className="w-14 h-24">
              <img
                src={Barcode}
                alt="Barcode"
                className="w-24 h-24 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-sm mt-4 text-center">
          A copy of this is sent to your Email
        </p>
      </div>
    </div>
  );
}
