const express = require("express");
const router = express.Router(); // Creează un router Express
const User = require("../models/user"); // Importă modelul de utilizator

// Ruta pentru înregistrarea unui nou utilizator
router.post("/register", async (req, res) => {
    const newuser = new User(req.body); // Creează un nou utilizator cu datele din corpul cererii

    try {
        // Salvează noul utilizator în baza de date
        const user = await newuser.save();
        res.send('User Registered Successfully'); // Trimite un mesaj de succes către client
    } catch (error) {
        // Trimite un răspuns de eroare către client în caz de eșec
        return res.status(400).json({ error });
    }
});

// Ruta pentru autentificarea unui utilizator
router.post("/login", async (req, res) => {
    const { email, password } = req.body; // Extrage email-ul și parola din corpul cererii

    try {
        // Găsește utilizatorul cu email-ul și parola specificate
        const user = await User.findOne({ email: email, password: password });

        if (user) {
            // Dacă utilizatorul este găsit, creează un obiect temporar cu detalii relevante
            const temp = {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user._id,
            };
            res.send(temp); // Trimite detaliile utilizatorului către client
        } else {
            // Dacă utilizatorul nu este găsit, trimite un răspuns de eroare 400
            return res.status(400).json({ message: "Login failed" });
        }
    } catch (error) {
        // Trimite un răspuns de eroare către client în caz de eșec
        return res.status(400).json({ error });
    }
});

module.exports = router; // Exportă routerul pentru a fi folosit în alte părți ale aplicației
