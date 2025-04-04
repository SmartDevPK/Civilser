import React, { useState } from "react";
import FaqImg from "../assets/FaqImg.png";

export default function Faq() {
  const faqs = [
    {
      question: "Why is digital marketing important for my business?",
      answer: `Digital marketing allows business to reach and engage with 
      a wider audience, generate leads,, drive website traffic, and increase brand visibility.
      It provides measurable results, allows for targeted marketing efforts, and enables businesses
      to adapt and optimize their strategies based on data and insights`,
    },
    {
      question: "How can I register?",
      answer:
        "You can register by clicking on the 'Register' button and following the steps.",
    },
    {
      question: "Is customer support available?",
      answer: "Yes, we offer 24/7 customer support via email and chat.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="bg-white p-8 px-11 mx-11 space-y-12">
      {/* Image Section (Top) */}
      <div className="flex justify-end">
        {/* <img
          src={FaqImg}
          alt="FAQ Section"
          className="w-80 h-auto rounded-lg shadow-md"
        /> */}
      </div>

      {/* FAQ Section (Bottom) */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-8">
        {/* Left - Title */}
        <h2 className="text-8xl font-bold text-gray-800 md:w-1/4">FAQ</h2>

        {/* Right - FAQ List */}
        <div className="md:w-3/4 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b pb-4">
              {/* Question Row */}
              <div className="flex items-center justify-between cursor-pointer">
                <h3 className="text-lg font-semibold text-gray-700">
                  {faq.question}
                </h3>
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="text-2xl font-bold text-gray-600"
                >
                  {openIndex === index ? "−" : "+"}
                </button>
              </div>

              {/* Answer (Only Show When Active) */}
              {openIndex === index && (
                <p className="text-gray-600 mt-2">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
