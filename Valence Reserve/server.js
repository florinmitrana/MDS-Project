const express = require("express");

const app = express();

const dbconfig = require('./db')
const restaurantsRoute = require('./routes/restaurantsRoute')
const usersRoute = require('./routes/usersRoute')
const bookingRoute = require('./routes/bookingRoute');

app.use(express.json())

app.use('/api/restaurants',restaurantsRoute)
app.use('/api/users', usersRoute)
app.use('/api/bookings', bookingRoute);

const port = process.env.PORT || 5001;

app.listen(port, () => console.log('Node Server started '))