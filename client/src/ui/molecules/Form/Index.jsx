import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import InputField from "../../atoms/InputField/Index"
import Button from "../../atoms/Button/Index"

// Validation Schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  followers: Yup.number()
    .min(0, "Followers must be positive")
    .nullable()
})

const FormComponent = ({
  selection,
  initialValues,
  showSlider = false,
  sliderLabel = "Number of Followers",
  sliderMin = 0,
  sliderMax = 100000000,
  advancedFields = false,
  onToggleAdvancedFields,
  onSubmit
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => {
        onSubmit(values)
      }}
    >
      {({ values, handleChange, setFieldValue }) => (
        <Form className="space-y-4">
          <div className="flex space-x-4">
            <div>
              <Field
                name="name"
                id="name"
                label={
                  selection === "influencer" ? "Influencer Name" : "Brand Name"
                }
                as={InputField}
                required
                className="w-[370px]"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <div>
              <Field
                name="email"
                id="email"
                label="Email"
                type="email"
                as={InputField}
                required
                className="w-[370px]"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>
          </div>

          {/* Slider for Followers */}
          {showSlider && (
            <div className="my-6">
              <label
                htmlFor="followers"
                className="block text-sm font-medium text-gray-700"
              >
                {sliderLabel}
              </label>
              <input
                type="range"
                name="followers"
                id="followers"
                min={sliderMin}
                max={sliderMax}
                value={values.followers || 0}
                onChange={e =>
                  setFieldValue("followers", parseInt(e.target.value))
                }
                className="w-full"
              />
              <div className="flex justify-between text-sm">
                <span>{sliderMin}</span>
                <span>{values.followers?.toLocaleString() || 0}</span>
                <span>{sliderMax / 1000000}M</span>
              </div>
            </div>
          )}

          {advancedFields && onToggleAdvancedFields && (
            <button
              type="button"
              onClick={onToggleAdvancedFields}
              className="text-gray-600 underline mt-4"
            >
              {advancedFields ? "Hide Advanced Fields" : "Show Advanced Fields"}
            </button>
          )}

          <div className="flex justify-left">
            <Button
              type="submit"
              className="w-[150px] bg-[#FFD065] text-black rounded-md"
            >
              Calculate
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default FormComponent
