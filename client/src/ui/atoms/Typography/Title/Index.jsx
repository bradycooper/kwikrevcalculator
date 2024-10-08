import { Cn } from "../../../../utils/twCn"

const Title = ({ children, className }) => {
  return <h1 className={Cn("text-title", className)}>{children}</h1>
}

export default Title
