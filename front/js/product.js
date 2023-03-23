const product = window.location.search.split('?id=').join('')
// récupérer l'ID, retirer les autres caractère et le 2ème élément de l'array
const id = product
let productData = [];
// définir productData
const fetchproduit = async () => {
  //créer la fonction asynchrone pour récupérer les données
  await fetch(`http://localhost:3000/api/products/${product}`)
    // récupérer le lien de l'api et y adjoindre l'id pour retrouver le produit
    .then((response) => response.json())
    // mettre la réponse au format json
    .then((promise) => {
      productData = promise;
      console.log(productData)
    }
      //mettre la promesse dans la variable productData
    );
};
const produitDispo = async () => {
  await fetchproduit();
  // !important pour récupérer productdata
  document.querySelector(".item__img").innerHTML = `<img src="${productData.imageUrl}" alt="${productData.altTxt}" />`;
  //ajouter dans la section item image les données  correspondant a l'image et au texte alternatif
  document.getElementById('title').innerText = productData.name;
  //même chose que le précédent mais pour ajouter le titre dans les données
  document.getElementById('price').innerText = productData.price;
  //même chose que le précédent mais pour ajouter le titre
  document.getElementById('description').innerText = productData.description;
  //même chose que le précédent mais pour ajouter la description
  const colorsList = productData.colors.map((color) => {
    //création de la nouvelle variable  pour créer un tableau de la liste des couleurs
    let option = document.createElement('option');
    //création de l'élément option
    option.value = color;
    //donner une valeur a la couleur
    option.innerText = color;
    //insérer la couleur sous forme de texte
    document.getElementById('colors').appendChild(option);
    //prendre l'élément par id color et lui mettre en enfant option qu'on viens de créer
  });
};

// Créer un tableau cartItems avec item

let cartItems = {
  'item' : []
}

// Vérifie si localStorage contient des données (Ex : Panier d'autres pages)
// Si contient des données, push les données dans le tableau cartItems grâce à la boucle FOR
// Pour ne pas écraser les données du localStorage

if (typeof localStorage.cartItems !== "undefined") {
  const pushItems = JSON.parse(localStorage.getItem("cartItems"))
  let numberOfItems = pushItems.item.length - 1

  for (let n = 0; n <= numberOfItems; n++) {
    cartItems.item.push({"id" : pushItems.item[`${n}`].id, "color" : pushItems.item[`${n}`].color, "quantity" : pushItems.item[`${n}`].quantity})
  }
}
console.log(cartItems.item)
// Récupère color et quantity sélectionnées
// Si quantity = 0, ne rien faire (pour ne créer de ligne vide)
// Si l'ID ET color sont déja dans le tableau, trouve l'index et modifie la quantité et met à jour le localStorage
// Sinon push l'entrée dans le tableau et met à jour le localStorage

function addToCartData(evenement) {
  const selectedColor = document
  .getElementById("colors").value

  const selectedQuantity = document
  .getElementById("quantity").value


  if (selectedQuantity === "0" || selectedColor === "") {
    alert("Quantity must be above 0, item not created");
  } else if ((cartItems.item.find(item => item.id === id && item.color === selectedColor))) {
    alert("l'article a été ajouté au panier");
    let itemIndex = cartItems.item.findIndex(item => item.id === id && item.color === selectedColor)
    console.log(itemIndex)
    const cartItemQuantity = +cartItems.item[`${itemIndex}`].quantity
    const quantityToAdd = +selectedQuantity
    const totalQuantity = cartItemQuantity + quantityToAdd
    if (totalQuantity >100){
      alert("Quantity must be below 100")
      return
    }
    cartItems.item[`${itemIndex}`].quantity = `${cartItemQuantity + quantityToAdd}`

    localStorage.setItem("cartItems", JSON.stringify(cartItems))

  } else {
    if (selectedQuantity <= 100) {
      cartItems.item.push({"id" : id, "color" : selectedColor, "quantity" : selectedQuantity})
    } else {
      cartItems.item.push({"id" : id, "color" : selectedColor, "quantity" : "100"})
    }
    alert("l'article a été ajouté au panier");
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }
}

// Récupère le button dans le DOM
// Ècoute son click event et appelle addToCartData

const addToCart = document.getElementById("addToCart")
addToCart.addEventListener("click", addToCartData)

produitDispo()