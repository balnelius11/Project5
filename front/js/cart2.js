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

