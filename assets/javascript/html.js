function genareteRestaurantList(restaurantCards ,restaurantName, restaurantimg, deliveryTime, deliveryCosts, minimumOrderValue, i){
    restaurantCards.innerHTML += `<div onclick="openCurrentRestaurant(${i})" class="restaurant-card w-80 pointer">
                                        <div>
                                            <img class="restaurant-card-img" src="${restaurantimg}" alt="">
                                        </div>
                                        <h2 class="txt-center">${restaurantName}</h2>
                                        <div class="restaurant-image-container d-flex justify-around">
                                            <div class="d-flex align-center">
                                                <img class="color-sand" src="./assets/img/clock.png" alt="">
                                                <span>
                                                    ${deliveryTime} Min.
                                                </span>
                                            </div>  
                                            <div class="d-flex align-center">
                                                <img  class="color-sand" src="./assets/img/bicycle.png" alt="">
                                                <span>
                                                    ${deliveryCosts}€
                                                </span>
                                            </div>
                                            <div class="d-flex align-center">
                                                <img class="color-sand" src="./assets/img/shopping-bag.png" alt="">
                                                <span>
                                                    Min. ${minimumOrderValue}€
                                                </span>
                                            </div>
                                        </div>   
                                    </div>`
}

function renderHeaderCurrentRestaurant(currentRestaurant, i){
    currentRestaurant.innerHTML =   `<div  class="restaurant-card w-80">
                                        <img class="restaurant-card-img" src="${loadedRestaurant[i]['restaurantimg']}">
                                            <h1 class="txt-center txt-border">${loadedRestaurant[i]['restaurantName']}</h1>
                                            <div class="restaurant-image-container d-flex justify-around">
                                                <div  class="d-flex align-center">
                                                    <img  class="color-sand" src="./assets/img/clock.png" alt="">
                                                    <span>
                                                        ${loadedRestaurant[i]['deliveryTime']} Min.
                                                    </span>
                                                </div>  
                                                <div class="d-flex align-center">
                                                    <img class="color-sand" src="./assets/img/bicycle.png" alt="">
                                                    <span>
                                                        ${loadedRestaurant[i]['deliveryCosts']}€
                                                    </span>
                                                </div>
                                                <div class="d-flex align-center">
                                                    <img class="color-sand" src="./assets/img/shopping-bag.png" alt="">
                                                    <span>
                                                        Min. ${loadedRestaurant[i]['minimumOrderValue']}€
                                                    </span>
                                                </div>
                                            </div>       
                                    </div>
                                    <div class="restaurant-card d-flex column align-center w-80"  id="startMenuContainer">
                                        <img class="current-rest-img" src="./assets/img/starter-menu.png">
                                        <h3>Vorspeisen</h3>
                                    </div>
                                    <div class="restaurant-card d-flex column align-center w-80" id="mainCourseContainer">
                                        <img class="current-rest-img" src="./assets/img/maincourse.png">
                                        <h3>Hauptspeisen</h3>
                                    </div>     
                                    <div class="restaurant-card d-flex column align-center w-80" id="dessertContainer">
                                        <img class="current-rest-img" src="./assets/img/dessert1.png">
                                        <h3>Dessert's</h3>
                                    </div> 
                                    <div class="restaurant-card d-flex column align-center w-80" id="drinkContainer">
                                        <img class="current-rest-img" src="./assets/img/drink.jpg">
                                        <h3>Getränke</h3>
                                    </div>                
                                `;
}


function renderStartMeal(startMeal, startMealPrice){
    let startMenuContainer = document.getElementById('startMenuContainer');
    startMenuContainer.innerHTML += `<div onclick="addStarterToBasket('${startMeal}','${startMealPrice.toFixed(2)}')" class="menu-item-container d-flex justify-between align-center w-90 pointer">
                                        <div class="padding-left-24px"> 
                                            <div>   
                                                <h4>
                                                    ${startMeal}
                                                </h4>
                                            </div>
                                            <div>     
                                                <span>${startMealPrice.toFixed(2)} €</span>
                                            </div>
                                        </div>    
                                        <div>    
                                            <img class="add-to-basket-img" src="./assets/img/basket.png">
                                        </div>    
                                    </div>`
}

function rendermainCourse(mainCourse, mainCoursePrice){
    let mainCourseContainer = document.getElementById('mainCourseContainer');
    mainCourseContainer.innerHTML += `<div onclick="addMainCourseToBasket('${mainCourse}','${mainCoursePrice.toFixed(2)}')" class="menu-item-container d-flex justify-between align-center w-90 pointer">
                                        <div class="padding-left-24px"> 
                                            <div>   
                                                <h4>
                                                    ${mainCourse}
                                                </h4>
                                            </div>
                                            <div>     
                                                <span>${mainCoursePrice.toFixed(2)} €</span>
                                            </div>
                                        </div>    
                                        <div>    
                                            <img class="add-to-basket-img" src="./assets/img/basket.png">
                                        </div>    
                                    </div>`
}

function renderdessert(dessert, dessertPrice){
    let dessertContainer = document.getElementById('dessertContainer');
    dessertContainer.innerHTML += `<div  onclick="addDessertToBasket('${dessert}','${dessertPrice.toFixed(2)}')" class="menu-item-container d-flex justify-between align-center w-90 pointer">
                                        <div class="padding-left-24px"> 
                                            <div>   
                                                <h4>
                                                    ${dessert}
                                                </h4>
                                            </div>
                                            <div>     
                                                <span>${dessertPrice.toFixed(2)} €</span>
                                            </div>
                                        </div>    
                                        <div>    
                                            <img class="add-to-basket-img" src="./assets/img/basket.png">
                                        </div>    
                                    </div>`
}

function renderdrinks(drink, drinkPrice){
    let drinkContainer = document.getElementById('drinkContainer');
    drinkContainer.innerHTML += `<div onclick="addDrinkToBasket('${drink}','${drinkPrice.toFixed(2)}')" class="menu-item-container d-flex justify-between align-center w-90 pointer">
                                        <div class="padding-left-24px"> 
                                            <div>   
                                                <h4>
                                                    ${drink}
                                                </h4>
                                            </div>
                                            <div>     
                                                <span>${drinkPrice.toFixed(2)} €</span>
                                            </div>
                                        </div>    
                                        <div>    
                                            <img class="add-to-basket-img" src="./assets/img/basket.png">
                                        </div>    
                                    </div>`
}



