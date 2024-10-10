import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

 const submitFormData = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/submit`, formData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error submitting form data:", error);
    throw error;
  }
};


export default submitFormData;