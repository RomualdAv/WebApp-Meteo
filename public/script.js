document.addEventListener('DOMContentLoaded', function() { // attend que le chargement de la page soit terminée
    const searchForm = document.getElementById('searchForm');

    searchForm.addEventListener('submit', async function(event) {
        event.preventDefault(); //Empêche le comportement par défaut sinon cela rechargerait entièrement la page

        const formData = new FormData(searchForm); //Récuperation des données du form (ville: "Paris")
        const cityName = formData.get('ville'); //Récuperation de la ville

        try {
            const response = await fetch(`/search?ville=${encodeURIComponent(cityName)}`); // requete GET vers l'URL
            const cities = await response.json();

            const citiesTableBody = document.getElementById('citiesTableBody');
            citiesTableBody.innerHTML = '';

            cities.forEach(city => {
                const row = document.createElement('tr');
                row.setAttribute('onclick', `fetchWeatherData('${city.name}', '${city.long}', '${city.lat}')`);
                row.innerHTML = `<td>${city.name}</td><td>${city.long}</td><td>${city.lat}</td>`;
                citiesTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Erreur lors de la recherche de la ville :', error);
        }
    });
});


async function fetchWeatherData(name, longitude, latitude) {
    const cityTitle = document.getElementById('cityTitle');
    cityTitle.innerHTML = name;
    
    const apiUrl = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Obtenir la date et heure actuelles au format ISO
        const currentDateTime = new Date();
        
        if(currentDateTime.getMinutes() < 30) {currentDateTime.setHours(currentDateTime.getHours() + 2);} //Fuseau horaire de Paris
        else {currentDateTime.setHours(currentDateTime.getHours() + 3);}
        
        currentDateTime.setMinutes(0);
        currentDateTime.setSeconds(0);
        currentDateTime.setMilliseconds(0);
        const currentDateTimeISO = currentDateTime.toISOString().slice(0, -5) + "Z";;

        // Rechercher les données météo pour la date et heure actuelles
        const weatherData = data.properties.timeseries.find(entry => entry.time === currentDateTimeISO);

        if (weatherData) {
            displayWeatherData(weatherData);
            return;
        } else {
            throw new Error("Aucune donnée météo disponible pour la date et heure actuelles.");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données météo :", error);
        throw error;
    }
}

function displayWeatherData(weatherData) {
    /**
        weatherData.time // Date et heure de la mesure
        weatherData.data.instant.details.air_pressure_at_sea_level
        weatherData.data.instant.details.air_temperature
        weatherData.data.instant.details.cloud_area_fraction
        weatherData.data.instant.details.relative_humidity
        weatherData.data.instant.details.wind_from_direction
        weatherData.data.instant.details.wind_speed

        weatherData.data.next_12_hours.summary.symbol_code //
        weatherData.data.next_12_hours.details.precipitation_amount // peut être nul
                        
        **/

    const mainIcon = document.getElementById('mainIcon');
    mainIcon.src = "/png/" + weatherData.data.next_1_hours.summary.symbol_code + ".png";
    const actTemperature = document.getElementById('actTemperature');
    actTemperature.innerHTML = weatherData.data.instant.details.air_temperature + "C°";
    const actCloudFraction = document.getElementById('actCloudFraction');
    actCloudFraction.innerHTML = "converture nuageuse : " + weatherData.data.instant.details.cloud_area_fraction + "%";
    const actHumidity = document.getElementById('actHumidity');
    actHumidity.innerHTML = "humidité : " + weatherData.data.instant.details.relative_humidity + "%";
    const actWindSpeed = document.getElementById('actWindSpeed');
    actWindSpeed.innerHTML = "vitesse du vent : " + weatherData.data.instant.details.wind_speed + " m/s";

    const nextHourIcon = document.getElementById('1Icon');
    nextHourIcon.src = "/png/" + weatherData.data.next_1_hours.summary.symbol_code + ".png";
    const next6HourIcon = document.getElementById('6Icon');
    next6HourIcon.src = "/png/" + weatherData.data.next_6_hours.summary.symbol_code + ".png";
    const next12HourIcon = document.getElementById('12Icon');
    next12HourIcon.src = "/png/" + weatherData.data.next_12_hours.summary.symbol_code + ".png";
}