import { menuArray } from '/data.js'
let cartArray = []
const modalInner = document.getElementById("modal")

// Add event listener for click of add buttons, need to make sure they are for respective item
document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
    }
    else if(e.target.dataset.remove){
        handleRemoveClick(e.target.dataset.remove)
    }
    else if(e.target.id === 'complete-order-btn'){
        renderCheckout()
    }
})


// When checkout button is clicked, modal should appear with input form
function renderCheckout(){
    modalInner.innerHTML = `
                    <form>
                    <div class="modal-header">
                    <h3>Enter card details</h3>
                    </div>
                    <div class="modal-inputs">
                    <input type="text" 
                    placeholder="Enter your name" 
                    required>
                    <input 
                    type="text" 
                    placeholder="Enter card number" 
                    required>
                    <input 
                    type="text" 
                    placeholder="Enter CVV" 
                    required>
                    </div>
                    <div class="modal-submit">
                    <button type="submit" id="pay-btn">Pay</button>
                    </div>
                </form>
    `
    modalInner.style.display = 'flex'
}

// Iterate over menuArray to use ID saved in itemId to identify the added item's object.
// Save object in new const, targetMenuObj
// Push to cartArray on click
function handleAddClick(itemId){
    const targetMenuObj = menuArray.filter(function(item){
        // item.id in HTML is a number, but retrieving it via e.target.dataset.add it comes back as a string.
        // Need to convert to number using either Number() or parseInt()
        return item.id === Number(itemId)
    })[0]
    cartArray.push(targetMenuObj)
    render()
}


// Iterate over cartArray to use ID saved in itemId to identify the removed item's object.
// Save object in new const, targetCartObj
// Remove from cartArray
function handleRemoveClick(itemId){
    const targetIndex = cartArray.findIndex(function(item){
        return item.id === Number(itemId)
    })
    if(targetIndex != -1){
        cartArray.splice(targetIndex, 1)
    }
    render()
}


// Get data from menuArray creating a get html function
function getMenuHtml(){
    let menuHtml = ``

    menuArray.forEach(function(item){
        menuHtml += `
        <div class="item">
            <p class="item-emoji">${item.emoji}</p>
            <div class="item-text-container">
                <p class="item-name" id="item-name">${item.name}</p>
                <p class="item-ingredients" id="item-ingredients">${item.ingredients}</p>
                <p class="item-price" id="item-price">$${item.price}</p>
            </div>
                <button class="item-add-btn" data-add="${item.id}">+</button>
            </div>
        `
    })
    return menuHtml
}


// If array contains items, should be displayed under the menu html in "your order"
function getCartHtml(){
    if(cartArray.length === 0){
        return ''
    }

    let cartItemsHtml = ''
    const totalPrice = cartArray.reduce((total, current) => total + current.price, 0)

    cartArray.forEach(function(cartItem){
        cartItemsHtml += `
            <div class="cart-item">
                <p class="cart-item-name">${cartItem.name}</p>
                <button class="remove-btn" data-remove="${cartItem.id}">remove</button>
                <p class="cart-item-price">$${cartItem.price}</p>
            </div>
        `
    })
    return `
            <div class="cart-items">
                <p class="your-order"> Your Order</p>
                ${cartItemsHtml}
            </div>
            <div class="checkout-price">
                <p class="total-price-text">Total Price:</p>
                <p class="total-price">$${totalPrice}</p>
            </div>
            <button class="complete-order-btn" id="complete-order-btn">Complete order</button>
            `
}




// Create a render function setting elements inner html to the menuHtml
// call render function
function render(){
document.getElementById('menu').innerHTML = getMenuHtml()
document.getElementById('cart').innerHTML = getCartHtml()
}

render()





// Each item should have a remove button and checkout button at bottom


// Form should have 3 inputs that are compulsory and complete order button
// Add complete order button to event listener
// On click, modal should disappear and html containing order should change and display thank you message




