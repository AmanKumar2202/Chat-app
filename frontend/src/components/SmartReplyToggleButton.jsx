import React, { useState } from "react";

const SmartReplyToggleButton = ({ label = "Toggle", enabled, onToggle }) => {

  const handleToggle = () => {
    onToggle?.(!enabled); // preferred prop
    // onChange?.(newState); // optional compatibility
  };
  return (
    <div className="flex items-center justify-between w-full max-w-md p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700">
      <span className="text-base font-medium text-gray-800 dark:text-gray-200">{label}</span>
      
      <button
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
          enabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

export default SmartReplyToggleButton;
