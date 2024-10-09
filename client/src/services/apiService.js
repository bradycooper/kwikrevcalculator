import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

// Function to submit form data to MongoDB and Google Sheets
export const submitFormData = (formData) => {
  console.log("Submitting formData...", formData);
  return axios.post(`${API_BASE_URL}/submit`, formData);
};

// Function to calculate revenue with Google Sheets
export const calculateRevenue = async (formData, userType) => {
  try {
    const endpoint = `${API_BASE_URL}/calculate?type=${userType}`;
    const response = await axios.post(endpoint, formData);
    return response.data;
  } catch (error) {
    console.error('Error calculating revenue:', error);
    throw error;
  }
};
