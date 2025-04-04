import React from "react";
import profile1 from "../assets/profile1bg.png";
import profile2 from "../assets/profile2bg.png";
import profile3 from "../assets/profile3bg.png";
import profile4 from "../assets/profile4bg.png";
import profile5 from "../assets/profile5bg.png";

// Sample committee members
const committeeMembers = [
  {
    name: "Obi Oluwaore",
    position: "Chairman",
    image: profile1,
    isHead: true, // Head of the committee
  },
  {
    name: "Olayemi Grace",
    position: "Vice Chairman",
    image: profile2,
    isHead: false,
  },
  {
    name: "Ogbonna Johnson",
    position: "Secretary",
    image: profile3,
    isHead: false,
  },
  {
    name: "Kazeem Wajud",
    position: "Treasurer",
    image: profile4,
    isHead: false,
  },
  {
    name: "Bassey Daniel",
    position: "Coordinator",
    image: profile5,
    isHead: false,
  },
];

export default function Committee() {
  return (
    <div className="flex flex-col items-center w-full px-6 md:px-16 py-12">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
        Organizing Committee
      </h2>

      {/* Subtitle */}
      <p className="text-gray-600 text-center mt-2 max-w-lg">
        We have set up a team of professionals to handle all that has to do with
        the conference, they will assist, control and coordinate the event
        procedures
      </p>

      {/* Committee Members Section */}
      <div className="relative flex flex-wrap justify-center items-center mt-10 gap-4 md:gap-8">
        {/* Left Members */}
        <div className="flex space-x-[-15px] gap-10 md:space-x-[-25px] flex-wrap justify-center">
          {committeeMembers.slice(1, 3).map((member, index) => (
            <div key={index} className="relative z-10 text-center mb-4 md:mb-8">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white bg-gray-300 flex items-center justify-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full"
                />
              </div>
              <p className="text-sm font-semibold mt-2">{member.name}</p>
              <p className="text-xs text-gray-500">{member.position}</p>
            </div>
          ))}
        </div>

        {/* Chairman (Middle) */}
        <div className="relative z-20 scale-110 mb-4 md:mb-8">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white bg-orange-300 flex items-center justify-center">
            <img
              src={committeeMembers[0].image}
              alt={committeeMembers[0].name}
              className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-full"
            />
          </div>
          <p className="text-sm font-semibold mt-2">
            {committeeMembers[0].name}
          </p>
          <p className="text-xs text-gray-500">
            {committeeMembers[0].position}
          </p>
        </div>

        {/* Right Members */}
        <div className="flex space-x-[-15px] gap-4 md:space-x-[-25px] flex-wrap justify-center">
          {committeeMembers.slice(3, 5).map((member, index) => (
            <div key={index} className="relative z-10 text-center mb-4 md:mb-8">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white bg-gray-300 flex items-center justify-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full"
                />
              </div>
              <p className="text-sm font-semibold mt-2">{member.name}</p>
              <p className="text-xs text-gray-500">{member.position}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
