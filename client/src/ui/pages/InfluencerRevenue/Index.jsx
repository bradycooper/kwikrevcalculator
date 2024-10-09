import { useState } from "react"
import { useNavigate } from "react-router-dom"
import CustomBarChart from "../../molecules/CustomBarChart/Index"
import CampaignOverview from "../../molecules/CampaignOverview/Index"
import EarningsOverview from "../../molecules/EarningsOverview/Index"
import FutureSalesSection from "../../molecules/FutureSaleSection/Index"
import ResultGrid from "../../molecules/ResultGrid/Index"
import ToggleSwitch from "../../molecules/ToggleSwitch/Index"
import Heading from "../../atoms/Typography/Heading/Index"

const InfluencerRevenue = () => {
  const navigate = useNavigate()
  const [isInfluencerMode, setIsInfluencerMode] = useState(true)

  const handleToggleChange = checked => {
    console.log("Toggle changed:", checked)

    setIsInfluencerMode(checked)
    if (checked) {
      navigate("/influencer")
    } else {
      navigate("/brand")
    }
  }

  return (
    <div className="min-h-screen bg-white p-8 relative">
      {/* Switch positioned at the top-right corner */}
      <div className="absolute top-4 right-8">
        <ToggleSwitch
          checked={isInfluencerMode}
          onChange={handleToggleChange}
        />
      </div>

      <div className="text-center mt-8">
        <Heading className="text-4xl font-bold">
          Influencer Earnings Potential
        </Heading>
          {/* <Subtitle className="mt-4 text-gray-600">
            Explore how Kwik AI’s programs can boost your brand’s revenue.
          </Subtitle> */}
      </div>


      {/* Earnings Overview */}
      <div className="mt-12 flex justify-center">
        <EarningsOverview />
      </div>

      {/* Campaign Overview */}
      <div className="px-8 mt-12">
        <CampaignOverview />
      </div>

      {/* Big Chart */}
      <div className="bg-#FFFFFF p-8 mt-12">
        <CustomBarChart />
      </div>

      {/* Future Sales Section */}
      <div>
        <FutureSalesSection />
      </div>

      <div>
        <ResultGrid />
      </div>
    </div>
  )
}

export default InfluencerRevenue
