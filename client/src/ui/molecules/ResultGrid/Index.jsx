import React from "react"
import ResultCard from "../../atoms/ResultCard/Index"

const BreakdownSection = () => {
  return (
    <div className="bg-[#FFFADD] p-8 rounded-lg border-2 border-yellow-400 max-w-5xl w-full mx-auto">
      <div className="grid grid-cols-3 gap-6 mb-6">
        <h2 className="text-xl font-bold text-center">Retention</h2>
        <h2 className="text-xl font-bold text-center">Referral</h2>
        <h2 className="text-xl font-bold text-center">Social Partnerships</h2>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col space-y-4">
          <ResultCard title="Increased Retention Rate" value="76%" />
          <ResultCard title="Decreased CAC" value="$0" />
          <ResultCard title="Increased Profits" value="$0" />
        </div>

        <div className="flex flex-col space-y-4">
          <ResultCard title="Increased New Customers" value="4,800" />
          <ResultCard title="Increased Referring Customers" value="3,700" />
          <ResultCard title="Increased Profit" value="$380,000" />
        </div>

        <div className="flex flex-col space-y-4">
          <ResultCard title="New Influencers" value="1,200" />
          <ResultCard title="Product Views" value="5.6 Million" />
          <ResultCard title="CPM" value="$0.06" vsText="Facebook CPM $0.25" />
        </div>
      </div>
    </div>
  )
}

export default BreakdownSection
