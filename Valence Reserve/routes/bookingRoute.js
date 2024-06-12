const express = require('express');
const router = express.Router();
const Booking = require('../models/bookings');

// Ruta pentru a crea o nouă rezervare
router.post('/addbooking', async (req, res) => {
    const { user, restaurant, name, date, hour, maxCount } = req.body;

    try {
        const newBooking = new Booking({
            name,
            date,
            hour,
            maxCount
        });
        await newBooking.save();
        res.status(201).send('Booking created successfully');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
