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
    let JSON = './assets/JSON/restaurant-list.json';
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
                                `<div class="d-flex align-center justify-center">
                                    <img class="location-header-img" src="./assets/img/LO.png">
                                    <span>
                                        ${outputPlaceOfDelivery.toUpperCase()}
                                    </span>    
                                </div>`;
}

function openCurrentRestaurant(i){
    window.scrollTo(0, 0);
    document.getElementById('navbarMenuCard').classList.remove('d-none');
    let currentRestaurant = document.getElementById('listOfRestaurants');
    currentRestaurant.innerHTML = '';
    renderHeaderCurrentRestaurant(currentRestaurant, i);
    forLoopStarterMenu(i);
    forLoopmainCourse(i);
    forLoopDessert(i);
    forLoopDrinks(i);
    renderDeliveryCostInShoppingBasket(i);
    getMinOrderPrice(i);
}



function forLoopStarterMenu(i){
    for (let j = 0; j < loadedRestaurant[i]['menuCard'][0]['starter'].length; j++) {
        const startMeal = loadedRestaurant[i]['menuCard'][0]['starter'][j]['name'];
        const startMealPrice = loadedRestaurant[i]['menuCard'][0]['starter'][j]['price'];
        renderStartMeal(startMeal, startMealPrice);
    }

}

function forLoopmainCourse(i){
    for (let k = 0; k < loadedRestaurant[i]['menuCard'][1]['mainCourse'].length; k++) {
        const mainCourse = loadedRestaurant[i]['menuCard'][1]['mainCourse'][k]['name'];
        const mainCoursePrice = loadedRestaurant[i]['menuCard'][1]['mainCourse'][k]['price'];
        rendermainCourse(mainCourse, mainCoursePrice);
    }
}
function forLoopDessert(i){
    for (let l = 0; l < loadedRestaurant[i]['menuCard'][2]['dessert'].length; l++) {
        const dessert = loadedRestaurant[i]['menuCard'][2]['dessert'][l]['name'];
        const dessertPrice = loadedRestaurant[i]['menuCard'][2]['dessert'][l]['price'];
        renderdessert(dessert, dessertPrice);
    }
}

function forLoopDrinks(i){
    for (let m = 0; m < loadedRestaurant[i]['menuCard'][3]['drinks'].length; m++) {
        const drink = loadedRestaurant[i]['menuCard'][3]['drinks'][m]['name'];
        const drinkPrice = loadedRestaurant[i]['menuCard'][3]['drinks'][m]['price'];
        renderdrinks(drink, drinkPrice);
    }
}

function animateArrow(){
    document.getElementById('arrow').classList.add('animation');
}

function activateDarkMode(){
    let modusButtonActive = document.getElementById('modusButtonActive');
    modusButtonActive.classList.add('d-none');
    let modusButtonInactive = document.getElementById('modusButtonInactive');
    modusButtonInactive.classList.remove('d-none');
    document.body.classList.add('darkModeActive');
    document.getElementById('indexContent').classList.add('darkModeActive');
}

function exitDarkMode(){
    let modusButtonActive = document.getElementById('modusButtonActive');
    modusButtonActive.classList.remove('d-none');
    let modusButtonInactive = document.getElementById('modusButtonInactive');
    modusButtonInactive.classList.add('d-none');
    document.body.classList.remove('darkModeActive');
    document.getElementById('indexContent').classList.remove('darkModeActive');
}






