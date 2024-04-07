const express = require('express');
const router = express.Router();
const db = require('../models/city');

// Route pour afficher toutes les villes
router.get('/', async (req, res) => {
    try {
        const cities = await db.getAllCities();
        res.render('index', { cities });
    } catch (err) {
        res.status(500).send('Erreur interne du serveur');
    }
});

module.exports = router;