//récupérer les données produit de l'url et l'afficher
const orderID = window.location.search.split('?id=').join('')
const orderId = document.querySelector(".confirmation").innerHTML = ` <p>Commande validée ! <br>Votre numéro de commande est : <span id="orderId">${orderID}</span></p>`;
localStorage.clear()