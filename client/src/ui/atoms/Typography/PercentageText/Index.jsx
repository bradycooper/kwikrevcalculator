// src/ui/atoms/Typography/PercentageText/Index.tsx
import React from "react"
import { Cn } from "../../../../utils/twCn"

const PercentageText = ({ className, children }) => {
  return (
    <p className={Cn("text-green-500 font-semibold", className)}>{children}</p>
  )
}

export default PercentageText
