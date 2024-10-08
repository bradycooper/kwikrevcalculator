import { useState } from "react"
import InputField from "../../atoms/InputField/Index"
import Button from "../../atoms/Button/Index"
import InputError from "../../atoms/InputError/Index"
import Heading from "../../atoms/Typography/Heading/Index"
import Title from "../../atoms/Typography/Title/Index"
import Subtitle from "../../atoms/Typography/Subtitle/Index"
import Slider from "../../molecules/Slider/Index"
import Card from "../../atoms/Card/Index"
import InputLabel from "../../atoms/InputLabel/Index"
import ToggleSwitch from "../../atoms/ToggleSwitch/Index"

const RevenueCalculator = () => {
  const [selection, setSelection] = useState("influencer")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    followers: 0
  })
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    followers: ""
  })
  const [advancedFields, setAdvancedFields] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [knowMoreInfluencers, setKnowMoreInfluencers] = useState(false)
  const [loading, setLoading] = useState(false)

  // Handles input change for text fields
  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSelectChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Toggle Brand/Influencer selection
  const toggleSelection = type => {
    setSelection(type)
    setFormData({ name: "", email: "", followers: 0 })
    setFormErrors({ name: "", email: "", followers: "" })
    setAdvancedFields(false)
  }

  // Form validation
  const validateForm = () => {
    const errors = { name: "", email: "", followers: "" }
    let isValid = true

    if (!formData.name) {
      errors.name = "Name is required"
      isValid = false
    }
    if (!formData.email) {
      errors.email = "Email is required"
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  // Form submission
  const handleSubmit = e => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Form submitted successfully:", formData)
      setShowCard(true) // Show the card immediately
      setLoading(true) // Set loading state to true to simulate API call

      // Simulate API delay
      setTimeout(() => {
        setLoading(false) // Set loading to false after response
        setShowCard(false) // Hide the card after API response
      }, 3000) // Adjust time as needed
    }
  }

  // Advanced Fields for Influencers
  const InfluencerAdvancedFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div className="relative col-span-2 md:col-span-1">
        <InputLabel label="Number of Posts Per Gig" id="postsPerGig" required />
        <select
          name="postsPerGig"
          onChange={handleSelectChange}
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-opacity-50"
        >
          <option value="" disabled selected>
            Select number of posts
          </option>
          <option value="1">1 Post</option>
          <option value="2">2 Posts</option>
          <option value="3">3 Posts</option>
          <option value="4">4 Posts</option>
        </select>
        <p className="text-gray-500 mt-1 text-sm">
          How many posts per campaign?
        </p>
      </div>
      <div className="col-span-2 md:col-span-1">
        <InputLabel label="Post Per Rate ($)" id="postRate" required />
        <InputField
          name="postRate"
          onChange={handleInputChange}
          className="w-full"
        />
        <p className="text-gray-500 mt-1 text-sm">
          How much do you get paid per post?
        </p>
      </div>
      <div className="col-span-2 md:col-span-1">
        <InputLabel label="Average AOV ($)" id="averageAOV" required />
        <InputField
          name="averageAOV"
          onChange={handleInputChange}
          className="w-full"
        />
        <p className="text-gray-500 mt-1 text-sm">
          Best guess at the average cost of the products you sell.
        </p>
      </div>
      <div className="relative">
        <InputLabel label="Typical Commission (%)" id="commission" required />
        <InputField
          name="commission"
          onChange={handleInputChange}
          className="pr-10 w-full"
        />
        <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
          %
        </span>
        <p className="text-gray-500 mt-1 text-sm">
          Percentage commission on sales you drive.
        </p>
      </div>
      <div className="col-span-2 md:col-span-1">
        <InputLabel
          label="Target Annual Income ($)"
          id="targetIncome"
          required
        />
        <InputField
          name="targetIncome"
          onChange={handleInputChange}
          className="w-full"
        />
        <p className="text-gray-500 mt-1 text-sm">
          How much do you want to make annually?
        </p>
      </div>
      <div className="col-span-2 md:col-span-1">
        <InputLabel
          label="How many influencers do you know?"
          id="knownInfluencers"
          required
        />
        <InputField
          name="knownInfluencers"
          onChange={handleInputChange}
          className="w-full"
        />
        <p className="text-gray-500 mt-1 text-sm">
          Do you know any other influencers?
        </p>
      </div>
      <div className="col-span-2 flex items-center mt-6">
        <ToggleSwitch
          checked={knowMoreInfluencers}
          onChange={() => setKnowMoreInfluencers(!knowMoreInfluencers)}
        />
        <InputLabel
          label="Do you know anymore influencers like you?"
          id="knowMoreInfluencers"
          className="ml-4"
        />
      </div>
    </div>
  )

  // Advanced Fields for Brands
  const BrandAdvancedFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      {/* Annual Revenue Field */}
      <div>
        <InputLabel label="Annual Revenue ($)" id="annualRevenue" required />
        <InputField
          id="annualRevenue"
          name="annualRevenue"
          onChange={handleInputChange}
          className="w-full"
        />
      </div>

      {/* AOV Field */}
      <div>
        <InputLabel label="AOV ($)" id="aov" required />
        <InputField
          id="aov"
          name="aov"
          onChange={handleInputChange}
          className="w-full"
        />
      </div>

      {/* LTV Field */}
      <div>
        <InputLabel label="LTV ($)" id="ltv" required />
        <InputField
          id="ltv"
          name="ltv"
          onChange={handleInputChange}
          className="w-full"
        />
      </div>

      {/* Ecom Revenue Field with Percentage Symbol */}
      <div className="relative">
        <InputLabel label="Ecom Revenue (%)" id="ecomRevenue" required />
        <InputField
          id="ecomRevenue"
          name="ecomRevenue"
          onChange={handleInputChange}
          className="pr-10 w-full"
        />
        <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 pt-5">
          %
        </span>
      </div>

      {/* Available Budget Field */}
      <div>
        <InputLabel
          label="Available Budget for all Programs (%)"
          id="budget"
          required
        />
        <InputField
          id="budget"
          name="budget"
          onChange={handleInputChange}
          className="w-full"
        />
      </div>

      {/* Wholesale Rate Field with Percentage Symbol */}
      <div className="relative">
        <InputLabel label="Wholesale Rate (%)" id="wholesaleRate" required />
        <InputField
          id="wholesaleRate"
          name="wholesaleRate"
          onChange={handleInputChange}
          className="pr-10 w-full"
        />
        <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 pt-5">
          %
        </span>
      </div>
    </div>
  )

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="max-w-5xl mx-auto py-10 flex flex-col md:flex-row justify-between items-start px-4">
        <div className="text-left flex-1">
          <Title className="text-2xl font-bold">
            See The Revenue impacts Kwik Can Have.
          </Title>
          <Subtitle className="text-lg mt-6 text-gray-600">
            See how all 3 of Kwik presented programs can help you boost your
            earnings with programs you’re not focusing on... yet.
          </Subtitle>
          <Heading className="font-bold mt-4 text-gray-700">
            Powered by Kwik Ai
          </Heading>
        </div>
        <div className="flex flex-row md:flex-col space-y-4 mt-8 ml-0 md:ml-20">
          <Button
            onClick={() => toggleSelection("brand")}
            className={`px-6 py-2 rounded-md border ${
              selection === "brand"
                ? "bg-[#FFD065] text-black border-none"
                : "bg-[#FFFFFF] text-black "
            }`}
          >
            Brand
          </Button>
          <Button
            onClick={() => toggleSelection("influencer")}
            className={`px-6 py-2 rounded-md border ${
              selection === "influencer"
                ? "bg-[#FFD065] text-black border-none"
                : "bg-[#FFFFFF] text-black"
            }`}
          >
            Influencer
          </Button>
        </div>
      </header>

      <section className="max-w-6xl mx-auto bg-white p-8 shadow-md rounded-lg">
        <Heading className="text-2xl font-bold mb-4">
          For {selection === "influencer" ? "Influencers" : "Brands"}
        </Heading>
        <Subtitle className="text-gray-600 mb-6">
          {selection === "influencer"
            ? "Are you a creator looking to monetize your influencer even more? Enter in some basic information and see what Kwik can do for you."
            : "Let’s see what Kwik can do for your brand to help you make more revenue than you’re getting today."}
        </Subtitle>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <InputField
              id="name"
              label={
                selection === "influencer" ? "Influencer Name" : "Company Name"
              }
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full"
            />
            {formErrors.name && <InputError error={formErrors.name} />}
            <InputField
              id="email"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full"
            />
            {formErrors.email && <InputError error={formErrors.email} />}
          </div>

          <Slider
            value={formData.followers}
            onChange={e =>
              setFormData({ ...formData, followers: parseInt(e.target.value) })
            }
          />

          <button
            type="button"
            onClick={() => setAdvancedFields(!advancedFields)}
            className="text-gray-600 mt-4"
          >
            {advancedFields ? "Hide Advanced Fields" : "Show Advanced Fields"}
          </button>

          {advancedFields &&
            (selection === "influencer" ? (
              <InfluencerAdvancedFields />
            ) : (
              <BrandAdvancedFields />
            ))}
          <div className="flex justify-left mt-6">
            <Button
              type="submit"
              className="w-[150px] bg-kwikYellow text-black rounded-md hover:bg-[#F6D400]"
            >
              Calculate
            </Button>
          </div>
        </form>
      </section>
      {advancedFields && showCard && loading && (
        <Card
          show={showCard}
          description="Checking your company... Checking your revenue... Loading Kwik AI... Checking our Modules... Verifying results..."
        />
      )}
    </div>
  )
}

export default RevenueCalculator
