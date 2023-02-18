const product = window.location.search.split('?id=').join('')
let productData = [];
const fetchproduit = async () => {
    await fetch(`http://localhost:3000/api/products/${product}`)
    .then((response) => response.json())
    .then((promise) => {
    productData = promise;
    }
);
};
const produitDispo = async() => {
    await fetchproduit();
    console.log(productData)
    document.querySelector(".item__img").innerHTML = `<img src="${productData.imageUrl}" alt="${productData.altTxt}" />`;
    document.getElementById('title').innerText = productData.name;
    document.getElementById('price').innerText = productData.price;
    document.getElementById('description').innerText = productData.description;
    const colorsList = productData.colors.map((color) => {
        let option = document.createElement('option');
        option.value = color;
        option.innerText = color;
        document.getElementById('colors').appendChild(option);
      });
      
      document.getElementById('addToCart').addEventListener('click', (event) => {
        event.preventDefault();
        const quantity = document.getElementById('quantity').value;
        const color = document.getElementById('colors').value;
        if (quantity > 0 && color !== '') {
          const cart = {
            product: productData.name,
            quantity: quantity,
            color: color,
            price: productData.price,
          };
          const cartString = localStorage.getItem('cart');
          let cartArray;
          if (cartString == null) {
            cartArray = Array();
          } else {
            cartArray = JSON.parse(cartString);
          }
          cartArray.push(cart);
          localStorage.setItem('cart', JSON.stringify(cartArray));
          window.location = './cart.html';
        }
      });
};

produitDispo()

