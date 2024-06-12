const express = require("express");
const router =express.Router();

const restaurant = require('../models/restaurant')

router.get("/getallrestaurants", async (req,res) => {
    try{
    const restaurants =  await restaurant.find({});
    return res.json({restaurants});
    } catch (error){
        console.error("Error fetching restaurants:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

});

router.post("/getrestaurantbyid", async (req, res) => {
    const restaurantid = req.query.restaurantid;
    console.log("Am primit restaurantul:", restaurantid); // Log pentru restaurantid
    try {
        if (!restaurantid) {
            return res.status(400).json({ message: "Restaurant ID is required" });
        }

        const restaurant = await restaurant.findById(restaurantid);
        console.log("Found restaurant:", restaurant); // Log pentru restaurant

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        return res.json({ restaurant });
    } catch (error) {
        console.error("Eroare la restaurant route:", error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid restaurant ID" });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;