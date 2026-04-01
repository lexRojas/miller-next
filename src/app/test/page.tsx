'use client'
import React, { useState } from "react";

const ToggleButton: React.FC = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn((prevState) => !prevState);
  };

  return (
    <div
      className={`relative inline-block w-12 h-6 rounded-full cursor-pointer transition-all duration-300 ${
        isOn ? "bg-blue-500" : "bg-gray-400"
      }`}
      onClick={handleToggle}
    >
      <div
        className={`absolute w-6 h-6 bg-white rounded-full transition-all duration-300 transform ${
          isOn ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </div>
  );
};

export default ToggleButton;
