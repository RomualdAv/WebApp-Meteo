document.addEventListener('DOMContentLoaded', function() { // attend que le chargement de la page soit terminée
    const searchForm = document.getElementById('searchForm');

    searchForm.addEventListener('submit', async function(event) {
        event.preventDefault(); //Empêche le comportement par défaut sinon cela rechargerait entièrement la page

        const formData = new FormData(searchForm); //Récuperation des données du form - (ville: "Paris")
        const cityName = formData.get('ville'); //Récuperation de la ville

        try {
            const response = await fetch(`/search?ville=${encodeURIComponent(cityName)}`); // requete GET vers l'URL
            const cities = await response.json();

            const citiesTableBody = document.getElementById('citiesTableBody');
            citiesTableBody.innerHTML = '';

            cities.forEach(city => {
                const row = document.createElement('tr');
                row.setAttribute('onclick', `fetchWeatherData('${city.long}', '${city.lat}')`);
                row.innerHTML = `<td>${city.name}</td><td>${city.long}</td><td>${city.lat}</td>`;
                citiesTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Erreur lors de la recherche de la ville :', error);
        }
    });
});


function fetchWeatherData(longitude, latitude) {
    const apiUrl = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`;
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données météo');
            }
            return response.json();
        })
        .then(weatherData => {
            // Fonction pour interpréter et afficher les données météo sur la page
            displayWeatherData(weatherData);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données météo :', error);
        });
}

function displayWeatherData(weatherData) {
    alert(weatherData.properties.meta.updated_at);
}