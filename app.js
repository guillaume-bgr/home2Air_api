const e = require('express');
const express = require('express')
const router = express.Router();
require('express-group-routes');
const app = express();
require('dotenv').config();

// Body parsers
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Use static routes
app.use(express.static('public'));

// Router imports
require('./routes/customerRouter')(app);
require('./routes/companyRouter')(app);
require('./routes/roleRouter')(app);
require('./routes/ticketRouter')(app);
require('./routes/subscriptionRouter')(app);

// Server init
app.listen('3000', 'localhost', () => {
    console.log('server start');
});