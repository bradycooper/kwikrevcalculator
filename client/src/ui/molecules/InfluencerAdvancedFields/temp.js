import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputLabel from "../../atoms/InputLabel/Index";
import ToggleSwitch from "../../atoms/ToggleSwitch/Index";
import Button from "../../atoms/Button/Index";

const InfluencerAdvancedFields = ({ knowMoreInfluencers, setKnowMoreInfluencers }) => (
  <Formik
    initialValues={{
      postsPerCampaign: '',
      postRate: '',
      averageAOV: '',
      commission: '',
      targetIncome: '',
      knownInfluencers: '',
      knowMoreInfluencers: knowMoreInfluencers
    }}
    validationSchema={Yup.object({
      postsPerCampaign: Yup.string().required('Required'),
      postRate: Yup.number().required('Required'),
      averageAOV: Yup.number().required('Required'),
      commission: Yup.number().required('Required'),
      targetIncome: Yup.number().required('Required'),
      knownInfluencers: Yup.string().required('Required'),
    })}
    onSubmit={(values, { setSubmitting }) => {
      console.log('Influencer values:', values);
      setKnowMoreInfluencers(values.knowMoreInfluencers);
      setSubmitting(false);
    }}
  >
    {({ isSubmitting, setFieldValue }) => (
      <Form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="col-span-2 md:col-span-1">
          <InputLabel label="Number of Posts Per Gig" />
          <Field as="select" name="postsPerCampaign" className="block w-full p-2 border">
            <option value="" disabled>Select number of posts</option>
            <option value="1">1 Post</option>
            <option value="2">2 Posts</option>
            <option value="3">3 Posts</option>
            <option value="4">4 Posts</option>
          </Field>
          <ErrorMessage name="postsPerCampaign" component="div" className="text-red-500 text-sm" />
        </div>
        {/* Repeat similar blocks for each field */}
        <div className="col-span-2 flex items-center mt-6">
          <ToggleSwitch
            checked={knowMoreInfluencers}
            onChange={() => {
              setKnowMoreInfluencers(!knowMoreInfluencers);
              setFieldValue("knowMoreInfluencers", !knowMoreInfluencers);
            }}
          />
          <InputLabel label="Do you know more influencers like you?" className="ml-4" />
        </div>
        <Button type="submit" disabled={isSubmitting}>Submit Influencer Data</Button>
      </Form>
    )}
  </Formik>
);

export default InfluencerAdvancedFields;