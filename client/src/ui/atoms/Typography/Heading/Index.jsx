import React from "react"
import { Cn } from "../../../../utils/twCn"

const Heading = ({ className, children }) => {
  return (
    <h2 className={Cn("text-heading font-geologica", className)}>{children}</h2>
  )
}

export default Heading
