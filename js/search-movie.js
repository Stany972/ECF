// Fonction pour effectuer la recherche via OMDB
function searchOMDB() {
    // Récupérez les valeurs du formulaire
    const title = document.getElementById('titleInput').value;
    const year = document.getElementById('yearInput').value;
    const type = document.getElementById('typeSelect').value;

    // Construire l'URL de l'API avec les paramètres et la clé API
    const apiKey = 'c67075f7';
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&`;
    const searchParams = new URLSearchParams({
        s: title,
        y: year,
        type: type,
    });
    const fullUrl = apiUrl + searchParams.toString();

    // Effectuez la requête à l'API OMDB
    fetch(fullUrl)
        .then(response => response.json())
        .then(data => {
            // Code pour afficher les résultats
            displayResults(data.Search);
        })
        .catch(error => {
            console.error('Erreur lors de la requête OMDB:', error);
        });
}

// Fonction pour afficher les résultats de recherche
function displayResults(results) {
    const searchResultsDiv = document.getElementById('searchResults');
    searchResultsDiv.innerHTML = ''; // Efface le contenu précédent

    if (!results || results.length === 0) {
        searchResultsDiv.innerHTML = '<p>Aucun résultat trouvé.</p>';
        return;
    }

    // Boucle à travers les résultats et crée des éléments pour chaque résultat
    results.forEach(result => {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result-item');

        // Ajoutez le titre, l'année et l'image du film s'il est disponible
        resultDiv.innerHTML = `
            <h3>${result.Title}</h3>
            <p>Année: ${result.Year}</p>
            ${result.Poster !== 'N/A' ? `<img src="${result.Poster}" alt="${result.Title} Poster">` : ''}
        `;

        // Ajoutez le résultat à la liste des résultats
        searchResultsDiv.appendChild(resultDiv);
    });
}
