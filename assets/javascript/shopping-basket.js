let subTotalSum = [];
let deliveryPrice = [];
let basket = [];
let minPrice = [];

function openShoppingBasket(){
    document.getElementById('shoppingBasket').style = 'transform: translate(0, 0);';
    document.getElementById('overlay').classList.remove('d-none');
    document.body.classList.add('overflow-hidden');
}

function closeShoppingBasket(){
    document.getElementById('shoppingBasket').style = 'transform: translate(100%, 0);';
    document.getElementById('overlay').classList.add('d-none');
    document.body.classList.remove('overflow-hidden');
}

function updateSubtotalSum(){
    let subSum = 0;
    let sum = 0;
    for (let i = 0; i < subTotalSum.length; i++){
        let preSum = subTotalSum[i];
        subSum = parseFloat(preSum) + sum;
        sum = parseFloat(subSum);
    }
    document.getElementById('subtotal').innerHTML = `${subSum.toFixed(2).replace(".", ",")}€`;
    updateTotalSum(subSum);
    updateMinOrderPrice(subSum);
}

function updateMinOrderPrice(subSum){
    let minPriceArr = parseFloat(minPrice);
    let minPriceSum = minPriceArr - subSum;
    let minPriceOutput = document.getElementById('minOrderPrice');
    if(minPriceOutput){
        minPriceOutput.innerHTML = `${minPriceSum.toFixed(2).replace('.',',')}`;
    }
    checkMinSum(minPriceSum);
}

function checkMinSum(minPriceSum){
    let payButton = document.getElementById('payButton');
    let minOrderContainer = document.getElementById('minOrderContainer')
    if(minPriceSum < 0){
        payButton.disabled = false;
        minOrderContainer.innerHTML = 'Mindestbestellwert erreicht;)';
    } else {
         payButton.disabled = true;
         minOrderContainer.innerHTML = `<p class="w-50 txt-center">
                                            Noch ${minPriceSum.toFixed(2).replace(".", ",")}€ um den Mindestbestellwert zu erreichen  
                                        </p>`
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

function addStarterToBasket(startMeal, startMealPrice, id){
    addToBasket(startMeal, startMealPrice, id);
}

function addMainCourseToBasket(mainCourse, mainCoursePrice, id){
    addToBasket(mainCourse, mainCoursePrice, id);
    
}

function addDessertToBasket(dessert, dessertPrice, id){
    addToBasket(dessert, dessertPrice, id);
    
}

function addDrinkToBasket(drink, drinkPrice, id){
    addToBasket(drink, drinkPrice, id);    
}

function addToBasket(course, price, id) {
    animateBasketContainer();
    renderBasketContent(course,price, id);                       
    subTotalSum.push(price);
    updateSubtotalSum();
    updateBasketCounter()
}

function updateBasketCounter(){
    let basketCounter = document.getElementById('basketCounter');
    if(basket.length > 0){
        basketCounter.classList.remove('d-none');
        basketCounter.innerHTML = basket.length;
    } else {
        basketCounter.classList.add('d-none');
        document.getElementById('basketCounterContainer').classList.remove('animation');
        document.getElementById('basketBottomImg').style = 'filter: invert(1);';
    }
}

function animateBasketContainer(){
    document.getElementById('basketCounterContainer').classList.add('animation');
    document.getElementById('basketBottomImg').style = 'filter : invert(64%) sepia(85%) saturate(276%) hue-rotate(345deg) brightness(96%) contrast(93%);';
}

function renderBasketContent(course,price, id){
    document.getElementById('basketStandartContent').innerHTML = `  <div class="d-flex align-center justify-center relative">
                                                                        <h3>Warenkorb</h3>
                                                                    </div>`;
    document.getElementById('payButton').classList.remove('d-none');
    
    const sameItem = checkCourseContainsBasket(id);
    if (!sameItem) {
        basket.push({"item":course, "price": price, "mength": 1, id});      
    }                       
    forLoopBasketItem();
}

function forLoopBasketItem(){
    let basketContent = document.getElementById('basketContent');
    basketContent.classList.remove('d-none');
    basketContent.innerHTML = '';
    for (let i = 0; i < basket.length; i++) {
        const item = basket[i]['item'];
        const price = basket[i]['price'];
        const mength = basket[i]['mength'];
            renderItemInBasket(basketContent, item, price, mength, i, basket[i]['id']);             
    }
}

function renderItemInBasket(basketContent, item, price, mength, i, id){
    basketContent.innerHTML += `<div class="d-flex justify-between basketCart" data-id="item-${id}">
                                    <div class="d-flex justify-center align-center">
                                        <strong><span id="mealCounter-${i}">${mength}</span>X</strong>
                                        <div class="basket-course" id="item-${id}">${item}</div>
                                    </div>
                                    <div class="d-flex justify-center">
                                        <div class="d-flex align-center">    
                                            <span id="price${i}">${price.replace('.',',')}</span> €
                                        </div>
                                        <div class="d-flex align-center"> 
                                            <img onclick="countItemPlus(${i})" class="basket-plus" src="./assets/img/plus.png">
                                            <img onclick="countItemMinus(${i})" class="basket-minus" src="./assets/img/minus.png">
                                        </div>    
                                    </div>
                                </div>`;
}

function countItemPlus(i){
    let itemPrice = basket[i]['price'];
    let itemMength = basket[i]['mength'];
    let itemPlusOne = itemMength + 1;
    let mengthContainer = document.getElementById('mealCounter-'+[i]);
    mengthContainer.innerHTML = `${itemPlusOne}`
    basket[i]['mength'] = itemPlusOne;
    subTotalSum.push(itemPrice);
    updateSubtotalSum();
    updateBasketCounter();
}

function countItemMinus(i){
    let itemPrice = basket[i]['price'];
    subTotalSum.pop(itemPrice);
    let itemMength = basket[i]['mength'];
    let itemMinusOne = itemMength - 1;
    let mengthContainer = document.getElementById('mealCounter-'+[i]);
    mengthContainer.innerHTML = `${itemMinusOne}`
    basket[i]['mength'] = itemMinusOne;
    updateSubtotalSum();
    checkItemMength(i);
    checkBasketLength();
    updateBasketCounter();
}

function checkBasketLength(){
    if(basket.length === 0){
        removeBasketAnimation();
    }
}

function checkItemMength(i){
    if(basket[i]['mength'] < 1){
        if (basket[i]['mength'] === 0) {
            basket.splice(i, 1);
        }
        forLoopBasketItem();
    }
}

function checkCourseContainsBasket(id){
    for (item of basket) {
        if (item.id === id) {
            let count = parseInt(item.mength);
            item.mength = count += 1;
            return true;
        }
    }
    return false;
}
    

function renderDeliveryCostInShoppingBasket(i){
    let currentDeliveryCost = loadedRestaurant[i]['deliveryCosts'];
    document.getElementById('costsOfDelivery').innerHTML = `${currentDeliveryCost.toFixed(2).replace('.', ',')}€`;
    deliveryPrice.push(currentDeliveryCost); 
}

function payForPurchase(){
    setTimeout(setPayWall, 1000);
    setBasketToNull();
    setTimeout(closeShoppingBasket, 4000);
    setTimeout(removePayWall, 4000);
}

function setPayWall(){
    let payWall = document.getElementById('payWall');
    payWall.classList.remove('d-none');
}

function removePayWall(){
    let payWall = document.getElementById('payWall');
    payWall.classList.add('d-none');
    window.location.reload();
}

function setBasketToNull(){ 
    basket.splice(0, basket.length);
    subTotalSum.splice(0, subTotalSum.length);
    removeBasketAnimation();
    forLoopBasketItem();
    updateSubtotalSum();
}

function removeBasketAnimation(){
    document.getElementById('basketBottomImg').classList.remove('animation');
}