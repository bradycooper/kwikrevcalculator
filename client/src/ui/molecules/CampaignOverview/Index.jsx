import CampaignCard from "../CampaignCard/Index"

const CampaignOverview = () => (
  <div className="flex justify-center space-x-20 mt-8">
    <CampaignCard
      title="Kwik’s Commission Payouts"
      value="$0.4"
      percentage="+0%"
      commission="$0.02 in guaranteed monthly commissions"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      targetIncome={6}
      bgColor="bg-[#86EAD5]"
      cardHeight="h-90"
      cardWidth="w-64"
    />
    <CampaignCard
      title="Social Partnership"
      value="$1.6"
      percentage="+300%"
      commission="$0.08 in guaranteed monthly commissions"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      targetIncome={2}
      bgColor="bg-[#EE8867]"
      cardHeight="h-90"
      cardWidth="w-64"
    />
    <CampaignCard
      title="Create Your Brand"
      value="$2.64"
      percentage="+560%"
      commission="$0.132 in guaranteed monthly commissions"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      targetIncome={1}
      bgColor="bg-[#FDFDFD]"
      cardHeight="h-90"
      cardWidth="w-64"
    />
  </div>
)

export default CampaignOverview
