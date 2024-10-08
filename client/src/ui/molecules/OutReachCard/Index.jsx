import React from "react"

const OutreachCard = ({ outreach, range, bulletPoints, bgColor }) => {
  return (
    <div
      className={`p-6 rounded-lg ${bgColor} shadow-lg w-64 h-[250px] flex flex-col justify-between`}
    >
      {" "}
      {/* Set height and ensure even distribution */}
      <p className="text-xl font-semibold mb-2">{outreach}</p>
      <h2 className="text-2xl font-bold mb-4">{range}</h2>
      <ul className="text-sm space-y-2">
        {bulletPoints.map((point, index) => (
          <li key={index} className="text-black">
            • {point}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default OutreachCard
