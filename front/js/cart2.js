let productsToDisplay = [];

let productParsed = JSON.parse(localStorage.getItem("cartItems"));
let item2 = productParsed?.item ?? [];

console.log(productParsed);

if (item2.length === 0) {
  const cart = document.querySelector('.cart');
  cart.innerHTML = `Votre panier est vide`;
}

let fetchPromises = item2.map((item) => {
  const url = "http://localhost:3000/api/products/" + item.id;
  return fetch(url)
    .then(async response => {
      const isJson = response.headers.get('content-type')?.includes('application/json');
      const data = isJson ? await response.json() : null;
      if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }
      productsToDisplay.push({ id: item.id, quantity: parseInt(item.quantity), color: item.color, data: { ...data, price: parseFloat(data.price) }});
      // ParseInt permet de convertir en entier  la quantité, ...data, price: parseFloat(data.price) permet de convertir en nombre à virgule data.price
    })
    .catch(error => console.error(`Erreur lors de la récupération du produit ${item.id} : ${error}`));
});

Promise.all(fetchPromises)
  .then(() => {
    let cartContent = "";
    let totalPrice = 0
    let totalQuantity = 0
    for (let i = 0; i < productsToDisplay.length; i++) {
      const { id, quantity, color, data } = productsToDisplay[i];
      const total = quantity * data.price;
      totalPrice += total
      totalQuantity += quantity
      cartContent += `<article class="cart__item" data-id="${id}" data-color="${color}">
        <div class="cart__item__img">
          <img src="${data.imageUrl}" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${data.name}</h2>
            <p>${color}</p>
            <p>${data.price},00 €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
            </div>
            <div class="total">
            <br>
            <p> total= ${total},00 €</p>
            <br>
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
    }
    const cart = document.querySelector('#cart__items');
    cart.innerHTML = cartContent;
    const cartPriceSection = document.querySelector('.cart__price');
      cartPriceSection.innerHTML = `<p>Total (<span id="totalQuantity">${totalQuantity}</span> articles) : <span id="totalPrice">${totalPrice}</span> ,00€</p>`;
    // Ajouter un écouteur d'événements pour supprimer des produits
    const deleteButtons = document.querySelectorAll('.deleteItem');
    deleteButtons.forEach(button => {
      button.addEventListener('click', () => {
        const cartItem = button.closest('.cart__item');
        const itemId = cartItem.dataset.id;
        const itemColor = cartItem.dataset.color;

        // Supprimer l'article du panier
        cartItem.remove();

        // Mettre à jour le tableau d'articles à afficher
        productsToDisplay = productsToDisplay.filter(item => item.id !== itemId || item.color !== itemColor);

        // Mettre à jour le local storage
        const cartItems = JSON.parse(localStorage.getItem("cartItems"));
        const updatedItems = cartItems.item.filter(item => item.id !== itemId || item.color !== itemColor);
        localStorage.setItem("cartItems", JSON.stringify({ item: updatedItems }));
      });
    });

    // Ajouter un écouteur d'événements pour modifier la quantité des produits
    const quantityInputs = document.querySelectorAll('.itemQuantity');
    quantityInputs.forEach(input => {
      input.addEventListener('change', () => {
        const cartItem = input.closest('.cart__item');
        const itemId = cartItem.dataset.id;
        const itemColor = cartItem.dataset.color;
        const newQuantity = parseInt(input.value);

        // Mettre à jour la quantité dans le tableau d'articles à afficher
        productsToDisplay.forEach(item => {
          if (item.id === itemId && item.color === itemColor) {
            item.quantity = newQuantity;
          }
        });

        // Mettre à jour le local storage
        const cartItems = JSON.parse(localStorage.getItem("cartItems"));
        const updatedItems = cartItems.item.map(item => {
          if (item.id === itemId && item.color === itemColor) {
            item.quantity = newQuantity;
          }
          return item;
        });
        localStorage.setItem("cartItems", JSON.stringify({ item: updatedItems }));

        // Mettre à jour la page web
        if (newQuantity === 0) {
          // Supprimer l'article du panier
          cartItem.remove();

          // Mettre à jour le tableau d'articles à afficher
          productsToDisplay = productsToDisplay.filter(item => item.id !== itemId || item.color !== itemColor);

          // Mettre à jour le local storage
          const updatedItems = cartItems.item.filter(item => item.id !== itemId || item.color !== itemColor);
          localStorage.setItem("cartItems", JSON.stringify({ item: updatedItems }));
        }
        window.location.reload()
      });
    });
  }
)
// ---------------------partie formulaire-------------------
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


/*
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
  const customer2 = {
    firstName,
    lastName,
    address,
    city,
    email
  };
  customer = customer2
  // On affiche cet objet dans la console pour vérification
  console.log(customer2);
  // Ici, vous pouvez ajouter le code pour envoyer les données à un serveur ou effectuer une autre action en fonction de vos besoins.
});
alert(JSON.parse(JSON.stringify(customer)));

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
*/
