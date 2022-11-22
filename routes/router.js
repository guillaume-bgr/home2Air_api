const express = require('express')
const app = express();
const router = express.Router();


app.use('/customers', require('./routes/customerRouter'));