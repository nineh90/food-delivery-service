let loadedRestaurant;

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


async function searchRestaurant(){
    let input = document.getElementById('placeToDelivery').value;
    if(input){
        document.getElementById('searchResult').href="./restaurant-list.html" 
        localStorage.setItem('restaurants', input);
        await getRestaurantData();
    } else {
        alert('Bitte Ort eingeben')
    }    

}

async function getRestaurantData(){
    let JSON = './assets/json/restaurant-list.json';
    let responseFromJSON = await fetch(JSON);
    loadedRestaurant = await responseFromJSON.json();
    renderRestaurantList();
    console.log(loadedRestaurant);
    
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
    for (let i = 0; i < loadedRestaurant.length; i++) {
        const restaurantName = loadedRestaurant[i]['restaurantName'];
        const restaurantimg = loadedRestaurant[i]['restaurantimg'];
        const deliveryTime = loadedRestaurant[i]['deliveryTime'];
        const deliveryCosts = loadedRestaurant[i]['deliveryCosts'];
        const minimumOrderValue = loadedRestaurant[i]['minimumOrderValue'];
        genareteRestaurantList(restaurantCards, restaurantName, restaurantimg, deliveryTime, deliveryCosts, minimumOrderValue, i);
    }
    renderNavBarHeadline();
}

function renderNavBarHeadline(){
    let outputPlaceOfDelivery = localStorage.getItem('restaurants');
        document.getElementById('placeOfRestaurant').innerHTML = 
                                `<div class="d-flex align-center justify-center hide">
                                    <img class="location-header-img" src="./assets/img/LO.png">
                                    <span>
                                        ${outputPlaceOfDelivery.toUpperCase()}
                                    </span>    
                                </div>`;
}

function openCurrentRestaurant(i){
    window.scrollTo(0, 0);
    setRestaurantNavbar();
    renderHeaderCurrentRestaurant(i);
    forLoopStarterMenu(i);
    forLoopmainCourse(i);
    forLoopDessert(i);
    forLoopDrinks(i);
    renderDeliveryCostInShoppingBasket(i);
    getMinOrderPrice(i);
}

function setRestaurantNavbar(){
    document.getElementById('navbarMenuCard').classList.remove('d-none');
    document.getElementById('min-order-value').classList.remove('d-none');
    document.getElementById('no-min-order-value').classList.add('d-none');
}



function forLoopStarterMenu(i){
    for (let j = 0; j < loadedRestaurant[i]['menuCard'][0]['starter'].length; j++) {
        const startMeal = loadedRestaurant[i]['menuCard'][0]['starter'][j]['name'];
        const startMealPrice = loadedRestaurant[i]['menuCard'][0]['starter'][j]['price'];
        const id = loadedRestaurant[i]['menuCard'][0]['starter'][j]['id'];
        renderStartMeal(startMeal, startMealPrice, id);
    }

}

function forLoopmainCourse(i){
    for (let k = 0; k < loadedRestaurant[i]['menuCard'][1]['mainCourse'].length; k++) {
        const mainCourse = loadedRestaurant[i]['menuCard'][1]['mainCourse'][k]['name'];
        const mainCoursePrice = loadedRestaurant[i]['menuCard'][1]['mainCourse'][k]['price'];
        const id = loadedRestaurant[i]['menuCard'][1]['mainCourse'][k]['id'];
        rendermainCourse(mainCourse, mainCoursePrice, id);
    }
}
function forLoopDessert(i){
    for (let l = 0; l < loadedRestaurant[i]['menuCard'][2]['dessert'].length; l++) {
        const dessert = loadedRestaurant[i]['menuCard'][2]['dessert'][l]['name'];
        const dessertPrice = loadedRestaurant[i]['menuCard'][2]['dessert'][l]['price'];
        const id = loadedRestaurant[i]['menuCard'][2]['dessert'][l]['id'];
        renderdessert(dessert, dessertPrice, id);
    }
}

function forLoopDrinks(i){
    for (let m = 0; m < loadedRestaurant[i]['menuCard'][3]['drinks'].length; m++) {
        const drink = loadedRestaurant[i]['menuCard'][3]['drinks'][m]['name'];
        const drinkPrice = loadedRestaurant[i]['menuCard'][3]['drinks'][m]['price'];
        const id = loadedRestaurant[i]['menuCard'][3]['drinks'][m]['id'];
        renderdrinks(drink, drinkPrice, id);
    }
}

function activateDarkMode(){
    let darkModeImage = document.getElementById('modeIcon');
    darkModeImage.src = './assets/img/day-and-night_night.png';
    document.getElementById('modusButtonActive').classList.add('d-none');
    document.getElementById('modusButtonInactive').classList.remove('d-none');
    document.body.classList.add('darkModeActive');
    darkModeIndex();
    darkModeBasket();
}

function darkModeBasket(){
    let basket = document.getElementById('shoppingBasket');
    if(basket){
        basket.classList.add('darkModeActive');
    }
}

function darkModeIndex(){
    let contentIndex = document.getElementById('indexContent');
    if(contentIndex){
        contentIndex.classList.add('darkModeActive');
    } 
}

function exitDarkMode(){
    let dayModeImage = document.getElementById('modeIcon');
    dayModeImage.src = './assets/img/day-and-night_day.png';
    let modusButtonActive = document.getElementById('modusButtonActive');
    modusButtonActive.classList.remove('d-none');
    let modusButtonInactive = document.getElementById('modusButtonInactive');
    modusButtonInactive.classList.add('d-none');
    document.body.classList.remove('darkModeActive');
    exitDarkModeIndex();
    exitDarkModeBasket();
}

function exitDarkModeBasket(){
    let basket = document.getElementById('shoppingBasket');
    if(basket){
        basket.classList.remove('darkModeActive');
    }
}

function exitDarkModeIndex(){
    let contentIndex = document.getElementById('indexContent');
    if(contentIndex){
        contentIndex.classList.remove('darkModeActive');
    }
}





