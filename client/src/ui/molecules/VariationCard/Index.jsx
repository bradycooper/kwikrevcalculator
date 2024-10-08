import React from "react"
import Title from "../../atoms/Typography/Title/Index"
import Content from "../../atoms/Typography/Content/Index"
import { Cn } from "../../../utils/twCn"

const VariationCard = ({ className }) => {
  return (
    <div
      className={Cn(
        className,
        "p-10 rounded-lg border border-dark-grey flex items-center justify-evenly bg-white min-h-[330px]"
      )}
    >
      <div className="space-y-4">
        <Title className="text-[90px]">$1,235,324.45</Title>
        <Content className="text-[22px] font-[500] capitalize">
          Estimated Total Revenue
        </Content>
      </div>
      <div className="h-2/6 w-0.5 bg-light-grey"></div>
      <div className="space-y-2">
        <Content className="font-[400] text-[30px]">
          Based on <span className="font-[500]">Customer Retention</span>,{" "}
          <span className="font-[500]">Referral</span>, and{" "}
          <span className="font-[500]">Social Partnership</span> programs!
        </Content>
      </div>
    </div>
  )
}

export default VariationCard
