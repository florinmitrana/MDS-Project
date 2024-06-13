const express = require('express');
const router = express.Router(); // Router Express pentru a defini rutele
const Booking = require('../models/bookings'); // Modelul pentru rezervări
const Restaurant = require('../models/restaurant'); // Modelul pentru restaurante

// Ruta pentru a crea o nouă rezervare
router.post('/addbooking', async (req, res) => {
    const { restaurant, name, date, hour, maxCount } = req.body; // Extrage datele din corpul cererii

    try {
        // Creează o nouă instanță de rezervare cu datele primite
        const newBooking = new Booking({
            restaurant: restaurant.name,
            name,
            date,
            hour,
            maxCount
        });

        // Salvează noua rezervare în baza de date
        const booking = await newBooking.save();

        // Trimite un răspuns de succes către client
        res.send('Room Booked Successfully');
    } catch (error) {
        // Trimite un răspuns de eroare către client în caz de eșec
        res.status(400).json({ error: error.message });
    }
});

// Ruta pentru a obține rezervările unui utilizator pe baza ID-ului utilizatorului
router.post("/getbookingsbyuserid", async (req, res) => {
    const userid = req.body.userid; // Extrage ID-ul utilizatorului din corpul cererii

    try {
        // Găsește toate rezervările care corespund ID-ului utilizatorului
        const bookings = await Booking.find({ userid: userid });
        // Trimite rezervările găsite către client
        res.send(bookings);
    } catch (error) {
        // Trimite un răspuns de eroare către client în caz de eșec
        return res.status(400).json({ error });
    }
});

module.exports = router; // Exportă routerul pentru a fi folosit în alte părți ale aplicației
