let subTotalSum = [];
let deliveryPrice = [];
let basket = [];
let minPrice = [];

function openShoppingBasket(){
    document.getElementById('shoppingBasket').style = ' transform: translate(0, 0);';
    document.getElementById('overlay').classList.remove('d-none');
    document.body.classList.add('overflow-hidden');
}

function closeShoppingBasket(){
    document.getElementById('shoppingBasket').style = ' transform: translate(100%, 0);';
    document.getElementById('overlay').classList.add('d-none');
    document.body.classList.remove('overflow-hidden');
}

function updateSubtotalSum(){
    let subSum = 0;
    let sum = 0;
    for (let i = 0; i < subTotalSum.length; i++) {
        let preSum = subTotalSum[i];
        subSum = parseFloat(preSum) + sum;
        document.getElementById('subtotal').innerHTML = `${subSum.toFixed(2).replace(".", ",")}€` ;
        sum = parseFloat(subSum);
    }
    updateTotalSum(subSum);
    updateMinOrderPrice(subSum);
}

function updateMinOrderPrice(subSum){
    let minPriceArr = parseFloat(minPrice);
    let minPriceSum = minPriceArr - subSum
    let minPriceOutput = document.getElementById('minOrderPrice');
    if(minPriceOutput){
        minPriceOutput.innerHTML = `${minPriceSum}`;
    }
    checkMinSum(minPriceSum);
}

function checkMinSum(minPriceSum){
    if(minPriceSum < 0){
        document.getElementById('minOrderContainer').innerHTML = 'Minddestbestellwert erreicht';
    }
}

function updateTotalSum(subSum){
    let totalSum = parseFloat(deliveryPrice) + subSum;
    document.getElementById('basketSum').innerHTML = `${totalSum.toFixed(2).replace(".", ",")}€`;
    
}

function getMinOrderPrice(i){
    let minPriceOutput = document.getElementById('minOrderPrice');
    let minimumOrderValue = loadedRestaurant[i]['minimumOrderValue'];
    minPriceOutput.innerHTML = `${minimumOrderValue}`;
    minPrice.push(minimumOrderValue); 
}

function addStarterToBasket(startMeal, startMealPrice){
    addToBasket(startMeal, startMealPrice);
}

function addMainCourseToBasket(mainCourse, mainCoursePrice){
    addToBasket(mainCourse, mainCoursePrice);
    
}

function addToBasket(course, price) {
    animateArrow();
    renderBasketContent(course,price)                              
    subTotalSum.push(price);
    updateSubtotalSum();
    
}

function renderBasketContent(course,price){
    // document.getElementById('payMent').classList.remove('d-none');
    document.getElementById('basketStandartContent').innerHTML = `<h3>Warenkorb</h3>`;
    let basketContent = document.getElementById('basketContent');
    document.getElementById('payButton').classList.remove('d-none');
    basketContent.classList.remove('d-none');
    basketContent.innerHTML += ` <div class="d-flex justify-between basketCart">
                                    <div>${course}</div>
                                    <div><strong><span id="mealCounter">???</span>X</strong> ${price.replace(".", ",")} €</div>
                                </div>`;
    basket.push({"item":course, "price": price, "mength": 1});                             
}

function renderDeliveryCostInShoppingBasket(i){
    let currentDeliveryCost = loadedRestaurant[i]['deliveryCosts'];
    document.getElementById('costsOfDelivery').innerHTML = `${currentDeliveryCost.toFixed(2).replace('.', ',')}€`;
    deliveryPrice.push(currentDeliveryCost); 
}



function addDessertToBasket(dessert, dessertPrice){
    addToBasket(dessert, dessertPrice);
    
}

function addDrinkToBasket(drink, drinkPrice){
    addToBasket(drink, drinkPrice);    
}
