import React from "react"
import Heading from "../../atoms/Typography/Heading/Index"
import Content from "../../atoms/Typography/Content/Index"

const CampaignCard = ({
  title,
  value,
  percentage,
  commission,
  description,
  targetIncome,
  bgColor = "bg-white",
  cardWidth = "w-80",
  cardHeight = "h-auto"
}) => {
  return (
    <div
      className={`border rounded-lg p-6 ${bgColor} ${cardWidth} ${cardHeight} shadow-lg`}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      <div className="flex items-baseline">
        <Heading className="text-4xl font-bold">{value}</Heading>
        <span className="ml-2 text-lg font-semibold text-black">
          {percentage}
        </span>
      </div>

      <p className="font-bold mt-2">{commission}</p>
      <Content className="text-gray-500 mt-2">{description}</Content>
      <p className="text-gray-700 mt-4">
        Campaign to hit target income: {targetIncome}
      </p>
    </div>
  )
}

export default CampaignCard
