import React from "react";
import { Field } from "formik";

const InputField = ({ name, type, required, className, helperText }) => {
  return (
    <>
      <Field
        helperText="Please enter a valid email address"
        name={name}
        type={type}
        required={required}
        className={`w-full h-[50px] p-2 border bg-[#F5F5F5] border-[#DBDBDB] ${className}`}
      />
      {helperText && (
        <div className="text-[16] font-[500] text-[#969696] mt-2">{helperText}</div>
      )}
    </>
  );
};

export default InputField;
