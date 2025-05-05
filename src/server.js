const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const CRUX_API_URL = `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${GOOGLE_API_KEY}`;

// Add a GET route for the root path
app.get('/', (req, res) => {
  res.json({
    message: 'Google CrUX API Backend is running',
    availableEndpoint: '/getRecords',
    method: 'POST',
    description: 'Use this endpoint to query Google CrUX data'
  });
});

app.post('/getRecords', async (req, res) => {
  try {
    if (!GOOGLE_API_KEY) {
      return res.status(500).json({ error: 'Google API key is not configured' });
    }

    const response = await fetch(CRUX_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error from CrUX API:', errorData);
      return res.status(response.status).json({ 
        error: 'An error occurred while fetching data from Google CrUX API.', 
        details: errorData 
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error calling CrUX API:', error);
    res.status(500).json({ 
      error: 'An error occurred while fetching data from Google CrUX API.',
      message: error.message 
    });
  }
});

const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});