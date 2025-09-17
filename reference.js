document.addEventListener("click", function(e){
    if (e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
    }
    else if (e.target.id === 'checkout-btn')
        handleCheckoutBtnClick()
}) 

//on click find correct menu item and push to cart array, then render cart array
function handleAddClick (itemId){
    const targetMenuObj = menuArray.filter(function(item){
        return item.id === itemId
    })[0]
    cartArr.push(targetMenuObj)
    renderCart ()
}

// render items on click of add button and display html
function renderCart() {
    const cartHtml = cartArr.map(function(item){
        return `
        <div class="cart-items">
            <div class="cart-item">
                <p class="cart-item-name">${item.name}</p>
                <button class="remove-btn" data-remove="${item.id}">remove</button>
                <p class="cart-item-price">$${item.price}</p>
            </div>
        </div>
        `
    }).join('')

//calculate total price of items in cart
const totalPrice = cartArr.reduce((total, current) => total + current.price, 0)


//add to total html
const totalHtml = `
        <div class="checkout-price">
            <p class="total-price-text">Total Price:</p>
            <p class="total-price">$${totalPrice}</p>
        </div>
`
const cartContainer = document.getElementById('cart-container')
cartContainer.innerHtml = cartArr.length > 0 ? cartHtml + totalHtml : ''

}




                    <div class="checkout-price">
                         <p class="total-price-text">Total Price:</p>
                         <p class="total-price">$${totalPrice}</p>
                    </div>  