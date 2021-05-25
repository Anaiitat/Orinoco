

//************************Au Chargement de la page******************************************
function initCart() { 

    //Déclaration de la variable "panier" dans laquelle on met les key et les values qui sont dans le local storage
    const panier = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(panier);

    // --------------------Affichage des produits du panier------------------------

    //Sélection de l'id ou je vais injecter le code HTML
    const ajout = document.getElementById("panier");

    //Si le panier est vide aficcher "Panier Vide"
    if (panier === null) {
        ajout.innerHTML += `
    <h2>Panier Vide</h2>`
    }

    //Si le panier n'est pas vide afficher les produits dans le localstorage
    else {
        let structurepanier = [];

        for (j = 0; j < panier.length; j++) {
            structurepanier = structurepanier + `
                <tr>
                    <td id="selection">${panier[j].name}</td>
                    <td id="selection">${panier[j].color}</td>
                    <td id="selection">${panier[j].quantity}</td>
                    <td id="selection">${panier[j].price/100}€</td>
                    <td id="positionsupprimer"><button onclick="deleteArticle(${j})" class="supprimer">Supprimer</button></td>
                </tr>
            `;
        }

        if (j === panier.length) {
            ajout.innerHTML += structurepanier;
        }
    }

    //********************************* Le montant Total du panier ********************************
    const prix = document.getElementById("prixtotal");

    //Déclaration de la variable pour pouvoir y mettre les prix qui sont présents dans le panier 
    const prixtotalcalcul = [];

    //Aller chercher les prix dans le panier
    for (let m = 0; m < panier.length; m++) {
        const prixproduitdanslepanier = panier[m].price;

        //Mettre les prix du panier dans la variable "prixtotalcalcul"
        prixtotalcalcul.push(prixproduitdanslepanier);
        console.log(prixtotalcalcul);
    }

    //Additionner les prix qu'il y a dans le tableau de la variable "prixtoatalcalcul" avec la méthode .reduce
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const prixtotal = prixtotalcalcul.reduce(reducer, 0);
    console.log(prixtotal)

    //Le code HTML du prix total à afficher
    prix.innerHTML += `
    ${prixtotal/100}€
    `
    localStorage.setItem("totalOrder", JSON.stringify(prixtotal));

}

//************************Gestion du boutton supprimer l'article******************************************
function deleteArticle(articleId) {

        //Rècupère le panier
        const panier = JSON.parse(localStorage.getItem('cart')) || [];
        
        panier.splice(articleId, 1);
        localStorage.setItem('cart', JSON.stringify(panier));

        //Alert pour avertir que le produit a été supprimer et rechargement de la page 
        alert("Ce produit a été supprimer du panier");
        window.location.href = "panier.html";
}

//*******************************Formulaire de commande**************************************** 
function sendPayment(){

    //Sélection du bouton envoyer le formulaire
    const btncommande = document.getElementById("paiement");

    // Récupération des valeurs du formulaire pour les mettres dans le local storage 
    localStorage.setItem("prenom", document.getElementById("prenom").value);
    localStorage.setItem("nom", document.getElementById("nom").value);
    localStorage.setItem("mail", document.getElementById("mail").value);
    localStorage.setItem("adresse", document.getElementById("adresse").value);
    localStorage.setItem("postal", document.getElementById("postal").value);
    localStorage.setItem("ville", document.getElementById("ville").value);

    //Mettre les values du formulaire dans un objet
    const formulaire = {
        prenom: localStorage.getItem("prenom"),
        nom: localStorage.getItem("nom"),
        mail: localStorage.getItem("mail"),
        adresse: localStorage.getItem("adresse"),
        postal: localStorage.getItem("postal"),
        ville: localStorage.getItem("ville"),
    }

    //Mettre les values du formulaire et mettre les produits sélectionnées dans un objet à envoyer vers le serveur 
    const aenvoyer = {
        panier,
        formulaire,

    };

    //envoie de l'objet "aenvoyer" vers le serveur 
    const promise1 = fetch("https:restapi.fr/api/commandeTest", {
        method: "POST",
        body: JSON.stringify(aenvoyer),
        headers: {
            "Content-Type": "application/json",
        }

    })

    promise1.then(async (response) => {
        try {
            const contenu = await response.json();

            if (response.ok) {
                console.log(`Resultat de response.ok : ${response.ok}`);

                //Récupératon de l'id de la response du serveur 
                console.log("id de response");
                console.log(contenu._id);

                //Mettre l'id dans le local storage 
                localStorage.setItem("responseId", contenu._id)


                //Aller vers la page de confirmation
                window.location.href = "confirmation.html"

            } else {
                console.log(`Réponse du serveur  : ${response.status}`)
                alert(`Problème avec le serveur : erreur ${response.status}`)
            }
        } catch (e) {
            console.log("ERREUR qui vient du catch()");
            console.log(e);
            alert(`ERREUR qui vient du catch() $(e)`);
        }
    });
    
}
