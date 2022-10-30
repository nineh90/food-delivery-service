let loadedData;

async function includeHTML(link) {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text(); 
        } 
    }
}

function goToRestaurantList(inputPlaceOfDelivery){
    window.open('./restaurant-list.html');
    let intervall = setInterval(function(){
        let placeOfRestaurant = document.getElementById('placeOfRestaurant');
        if (placeOfRestaurant){
            placeOfRestaurant.innerHTML = `${inputPlaceOfDelivery.value}`;
            clearInterval(intervall)
            }
       });
}

function searchRestaurant(){
    let inputPlaceOfDelivery = document.getElementById('placeToDelivery').value; 
    goToRestaurantList(inputPlaceOfDelivery);
    console.log(inputPlaceOfDelivery);
}

async function getRestaurantData(){
    let JSON = './assets/JSON/restaurant-list.json';
    let responseFromJSON = await fetch(JSON);
    loadedData = await responseFromJSON.json();
    renderRestaurantList();
    console.log(loadedData);
}

async function renderRestaurantList(){
    let intervall = setInterval(function(){
        let restaurantCards = document.getElementById('listOfRestaurants');
        if (restaurantCards){
            forLoopRestaurantList(restaurantCards);
            clearInterval(intervall)
            }
       });
}

function forLoopRestaurantList(restaurantCards){
    restaurantCards.innerHTML = ``;
    for (let i = 0; i < loadedData.length; i++) {
        const restaurantName = loadedData[i]['restaurantName'];
        const restaurantimg = loadedData[i]['restaurantimg'];
        const deliveryTime = loadedData[i]['deliveryTime'];
        const deliveryCosts = loadedData[i]['deliveryCosts'];
        const minimumOrderValue = loadedData[i]['minimumOrderValue'];
        genareteList(restaurantCards, restaurantName, restaurantimg, deliveryTime, deliveryCosts, minimumOrderValue);
        
    }
}

function genareteList(restaurantCards ,restaurantName, restaurantimg, deliveryTime, deliveryCosts, minimumOrderValue){
    restaurantCards.innerHTML += `<div class="restaurant-card w-70 pointer">
                                        <div>
                                            <img class="restaurant-card-img" src="${restaurantimg}" alt="">
                                        </div>
                                        <h3>${restaurantName}</h3>
                                        <div class="restaurant-image-container d-flex justify-between">
                                            <div>
                                                <img src="./assets/img/clock.png" alt="">
                                                <span>
                                                    ${deliveryTime} Min.
                                                </span>
                                            </div>  
                                            <div>
                                                <img src="./assets/img/bicycle.png" alt="">
                                                <span>
                                                    ${deliveryCosts}
                                                </span>
                                            </div>
                                            <div>
                                                <img src="./assets/img/shopping-bag.png" alt="">
                                                <span>
                                                    ${minimumOrderValue}
                                                </span>
                                            </div>
                                        </div>            
                                    </div>`
}

