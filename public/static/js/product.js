const showProduct = document.getElementById('showProduct');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

const api = 'http://localhost:3000/api/';
const currentUrl = new URL(window.location.href);

const searchParams = new URLSearchParams(currentUrl.search);


const item = searchParams.get("item");
const itemID = searchParams.get("id");

console.log(item, itemID);
// console.log(decodeURIComponent(searchParams.toString()));

fetch(api+item+'/'+itemID)
    .then((response) => response.json())
.then(data => {
    console.log(data);

    // generateProduct(product);
})
  

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------


// function generateProduct(data) {
//     const cameras = data.map(item => `
//         <div>
//             <a href="/products/${item._id}">
//                 <img src="${item.imageUrl}" alt="${item.name}" width="250">
//             </a>
//             <p>Nom : ${item.name}</p>
//             <p>Prix : ${item.price}</p>
//         </div>
//     `).join('');
//     showProduct.innerHTML = cameras;
// }
