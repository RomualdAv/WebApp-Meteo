const express = require('express');
const router = express.Router();
const db = require('../models/city');

// Route pour afficher toutes les villes
router.get('/', async (req, res) => {
    try {
        const cities = await db.getAllCities();
        res.render('index', { cities });
    } catch (err) {
        res.status(500).send("Erreur interne du serveur lors de l'affichage des villes");
    }
});

// Route pour rechercher une ville par son nom
router.get('/search', async (req, res) => {
    try {
        const cityName = req.query.ville; // Paramètres dans l'url récup par Express
        const cities = await db.searchCity(cityName);
        res.json(cities);
    } catch (err) {
        res.status(500).send("Erreur interne du serveur lors de la recherche");
    }
});


// Route pour l'ajout d'une ville
router.post('/add-city', async (req, res) => {
    try {
        const { name, longitude, latitude } = req.body; // Récupération des données du formulaire
        await db.addCity(name, longitude, latitude); // Ajout de la ville dans la base de données
        res.redirect('/'); // Redirection vers la page d'accueil après l'ajout de la ville
    } catch (err) {
        res.status(500).send("Erreur interne du serveur lors de l'ajout");
    }
});


module.exports = router;