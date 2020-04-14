const product__img = document.getElementById('product__img');
const details__name = document.getElementById('details__name');
const details__desc = document.getElementById('details__desc');
const details__price = document.getElementById('details__price');
const select_colors = document.getElementById('colors');

const addCart = document.getElementById("add_cart");

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

const api = 'http://localhost:3000/api/';
const currentUrl = new URL(window.location.href);

const searchParams = new URLSearchParams(currentUrl.search);

const item = searchParams.get("item");
const itemID = searchParams.get("id");

// console.log(item, itemID);

fetch(api+item+'/'+itemID)
.then((response) => response.json())
.then(data => {
    colors = data.colors;
    // console.log(colors.length);
    
    const img_output = '<img src="'+data.imageUrl+'" alt="">';
    product__img.innerHTML = img_output;

    details__name.innerHTML += data.name;
    details__desc.innerHTML += data.description;
    details__price.innerHTML += 'Prix TTC :&nbsp; '+data.price+' €';

    options_output = '<option value="0">Choisir une couleur</option>';
    for(var i=0; i<colors.length; i++){
        options_output +='<option value="'+i+'">'+colors[i]+'</option>"';
    }
    select_colors.innerHTML += options_output;
});


// ------------------------------------------
//  EVENTS FUNCTIONS
// ------------------------------------------

addCart.addEventListener("click", displayDate);

function displayDate() {
    swal.fire({
        position: 'top-end',
        toast: true,
        icon: 'success',
        title: "La peluche a été ajouté au panier",
        footer: '<a id="link_toast" href="../panier">Voir mon panier</a>',
        showConfirmButton: false,
        timer: 3500
    });
}