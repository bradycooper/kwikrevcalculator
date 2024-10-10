import React from "react";

const InputLabel = ({ required, label, id }) => {
  return (
    <label
      htmlFor={id}
      className="font-[600] text-[14px] text-light-grey flex gap-2 items-center pr-1 mb-2"
    >
      <span className="flex-shrink-0 pr-1">
        {label} {required && "*"}
      </span>
      <span className="flex-grow border-t border-[#E8E8E8]" />
    </label>
  );
};

export default InputLabel;
