import React from "react"
import EarningsCard from "../EraningsCard/Index"

const EarningsOverview = () => (
  <div className="flex items-center justify-center space-x-4">
    <EarningsCard
      label="Estimated Earning Total + 1060%"
      value="$4.64"
      labelClass="bg-green-100 text-green-700"
      borderClass="border-green-300"
    />
    <div className="h-12 border-l border-gray-300"></div>
    <EarningsCard
      label="Current Earning"
      value="$0.4"
      labelClass="bg-red-100 text-red-700"
      borderClass="border-red-300"
    />
  </div>
)

export default EarningsOverview
