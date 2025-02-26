'use client';
import { useState } from "react";

interface DayProps {
  date: number;
}

export const Day = ({ date }: DayProps) => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="relative p-1">
      <div
        className={`w-12 h-14 relative cursor-pointer overflow-hidden
          flex items-center justify-center transition-all duration-300`}
        style={{
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          background: isOn 
            ? "linear-gradient(145deg, #b45309 0%, #854d0e 100%)"
            : "linear-gradient(145deg, #92400e 0%, #78350f 100%)",
          boxShadow: isOn 
            ? "inset 0 0 15px rgba(0,0,0,0.6), inset 0 0 5px rgba(251, 191, 36, 0.5)"
            : "inset 0 0 10px rgba(0,0,0,0.8)"
        }}
        onClick={() => setIsOn(!isOn)}
      >
        {/* Inner border */}
        <div 
          className="absolute inset-[2px] z-0"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            background: isOn
              ? "linear-gradient(145deg, #fbbf24 0%, #d97706 100%)"
              : "linear-gradient(145deg, #b45309 0%, #92400e 100%)",
            filter: "brightness(0.9)"
          }}
        />

        {/* Edge highlight */}
        <div 
          className="absolute inset-0 z-1"
          style={{
            background: "linear-gradient(145deg, rgba(251, 191, 36, 0.4) 0%, transparent 40%, transparent 60%, rgba(251, 191, 36, 0.4) 100%)",
            opacity: isOn ? 0.6 : 0.3
          }}
        />

        {/* Number */}
        <span 
          className={`relative z-10 font-bold text-xl
            transition-all duration-300`}
          style={{
            color: isOn ? "#fef3c7" : "#fbbf24",
            textShadow: isOn 
              ? "0 0 10px rgba(251, 191, 36, 0.8), 0 1px 2px rgba(0,0,0,0.8)"
              : "0 1px 2px rgba(0,0,0,0.8)",
            filter: isOn ? "brightness(1.2)" : "brightness(0.9)"
          }}
        >
          {date}
        </span>

        {/* Engraved effect */}
        <div 
          className="absolute inset-0 z-2"
          style={{
            background: "radial-gradient(circle at 30% 30%, transparent 0%, rgba(0,0,0,0.3) 100%)",
            opacity: 0.4
          }}
        />
      </div>
    </div>
  );
};
