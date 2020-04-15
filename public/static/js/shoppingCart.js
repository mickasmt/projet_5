
const tableCart = document.getElementById('listing_cart');
const totalCart = document.getElementById('total__price');

// ------------------------------------------
//  EVENTS FUNCTIONS
// ------------------------------------------

showListItems();

// fait le tour des id présent dans "items"
function showListItems() {
    var CART = JSON.parse(window.localStorage.getItem('CART'));
    console.log(CART);
    var sum = 0;
    
    if(CART != null) {
        var cartLength = CART.items.length;

        for(var i=0; i < cartLength; i++) {
            const itemID = CART.items[i].id;
            const prix = CART.items[i].price;
            const qty = CART.items[i].quantity;
            
            const prix_calcul = prix * qty;
            sum += prix_calcul;
        
            // recupere que les items dans le panier
            getItem(itemID).then(data => {
                // image ; name ; quantité ; prix
                tableCart.innerHTML += '<td id="col-img-'+i+'"><img src="'+data.imageUrl+'" alt="'+data.name+'" width="100px"></td><td id="col-name-'+i+'">'+data.name+'</td><td id="col-qt-'+i+'">'+qty+'</td><td id="col-price-'+i+'">'+prix_calcul+' €</td><td>+ & -</td></tr>';
            });
        }
        
        totalCart.innerHTML += 'Prix Total : '+sum+' €';
    } else {
        tableCart.innerHTML = 'Panier Vide';
        totalCart.innerHTML = '';
    }
}



async function getItem(id) {
    const baseUrl = 'http://localhost:3000/api/teddies/';
    const response = await fetch(baseUrl+id);
    const data = await response.json();
    return data;
}


// ------------------------------------------
//  EVENTS FUNCTIONS
// ------------------------------------------

const removeCart = document.getElementById("remove_cart");
// const moreInCart = document.getElementById("increase_item");
// const lessInCart = document.getElementById("decrease_item");
// const removeItem = document.getElementById("remove_item");

removeCart.addEventListener("click", remove_Cart);
// moreInCart.addEventListener("click", increase_item);
// lessInCart.addEventListener("click", decrease_item);
// removeItem.addEventListener("click", remove_item);

function remove_Cart() {
    Swal.fire({
        title: 'Etes-vous sûr ?',
        text: "Vous ne pourrez pas revenir en arrière !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, vidé le panier !',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Panier vide !',
            'Votre panier a bien été effacé !',
            'success'
          )
          window.localStorage.clear();
          showListItems();
        }
      })

}

