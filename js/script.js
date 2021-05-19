

const container = document.getElementById("bear");

fetch("http://localhost:3000/api/teddies")
    .then(response => response.json())
    .then(teddies => {
        console.log(teddies);
        for (let i = 0; i < teddies.length; i++) {
            container.innerHTML += `
        <a id="article" href="produit.html?id=${teddies[i]._id}">
        <img src="${teddies[i].imageUrl}" >
            <div class="titre">
                <h2 class="row">${teddies[i].name} </h2>
                <p class="row">${(teddies[i].price / 100)}.00€</p>
            </div>
            <p class="row">${teddies[i].description}</p>
            
    </a>`

        }
    })
