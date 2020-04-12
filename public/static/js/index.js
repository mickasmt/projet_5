const productsList = document.getElementById('products_list');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

const urls = [
    'http://localhost:3000/api/cameras',
    'http://localhost:3000/api/teddies',
    'http://localhost:3000/api/furniture'
];

Promise.all(urls.map(url =>
    fetch(url)
        .then(checkStatus)                 
        .then(parseJSON)
        .catch(error => console.log('There was a problem!', error))
))
.then(data => {
    // console.log(data);
    const cameraList = data[0];
    const teddiesList = data[1];
    const furnitureList = data[2];

    // Concat array for to create one array
    const bigList = cameraList.concat(teddiesList, furnitureList)

    // console.log(bigList);
    generateCards(bigList);
})
  

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function parseJSON(response) {
    return response.json();
}

function generateCards(data) {
    const products = data.map(item => `
        <div>
            <img src="${item.imageUrl}" alt="${item.name}" height="200" width="200">
            <p>Nom : ${item.name}</p>
            <p>Prix : ${item.price}</p>
        </div>
    `).join('');
    productsList.innerHTML = products;
}