// InfluencerForm.js
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputField from "../../atoms/InputField/Index";
import Button from "../../atoms/Button/Index";
import InputLabel from "../../atoms/InputLabel/Index";
import ToggleSwitch from "../../atoms/ToggleSwitch/Index";

const InfluencerForm = ({ onSubmit, loading }) => {
  const initialValues = {
    name: '',
    email: '',
    followers: '',
    postsPerGig: '',
    postRate: '',
    averageAOV: '',
    commission: '',
    targetIncome: '',
    audienceSize: '',
    audienceSizeLookup: '',
    influencersReferred: '',
    influencerSize: '',
    showLifetimeAttribution: false,
    showSocialPartnership: false,
    showReferInfluencers: false,
    showBrand: false,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    followers: Yup.number().required('Required').min(0),
    postsPerGig: Yup.number().required('Required'),
    postRate: Yup.number().required('Required'),
    averageAOV: Yup.number().required('Required'),
    commission: Yup.number().required('Required'),
    targetIncome: Yup.number().required('Required'),
  });

  const handleSubmit = (values) => {
    const mappedValues = {
      "Name": values.name,
      "Email": values.email,
      "Followers": values.followers,
      "# Posts / Gig": values.postsPerGig,
      "$ / Post": values.postRate,
      "AOV": values.averageAOV,
      "Typical Commission %": values.commission,
      "Target Annual Income": values.targetIncome,
      "Influencer Audience Size": values.audienceSize,
      "Influencer Audience Size (Lookup)": values.audienceSizeLookup,
      "# Influencers Referred": values.influencersReferred,
      "Influencer Size": values.influencerSize,
      "Show Lifetime Attribution?": values.showLifetimeAttribution ? "Yes" : "No",
      "Show Social Partnership & Retention?": values.showSocialPartnership ? "Yes" : "No",
      "Show Refer Influencers?": values.showReferInfluencers ? "Yes" : "No",
      "Show Your Brand?": values.showBrand ? "Yes" : "No",
      "type": "influencer"
    };
    onSubmit(mappedValues);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form className="space-y-4">
        <InputField name="name" label="Name" />
        <ErrorMessage name="name" component="div" className="text-red-500" />
        
        <InputField name="email" label="Email" type="email" />
        <ErrorMessage name="email" component="div" className="text-red-500" />

        <InputField name="followers" label="Followers" type="number" />
        <ErrorMessage name="followers" component="div" className="text-red-500" />

        <InputField name="postsPerGig" label="# Posts / Gig" type="number" />
        <ErrorMessage name="postsPerGig" component="div" className="text-red-500" />

        <InputField name="postRate" label="$ / Post" type="number" />
        <ErrorMessage name="postRate" component="div" className="text-red-500" />

        <InputField name="averageAOV" label="AOV" type="number" />
        <ErrorMessage name="averageAOV" component="div" className="text-red-500" />

        <InputField name="commission" label="Typical Commission %" type="number" />
        <ErrorMessage name="commission" component="div" className="text-red-500" />

        <InputField name="targetIncome" label="Target Annual Income" type="number" />
        <ErrorMessage name="targetIncome" component="div" className="text-red-500" />

        <InputLabel label="Show Lifetime Attribution?" />
        <ToggleSwitch name="showLifetimeAttribution" type="checkbox" />

        <InputLabel label="Show Social Partnership & Retention?" />
        <ToggleSwitch name="showSocialPartnership" type="checkbox" />

        <InputLabel label="Show Refer Influencers?" />
        <ToggleSwitch name="showReferInfluencers" type="checkbox" />

        <InputLabel label="Show Your Brand?" />
        <ToggleSwitch name="showBrand" type="checkbox" />

        <Button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </Form>
    </Formik>
  );
};

export default InfluencerForm;
