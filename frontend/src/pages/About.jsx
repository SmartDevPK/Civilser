import React from "react";
import hocf from "../assets/hocf.png";

export default function About() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-10 space-y-6 md:space-y-0">
      {/* Text Section */}
      <div className="md:w-1/2 text-justify">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          About The Conference
        </h2>
        <p className="text-gray-700 leading-relaxed">
          The Nigerian Civil Service International Conference 2025 is a
          prestigious gathering of policymakers, governemnt officals,, and
          stakeholders aimed at discussing innovations and best pracrtices in
          public administration. Scheduled to take place in ABUJA, Nigeria, the
          conference will focus on reforms, digital transformation, and capacity
          building within the civil service. Key speakers from Nigeria and
          across the globe will share insights on enhancing efficiency and
          governance. Participants will engage in workshops, panel discussions,
          and networking sessions to drive impactful policy changes. The event
          provides a platform for knowledge exchange fostering collaboration
          between the public and private sectors. Registrations and donations
          are open to support the success of this transformative initiative
        </p>
        <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
          Read More
        </button>
      </div>

      {/* Image Section */}
      <div className="md:w-1/3 flex justify-center">
        <img src={hocf} alt="Person" className="h-full object-cover" />
      </div>
    </div>
  );
}
