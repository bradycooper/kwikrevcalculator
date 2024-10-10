import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../../atoms/Button/Index";
import ToggleSwitch from "../../atoms/ToggleSwitch/Index";
import Title from "../../atoms/Typography/Title/Index";
import Subtitle from "../../atoms/Typography/Subtitle/Index";
import Heading from "../../atoms/Typography/Heading/Index";
import axios from "axios";
import Slider from "../../molecules/Slider/Index";
import { CircularProgress, Modal } from "@mui/material";
import InputLabel from "../../atoms/InputLabel/Index";
import InputField from "../../atoms/InputField/Index";
import { useNavigate } from "react-router-dom";

const RevenueCalculator = () => {
  const [selection, setSelection] = useState("influencer");
  const [advancedFields, setAdvancedFields] = useState(true);
  const [knowMoreInfluencers, setKnowMoreInfluencers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [followersValue, setFollowersValue] = useState(0); // State for followers value

  const navigate = useNavigate();

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
        postsPerCampaign: Yup.number().required("Posts per gig is required"),
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
            postsPerCampaign: true,
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
      return;
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
      if (selection === "influencer") {
        navigate("/influencer");
        return;
      }
      navigate("/brand");
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

      <section className="max-w-6xl mx-auto my-9 bg-white p-20 shadow-md rounded-lg">
        <Heading className="text-[35px] font-bold mb-4">
          For {selection === "influencer" ? "Influencers" : "Brands"}
        </Heading>
        <Subtitle className="text-gray-600 mb-6 !text-[16px] max-width-[43ch;]">
          {selection === "influencer"
            ? "Are you a creator looking to monetize your influence even more? Enter some basic information and see what Kwik can do for you."
            : "Let’s see what Kwik can do for your brand to help you make more revenue than you’re getting today."}
        </Subtitle>

        <Formik
          initialValues={{
            name: "",
            email: "",
            followers: 0,
            postsPerCampaign: "",
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
                  <InputLabel required label={"Influencer Name"} id={"name"} />
                  <InputField name="name" required />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div>
                  <InputLabel required label={"Email"} id={"email"} />
                  <InputField name="email" type="email" required />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

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

              {/* Advanced Fields Toggle */}
              <button
                type="button"
                onClick={() => setAdvancedFields(!advancedFields)}
                className="text-gray-600 !mt-[70px]"
              >
                <strong>
                  {advancedFields
                    ? "Hide Advanced Fields"
                    : "Show Advanced Fields"}
                </strong>
              </button>

              {/* Influencer Advanced Fields */}
              {advancedFields && selection === "influencer" && (
                <div className="grid grid-cols-2 gap-10">
                  <div>
                    <InputLabel
                      required
                      label={"Posts per Campaign"}
                      id={"postsPerCampaign"}
                    />
                    <InputField
                      name="postsPerCampaign"
                      type="number"
                      helperText={
                        "When  working with a brand, How many times do you posts per campaign."
                      }
                    />
                    <ErrorMessage
                      name="postsPerCampaign"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div>
                    <InputLabel
                      required
                      label={"Average AOV ($)"}
                      id={"averageAOV"}
                    />
                    <InputField
                      name="averageAOV"
                      type="number"
                      helperText="For the brands you’re promoting, what’s your best guess at average cost of the products you sell?"
                    />
                    <ErrorMessage
                      name="averageAOV"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div>
                    <InputLabel
                      required
                      label={"Posting Rates ($)"}
                      id={"postRate"}
                    />
                    <InputField
                      name="postRate"
                      type="number"
                      helperText="How much do get paid per post?"
                    />
                    <ErrorMessage
                      name="postRate"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div>
                    <InputLabel
                      required
                      label={"Target Annual Income ($)"}
                      id={"targetIncome"}
                    />
                    <InputField
                      name="targetIncome"
                      type="number"
                      helperText={
                        "How much do you want to make a year an income?"
                      }
                    />
                    <ErrorMessage
                      name="targetIncome"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div>
                    <InputLabel
                      required
                      label={"Typical Commission (%)"}
                      id={"commission"}
                    />
                    <InputField
                      name="commission"
                      type="number"
                      helperText={
                        "How much do you typically get as a % in commission on sales you drive?"
                      }
                    />
                    <ErrorMessage
                      name="commission"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div></div>
                  <div className="flex items-center mt-6 gap-3">
                    <div className="flex items-center">
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
                    <span className="font-[500] text-[18px]">
                      Do you know more influencers like you?
                    </span>
                  </div>
                  {knowMoreInfluencers && (
                    <div>
                      <InputLabel
                        required
                        label={" How many influencers do you know?"}
                        id={"influencersReferred"}
                      />
                      <InputField
                        name="influencersReferred"
                        type="number"
                        className="w-3/4 p-2 border border-gray-300 rounded-md" // Increased width here
                      />
                      <ErrorMessage
                        name="influencersReferred"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Brand Advanced Fields */}
              {advancedFields && selection === "brand" && (
                <div className="grid grid-cols-2 gap-10">
                  <div>
                    <InputLabel
                      required
                      label={"Annual Revenue ($)"}
                      id="annualRevenue"
                    />
                    <InputField name="annualRevenue" type="number" />
                    <ErrorMessage
                      name="annualRevenue"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div>
                    <InputLabel required label={"AOV ($)"} id="aov" />
                    <InputField name="aov" type="number" />
                    <ErrorMessage
                      name="aov"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div>
                    <InputLabel required label={"LTV ($)"} id="ltv" />
                    <InputField name="ltv" type="number" />
                    <ErrorMessage
                      name="ltv"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  {/* <div>
                    <label
                      htmlFor="ecomRevenue"
                      className="font-[14px] text-light-grey"
                    >
                      Ecom Revenue (%) *{" "}
                      <span className="w-full h-[1px] border-1 border-black" />
                    </label>
                   <InputField
                      name="ecomRevenue"
                      type="number"
                    />
                    <ErrorMessage
                      name="ecomRevenue"
                      component="div"
                      className="text-red-500"
                    />
                  </div> */}

                  <div>
                    <InputLabel
                      required
                      label={"Available Budget for Programs (%)"}
                      id="budget"
                    />
                    <InputField name="budget" type="number" />
                    <ErrorMessage
                      name="budget"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  {/* <div>
                    <label
                      htmlFor="wholesaleRate"
                      className="font-[14px] text-light-grey"
                    >
                      Wholesale Rate (%) *{" "}
                      <span className="w-full h-[1px] border-1 border-black" />
                    </label>
                   <InputField
                      name="wholesaleRate"
                      type="number"
                    />
                    <ErrorMessage
                      name="wholesaleRate"
                      component="div"
                      className="text-red-500"
                    />
                  </div> */}
                </div>
              )}

              <div
                className={`flex justify-left ${
                  advancedFields && "!mt-[50px]"
                }`}
              >
                <Button
                  type="submit"
                  className="w-[150px] bg-kwikYellow text-black rounded-md !bg-[#FFD065] hover:bg-[#F9B503] "
                >
                  Calculate
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </section>

      {/* {loading && ( */}
      <Modal
        open={loading}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96 flex flex-col items-center shadow-lg">
            <>
              <CircularProgress />
              <h2 className="mt-4 text-xl font-semibold" id="modal-title">
                Calculating Results
              </h2>
              <p
                className="mt-2 text-center text-gray-600"
                id="modal-description"
              >
                Checking your company... Checking your revenue... Loading Kwik
                AI... Checking our Modules... Verifying results...
              </p>
            </>
          </div>
        </div>
      </Modal>

      {/* )} */}
    </div>
  );
};

export default RevenueCalculator;
