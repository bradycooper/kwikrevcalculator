import { Cn } from "../../../../utils/twCn"

const Content = ({ children, className }) => {
  return <p className={Cn("text-content", className)}>{children}</p>
}

export default Content
