import React from "react"

const InputLabel = ({ required, label, id }) => {
  return (
    <label
      htmlFor={id}
      className="font-[400] text-[12px] flex gap-2 items-center"
    >
      <span className="inline-block">
        {label} {required && "*"}
      </span>
      <span className="inline-block border-b bg-grey grow shrink-0"></span>
    </label>
  )
}

export default InputLabel
