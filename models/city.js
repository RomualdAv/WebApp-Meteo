const sqlite3 = require('sqlite3');
const path = require('path');

async function getAllCities() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(path.join(__dirname, 'main.db'));
        const query = 'SELECT * FROM city';

        db.all(query, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
            db.close();
        });
    });
}

async function searchCity(cityName) {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(path.join(__dirname, 'main.db'));
        const query = 'SELECT * FROM city WHERE name LIKE ?'; // Utilisation de LIKE pour rechercher des correspondances partielles

        db.all(query, [`%${cityName}%`], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
            db.close();
        });
    });
}

module.exports = {
    getAllCities,
    searchCity
};