import React from "react"
import { Cn } from "../../../utils/twCn"

const Button = ({
  className,
  children,
  borderRadius = "rounded-md", // Default value if not provided
  width = "w-auto", // Default value if not provided
  ...props
}) => {
  return (
    <button
      className={Cn(
        `${borderRadius} ${width} inline-block outline-none px-6 py-2 bg-bright-yellow  border border-overlay-light text-[18px] font-[500]`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
