const express = require("express"); // Importă framework-ul Express

const app = express(); // Creează o instanță a aplicației Express

const dbconfig = require('./db'); // Importă configurația bazei de date
const restaurantsRoute = require('./routes/restaurantsRoute'); // Importă ruta pentru restaurante
const usersRoute = require('./routes/usersRoute'); // Importă ruta pentru utilizatori
const bookingRoute = require('./routes/bookingRoute'); // Importă ruta pentru rezervări

app.use(express.json()); // Middleware pentru parsarea corpului cererilor de tip JSON

// Setează rutele pentru diferite funcționalități ale API-ului
app.use('/api/restaurants', restaurantsRoute); // Rute pentru restaurante
app.use('/api/users', usersRoute); // Rute pentru utilizatori
app.use('/api/bookings', bookingRoute); // Rute pentru rezervări

const port = process.env.PORT || 5001; // Definește portul pe care serverul va asculta cererile, folosind variabila de mediu PORT sau 5001 implicit

// Pornește serverul și ascultă cererile pe portul specificat
app.listen(port, () => console.log('Node Server started on port', port));
