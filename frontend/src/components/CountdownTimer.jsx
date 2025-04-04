import React, { useState, useEffect } from "react";

export default function CountdownTimer() {
  const initialTime = 60 * 24 * 60 * 60; // 60 days in seconds
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Convert timeLeft into days, hours, minutes, seconds
  const days = Math.floor(timeLeft / (24 * 60 * 60));
  const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60);

  return (
    <div className="mt-4 md:mt-0 md:ml-auto flex items-center justify-center bg-black/50 text-white text-xl font-bold px-6 py-3 rounded-lg">
      <div className="flex items-center">
        {/* Days */}
        <div className="flex flex-col items-center">
          <span className="text-3xl">{days}</span>
          <span className="text-xs mt-1 text-slate-400">Days</span>
        </div>

        {/* Colon (Aligned with Numbers) */}
        <span className="text-3xl mx-2 flex items-center">:</span>

        {/* Hours */}
        <div className="flex flex-col items-center">
          <span className="text-3xl">{hours}</span>
          <span className="text-xs mt-1 text-slate-400">Hours</span>
        </div>

        {/* Colon (Aligned with Numbers) */}
        <span className="text-3xl mx-2 flex items-center">:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <span className="text-3xl">{minutes}</span>
          <span className="text-xs mt-1 text-slate-400">Minutes</span>
        </div>
      </div>
    </div>
  );
}
