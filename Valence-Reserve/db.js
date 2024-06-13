const mongoose = require("mongoose"); // Importă modulul Mongoose pentru interacțiunea cu MongoDB

var mongoURL = 'mongodb+srv://user:parola@cluster0.zjbdyu0.mongodb.net/ValenceReserve'; // URL-ul conexiunii MongoDB

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true }); // Conectează-te la MongoDB folosind URL-ul și opțiunile specificate

var connection = mongoose.connection; // Obține obiectul de conexiune

connection.on('error', () => {
    console.log('Mongo DB connection failed'); // Ascultă evenimentul de eroare și afișează un mesaj în caz de eșec
});

connection.on('connected', () => {
    console.log('Mongo DB connection successful'); // Ascultă evenimentul de conexiune reușită și afișează un mesaj de confirmare
});

module.exports = mongoose; // Exportă obiectul mongoose pentru a fi utilizat în alte părți ale aplicației
