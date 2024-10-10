import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../../atoms/Button/Index";
import ToggleSwitch from "../../atoms/ToggleSwitch/Index";
import Title from "../../atoms/Typography/Title/Index";
import Subtitle from "../../atoms/Typography/Subtitle/Index";
import Heading from "../../atoms/Typography/Heading/Index";
import axios from "axios";
import Slider from "../../molecules/Slider/Index";
import { Card } from "@mui/material";

const RevenueCalculator = () => {
  const [selection, setSelection] = useState("influencer");
  const [advancedFields, setAdvancedFields] = useState(true);
  const [knowMoreInfluencers, setKnowMoreInfluencers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [followersValue, setFollowersValue] = useState(0); // State for followers value

  const toggleSelection = (type) => {
    setSelection(type);
    setAdvancedFields(false);
    setKnowMoreInfluencers(false); // Reset when selection changes
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    followers: Yup.number()
      .min(0, "Must be a positive number")
      .required("Number of Followers is required"),
    ...(selection === "influencer" &&
      advancedFields && {
        postsPerGig: Yup.number().required("Posts per gig is required"),
        postRate: Yup.number().required("Rate per post is required"),
        averageAOV: Yup.number().required("Average order value is required"),
        commission: Yup.number().required("Commission percentage is required"),
        targetIncome: Yup.number().required("Target annual income is required"),
        influencersReferred: Yup.number().when("knowMoreInfluencers", {
          is: true,
          then: Yup.number().required(
            "Number of referred influencers is required"
          ),
        }),
      }),
    ...(selection === "brand" &&
      advancedFields && {
        annualRevenue: Yup.number().required("Annual revenue is required"),
        aov: Yup.number().required("Average order value is required"),
        ltv: Yup.number().required("Lifetime value is required"),
        ecomRevenue: Yup.number().required(
          "E-commerce revenue percentage is required"
        ),
        budget: Yup.number().required("Budget is required"),
        wholesaleRate: Yup.number().required("Wholesale rate is required"),
      }),
  });

  const handleSubmit = async (
    values,
    { resetForm, validateForm, setTouched }
  ) => {
    console.log("Submitting form with values:", values);
    setLoading(true);
    const errors = await validateForm();

    // Check if there are any validation errors
    if (Object.keys(errors).length) {
      // Set advancedFields to true to show advanced fields
      setAdvancedFields(true);

      // Mark all fields as touched to display errors
      setTouched({
        name: true,
        email: true,
        followers: true,
        ...(selection === "influencer" &&
          advancedFields && {
            postsPerGig: true,
            postRate: true,
            averageAOV: true,
            commission: true,
            targetIncome: true,
            influencersReferred: knowMoreInfluencers,
          }),
        ...(selection === "brand" &&
          advancedFields && {
            annualRevenue: true,
            aov: true,
            ltv: true,
            ecomRevenue: true,
            budget: true,
            wholesaleRate: true,
          }),
      });
      setLoading(false);
      return; // Prevent form submission
    }

    try {
      // Add the type field to the form data based on the selection
      const formData = {
        ...values,
        followers: followersValue,
        type: selection, // Set type to either "brand" or "influencer"
      };

      // Define the base URL for your API
      const baseURL = "http://localhost:5001"; // Change this if your backend URL is different

      // Call the API endpoint
      const response = await axios.post(`${baseURL}/api/submit`, formData);
      console.log("Response from backend:", response.data);
      setShowCard(true);
      resetForm(); // Reset the form after submission
    } catch (error) {
      console.error("Error submitting form data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="max-w-6xl mx-auto py-20 flex flex-col md:flex-row justify-between items-start">
        <div className="text-left flex-1 max-w-[82ch]">
          <Title className="text-6xl font-bold">
            See The Revenue impacts Kwik Can Have.
          </Title>
          <Subtitle className="text-lg mt-6 text-gray-600">
            See how all 3 of Kwik presented programs can help you boost your
            earnings with programs you’re not focusing on... yet.
          </Subtitle>
          <Heading className="font-bold mt-4 text-gray-700">
            Powered by <strong>Kwik Ai</strong>
          </Heading>
        </div>
        <div className="flex flex-row md:flex-col space-y-4 mt-8 ml-0 md:ml-20">
          <Button
            onClick={() => toggleSelection("brand")}
            className={`px-6 py-2 rounded-md border ${
              selection === "brand"
                ? "bg-[#FFD065] text-black border-none"
                : "bg-[#FFFFFF] text-black"
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

      <section className="max-w-6xl mx-auto bg-white p-20 shadow-md rounded-lg">
        <Heading className="text-2xl font-bold mb-4">
          For {selection === "influencer" ? "Influencers" : "Brands"}
        </Heading>
        <Subtitle className="text-gray-600 mb-6">
          {selection === "influencer"
            ? "Are you a creator looking to monetize your influence even more? Enter some basic information and see what Kwik can do for you."
            : "Let’s see what Kwik can do for your brand to help you make more revenue than you’re getting today."}
        </Subtitle>

        <Formik
          initialValues={{
            name: "",
            email: "",
            followers: 0,
            postsPerGig: "",
            postRate: "",
            averageAOV: "",
            commission: "",
            targetIncome: "",
            influencersReferred: "",
            annualRevenue: "",
            aov: "",
            ltv: "",
            ecomRevenue: "",
            budget: "",
            wholesaleRate: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-4">
              {/* Basic Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="font-medium">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="name"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="font-medium">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="email"
                    type="email"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              {/* Slider shown only for influencers */}
              {selection === "influencer" && (
                <div className="my-4">
                  <Slider
                    value={followersValue}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value, 10);
                      setFollowersValue(newValue);
                      setFieldValue("followers", newValue); // Update Formik state
                    }}
                  />
                  <ErrorMessage
                    name="followers"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              )}

              {/* Advanced Fields Toggle */}
              <button
                type="button"
                onClick={() => setAdvancedFields(!advancedFields)}
                className="text-gray-600 mt-4"
              >
                <strong>
                  {advancedFields
                    ? "Hide Advanced Fields"
                    : "Show Advanced Fields"}
                </strong>
              </button>

              {/* Influencer Advanced Fields */}
              {advancedFields && selection === "influencer" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="postsPerGig" className="font-medium">
                        Posts Per Gig <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="postsPerGig"
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        name="postsPerGig"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="postRate" className="font-medium">
                        $ / Post <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="postRate"
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        name="postRate"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="averageAOV" className="font-medium">
                        AOV ($) <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="averageAOV"
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        name="averageAOV"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="commission" className="font-medium">
                        Typical Commission %{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="commission"
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        name="commission"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="targetIncome" className="font-medium">
                        Target Annual Income{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="targetIncome"
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        name="targetIncome"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex items-center col-span-2 mt-4">
                      {" "}
                      <ToggleSwitch
                        checked={knowMoreInfluencers}
                        onChange={() =>
                          setKnowMoreInfluencers(!knowMoreInfluencers)
                        }
                        className="mr-2"
                      />
                      <label className="font-medium mr-2">
                        Do you know more influencers like you?
                      </label>
                    </div>

                    {knowMoreInfluencers && (
                      <div className="col-span-2">
                        {" "}
                        {/* Span the full width of the grid */}
                        <label
                          htmlFor="influencersReferred"
                          className="font-medium"
                        >
                          How many influencers do you know?
                          <span className="text-red-500">*</span>
                        </label>
                        <Field
                          name="influencersReferred"
                          type="number"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <ErrorMessage
                          name="influencersReferred"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Brand Advanced Fields */}
              {advancedFields && selection === "brand" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="annualRevenue" className="font-medium">
                      Annual Revenue ($) <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="annualRevenue"
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <ErrorMessage
                      name="annualRevenue"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="aov" className="font-medium">
                      AOV ($) <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="aov"
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <ErrorMessage
                      name="aov"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="ltv" className="font-medium">
                      LTV ($) <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="ltv"
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <ErrorMessage
                      name="ltv"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="ecomRevenue" className="font-medium">
                      Ecom Revenue (%) <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="ecomRevenue"
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <ErrorMessage
                      name="ecomRevenue"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="budget" className="font-medium">
                      Available Budget for Programs (%){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="budget"
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <ErrorMessage
                      name="budget"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="wholesaleRate" className="font-medium">
                      Wholesale Rate (%) <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="wholesaleRate"
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <ErrorMessage
                      name="wholesaleRate"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-left mt-6">
                <Button
                  type="submit"
                  className="w-[150px] bg-kwikYellow text-black rounded-md hover:bg-[#F6D400]"
                >
                  Calculate
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </section>

      {loading && (
        <Card
          show={loading}
          description="Checking your company... Loading Kwik AI... Verifying results..."
        />
      )}
    </div>
  );
};

export default RevenueCalculator;
