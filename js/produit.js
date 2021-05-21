
//On récupère l'endroit ou l'on veut intégrer le js
const container = document.getElementById("produit");

//On récupère l'id sur lequel on a cliqué
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const id = params.get("id")
fetch(`${apiUrl}/api/teddies/s${id}`)
    .then((response) => response.json())
    .then(teddie => {

        //On ajoute du contenu html avec les éléments du produit
        container.innerHTML += `
        <img src="${teddie.imageUrl}" >
        <div>
        <h1 class="row">${teddie.name}</h1>
        <p class="texte">${teddie.description}</p>
        <div class="choix">
            <h2>Couleur :<select id="choix"></select></h2>
            
        </div>
        <div class="quantité">
            <h2>Quantité :<select id="quantité"></select></h2>
            
        </div>
        <p  class="prix">Prix : ${(teddie.price / 100)}.00€</p>
        <button id="ajout">Ajouter au panier</button>
        </div>`


        //On créer la liste déroulante des couleurs du produit 
        const choix = document.getElementById("choix");
        const couleur = teddie.colors;

        for (let i = 0; i < couleur.length; i++) {
            let opt = couleur[i];
            let el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            choix.appendChild(el);

        }

        //Choisir la quantité 
        const structureQuantite = `
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5">5</option>`

        const positionelementquantite = document.getElementById("quantité");
        positionelementquantite.innerHTML = structureQuantite;

        //----------------------Le Local Storage---------------------------


        let ajout = document.getElementById("ajout")

        ajout.addEventListener('click', function (event) {

            //Déclaration de la variable panier dans laquelle on met les key et les values qui sont dans le local storage 
            const panier = JSON.parse(localStorage.getItem('cart')) || [];


            const popupConfirmation = () => {
                if (window.confirm(`${teddie.name} : ${choix.value} a bien été ajouté au panier.
Consultez le panier Ok ou revenir a l'accueil Annuler`)) {
                    window.location.href = "panier.html";
                } else {
                    window.location.href = "index.html";
                }
            }

            const choixquantite = positionelementquantite.value;

            const quantite = (teddie.price * choixquantite);


            const color = choix.value;
            const item = panier.find(product => product._id == teddie._id && product.color == choix.value);
            console.log(item);
            if (item === undefined) {


                const line = {
                    imageUrl: teddie.imageUrl,
                    name: teddie.name,
                    _id: teddie._id,
                    color: choix.value,
                    quantity: choixquantite,
                    price: quantite,
                }

                console.log(line);
                //Ajout dans le tableau de l'objet avec les option choisis par l'utilisateur 
                panier.push(line);
            } else {
                item.quantity = parseInt(choixquantite) + parseInt(item.quantity);
                item.price += quantite;
            }
            //La transformation en format JSON et l'envoyer dans la key "produit" du local storage 
            localStorage.setItem('cart', JSON.stringify(panier));
            popupConfirmation();


            //Vérifier si le produit est déja dans le panier, si oui augmenter sa quantité sinon faire le push
        })




    })
