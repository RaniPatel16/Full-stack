const express = require('express');
const cors = require('cors');
const pincodeRoutes = require('./routes/pincode.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes setup
app.use('/api', pincodeRoutes);

module.exports = app;
