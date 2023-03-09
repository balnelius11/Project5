let productParsed = JSON.parse(localStorage.getItem("cartItems"));
//récupérer le panier dans le localstorage
item2 = productParsed.item
//stocker ce qui est contenu dans item, dans item 2

if (productParsed == null || productParsed == 0 ) {
    const cart = document.querySelector('.cart').innerHTML += `Votre panier est vide`;
} 
//ajout de l'avertissement de panier vide 
console.log(item2)
let index = 0
console.log(item2[index])
//definir index a 0 pour la suite

let productData = 0
const fetchProduit = async () => {
    //créer la fonction asynchrone pour récupérer les données
    await fetch(`http://localhost:3000/api/products/${item2[0].id}`)
      // récupérer le lien de l'api et y adjoindre l'id pour retrouver le produit
      .then((response) => response.json())
      // mettre la réponse au format json
      .then((promise) => {
       var  productData = promise;
        document.innerHTML += `
        <article class="cart__item" data-id="${productData._id}" data-color="${item2[0].color}">
            <div class="cart__item__img">
                <img src="${productData.imageUrl}" alt="Photographie d'un canapé">
            </div>
        `
      //mettre la promesse dans la variable productData
      console.log(productData)
      });
};
productData = fetchProduit()
console.log(productData)
async function test() {
    for (let index = 0; index < item2.length; index++) {
    document.innerHTML += `
    <article class="cart__item" data-id="${item2[index].id}" data-color="${item2[index].color}">
        <div class="cart__item__img">
            <img src="${productData.imageUrl}" alt="Photographie d'un canapé">
        </div>
    `
}
}