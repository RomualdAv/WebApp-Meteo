document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');

    searchForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(searchForm);
        const cityName = formData.get('ville');

        try {
            const response = await fetch(`/search?ville=${encodeURIComponent(cityName)}`);
            const cities = await response.json();

            const citiesTableBody = document.getElementById('citiesTableBody');
            citiesTableBody.innerHTML = '';

            cities.forEach(city => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${city.name}</td><td>${city.long}</td><td>${city.lat}</td>`;
                citiesTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Erreur lors de la recherche de la ville :', error);
        }
    });
});
