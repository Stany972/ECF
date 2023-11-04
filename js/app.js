var films = [
  {
      title: "Deadpool",
      years: 2016,
      authors: "Tim Miller"
  },
  {
      title: "Spiderman",
      years: 2002,
      authors: "Sam Raimi"
  },
  {
      title: "Scream",
      years: 1996,
      authors: "Wes Craven"
  },
  {
      title: "It: chapter 1",
      years: 2019,
      authors: "Andy Muschietti"
  }
];
// Ajoutez une variable globale pour stocker le filtre actuel
let currentFilter = 'none';

// Fonction pour afficher les films dans le tableau
function displayFilms() {
  const filmListBody = document.getElementById('filmListBody');
  filmListBody.innerHTML = '';

  // Copiez le tableau des films pour ne pas modifier l'original
  let filmsCopy = [...films];

  // Triez les films en fonction du filtre
  if (currentFilter === 'title') {
    filmsCopy.sort((a, b) => a.title.localeCompare(b.title));
  } else if (currentFilter === 'year') {
    filmsCopy.sort((a, b) => b.years - a.years);
  }

  filmsCopy.forEach(film => {
    const row = filmListBody.insertRow();
    const titleCell = row.insertCell(0);
    const yearCell = row.insertCell(1);
    const authorCell = row.insertCell(2);
    const actionCell = row.insertCell(3);

    titleCell.textContent = film.title;
    yearCell.textContent = film.years;
    authorCell.textContent = film.authors;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.addEventListener('click', function () {
      deleteFilm(film);
    });

    actionCell.appendChild(deleteButton);
  });
}

// Ajoutez une fonction pour mettre à jour le filtre
function filtreFilms() {
  const filtre = document.getElementById('filtre');
  currentFilter = filtre.value;
  displayFilms();
}

// Fonction pour afficher le formulaire d'ajout
function showForm() {
  const formDiv = document.getElementById('formDiv');
  formDiv.style.display = 'block';

}

// Fonction pour ajouter un film
function addFilm() {
  const titleInput = document.getElementById('titleInput').value;
  const yearInput = document.getElementById('yearInput').value;
  const authorInput = document.getElementById('authorInput').value;

  /// Valider les données
  if (titleInput.length < 2 || isNaN(yearInput) || yearInput < 1900 || yearInput > new Date().getFullYear() || authorInput.length < 5) {
    // Afficher un message d'erreur pendant 3s : "Erreur dans le formulaire " + les zones d'erreurs
    message.innerHTML = '<div class="alert alert-danger" role="alert">Erreur dans le formulaire. Vérifiez les zones suivantes :<br>' +
    'Titre (minimum 2 caractères)<br>' +
    'Année (format de l\'année 4 chiffres entre 1900 et l\'année en cours)<br>' +
    'Auteur (minimum de 5 caractères)</div>';
    return; // Sortir de la fonction si les données ne sont pas valides
  }

  // Si les données sont valides, ajouter le film dans le tableau
  const newFilm = {
      title: titleInput.charAt(0).toUpperCase() + titleInput.slice(1), // Mettre la première lettre en majuscule
      years: parseInt(yearInput), // Convertir en entier
      authors: authorInput.charAt(0).toUpperCase() + authorInput.slice(1) // Mettre la première lettre en majuscule
  };
  films.push(newFilm);
  displayFilms();

  // Réinitialiser le formulaire et masquer
  document.getElementById('titleInput').value = '';
  document.getElementById('yearInput').value = '';
  document.getElementById('authorInput').value = '';
  document.getElementById('formDiv').style.display = 'none';

  // Afficher un message d'alerte pendant 3s : "Film ajouté avec succès"
  message.innerHTML = '<div class="alert alert-success" role="alert">Film ajouté avec succès !'
}

// Fonction pour supprimer un film
function deleteFilm(film) {
  // Demander une confirmation de suppression
  const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer ce film?");

  if (confirmDelete) {
      const index = films.indexOf(film);
      films.splice(index, 1);
      displayFilms();
  }
}
// Appel initial pour afficher les films
displayFilms();



