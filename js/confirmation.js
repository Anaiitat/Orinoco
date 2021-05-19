//Récupération de l'id de la commande dans le local storage 
const recupid = localStorage.getItem("responseId");
const recupprix = localStorage.getItem("totalOrder");

const confirmation = document.getElementById("recapcommande");

confirmation.innerHTML += `

<p>Merci pour votre commande</p>
<p>Votre commande numéro: <strong>${recupid} </strong> a bien été prise en compte </p>
<p> Le montant de votre commande est de : <strong> ${recupprix/100}€ </strong></p>
<p id="aurevoir">Au plaisir de vous revoir<p>
`

function enleverLeLocalStorage(key) {
    localStorage.removeItem(key);

}

enleverLeLocalStorage("totalOrder");
enleverLeLocalStorage("responseId");
enleverLeLocalStorage("cart");