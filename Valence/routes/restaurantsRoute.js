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
    const restaurantid = req.body.restaurantid;
    console.log("Received restaurantid:", restaurantid); // Log pentru restaurantid
    try {
        if (!restaurantid) {
            return res.status(400).json({ message: "Restaurant ID is required" });
        }

        const restaurant = await Restaurant.findById(restaurantid);
        console.log("Found restaurant:", restaurant); // Log pentru restaurant

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        return res.json({ restaurant });
    } catch (error) {
        console.error("Error fetching restaurant:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;