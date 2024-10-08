import FutureSalesCard from "../FutureSalesCard/Index"
import Heading from "../../atoms/Typography/Heading/Index"

const FutureSalesSection = () => {
  return (
    <section className="max-w-6xl mx-auto text-center py-12">
      <h2 className="text-content text-gray-500">Your future company sales</h2>
      <Heading className="text-4xl font-bold my-4">$15.84</Heading>{" "}
      {/* Main Heading */}
      <h2 className="text-subtitle font-medium text-gray-600">
        Your Future Company Sales
      </h2>
      <div className="flex justify-center gap-6 mt-8">
        <FutureSalesCard title="Dividends" value="$15.84" />
        <FutureSalesCard
          title="Enterprise Value"
          value="$7.92"
          bgColor="bg-teal"
        />
        <FutureSalesCard
          title="Commissions"
          value="$0.792"
          bgColor="bg-coral"
        />
      </div>
    </section>
  )
}

export default FutureSalesSection
