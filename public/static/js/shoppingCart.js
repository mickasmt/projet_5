
const tableCart = document.getElementById('listing_cart');
const totalCart = document.getElementById('total__price');


// ------------------------------------------
//  EVENTS FUNCTIONS
// ------------------------------------------

showListItems();

// fait le tour des id présent dans "items"
function showListItems() {
  var CART = JSON.parse(window.localStorage.getItem('CART'));
  // console.log(CART);
  var sum = 0;
  
  if(CART) {
    if(Array.isArray(CART.items) && CART.items.length) {
      var cartLength = CART.items.length;
    
      for(var i=0; i < cartLength; i++) {
        const index = i;
        const itemID = CART.items[i].id;
        const prix = CART.items[i].price;
        const qty = CART.items[i].quantity;
        
        const prix_calcul = prix * qty;
        sum += prix_calcul;
        

        // recupere que les items dans le panier
        getItem(itemID).then(data => {
          // image ; name ; quantité ; prix

          var newRow = tableCart.insertRow(tableCart.rows.length);

          var cel0 = newRow.insertCell(0);
          var cel1 = newRow.insertCell(1);
          var cel2 = newRow.insertCell(2);
          var cel3 = newRow.insertCell(3);
          var cel4 = newRow.insertCell(4);

          cel0.innerHTML = '<img src="'+data.imageUrl+'" alt="'+data.name+'" width="100px">';
          cel1.innerHTML = data.name;
          cel2.innerHTML = prix_calcul+' €';

          var inputQty = document.createElement("INPUT");
          inputQty.setAttribute("type", "number");
          inputQty.setAttribute("class", 'quantityChange');
          inputQty.setAttribute("id", index);
          inputQty.setAttribute("min", 0);
          inputQty.setAttribute("value", qty);

          inputQty.addEventListener("change", quantity_Item);
          cel3.appendChild(inputQty);

          var rmvBtn = document.createElement("A");
          rmvBtn.setAttribute("class", 'remove_item');
          rmvBtn.setAttribute("id", index);
          var img_svg = '<img src="../static/svg/x-circle.svg" alt="x"></a>';
          rmvBtn.innerHTML = img_svg;

          rmvBtn.addEventListener("click", remove_Item);
          cel4.appendChild(rmvBtn);

        });
      }
      
      totalCart.innerHTML += 'Prix Total : '+sum+' €';
    } else {
        tableCart.innerHTML = 'Panier Vide';
        totalCart.innerHTML = '';
    }
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
removeCart.addEventListener("click", remove_Cart)

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

function quantity_Item() {
  var index = this.id;
  var quantite = parseInt(this.value);

  if(Number.isInteger(quantite) && quantite>0) {
    // get the old cart for to update
    var oldCart = JSON.parse(window.localStorage.getItem('CART'));

    // Update quantity with id
    oldCart.items[index].quantity = quantite;

    // update cart in local storage
    window.localStorage.setItem('CART', JSON.stringify(oldCart));
    
    tableCart.innerHTML = '<tr><th>Image</th><th>Article</th><th>Prix</th><th>Quantité</th><th>Supprimer</th></tr>';
    totalCart.innerHTML = '';
    showListItems();
  } else {
    // this.id = index;
    remove_Item(index);
    // console.log("Supprimé !")
  }
}

function remove_Item(id) {
  if(id) {
    var index = id;
  } else {
    var index = this.id;
  }

  // console.log(index);

  // get the old cart for to update
  var oldCart = JSON.parse(window.localStorage.getItem('CART'));

  // Delete item with index
  oldCart.items.splice(index, 1);
  
  // update cart in local storage
  window.localStorage.setItem('CART', JSON.stringify(oldCart));

  // get the new cart for to display
  var newCart = JSON.parse(window.localStorage.getItem('CART'));
  
  if(Array.isArray(newCart.items) && newCart.items.length) {
    tableCart.innerHTML = '<tr><th>Image</th><th>Article</th><th>Prix</th><th>Quantité</th><th>Supprimer</th></tr>';
    totalCart.innerHTML = '';
    showListItems();
  } else {
    tableCart.innerHTML = 'Panier Vide';
    totalCart.innerHTML = '';
  }
}