import React from "react"
import OutreachCard from "../OutReachCard/Index" // Import the card

const OutreachOverview = () => {
  return (
    <div className="grid grid-cols-4 gap-x-6 mt-8 justify-center">
      {" "}
      {/* Center and control spacing */}
      <OutreachCard
        outreach="Outreach: 500 /month"
        range="$464k — $580k"
        bulletPoints={[
          "10-30% Influencer Opt In",
          "3-5 Posts per influencer",
          "6 Month Program"
        ]}
        // Background color for the first card
        bgColor="bg-[#86EAD5]"
      />
      <OutreachCard
        outreach="Outreach: 1,000 /month"
        range="$880k — $1.1M"
        bulletPoints={[
          "10-30% Influencer Opt In",
          "3-5 Posts per influencer",
          "6 Month Program"
        ]}
        // Background color for the second card
        bgColor="bg-[#EE8867]"
      />
      <OutreachCard
        outreach="Outreach: 2,000 /month"
        range="$2 — $2.5M"
        bulletPoints={[
          "10-30% Influencer Opt In",
          "3-5 Posts per influencer",
          "6 Month Program"
        ]}
        // Background color for the third card
        bgColor="bg-[#FFE01B]"
      />
      <OutreachCard
        outreach="3,000 /month"
        range="$2.88M — $3.6M"
        bulletPoints={[
          "10-30% Influencer Opt In",
          "3-5 Posts per influencer",
          "6 Month Program"
        ]}
        // Background color for the fourth card
        bgColor="bg-[#FDFDFD]"
      />
    </div>
  )
}

export default OutreachOverview
