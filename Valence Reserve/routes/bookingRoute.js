const express = require('express');
const router = express.Router();
const Booking = require('../models/bookings');
const Restaurant = require('../models/restaurant')

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

        const booking = await newBooking.save();

        res.send('Room Booked Successfully');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.post("/getbookingsbyuserid", async (req,res) =>{
    const userid = req.body.userid

    try{
        const bookings = await Booking.find({userid : userid})
        res.send(bookings)
    }catch(error){
        return res.status(400).json({error});
    }

});
module.exports = router;
