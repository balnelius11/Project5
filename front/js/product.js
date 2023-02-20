const product = window.location.search.split('?id=').join('')
// récupérer l'ID, retirer les autres caractère et le 2ème élément de l'array
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
    }
    //mettre la promesse dans la variable productData
);
};
const produitDispo = async() => {
    await fetchproduit();
    // !important pour récupérer productdata
    console.log(productData)
    //vérifier productData
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

produitDispo()

