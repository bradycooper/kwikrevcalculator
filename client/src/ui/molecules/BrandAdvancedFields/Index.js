import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputLabel from "../../atoms/InputLabel/Index";
import Button from "../../atoms/Button/Index";

const BrandAdvancedFields = () => (
  <Formik
    initialValues={{
      annualRevenue: '',
      aov: '',
      ltv: '',
      ecomRevenue: '',
      budget: '',
      wholesaleRate: ''
    }}
    validationSchema={Yup.object({
      annualRevenue: Yup.number().required('Required'),
      aov: Yup.number().required('Required'),
      ltv: Yup.number().required('Required'),
      ecomRevenue: Yup.number().required('Required'),
      budget: Yup.number().required('Required'),
      wholesaleRate: Yup.number().required('Required')
    })}
    onSubmit={(values, { setSubmitting }) => {
      console.log('Brand values:', values);
      setSubmitting(false);
    }}
  >
    {({ isSubmitting }) => (
      <Form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="col-span-2 md:col-span-1">
          <InputLabel label="Annual Revenue ($)" />
          <Field name="annualRevenue" type="number" className="w-full p-2 border" />
          <ErrorMessage name="annualRevenue" component="div" className="text-red-500 text-sm" />
        </div>
        {/* Repeat similar blocks for each field */}
        <Button type="submit" disabled={isSubmitting}>Submit Brand Data</Button>
      </Form>
    )}
  </Formik>
);

export default BrandAdvancedFields;