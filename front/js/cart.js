const form = document.querySelector('.cart__order__form');
const firstNameInput = document.querySelector('#firstName');
const lastNameInput = document.querySelector('#lastName');
const cityInput = document.querySelector('#city');
const emailInput = document.querySelector('#email');
const nameRegex = /^[a-zA-Z]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener('submit', function(event) {
  let firstName = firstNameInput.value;
  let lastName = lastNameInput.value;
  let city = cityInput.value;
  let email = emailInput.value;
  
  // Réinitialiser tous les messages d'erreur avant de vérifier chaque champ
  document.querySelector('#firstNameErrorMsg').textContent = '';
  document.querySelector('#lastNameErrorMsg').textContent = '';
  document.querySelector('#cityErrorMsg').textContent = '';
  document.querySelector('#emailErrorMsg').textContent = '';

  if (!firstName.match(nameRegex)) {
    event.preventDefault();
    document.querySelector('#firstNameErrorMsg').textContent = 'Le prénom ne doit contenir que des lettres.';
  }
  if (!lastName.match(nameRegex)) {
    event.preventDefault();
    document.querySelector('#lastNameErrorMsg').textContent = 'Le nom ne doit contenir que des lettres.';
  }
  if (!city.match(nameRegex)) {
    event.preventDefault();
    document.querySelector('#cityErrorMsg').textContent = 'La ville ne doit contenir que des lettres.';
  }
  if (!email.match(emailRegex)) {
    event.preventDefault();
    document.querySelector('#emailErrorMsg').textContent = 'Veuillez saisir une adresse email valide.';
  }

  // Vérifier s'il y a des messages d'erreur, puis afficher un message d'erreur global
  const errorMessages = document.querySelectorAll('.cart__order__form p');
  let isError = false;
  errorMessages.forEach(function(errorMessage) {
    if (errorMessage.textContent !== '') {
      isError = true;
    }
  });
  if (isError) {
    event.preventDefault();
    alert('Erreur détectée, vérifiez le formulaire');
  }
});

// -----------------------------------------------------------------
// On sélectionne le bouton ayant l'ID "mon-bouton"
const bouton = document.querySelector('#order');
var customer = {}
// On ajoute un écouteur d'événement pour le clic sur ce bouton
bouton.addEventListener('click', function() {

  // On récupère les valeurs des champs de formulaire
  const firstName = document.querySelector('#firstName').value;
  const lastName = document.querySelector('#lastName').value;
  const address = document.querySelector('#address').value;
  const city = document.querySelector('#city').value;
  const email = document.querySelector('#email').value;

  // On crée un objet avec ces valeurs
  const customer = {
    firstName,
    lastName,
    address,
    city,
    email
  };

  // On affiche cet objet dans la console pour vérification
  console.log(customer);
  return(customer)
  // Ici, vous pouvez ajouter le code pour envoyer les données à un serveur ou effectuer une autre action en fonction de vos besoins.
});

// On ajoute un événement "click" sur le bouton de commande
const orderButton = document.querySelector('#order');
orderButton.addEventListener('click', submitOrder);

// Fonction pour envoyer la commande au serveur
async function submitOrder() {
  try {
    // On envoie la commande au serveur
    const response = await fetch('http://localhost:3000/api/products/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    });
    
    // On récupère la réponse du serveur
    const data = await response.json();
    
    // On affiche le message de confirmation
    alert(data.message);
    
    // On redirige l'utilisateur vers la page d'accueil
    window.location.href = '/';
  } catch (error) {
    console.error(error);
    alert('Une erreur est survenue lors de l\'envoi de la commande.');
  }
}
