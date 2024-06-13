const express = require('express');
const router = express.Router();
const Booking = require('../models/bookings');

// Ruta pentru a crea o nouă rezervare
router.post('/addbooking', async (req, res) => {
    const { restaurant, name, date, hour, maxCount } = req.body;

    try {
        const newBooking = new Booking({
            restaurant: restaurant.name,
            name,
            date,
            hour,
            maxCount
        });

        await newBooking.save();
        res.send('Room Booked Successfully');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
