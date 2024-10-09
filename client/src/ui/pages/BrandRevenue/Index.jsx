import { useState } from "react"
import { useNavigate } from "react-router-dom"
import BrandCampaignOverview from "../../molecules/BrandCampaignOverview/Index"
import BarChart from "../../molecules/CustomBarChart/Index"
import Heading from "../../atoms/Typography/Heading/Index"
import Subtitle from "../../atoms/Typography/Subtitle/Index"
import ResultGrid from "../../molecules/ResultGrid/Index"
import OutreachOverview from "../../molecules/OutReachOverview/Index"
import ToggleSwitch from "../../molecules/ToggleSwitch/Index"

const BrandRevenue = () => {
  const navigate = useNavigate()
  const [isInfluencerMode, setIsInfluencerMode] = useState(false)

  const handleToggleChange = checked => {
    setIsInfluencerMode(checked)
    if (checked) {
      navigate("/influencer") // Navigate to Influencer page when toggled on
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 relative">
      {/* Toggle Switch positioned at the top-right corner */}
      <div className="absolute top-4 right-8">
        <ToggleSwitch
          checked={isInfluencerMode}
          onChange={handleToggleChange}
        />
      </div>

      {/* Title Section */}
      <div className="text-center mt-8">
        <Heading className="text-4xl font-bold">
          Brand Revenue Potential
        </Heading>
          {/* <Subtitle className="mt-4 text-gray-600">
            Explore how Kwik AI’s programs can boost your brand’s revenue.
          </Subtitle> */}
      </div>

      {/* Revenue Estimate */}
      <div className="mt-12 flex justify-center">
        <div className="flex flex-col items-center">
          <h3 className="text-green-700 bg-green-100 px-4 py-2 rounded-full mb-2">
            Estimated Total Revenue + 45%
          </h3>
          <h1 className="text-6xl font-bold">$1,235,324.45</h1>
        </div>
      </div>

      {/* Campaign Overview (Brand-Specific) */}
      <div className="mt-16">
        <BrandCampaignOverview />
      </div>

      {/* Reward Modules Section */}
      <div className="mt-16">
        <div className="text-center">
          <Heading>Kwik Reward Modules</Heading>
          <p className="mt-2 text-gray-500">
            Kwik tracks, monitors, and automates the various programs and
            incentives. Below is a breakdown of the rewards generated by our
            modules.
          </p>
        </div>
        <div className="mt-8">
          <BarChart />
        </div>
      </div>

      {/* Breakdown Section */}
      <div className="mt-16">
        <ResultGrid />
      </div>
      <div className="mt-16">
        <OutreachOverview />
      </div>
    </div>
  )
}

export default BrandRevenue
