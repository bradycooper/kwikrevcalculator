const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const morgan = require("morgan");
const { google } = require("googleapis");
require("dotenv").config();

const app = express();
let port = 5001;

// Initialize the Sheets API client
const sheets = google.sheets("v4");

// Environment variables
// const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
// const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
// const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;

const GOOGLE_SERVICE_ACCOUNT_EMAIL =
  "sheets-access@kwik-revenue-calculator.iam.gserviceaccount.com";
const GOOGLE_PRIVATE_KEY =
  "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDFiaEErz/rFxgg\nFBVX1RpMUkMAcAIN9QBMJ1Q2xMXcmvk+nRPZjxtbWkoRXM7Iw7a13P5tofSVV+/7\nUC6tO7j67WUIiMatgCk7dTH1+0R2KfbXLv5aHgWN6trkwwoA61rioJEVQl+Mc6yx\nZco2DF/h6UQlxf0zYVnPzxg2nWQ1o6AtVnN6QpgjCcBjX22UcFKWZNfJvRUHC47v\nRDlMDAYtvkklSDhucoDp5bGnxdQgpMb2HfJzqBJJ5rNQwPGBO2VmzBZC2msqK1Um\n9mFwR+jUb5wz9IaOHqUMsEz7Dw1XJMdlauUxZTk2uoG0DuT9G2YeluIbylJL7jFz\nKKCiblrJAgMBAAECggEABt7oHlkYII2vlaINMf5kCUaNNQ0wTRr59SwjBjqm5Srw\nw2hEQftzyKQl0l/Hg30nNEEpClgpQS6LVtLtpLHgl729F2RmgK9l/77uS29/bJq+\nDrMAPtMvf0WtcmqERQ7qnNpX4YTq/OAjIBJ5y5J3nUx3RdcSnQBkVtGNtoyX6TOl\njpiWW7MU3kx8gW3ltu9TdtXTAstB0KX41eXM8+smJm7RUqoXF4XpL/tC1w8MixOe\nj7+D4GlVyi18IBKQWIrlxT9Rsyv/vaFOCT5+XVH7SX884Y/vzqlBp0Fde3MyqGqh\nAjIGwYDucRPEpLxM8Voh/Z0nwF7MM+RPtroCxdJyeQKBgQD3FtUBmhl9JTaFJ/aH\nmZFGRvrWPa2l6PEs3xFukNjrGxvytOHXH+uHa9JqCzd1T0UKZ+1ckl5mu8VDDa1C\n/kZd/AnjTTYQpioamvV71e+zb08+Xerc4BjDIoY6i1d5Iw72jhOB4dSNR1jfCDSY\nOV9npzOg/8N0rNMnQVCJnO5mbQKBgQDMqVQif+vykzUgoAvWVQxDJzuHZttsqFGV\nO6UxEqyOZrLC+/L1JNyVcMXdgNRE3HlTnviH9mCdLb3m5/ncUfb1i1Erb6Owhuts\nPItNDpkNh27TVHU1tqnQHOydRDwWS9yayS/cp0EqY9GF3VRbEP3vVWYiHD70OtC8\n7KOH9pg8TQKBgB0KwviQO0S5VgIqo1Bm3WtsNlluIHXqvkYu5eagAc8Ifa12U0Es\n0Es3giDStq8EJTJG6uBBl/TtRw9NkTrZlj2/vQ3Janxke3hrFEV87NKjV6YV9eAG\nOwLckPhanmpvk3epVWOjvo7ofuqgFUZ7H9qYDXpz9W5GTf9ELwotttu1AoGBAMl8\nSqBMX/XIhx0/c2fnAtN55FlBIfSvIOJSfib5w3fOE19yu5YsXB2jkKipFFFW3Ps+\nHl98Z1FWnwacipgk+YRzS83/cp9vtIYydNG/9V4kXy8ejuX6luOUFj4d1yn8NYsN\nVlldMAKTksq/QzUEXXsqEAq01CWNYcMdFUHdu7JhAoGBAK1HO/ZirmUIqB7eK9i8\nYNq4BVSPzMO7JIvE22i28G+jCPpK2hGFy0x2n4rKyup688jtyaVudXY2KC7SFIJQ\nuvIHSO1KVNUNtpYPFLJwzk9nC/1VBSS9xgpLPYlL0hUYKFwi9scz5d6FHCmMjJGB\nyjto6nBjEYT/cxSND4Uaov34\n-----END PRIVATE KEY-----\n";
const SPREADSHEET_ID = "1hrpcu7AxIdlxH_5U39ZJUTOc10mbMeBxL9ZQXG4h64E";

console.log("Service Account Email:", GOOGLE_SERVICE_ACCOUNT_EMAIL);
console.log("Spreadsheet ID:", SPREADSHEET_ID);

// Google Sheets setup
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const serviceAccountAuth = new google.auth.JWT({
  email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: GOOGLE_PRIVATE_KEY,
  scopes: SCOPES,
});

// MongoDB connection string
const uri =
  "mongodb+srv://brady:hDdEUYPRbTVjqAfp@kwik-leads.uppmu.mongodb.net/kwik-leads?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Function to read data from Google Sheets
app.post("/api/submit", async (req, res) => {
  const formData = req.body;
  console.log("Received form data:", formData);

  try {
    const sheets = google.sheets({ version: "v4", auth: serviceAccountAuth });

    // Fetch existing values from the Google Sheet
    const { data: { values } } = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet2!A2:B"
    });

    // Create a map for quick lookup of existing keys
    const existingData = {};
    values.forEach(row => {
      const key = row[0];
      const value = row[1];
      existingData[key] = value;
    });

    // Map formData keys to the exact keys in the sheet
    const keyMapping = {
      "Influencer Audience Size": formData.followers || "",
      "Influencer Audience Size (Lookup)": formData.influencerAudienceSizeLookup || "",
      "# Posts / Gig": formData.postsPerGig || "",
      "$ / Post": formData.postRate ? `$${formData.postRate}` : "",
      "AOV": formData.averageAOV ? `$${formData.averageAOV}` : "",
      "Typical Commission %": formData.commission ? `${formData.commission}%` : "",
      "Show Lifetime Attribution?": formData.showLifetimeAttribution || "",
      "Show Social Partnership & Retention?": formData.showSocialPartnership || "",
      "Show Refer Influencers?": formData.showReferInfluencers || "",
      "Show Your Brand?": formData.showYourBrand || "",
      "# Influencers Referred": formData.influencersReferred || "0",
      "Influencer Size": formData.influencerSize || "Mid",
      "Target Annual Income": formData.targetIncome ? `$${formData.targetIncome}` : "",
    };

    // Update existing keys with new values from formData
    Object.keys(keyMapping).forEach(key => {
      if (keyMapping[key] !== undefined && existingData.hasOwnProperty(key)) {
        existingData[key] = keyMapping[key]; // Update only existing keys
      }
    });

    // Save data to MongoDB before sending to Google Sheets
    const database = client.db("kwik-leads");
    const leads = database.collection("leads");
    const result = await leads.insertOne(formData);
    console.log("Inserted document into MongoDB:", result.insertedId);

    // Prepare updated values for the Google Sheets API
    const updatedValues = Object.entries(existingData).map(([key, value]) => [key, value]);
    console.log("Updated values:", updatedValues);

    // Send updated values back to Google Sheets
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet2!A2:B", // Adjust this range according to your layout
      valueInputOption: "USER_ENTERED",
      resource: { values: updatedValues },
    });

    console.log("Form data sent to Google Sheets successfully.");
    res.status(200).json({
      message: "Data sent to Google Sheets successfully",
    });
  } catch (error) {
    console.error("Error processing form submission:", error);
    res.status(500).json({
      message: "Error processing form submission",
      error: error.message,
    });
  }
});



// MongoDB data storage route
app.post("/api/submit", async (req, res) => {
  const formData = req.body;
  console.log("Received form data:", formData);

  try {
    const sheets = google.sheets({ version: "v4", auth: serviceAccountAuth });

    // Fetch existing values from the Google Sheet
    const { data: { values } } = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet2!A2:B"
    });

    // Create a map for quick lookup of existing keys
    const existingData = {};
    values.forEach(row => {
      const key = row[0];
      const value = row[1];
      existingData[key] = value;
    });

    // Map formData keys to the exact keys in the sheet
    const keyMapping = {
      "Influencer Audience Size": formData.followers,
      "Influencer Audience Size (Lookup)": formData.influencerAudienceSizeLookup,
      "# Posts / Gig": formData.postsPerGig,
      "$ / Post": formData.postRate ? `$${formData.postRate}` : undefined,
      "AOV": formData.averageAOV ? `$${formData.averageAOV}` : undefined,
      "Typical Commission %": formData.commission ? `${formData.commission}%` : undefined,
      "Show Lifetime Attribution?": formData.showLifetimeAttribution,
      "Show Social Partnership & Retention?": formData.showSocialPartnership,
      "Show Refer Influencers?": formData.showReferInfluencers,
      "Show Your Brand?": formData.showYourBrand,
      "# Influencers Referred": formData.influencersReferred,
      "Influencer Size": formData.influencerSize,
      "Target Annual Income": formData.targetIncome ? `$${formData.targetIncome}` : undefined,
    };

    // Update existing keys only if they are present in both existingData and keyMapping
    Object.keys(keyMapping).forEach(key => {
      if (existingData.hasOwnProperty(key) && keyMapping[key] !== undefined) {
        existingData[key] = keyMapping[key]; // Update only existing keys
      }
    });

    // Save data to MongoDB before sending to Google Sheets
    const database = client.db("kwik-leads");
    const leads = database.collection("leads");
    const result = await leads.insertOne(formData);
    console.log("Inserted document into MongoDB:", result.insertedId);

    // Prepare updated values for the Google Sheets API
    const updatedValues = Object.entries(existingData)
      .filter(([key, value]) => keyMapping[key] !== undefined) // Filter out keys that are not in the keyMapping
      .map(([key, value]) => [key, value]); // Prepare the values to be updated

    console.log("Updated values:", updatedValues);

    // Send updated values back to Google Sheets
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet2!A2:B", // Adjust this range according to your layout
      valueInputOption: "USER_ENTERED",
      resource: { values: updatedValues },
    });

    console.log("Form data sent to Google Sheets successfully.");
    res.status(200).json({
      message: "Data sent to Google Sheets successfully",
    });
  } catch (error) {
    console.error("Error processing form submission:", error);
    res.status(500).json({
      message: "Error processing form submission",
      error: error.message,
    });
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
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Connect to MongoDB and start server
async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
  } catch (e) {
    console.error("Failed to connect to MongoDB", e);
    if (e.name === "MongoServerSelectionError") {
      console.error("Connection details:", e.reason);
    }
    process.exit(1);
  }
}

async function startServer() {
  await connectToMongo();
  const server = app
    .listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    })
    .on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.log(`Port ${port} is busy, trying with port ${port + 1}`);
        port++;
        server.listen(port);
      } else {
        console.error("Error starting server:", err);
      }
    });
}

process.on("SIGINT", async () => {
  console.log("SIGINT signal received: closing HTTP server");
  await client.close();
  console.log("MongoDB connection closed");
  process.exit(0);
});

startServer().catch(console.error);
