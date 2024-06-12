const express = require("express");

const app = express();

const dbconfig = require('./db')
const restaurantsRoute = require('./routes/restaurantsRoute')

app.use(express.json())

app.use('/api/restaurants',restaurantsRoute)

const port = process.env.PORT || 5001;

app.listen(port, () => console.log('Node Server started '))