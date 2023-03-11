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



