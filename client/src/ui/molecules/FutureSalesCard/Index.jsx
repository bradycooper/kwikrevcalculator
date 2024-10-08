import React from "react"
import Heading from "../../atoms/Typography/Heading/Index"
import Content from "../../atoms/Typography/Content/Index"

const FutureSalesCard = ({ title, value, bgColor = "bg-white" }) => {
  return (
    <div
      className={`w-[273px] h-[217px] p-6 border border-gray-300 rounded-lg shadow-md flex flex-col justify-center items-center ${bgColor}`}
    >
      <Content className="text-content text-gray-600">{title}</Content>
      <Heading className="text-4xl font-bold mt-4">{value}</Heading>
    </div>
  )
}

export default FutureSalesCard
