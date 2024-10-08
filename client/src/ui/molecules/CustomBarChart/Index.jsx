import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"

// Sample data based on your design
const data = [
  { name: "Customer Retention", Waves: 23243, Dividends: 23243 },
  {
    name: "Customer Referrals",
    Waves: 23243,
    Dividends: 100000,
    Bonuses: 12432,
    YourBrand: 45343
  },
  { name: "Social Partnerships", Waves: 23243 },
  {
    name: "Everything",
    Waves: 23243,
    Dividends: 23243,
    Bonuses: 12432,
    YourBrand: 45343
  }
]

// Colors for each data stack
const COLORS = {
  Waves: "#4896FE",
  Dividends: "#16C8C7",
  Bonuses: "#68E9E9",
  YourBrand: "#477FCE"
}

const CustomBarChart = () => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Chart Legend */}
      <div className="flex justify-end space-x-6 mb-8 mt-10 mr-20">
        {Object.entries(COLORS).map(([label, color]) => (
          <div key={label} className="flex items-center space-x-2">
            <div className={`w-4 h-4`} style={{ backgroundColor: color }} />
            <span className="text-sm" style={{ color: "#BCBCBC" }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 50, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Waves" stackId="a" fill={COLORS.Waves} />
          <Bar dataKey="Dividends" stackId="a" fill={COLORS.Dividends} />
          <Bar dataKey="Bonuses" stackId="a" fill={COLORS.Bonuses} />
          <Bar dataKey="YourBrand" stackId="a" fill={COLORS.YourBrand} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart
