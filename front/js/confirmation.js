//DOM
const orderId = document.querySelector("#orderId");

//search les données de l'id saisie
let url = new URL(document.location).searchParams;
let urlOrderId = url.get("orderid");

//mettre les données dans le dom
orderId.textContent = urlOrderId;