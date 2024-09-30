const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const morgan = require('morgan');
const { google } = require('googleapis');

const app = express();
let port = 5001;

// Hardcoded values (replace .env variables)
const GOOGLE_SERVICE_ACCOUNT_EMAIL = 'sheets-access@kwik-revenue-calculator.iam.gserviceaccount.com';
const GOOGLE_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDFiaEErz/rFxgg\nFBVX1RpMUkMAcAIN9QBMJ1Q2xMXcmvk+nRPZjxtbWkoRXM7Iw7a13P5tofSVV+/7\nUC6tO7j67WUIiMatgCk7dTH1+0R2KfbXLv5aHgWN6trkwwoA61rioJEVQl+Mc6yx\nZco2DF/h6UQlxf0zYVnPzxg2nWQ1o6AtVnN6QpgjCcBjX22UcFKWZNfJvRUHC47v\nRDlMDAYtvkklSDhucoDp5bGnxdQgpMb2HfJzqBJJ5rNQwPGBO2VmzBZC2msqK1Um\n9mFwR+jUb5wz9IaOHqUMsEz7Dw1XJMdlauUxZTk2uoG0DuT9G2YeluIbylJL7jFz\nKKCiblrJAgMBAAECggEABt7oHlkYII2vlaINMf5kCUaNNQ0wTRr59SwjBjqm5Srw\nw2hEQftzyKQl0l/Hg30nNEEpClgpQS6LVtLtpLHgl729F2RmgK9l/77uS29/bJq+\nDrMAPtMvf0WtcmqERQ7qnNpX4YTq/OAjIBJ5y5J3nUx3RdcSnQBkVtGNtoyX6TOl\njpiWW7MU3kx8gW3ltu9TdtXTAstB0KX41eXM8+smJm7RUqoXF4XpL/tC1w8MixOe\nj7+D4GlVyi18IBKQWIrlxT9Rsyv/vaFOCT5+XVH7SX884Y/vzqlBp0Fde3MyqGqh\nAjIGwYDucRPEpLxM8Voh/Z0nwF7MM+RPtroCxdJyeQKBgQD3FtUBmhl9JTaFJ/aH\nmZFGRvrWPa2l6PEs3xFukNjrGxvytOHXH+uHa9JqCzd1T0UKZ+1ckl5mu8VDDa1C\n/kZd/AnjTTYQpioamvV71e+zb08+Xerc4BjDIoY6i1d5Iw72jhOB4dSNR1jfCDSY\nOV9npzOg/8N0rNMnQVCJnO5mbQKBgQDMqVQif+vykzUgoAvWVQxDJzuHZttsqFGV\nO6UxEqyOZrLC+/L1JNyVcMXdgNRE3HlTnviH9mCdLb3m5/ncUfb1i1Erb6Owhuts\nPItNDpkNh27TVHU1tqnQHOydRDwWS9yayS/cp0EqY9GF3VRbEP3vVWYiHD70OtC8\n7KOH9pg8TQKBgB0KwviQO0S5VgIqo1Bm3WtsNlluIHXqvkYu5eagAc8Ifa12U0Es\n0Es3giDStq8EJTJG6uBBl/TtRw9NkTrZlj2/vQ3Janxke3hrFEV87NKjV6YV9eAG\nOwLckPhanmpvk3epVWOjvo7ofuqgFUZ7H9qYDXpz9W5GTf9ELwotttu1AoGBAMl8\nSqBMX/XIhx0/c2fnAtN55FlBIfSvIOJSfib5w3fOE19yu5YsXB2jkKipFFFW3Ps+\nHl98Z1FWnwacipgk+YRzS83/cp9vtIYydNG/9V4kXy8ejuX6luOUFj4d1yn8NYsN\nVlldMAKTksq/QzUEXXsqEAq01CWNYcMdFUHdu7JhAoGBAK1HO/ZirmUIqB7eK9i8\nYNq4BVSPzMO7JIvE22i28G+jCPpK2hGFy0x2n4rKyup688jtyaVudXY2KC7SFIJQ\nuvIHSO1KVNUNtpYPFLJwzk9nC/1VBSS9xgpLPYlL0hUYKFwi9scz5d6FHCmMjJGB\nyjto6nBjEYT/cxSND4Uaov34\n-----END PRIVATE KEY-----\n";
const SPREADSHEET_ID = '1hrpcu7AxIdlxH_5U39ZJUTOc10mbMeBxL9ZQXG4h64E';

// MongoDB connection string
const uri = "mongodb+srv://brady:hDdEUYPRbTVjqAfp@kwik-leads.uppmu.mongodb.net/kwik-leads?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // 5 seconds
});

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://accounts.google.com'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev')); // Logging middleware

// Google Sheets setup
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

const serviceAccountAuth = new google.auth.JWT({
  email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  scopes: SCOPES,
});

// New route to fetch Google Sheets data
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

// Connect to MongoDB
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


// Routes
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

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Start server
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

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  await client.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});

startServer().catch(console.error);