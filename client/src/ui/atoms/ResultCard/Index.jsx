import React from "react"
import tickIcon from "../../../assets/images/ok.png" // Adjust the path if necessary

const ResultCard = ({ title, value, vsText }) => {
  return (
    <div className="border border-yellow-400 rounded-lg bg-white p-4 w-full h-28 flex flex-col justify-between">
      <div className="flex items-center mb-2">
        <img src={tickIcon} alt="Tick Icon" className="w-4 h-4 mr-2" />
        <h4 className="text-sm font-medium truncate">{title}</h4>
      </div>

      <p className="text-lg font-bold">{value}</p>

      {vsText && <p className="text-sm text-gray-600 truncate">VS {vsText}</p>}
    </div>
  )
}

export default ResultCard
