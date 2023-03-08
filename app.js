require('express-group-routes');
require('dotenv').config();
const express = require('express')
const router = express.Router();
const app = express();

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
require('./routes/notificationRouter')(app);
require('./routes/buildingRouter')(app);    
require('./routes/parkRouter')(app);


// Server init
// app.listen('3000', 'localhost', () => {
//     console.log('server start');
// });

module.exports = app;