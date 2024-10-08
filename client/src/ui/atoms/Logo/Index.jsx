import React from "react"
import logo from "./../../../assets/images/logo.png"
import logoBlack from "./../../../assets/images/logoBlack.png"
import { Cn } from "../../../utils/twCn"

const Logo = ({ className, black }) => {
  return (
    <img
      src={black ? logoBlack : logo}
      alt="Logo"
      className={Cn("w-26 h-9 inline-block", className)}
    />
  )
}

export default Logo
