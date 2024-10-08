import React from "react"
import Heading from "../../atoms/Typography/Heading/Index"

const EarningsCard = ({
  label,
  value,
  labelClass,
  valueClass = "text-4xl font-bold",
  borderClass = "border-gray-300"
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`border ${borderClass} w-[300px] px-4 py-1 flex justify-center`}
      >
        <p className={`bg-white px-2 ${labelClass}`}>{label}</p>
      </div>
      <Heading className={`mt-4 ${valueClass}`}>{value}</Heading>
    </div>
  )
}

export default EarningsCard
