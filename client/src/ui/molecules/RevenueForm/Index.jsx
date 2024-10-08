// import React from "react";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import InputField from "../../atoms/InputField/Index";
// import Button from "../../atoms/Button/Index";
// import Slider from "../../molecules/Slider/Index";
// import InputError from "../../atoms/InputError/Index";

// // Validation Schema using Yup
// const validationSchema = Yup.object({
//   name: Yup.string().required("Name is required"),
//   email: Yup.string().email("Invalid email format").required("Email is required"),
//   followers: Yup.number().nullable(),
//   postsPerGig: Yup.number().nullable(),
//   postRate: Yup.number().nullable(),
//   averageAOV: Yup.number().nullable(),
//   targetIncome: Yup.number().nullable(),
//   // Add any other field validations here...
// });

// interface FormValues {
//   name: string;
//   email: string;
//   followers?: number;
//   postsPerGig?: number;
//   postRate?: number;
//   averageAOV?: number;
//   targetIncome?: number;
// }

// interface DynamicFormProps {
//   selection: string;
//   initialValues: FormValues;
//   onSubmit: (values: FormValues) => void;
// }

// const DynamicForm: React.FC<DynamicFormProps> = ({ selection, initialValues, onSubmit }) => {
//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={(values) => {
//         onSubmit(values);
//       }}
//     >
//       {({ values, handleChange, setFieldValue }) => (
//         <Form className="space-y-4">
//           <div className="grid grid-cols-2 gap-6">
//             {/* Name Field */}
//             <div>
//               <Field
//                 name="name"
//                 label={selection === "influencer" ? "Influencer Name" : "Brand Name"}
//                 as={InputField}
//               />
//               <ErrorMessage name="name" component={InputError} />
//             </div>

//             {/* Email Field */}
//             <div>
//               <Field
//                 name="email"
//                 label="Email"
//                 type="email"
//                 as={InputField}
//               />
//               <ErrorMessage name="email" component={InputError} />
//             </div>
//           </div>

//           {/* Conditionally Render Slider for Followers */}
//           {selection === "influencer" && (
//             <div>
//               <Slider
//                 value={values.followers || 0}
//                 onChange={(e) => setFieldValue('followers', e.target.value)}
//                 label="Number of Followers"
//                 min={0}
//                 max={100000000}
//               />
//             </div>
//           )}

//           {/* Conditionally Render Advanced Fields for both Influencers and Brands */}
//           <div className="grid grid-cols-2 gap-6">
//             {selection === "influencer" && (
//               <>
//                 {/* Influencer-specific fields */}
//                 <div>
//                   <Field
//                     name="postsPerGig"
//                     label="Number of Posts Per Gig"
//                     as={InputField}
//                   />
//                   <ErrorMessage name="postsPerGig" component={InputError} />
//                 </div>

//                 <div>
//                   <Field
//                     name="postRate"
//                     label="Post Per Rate ($)"
//                     as={InputField}
//                   />
//                   <ErrorMessage name="postRate" component={InputError} />
//                 </div>

//                 <div>
//                   <Field
//                     name="averageAOV"
//                     label="Average AOV ($)"
//                     as={InputField}
//                   />
//                   <ErrorMessage name="averageAOV" component={InputError} />
//                 </div>

//                 <div>
//                   <Field
//                     name="targetIncome"
//                     label="Target Annual Income ($)"
//                     as={InputField}
//                   />
//                   <ErrorMessage name="targetIncome" component={InputError} />
//                 </div>
//               </>
//             )}

//             {selection === "brand" && (
//               <>
//                 {/* Brand-specific fields */}
//                 <div>
//                   <Field
//                     name="annualRevenue"
//                     label="Annual Revenue ($)"
//                     as={InputField}
//                   />
//                   <ErrorMessage name="annualRevenue" component={InputError} />
//                 </div>

//                 <div>
//                   <Field
//                     name="aov"
//                     label="AOV ($)"
//                     as={InputField}
//                   />
//                   <ErrorMessage name="aov" component={InputError} />
//                 </div>

//                 <div>
//                   <Field
//                     name="ltv"
//                     label="LTV ($)"
//                     as={InputField}
//                   />
//                   <ErrorMessage name="ltv" component={InputError} />
//                 </div>

//                 <div>
//                   <Field
//                     name="ecomRevenue"
//                     label="Ecom Revenue (%)"
//                     as={InputField}
//                   />
//                   <ErrorMessage name="ecomRevenue" component={InputError} />
//                 </div>

//                 <div>
//                   <Field
//                     name="wholesaleRate"
//                     label="Wholesale Rate (%)"
//                     as={InputField}
//                   />
//                   <ErrorMessage name="wholesaleRate" component={InputError} />
//                 </div>
//               </>
//             )}
//           </div>

//           <div className="flex justify-start mt-6">
//             <Button type="submit" className="w-[150px] bg-[#FFD065] text-black rounded-md">
//               Calculate
//             </Button>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default DynamicForm;

export {}