const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const morgan = require('morgan');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
let port = 5001;

// Initialize the Sheets API client
const sheets = google.sheets('v4');

// Environment variables
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;

// Google Sheets setup
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const serviceAccountAuth = new google.auth.JWT({
  email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: GOOGLE_PRIVATE_KEY,
  scopes: SCOPES,
});

// MongoDB connection string
const uri = "mongodb+srv://brady:hDdEUYPRbTVjqAfp@kwik-leads.uppmu.mongodb.net/kwik-leads?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));

// Function to read data from Google Sheets
app.get('/api/sheet-data', async (req, res) => {
  try {
    console.log('Fetching Google Sheets data...');
    console.log('SPREADSHEET_ID:', SPREADSHEET_ID);
    
    if (!SPREADSHEET_ID) {
      throw new Error('SPREADSHEET_ID is not set');
    }
    
    const sheets = google.sheets({ version: 'v4', auth: serviceAccountAuth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A1:Z1000',
    });
    console.log('Google Sheets data fetched successfully');
    res.json(response.data.values);
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
    console.error('Error details:', error.response ? error.response.data : 'No response data');
    res.status(500).json({ message: 'Error fetching sheet data', error: error.message });
  }
});


// MongoDB data storage route
app.post('/api/submit', async (req, res) => {
  const formData = req.body;
  console.log('Received form data:', formData);
  try {
    const database = client.db("kwik-leads");
    const leads = database.collection("leads");
    const result = await leads.insertOne(formData);
    console.log('Inserted document:', result.insertedId);
    res.status(200).json({ message: 'Data received and stored successfully', id: result.insertedId });
  } catch (e) {
    console.error('Error storing data:', e);
    res.status(500).json({ message: 'Error storing data', error: e.message });
  }
});

// Google Sheets data calculation and retrieval route
// app.post('/api/calculate', async (req, res) => {
//   const { name, email, followers, brandRevenue } = req.body; // Adjust fields as needed
//   try {
//     const sheets = google.sheets({ version: 'v4', auth: serviceAccountAuth });

//     // Define the range and map form data to specific cells
//     const inputRange = 'Sheet1!A2:D2'; // Adjust based on your sheet
//     const inputValues = [
//       [name, email, followers, brandRevenue]
//     ];

//     // Update Google Sheets with input values
//     await sheets.spreadsheets.values.update({
//       spreadsheetId: SPREADSHEET_ID,
//       range: inputRange,
//       valueInputOption: 'USER_ENTERED',
//       resource: { values: inputValues },
//     });

//     // Define output range and retrieve calculation results
//     const outputRange = 'Sheet1!E2:G2'; // Adjust based on output cells
//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId: SPREADSHEET_ID,
//       range: outputRange,
//     });

//     const outputData = response.data.values[0];
//     const [calculatedRevenue, estimatedReach, roi] = outputData; // Adjust based on your output format

//     res.status(200).json({
//       message: 'Calculation completed successfully',
//       data: { calculatedRevenue, estimatedReach, roi },
//     });
//   } catch (error) {
//     console.error('Error with Google Sheets calculation:', error);
//     res.status(500).json({
//       message: 'Error processing calculation',
//       error: error.message,
//     });
//   }
// });

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Connect to MongoDB and start server
async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
  } catch (e) {
    console.error("Failed to connect to MongoDB", e);
    if (e.name === 'MongoServerSelectionError') {
      console.error("Connection details:", e.reason);
    }
    process.exit(1);
  }
}

async function startServer() {
  await connectToMongo();
  const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy, trying with port ${port + 1}`);
      port++;
      server.listen(port);
    } else {
      console.error('Error starting server:', err);
    }
  });
}

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  await client.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});

startServer().catch(console.error);