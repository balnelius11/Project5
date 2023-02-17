const url = "http://localhost:3000/api/products";
var contenu = document.getElementById("items")
var prendreArticles = () => {
    fetch(url)
    .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson ? await response.json() : null;

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
        }
        

        for (index in data){
            contenu.innerHTML += `
            <a href="./product.html?id="${data[index]._id}">
            <article>
              <img src="${data[index].imageUrl}" alt="${data[index].altTxt}">
              <h3 class="productName">${data[index].name}</h3>
              <p class="productDescription">${data[index].description}</p>
            </article>
          </a>
          `
      }
    })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }
    
prendreArticles()

