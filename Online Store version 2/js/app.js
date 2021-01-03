// Toggle Nav Menu
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

    if(toggle && nav) {
        toggle.addEventListener("click", ()=> {
            nav.classList.toggle("show");
        });
    }
}

showMenu("nav-toggle", "nav-menu");

// Remove Menu Mobile
const navLink = document.querySelectorAll(".nav-link");

// Changes active link
function linkAction() {
    // Active Link
    navLink.forEach(n => n.classList.remove("active"))
        this.classList.add(".active");

    // Remove menu mobile - once menu item is clicked
    const navMenu = document.getElementById("nav-menu");
    navMenu.classList.remove("show");
}

navLink.forEach(n => n.addEventListener("click", linkAction))

// ****************** Shopping Cart **********************
var removeCartItemButtons = document.getElementsByClassName("btn-danger");
var quantityInputs = document.getElementsByClassName("cart-quantity-input");
var addToCartButtons = document.getElementsByClassName("shop-item-button");

// Remove items from cart
// for (var i = 0; i < removeCartItemButtons.length; i++) {
//     var button = removeCartItemButtons[i];
//     button.addEventListener("click", function (event) {
//         var buttonClicked = event.target;
//         buttonClicked.parentElement.parentElement.remove();
//         upadateCartTotal();
//     });
// }

// Loops through to find if changes were made to cart
// for (var i = 0; i < quantityInputs.length; i++) {
//     var input = quantityInputs[i];
//     input.addEventListener("change", quantityChanged)
// }

// Add to cart
for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    // When clicked, adds item to cart
    button.addEventListener("click", addToCartClicked);
}

document.getElementsByClassName("btn-purchase")[0].addEventListener("click", purchaseClicked);

// Purchase item
function purchaseClicked() {
    alert("Thank you for your purchase");
    var cartItems = document.getElementsByClassName("cart-items")[0];
    while(cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    upadateCartTotal();
}

// Add to Cart when clicked
function addToCartClicked(event) {
    var button = event.target;
    // Targets shop-item class
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
    var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
    addItemToCart(title, price, imageSrc);
    // Update Cart total
    upadateCartTotal();
    console.log(title, price, imageSrc);
}

// Adds Items to cart
function addItemToCart(title, price, imageSrc) {
    // creates div when function is called
    var cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
    var cartItems = document.getElementsByClassName("cart-items")[0];
    var cartItemNames = cartItems.getElementsByClassName("cart-item-title");

    // Loop through cart items - checks if cart item has already been added to cart
    for(var i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title) {
            // **Future note** Make button increase quantity in cart instead of creating an alert
            alert("This item is already added to the cart");
            // returns back to where we call the function
            return;
        }
    }

    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
    `;
    cartRow.innerHTML = cartRowContents;
    // Adds a new row for item to end of cart list
    cartItems.append(cartRow);
    // Adds remove item functionality to remove button on newly added items
    cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click",removeCartItem);
    // Adds quantity update functionality to quantity selection
    cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged);
}

// Checks when Quantity has changed
function quantityChanged(event) {
    var input = event.target;
    // check if number is actually a number or a negative number
    if (isNaN(input.value) || input.value <= 1) {
        input.value = 1;
    }
    upadateCartTotal();
}

// Update the price in cart
function upadateCartTotal() {
    var cartItemContainer = document.getElementsByClassName("cart-items")[0];
    var cartRows = cartItemContainer.getElementsByClassName("cart-row");
    var total = 0;

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName("cart-price")[0];
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    // Prevents total from have more than two numbers after decimal
    total = Math.round(total * 100) / 100;
    // Displays total price as text and adds "$"
    document.getElementsByClassName("cart-total-price")[0].innerText = "$" + total;
}

// Remove cart items
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    upadateCartTotal();
}