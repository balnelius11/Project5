const url = "http://localhost:3000/api/products";
//déclarer l'url
var contenu = document.getElementById("items")
//prendre les éléments par ID
var prendreArticles = () => {
    //déclaration de de la variable pour récupérer les données article
    fetch(url)
    //récupérer les données de l'URL
    .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson ? await response.json() : null;
        //récupérer les données au format json
        if (!response.ok) {
            
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
        }
        // créer un message d'erreur en cas de réponse non égale a ok et retourner la promesse
        console.log(data)

        for (index in data){
            //pour chaque index dans les données 
            contenu.innerHTML += `
            <a href="./product.html?id=${data[index]._id}">
            <article>
              <img src="${data[index].imageUrl}" alt="${data[index].altTxt}">
              <h3 class="productName">${data[index].name}</h3>
              <p class="productDescription">${data[index].description}</p>
            </article>
          </a>
          `
          //remplacer les données par les images, l'id etc etc
      }
    })
        .catch(error => {
            console.error('There was an error!', error);
        });
        //en cas d'erreur renvoyer un message d'erreur
    }
    
prendreArticles()
//appeler la fonction pour tout lancer

