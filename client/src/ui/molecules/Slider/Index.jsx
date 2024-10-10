import React from "react";
import "../../../assets/css/Slider.css";
import InputLabel from "../../atoms/InputLabel/Index";

const formatValue = (val, max) => {
  if (val === max) {
    return "100M";
  } else if (val >= 1000) {
    return `${Math.floor(val / 1000)}k`;
  }
  return val;
};

const Slider = ({
  value,
  onChange,
  min = 0,
  max = 100000000,
  label = "Number of Followers",
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="my-6">
      <div className="grid grid-cols-2 gap-4">
        <InputLabel required label={label} id="followers" />
      </div>
      <input
        type="range"
        name="followers"
        id="followers"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className="slider"
        style={{
          background: `linear-gradient(to right, #FFD065 ${percentage}%, #e5e5e5 ${percentage}%)`,
        }}
      />
      <div className="flex justify-between text-sm">
        <span>{formatValue(min, max)}</span>
        <span>{formatValue(value, max)}</span>
        <span>{formatValue(max, max)}</span>
      </div>
    </div>
  );
};

export default Slider;
