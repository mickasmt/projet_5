const camerasList = document.getElementById('cameras_list');
const teddiesList = document.getElementById('teddies_list');
const furnitureList = document.getElementById('furniture_list');

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
    // const bigList = cameraList.concat(teddiesList, furnitureList)
    // console.log(bigList);
    // generateCards(bigList);

    generateCameras(cameraList);
    generateTeddies(teddiesList);
    generateFurniture(furnitureList);

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

function generateCameras(data) {
    const cameras = data.map(item => `
        <div>
            <a href="/products/?item=cameras&id=${item._id}">
                <img src="${item.imageUrl}" alt="${item.name}" width="250">
            </a>
            <p>Nom : ${item.name}</p>
            <p>Prix : ${item.price}</p>
        </div>
    `).join('');
    camerasList.innerHTML = cameras;
}

function generateTeddies(data) {
    const teddies = data.map(item => `
        <div>
            <a href="/products/${item._id}">
                <img src="${item.imageUrl}" alt="${item.name}" width="250">
            </a>
            <p>Nom : ${item.name}</p>
            <p>Prix : ${item.price}</p>
        </div>
    `).join('');
    teddiesList.innerHTML = teddies;
}

function generateFurniture(data) {
    const furniture = data.map(item => `
        <div>
            <a href="/products/${item._id}">
                <img src="${item.imageUrl}" alt="${item.name}" width="250">
            </a>
            <p>Nom : ${item.name}</p>
            <p>Prix : ${item.price}</p>
        </div>
    `).join('');
    furnitureList.innerHTML = furniture;
}