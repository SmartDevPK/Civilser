import React from "react";
import food from "../assets/food1.jpg";
import print from "../assets/print1.jpg";
import media from "../assets/camera1.jpg";
import usher from "../assets/usher1.jpg";

export default function Donations() {
  // Sample donation categories
  const donationItems = [
    { title: "Food", image: food },
    { title: "print", image: print },
    { title: "Media", image: media },
    { title: "Staff/Ushers", image: usher },
    { title: "Music", image: media },
    { title: "Crafts", image: print },
  ];

  return (
    <div className="bg-green-600 text-white flex flex-col items-center p-8 min-h-screen">
      {/* Title Section */}
      <h2 className="text-2xl font-bold">Donations</h2>
      <p className="text-center max-w-lg text-sm text-gray-200 mt-2">
        Your generous donations help support various creative and sports
        initiatives. Select a category below to contribute.
      </p>

      {/* Taskbar Buttons */}
      <div className="flex flex-wrap justify-center gap-4 w-full max-w-4xl mt-4">
        {["Art", "Sport", "Photography", "Pattern"].map((category, index) => (
          <button
            key={index}
            className="bg-white text-green-600 w-40 py-2 text-sm rounded-2xl font-medium hover:bg-green-500 hover:text-white transition"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Donation Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 w-full max-w-5xl">
        {donationItems.map((item, index) => (
          <div
            key={index}
            className="bg-white text-black p-4 rounded-lg flex flex-col items-center shadow-md"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <p className="mt-2 font-semibold">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
