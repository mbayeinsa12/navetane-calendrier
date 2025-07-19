const matchForm = document.getElementById('matchForm');
const matchList = document.getElementById('matchList');

let matchs = JSON.parse(localStorage.getItem('matchs')) || [];
let matchEnCoursIndex = null;

// Affiche les matchs triés par date
function afficherMatchs() {
  matchList.innerHTML = "";

  // Trier les matchs par date et heure
  matchs.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.heure}`);
    const dateB = new Date(`${b.date}T${b.heure}`);
    return dateA - dateB;
  });

  matchs.forEach((match, index) => {
    const li = document.createElement('li');
    li.textContent = `${match.equipe1} vs ${match.equipe2} - ${match.date} à ${match.heure}`;

    // Supprimer
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Supprimer";
    deleteBtn.onclick = () => supprimerMatch(index);

    // Modifier
    const editBtn = document.createElement('button');
    editBtn.textContent = "Modifier";
    editBtn.style.backgroundColor = "#ffc107";
    editBtn.style.right = "100px";
    editBtn.onclick = () => remplirFormulairePourEdition(index);

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    matchList.appendChild(li);
  });
}

// Soumission formulaire
matchForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const equipe1 = document.getElementById('equipe1').value;
  const equipe2 = document.getElementById('equipe2').value;
  const date = document.getElementById('date').value;
  const heure = document.getElementById('heure').value;

  const nouveauMatch = { equipe1, equipe2, date, heure };

  if (matchEnCoursIndex === null) {
    // Ajout
    matchs.push(nouveauMatch);
  } else {
    // Modification
    matchs[matchEnCoursIndex] = nouveauMatch;
    matchEnCoursIndex = null;
  }

  localStorage.setItem('matchs', JSON.stringify(matchs));
  afficherMatchs();
  matchForm.reset();
});

// Remplit le formulaire pour modification
function remplirFormulairePourEdition(index) {
  const match = matchs[index];
  document.getElementById('equipe1').value = match.equipe1;
  document.getElementById('equipe2').value = match.equipe2;
  document.getElementById('date').value = match.date;
  document.getElementById('heure').value = match.heure;

  matchEnCoursIndex = index;
}

// Supprimer
function supprimerMatch(index) {
  if (confirm("Voulez-vous vraiment supprimer ce match ?")) {
    matchs.splice(index, 1);
    localStorage.setItem('matchs', JSON.stringify(matchs));
    afficherMatchs();
  }
}

// Affiche au chargement
afficherMatchs();
