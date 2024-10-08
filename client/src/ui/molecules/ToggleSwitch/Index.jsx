import React from "react";

const ToggleSwitch = ({ checked, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.checked);
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={handleChange} 
        className="sr-only peer" 
      />
      <div className={`w-12 h-7 bg-gray-200 rounded-full p-1 transition-colors duration-300 ${checked ? 'bg-yellow-400' : 'bg-gray-300'}`}>
        <div
          className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${checked ? 'translate-x-5' : ''}`}
        ></div>
      </div>
      <span className="ml-2 text-sm font-medium text-gray-900">{checked ? 'Switch to Brand' : 'Switch to Influencers'}</span>
    </label>
  );
};

export default ToggleSwitch;