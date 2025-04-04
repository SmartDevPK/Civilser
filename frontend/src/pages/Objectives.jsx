import React from "react";

const objectives = [
  {
    title: "Enhancing Public Sector Efficiency",
    text: `To explore strategies for improving service delivery, transparency, 
    and efficiency within the Nigerian civil service through policy reforms and innovation`,
    color: "bg-slate-600",
  }, // Default black
  {
    title: "Digital Transformation in Governance",
    text: `To discuss the role of technology in modernization public administration, 
    e-governance, and the adoption of digital solutions for effective governance.`,
    color: "bg-black",
  }, // Default black
  {
    title: "Capacity Building and Workforce Development",
    text: `To provide training and knowledge-sharing sessions that equip civil servants 
    with the skills needed for improved performance and leadership`,
    color: "bg-black",
  }, // black
  {
    title: "Strengthening Public-Private Partnerships (PPPs)",
    text: `To provide training and knowledge-sharing sessions that equip civil servants 
    with the skills needed for improved performance and leadership`,
    color: "bg-slate-600",
  }, // Default ash
];

export default function Objectives() {
  return (
    <div className="bg-green-600 text-white py-12 px-6 md:px-20 text-center">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-8">Objectives</h2>

      {/* Boxes Container */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        {objectives.map((obj, index) => (
          <div
            key={index}
            className="w-full md:w-1/5 flex flex-col items-center"
          >
            <div
              className={`${obj.color} text-white text-sm font-semibold py-2 px-4 w-full rounded-t-lg`}
            >
              {obj.title}
            </div>
            <div className="bg-white text-black text-base py-6 px-4 w-full rounded-b-lg shadow-lg text-left">
              {obj.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
