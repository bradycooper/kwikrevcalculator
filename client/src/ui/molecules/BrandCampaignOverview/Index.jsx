import CampaignCard from "../CampaignCard/Index"

const BrandCampaignOverview = () => (
  <div className="flex justify-center space-x-10 mt-8">
    {" "}
    {/* Adjust the gap and centering */}
    <CampaignCard
      title="Customer Retention Program"
      value="$0"
      percentage="+0%"
      commission=""
      description="This is our loyalty and retention program. We will find out how to make all your new customers become returning customers and make your returning customers become lifelong advocates."
      targetIncome={0}
      // Custom background color
      bgColor="bg-[#86EAD5]"
      cardHeight="h-90"
      cardWidth="w-64"
    />
    <CampaignCard
      title="Customer Referral Program"
      value="$590k"
      percentage="+45%"
      commission=""
      description="We will take your existing customer base and turn them into walking marketers and sharers of your brand. We use advanced tactics to get your customers to share."
      targetIncome={0}
      // Custom background color
      bgColor="bg-[#EE8867]"
      cardHeight="h-90"
      cardWidth="w-64"
    />
    <CampaignCard
      title="Social Partnership Program"
      value="$3.6M"
      percentage="+360%"
      commission=""
      description="We will help you find influencers, onboard influencers, train influencers, and get influencers to start advocating for your brand."
      targetIncome={0}
      // Custom background color
      bgColor="bg-[#FDFDFD]"
      cardHeight="h-90"
      cardWidth="w-64"
    />
  </div>
)

export default BrandCampaignOverview
