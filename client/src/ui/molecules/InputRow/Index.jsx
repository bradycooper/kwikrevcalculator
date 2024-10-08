import React from "react"
import InputField from "../../atoms/InputField/Index"

const InputRow = ({ inputs }) => {
  return (
    <div className="flex space-x-4">
      {inputs.map(input => (
        <InputField
          key={input.id}
          id={input.id}
          label={input.label}
          name={input.id}
          value={input.value}
          onChange={input.onChange}
          type={input.type || "text"}
          placeholder={input.placeholder}
          className="w-full"
        />
      ))}
    </div>
  )
}

export default InputRow
