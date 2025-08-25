const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Option 1: Simple - allows all origins, methods, and headers
app.use(cors());

// Option 2: Explicit configuration (equivalent to above)
app.use(cors({
  origin: '*', // or '*' - allows all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'],
  allowedHeaders: '*',
  credentials: true // allows cookies/auth headers
}));

// Option 3: Manual CORS headers (without cors package)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Your routes here
app.get('/', (req, res) => {
  res.json({ message: 'CORS enabled for all origins' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});