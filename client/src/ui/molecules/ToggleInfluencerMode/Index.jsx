// ToggleInfluencerMode Component with functional Switch
import React from "react"
import Switch from "../../atoms/Switch/Index"

const ToggleInfluencerMode = ({ checked, onChange }) => {
  return (
    <div className="border rounded-full border-light-grey px-4 py-0 flex items-center justify-center font-[400] text-[12px] bg-white">
      <Switch
        className="scale-75"
        checked={checked}
        onChange={() => onChange(!checked)}
      />
      <span className="ml-4 text-center text-sm">
        {checked ? "Switch to Brands" : "Switch to Influencers"}
      </span>
    </div>
  )
}

export default ToggleInfluencerMode
