import React, { useEffect, useState } from "react";
import InputLabel from "../InputLabel/Index";

const InputField = ({ className, label, id, required, value, onChange, ...props }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e) => {
    setInputValue(e.target.value); // Updates internal state
    onChange(e); // Pass change to parent component
  };

  return (
    <div className="flex flex-col gap-1">
      {label && <InputLabel id={id} label={label} required={required} />}
      <input
        className={`inline-block outline-none bg-grey p-1.5 border border-light-grey ${className}`}
        id={id}
        required={required}
        value={inputValue}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};

export default InputField;