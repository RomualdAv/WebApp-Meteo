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

// Route pour rechercher une ville par son nom
router.get('/search', async (req, res) => {
    try {
        const cityName = req.query.ville;
        const cities = await db.searchCity(cityName);
        res.json(cities); // Renvoyer les résultats de la recherche au format JSON
    } catch (err) {
        res.status(500).send('Erreur interne du serveur');
    }
});


module.exports = router;