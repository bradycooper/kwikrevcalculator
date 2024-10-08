import React from "react"

const BreakdownSection = () => {
  const data = [
    {
      heading: "Retention",
      items: [
        { label: "Increased Retention Rate", value: "76%" },
        { label: "Decreased CAC", value: "$0" },
        { label: "Increased Profits", value: "$0" }
      ]
    },
    {
      heading: "Referral",
      items: [
        { label: "Increased New Customers", value: "4,800" },
        { label: "Increased Referring Customers", value: "3,700" },
        { label: "Increased Profit", value: "$380,000" },
        { label: "Decreased CAC", value: "60%" }
      ]
    },
    {
      heading: "Social Partnerships",
      items: [
        { label: "New Influencers", value: "1,200" },
        { label: "Product Views", value: "5.6 Million" },
        { label: "CPM", value: "$0.60 VS Facebook CPM $0.25" },
        { label: "Social Partners", value: "76%" },
        { label: "Decreased CAC", value: "76%" }
      ]
    }
  ]

  return (
    <div className="grid grid-cols-3 gap-6 bg-white p-8 shadow-md rounded-lg">
      {data.map((section, index) => (
        <div key={index} className="space-y-4">
          <h3 className="text-lg font-bold">{section.heading}</h3>
          <ul className="space-y-2">
            {section.items.map((item, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{item.label}</span>
                <span className="font-semibold">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default BreakdownSection
