// BrandForm.js
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputLabel from "../../atoms/InputLabel/Index";
import Button from "../../atoms/Button/Index";
import InputField from "../../atoms/InputField/Index";

const BrandForm = ({ onSubmit, loading }) => {
  const initialValues = {
    annualRevenue: '',
    aov: '',
    ltv: '',
    ecomRevenue: '',
    budget: '',
    wholesaleRate: '',
    name: '',
    email: '',
    followers: 0,
  };

  const validationSchema = Yup.object({
    annualRevenue: Yup.number().required('Required'),
    aov: Yup.number().required('Required'),
    ltv: Yup.number().required('Required'),
    ecomRevenue: Yup.number().required('Required'),
    budget: Yup.number().required('Required'),
    wholesaleRate: Yup.number().required('Required'),
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    followers: Yup.number().required('Required').min(0),
  });

  const handleSubmit = (values) => {
    const mappedValues = {
      "Annual Revenue": values.annualRevenue,
      "AOV": values.aov,
      "LTV": values.ltv,
      "Ecom Revenue": values.ecomRevenue,
      "Available Budget": values.budget,
      "Wholesale Rate": values.wholesaleRate,
      "Name": values.name,
      "Email": values.email,
      "Followers": values.followers,
    };
    onSubmit(mappedValues);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {() => (
        <Form className="space-y-4">
          <InputField name="name" label="Company Name" />
          <ErrorMessage name="name" component="div" className="text-red-500" />

          <InputField name="email" label="Email" type="email" />
          <ErrorMessage name="email" component="div" className="text-red-500" />

          <InputField name="followers" label="Followers" type="number" />
          <ErrorMessage name="followers" component="div" className="text-red-500" />

          <InputField name="annualRevenue" label="Annual Revenue ($)" type="number" />
          <ErrorMessage name="annualRevenue" component="div" className="text-red-500" />

          <InputField name="aov" label="AOV ($)" type="number" />
          <ErrorMessage name="aov" component="div" className="text-red-500" />

          <InputField name="ltv" label="LTV ($)" type="number" />
          <ErrorMessage name="ltv" component="div" className="text-red-500" />

          <InputField name="ecomRevenue" label="Ecom Revenue (%)" type="number" />
          <ErrorMessage name="ecomRevenue" component="div" className="text-red-500" />

          <InputField name="budget" label="Available Budget (%)" type="number" />
          <ErrorMessage name="budget" component="div" className="text-red-500" />

          <InputField name="wholesaleRate" label="Wholesale Rate (%)" type="number" />
          <ErrorMessage name="wholesaleRate" component="div" className="text-red-500" />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default BrandForm;
