const express = require("express");
const router = express.Router(); // Crează un router Express
const restaurant = require('../models/restaurant'); // Importă modelul de restaurant

// Ruta pentru a obține toate restaurantele
router.get("/getallrestaurants", async (req, res) => {
    try {
        // Găsește toate restaurantele din baza de date
        const restaurants = await restaurant.find({});
        return res.json({ restaurants }); // Trimite lista de restaurante în format JSON
    } catch (error) {
        console.error("Error fetching restaurants:", error); // Afișează eroarea în consolă
        return res.status(500).json({ message: "Internal server error" }); // Trimite un răspuns de eroare 500
    }
});

// Ruta pentru a obține un restaurant după ID
router.post("/getrestaurantbyid", async (req, res) => {
    const restaurantid = req.query.restaurantid; // Extrage ID-ul restaurantului din query-ul cererii
    console.log("Am primit restaurantul:", restaurantid); // Log pentru restaurantid

    try {
        if (!restaurantid) {
            return res.status(400).json({ message: "Restaurant ID is required" }); // Verifică dacă ID-ul este furnizat
        }

        // Găsește restaurantul după ID în baza de date
        const restaurant = await restaurant.findById(restaurantid);
        console.log("Found restaurant:", restaurant); // Log pentru restaurant

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" }); // Verifică dacă restaurantul există
        }

        return res.json({ restaurant }); // Trimite detaliile restaurantului în format JSON
    } catch (error) {
        console.error("Eroare la restaurant route:", error); // Afișează eroarea în consolă
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid restaurant ID" }); // Trimite un răspuns de eroare 400 dacă ID-ul este invalid
        }
        return res.status(500).json({ message: "Internal server error" }); // Trimite un răspuns de eroare 500 pentru alte erori
    }
});

module.exports = router; // Exportă routerul pentru a fi folosit în alte părți ale aplicației
