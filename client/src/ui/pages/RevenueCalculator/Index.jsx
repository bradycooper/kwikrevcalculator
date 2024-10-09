import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputField from "../../atoms/InputField/Index";
import Button from "../../atoms/Button/Index";
import InputError from "../../atoms/InputError/Index";
import Heading from "../../atoms/Typography/Heading/Index";
import Title from "../../atoms/Typography/Title/Index";
import Subtitle from "../../atoms/Typography/Subtitle/Index";
import Slider from "../../molecules/Slider/Index";
import Card from "../../atoms/Card/Index";
import InputLabel from "../../atoms/InputLabel/Index";
import ToggleSwitch from "../../atoms/ToggleSwitch/Index";
import { submitFormData, calculateRevenue } from "../../../services/apiService";

const RevenueCalculator = () => {
  const [selection, setSelection] = useState("influencer");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    followers: 0,
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    followers: "",
  });
  const [advancedFields, setAdvancedFields] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [knowMoreInfluencers, setKnowMoreInfluencers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [calculationResults, setCalculationResults] = useState(null);

  const [sheetData, setSheetData] = useState([]);
  const spreadsheetId = '1hrpcu7AxIdlxH_5U39ZJUTOc10mbMeBxL9ZQXG4h64E';
  // const range = 'Sheet1!A1:D10';
  const apiKey = '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDFiaEErz/rFxgg\nFBVX1RpMUkMAcAIN9QBMJ1Q2xMXcmvk+nRPZjxtbWkoRXM7Iw7a13P5tofSVV+/7\nUC6tO7j67WUIiMatgCk7dTH1+0R2KfbXLv5aHgWN6trkwwoA61rioJEVQl+Mc6yx\nZco2DF/h6UQlxf0zYVnPzxg2nWQ1o6AtVnN6QpgjCcBjX22UcFKWZNfJvRUHC47v\nRDlMDAYtvkklSDhucoDp5bGnxdQgpMb2HfJzqBJJ5rNQwPGBO2VmzBZC2msqK1Um\n9mFwR+jUb5wz9IaOHqUMsEz7Dw1XJMdlauUxZTk2uoG0DuT9G2YeluIbylJL7jFz\nKKCiblrJAgMBAAECggEABt7oHlkYII2vlaINMf5kCUaNNQ0wTRr59SwjBjqm5Srw\nw2hEQftzyKQl0l/Hg30nNEEpClgpQS6LVtLtpLHgl729F2RmgK9l/77uS29/bJq+\nDrMAPtMvf0WtcmqERQ7qnNpX4YTq/OAjIBJ5y5J3nUx3RdcSnQBkVtGNtoyX6TOl\njpiWW7MU3kx8gW3ltu9TdtXTAstB0KX41eXM8+smJm7RUqoXF4XpL/tC1w8MixOe\nj7+D4GlVyi18IBKQWIrlxT9Rsyv/vaFOCT5+XVH7SX884Y/vzqlBp0Fde3MyqGqh\nAjIGwYDucRPEpLxM8Voh/Z0nwF7MM+RPtroCxdJyeQKBgQD3FtUBmhl9JTaFJ/aH\nmZFGRvrWPa2l6PEs3xFukNjrGxvytOHXH+uHa9JqCzd1T0UKZ+1ckl5mu8VDDa1C\n/kZd/AnjTTYQpioamvV71e+zb08+Xerc4BjDIoY6i1d5Iw72jhOB4dSNR1jfCDSY\nOV9npzOg/8N0rNMnQVCJnO5mbQKBgQDMqVQif+vykzUgoAvWVQxDJzuHZttsqFGV\nO6UxEqyOZrLC+/L1JNyVcMXdgNRE3HlTnviH9mCdLb3m5/ncUfb1i1Erb6Owhuts\nPItNDpkNh27TVHU1tqnQHOydRDwWS9yayS/cp0EqY9GF3VRbEP3vVWYiHD70OtC8\n7KOH9pg8TQKBgB0KwviQO0S5VgIqo1Bm3WtsNlluIHXqvkYu5eagAc8Ifa12U0Es\n0Es3giDStq8EJTJG6uBBl/TtRw9NkTrZlj2/vQ3Janxke3hrFEV87NKjV6YV9eAG\nOwLckPhanmpvk3epVWOjvo7ofuqgFUZ7H9qYDXpz9W5GTf9ELwotttu1AoGBAMl8\nSqBMX/XIhx0/c2fnAtN55FlBIfSvIOJSfib5w3fOE19yu5YsXB2jkKipFFFW3Ps+\nHl98Z1FWnwacipgk+YRzS83/cp9vtIYydNG/9V4kXy8ejuX6luOUFj4d1yn8NYsN\nVlldMAKTksq/QzUEXXsqEAq01CWNYcMdFUHdu7JhAoGBAK1HO/ZirmUIqB7eK9i8\nYNq4BVSPzMO7JIvE22i28G+jCPpK2hGFy0x2n4rKyup688jtyaVudXY2KC7SFIJQ\nuvIHSO1KVNUNtpYPFLJwzk9nC/1VBSS9xgpLPYlL0hUYKFwi9scz5d6FHCmMjJGB\nyjto6nBjEYT/cxSND4Uaov34\n-----END PRIVATE KEY-----\n"';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/?key=${apiKey}`
        );
        const data = await response.json();
        setSheetData(data.values);
        console.log("sheetData", sheetData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };
  
  const toggleSelection = (type) => {
    setSelection(type);
    setFormData({ name: "", email: "", followers: 0 });
    setFormErrors({ name: "", email: "", followers: "" });
    setAdvancedFields(false);
  };

  const validateForm = () => {
    const errors = { name: "", email: "", followers: "" };
    let isValid = true;

    if (!formData.name) {
      errors.name = "Name is required";
      isValid = false;
    }
    if (!formData.email) {
      errors.email = "Email is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
  
      const apiEndpoint = selection === "brand"
        ? 'https://sheetdb.io/api/v1/tvhx80444016n'
        : 'https://sheetdb.io/api/v1/0lg6togujhc3f';
  
      const fullFormData = {
        name: formData.name,
        email: formData.email,
        followers: formData.followers,
        postsPerGig: formData.postsPerGig,
        postRate: formData.postRate || '',
        averageAOV: formData.averageAOV || '',
        commission: formData.commission || '',
        targetIncome: formData.targetIncome || '',
        knownInfluencers: formData.knownInfluencers || '',
        annualRevenue: formData.annualRevenue || '',
        aov: formData.aov || '',
        ltv: formData.ltv || '',
        ecomRevenue: formData.ecomRevenue || '',
        budget: formData.budget || '',
        wholesaleRate: formData.wholesaleRate || '',
      };
  
      try {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ data: [fullFormData] }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to submit data to Google Sheets');
        }
  
        const data = await response.json();
        console.log('Response from Google Sheets:', data);
        
        setShowCard(true);
      } catch (error) {
        console.error('Error processing the form submission:', error);
      } finally {
        setLoading(false);
      }
    }
  };
  
  
  const InfluencerAdvancedFields = () => (
    <Formik
      initialValues={{
        postsPerGig: '',
        postRate: '',
        averageAOV: '',
        commission: '',
        targetIncome: '',
        knownInfluencers: '',
        knowMoreInfluencers: knowMoreInfluencers
      }}
      validationSchema={Yup.object({
        postsPerGig: Yup.string().required('Required'),
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
            <Field as="select" name="postsPerGig" className="block w-full p-2 border border-gray-300 rounded-md">
              <option value="" disabled>Select number of posts</option>
              <option value="1">1 Post</option>
              <option value="2">2 Posts</option>
              <option value="3">3 Posts</option>
              <option value="4">4 Posts</option>
            </Field>
            <ErrorMessage name="postsPerGig" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <InputLabel label="Post Per Rate ($)" />
            <Field name="postRate" type="number" className="w-full p-2 border border-gray-300 rounded-md" />
            <ErrorMessage name="postRate" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <InputLabel label="Average AOV ($)" />
            <Field name="averageAOV" type="number" className="w-full p-2 border border-gray-300 rounded-md" />
            <ErrorMessage name="averageAOV" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <InputLabel label="Typical Commission (%)" />
            <Field name="commission" type="number" className="w-full p-2 border border-gray-300 rounded-md" />
            <ErrorMessage name="commission" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <InputLabel label="Target Annual Income ($)" />
            <Field name="targetIncome" type="number" className="w-full p-2 border border-gray-300 rounded-md" />
            <ErrorMessage name="targetIncome" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <InputLabel label="How many influencers do you know?" />
            <Field name="knownInfluencers" type="number" className="w-full p-2 border border-gray-300 rounded-md" />
            <ErrorMessage name="knownInfluencers" component="div" className="text-red-500 text-sm" />
          </div>
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
          {/* <Button type="submit" disabled={isSubmitting}>Submit Influencer Data</Button> */}
        </Form>
      )}
    </Formik>
  );

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
            <Field name="annualRevenue" type="number" className="w-full p-2 border border-gray-300 rounded-md" />
            <ErrorMessage name="annualRevenue" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <InputLabel label="AOV ($)" />
            <Field name="aov" type="number" className="w-full p-2 border border-gray-300 rounded-md" />
            <ErrorMessage name="aov" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <InputLabel label="LTV ($)" />
            <Field name="ltv" type="number" className="w-full p-2 border border-gray-300 rounded-md" />
            <ErrorMessage name="ltv" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <InputLabel label="Ecom Revenue (%)" />
            <Field name="ecomRevenue" type="number" className="w-full p-2 border border-gray-300 rounded-md" />
            <ErrorMessage name="ecomRevenue" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <InputLabel label="Available Budget for all Programs (%)" />
            <Field name="budget" type="number" className="w-full p-2 border border-gray-300 rounded-md" />
            <ErrorMessage name="budget" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <InputLabel label="Wholesale Rate (%)" />
            <Field name="wholesaleRate" type="number" className="w-full p-2 border border-gray-300 rounded-md" />
            <ErrorMessage name="wholesaleRate" component="div" className="text-red-500 text-sm" />
          </div>
          <Button type="submit" disabled={isSubmitting}>Submit Brand Data</Button>
        </Form>
      )}
    </Formik>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="max-w-5xl mx-auto py-10 flex flex-col md:flex-row justify-between items-start px-4">
        <div className="text-left flex-1">
          <Title className="text-2xl font-bold">See The Revenue impacts Kwik Can Have.</Title>
          <Subtitle className="text-lg mt-6 text-gray-600">
            See how all 3 of Kwik presented programs can help you boost your earnings with programs you’re not focusing on... yet.
          </Subtitle>
          <Heading className="font-bold mt-4 text-gray-700">Powered by Kwik Ai</Heading>
        </div>
        <div className="flex flex-row md:flex-col space-y-4 mt-8 ml-0 md:ml-20">
          <Button onClick={() => toggleSelection("brand")} className={`px-6 py-2 rounded-md border ${selection === "brand" ? "bg-[#FFD065] text-black border-none" : "bg-[#FFFFFF] text-black "}`}>
            Brand
          </Button>
          <Button onClick={() => toggleSelection("influencer")} className={`px-6 py-2 rounded-md border ${selection === "influencer" ? "bg-[#FFD065] text-black border-none" : "bg-[#FFFFFF] text-black"}`}>
            Influencer
          </Button>
        </div>
      </header>

      <section className="max-w-6xl mx-auto bg-white p-8 shadow-md rounded-lg">
        <Heading className="text-2xl font-bold mb-4">For {selection === "influencer" ? "Influencers" : "Brands"}</Heading>
        <Subtitle className="text-gray-600 mb-6">
          {selection === "influencer" ? "Are you a creator looking to monetize your influencer even more? Enter in some basic information and see what Kwik can do for you." : "Let’s see what Kwik can do for your brand to help you make more revenue than you’re getting today."}
        </Subtitle>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <InputField id="name" label={selection === "influencer" ? "Influencer Name" : "Company Name"} name="name" value={formData.name} onChange={handleInputChange} required className="w-full" />
            {formErrors.name && <InputError error={formErrors.name} />}
            <InputField id="email" label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} required className="w-full" />
            {formErrors.email && <InputError error={formErrors.email} />}
          </div>

          <Slider value={formData.followers} onChange={(e) => setFormData({ ...formData, followers: parseInt(e.target.value) })} />

          <button type="button" onClick={() => setAdvancedFields(!advancedFields)} className="text-gray-600 mt-4">
            {advancedFields ? "Hide Advanced Fields" : "Show Advanced Fields"}
          </button>

          <div key={selection}>
            {advancedFields && (selection === "influencer" ? <InfluencerAdvancedFields /> : <BrandAdvancedFields />)}
          </div>
          <div className="flex justify-left mt-6">
            <Button type="submit" className="w-[150px] bg-kwikYellow text-black rounded-md hover:bg-[#F6D400]">Calculate</Button>
          </div>
        </form>
      </section>
      {advancedFields && showCard && loading && (
        <Card show={showCard} description="Checking your company... Checking your revenue... Loading Kwik AI... Checking our Modules... Verifying results..." />
      )}
    </div>
  );
};

export default RevenueCalculator;