import React from "react"
import { Cn } from "../../../../utils/twCn"

const Subtitle = React.forwardRef(({ children, className }, ref) => {
  return (
    <h1 ref={ref} className={Cn("text-subtitle", className)}>
      {children}
    </h1>
  )
})

export default Subtitle
