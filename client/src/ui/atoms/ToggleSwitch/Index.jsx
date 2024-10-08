import React from "react"

const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer mr-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div
        className={`w-10 h-6 rounded-full transition-colors duration-300 ease-in-out ${
          checked ? "bg-yellow-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ease-in-out ${
            checked ? "translate-x-4" : ""
          }`}
        ></span>
      </div>
    </label>
  )
}

export default ToggleSwitch
