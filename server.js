// Express server for D3f4ult Hub Key System
const express = require('express');
const cors = require('cors');
const path = require('path');
const api = require('./api');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API Endpoints
app.get('/api/validate-key', (req, res) => {
    api.validateKey(req, res);
});

app.get('/api/generate-key', (req, res) => {
    api.generateKey(req, res);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Export for serverless platforms
module.exports = app; 