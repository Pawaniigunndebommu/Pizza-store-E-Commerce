// ===============================
// PIZZ0 PIZZA STORE
// ===============================


// CART ARRAY
let cart = [];


// ===============================
// 4 ROUND HERO SLIDER
// ===============================

const heroImg = document.getElementById("heroImg");
const dots = document.querySelectorAll(".dot");

dots.forEach((dot) => {

    dot.addEventListener("click", function () {

        dots.forEach((d) => d.classList.remove("active"));

        this.classList.add("active");

        heroImg.style.opacity = "0";

        setTimeout(() => {
            heroImg.src = this.dataset.image;
            heroImg.style.opacity = "1";
        }, 200);

    });

});


// AUTO SLIDER

let currentSlide = 0;

setInterval(() => {

    currentSlide++;

    if (currentSlide >= dots.length) {
        currentSlide = 0;
    }

    dots[currentSlide].click();

}, 5000);


// ===============================
// ADD TO CART
// ===============================

function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    showMessage(name + " added to cart 🛒");
}


// ===============================
// UPDATE CART
// ===============================

function updateCart() {

    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    let totalQuantity = 0;
    let totalPrice = 0;

    cart.forEach(item => {

        totalQuantity += item.quantity;
        totalPrice += item.price * item.quantity;

    });

    cartCount.textContent = totalQuantity;
    cartTotal.textContent = totalPrice;


    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

        return;
    }


    cartItems.innerHTML = "";

    cart.forEach((item, index) => {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>₹${item.price} × ${item.quantity}</p>
            </div>

            <button class="remove-btn"
                onclick="removeFromCart(${index})">
                Remove
            </button>
        `;

        cartItems.appendChild(cartItem);

    });

}


// ===============================
// REMOVE FROM CART
// ===============================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

    showMessage("Item removed from cart");
}


// ===============================
// BUY NOW
// ===============================

function buyNow(name, price) {

    cart = [{
        name: name,
        price: price,
        quantity: 1
    }];

    updateCart();

    document.getElementById("cartPanel").classList.add("open");

    showMessage("Ready to checkout 🛒");
}


// ===============================
// CART OPEN
// ===============================

document.getElementById("cartBtn").addEventListener("click", () => {

    document.getElementById("cartPanel").classList.add("open");

});


// ===============================
// CART CLOSE
// ===============================

document.getElementById("closeCart").addEventListener("click", () => {

    document.getElementById("cartPanel").classList.remove("open");

});


// ===============================
// SEARCH
// ===============================

document.getElementById("searchBtn").addEventListener("click", () => {

    document.getElementById("searchBox").classList.toggle("show");

    document.getElementById("searchInput").focus();

});


// ===============================
// SEARCH FILTER
// ===============================

document.getElementById("searchInput").addEventListener("input", function () {

    const searchValue = this.value.toLowerCase();

    const cards = document.querySelectorAll(".pizza-card");

    cards.forEach(card => {

        const name = card.dataset.name.toLowerCase();

        if (name.includes(searchValue)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});


// ===============================
// CHECKOUT
// ===============================

function checkout() {

    if (cart.length === 0) {

        showMessage("Your cart is empty!");

        return;
    }

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    alert(
        "Order placed successfully! 🍕\n\n" +
        "Total Amount: ₹" + total +
        "\n\nThank you for ordering from pizz0!"
    );

    cart = [];

    updateCart();

    document.getElementById("cartPanel").classList.remove("open");
}


// ===============================
// MESSAGE
// ===============================

function showMessage(text) {

    const message = document.getElementById("message");

    message.textContent = text;

    message.classList.add("show");

    setTimeout(() => {

        message.classList.remove("show");

    }, 2000);

}


// INITIAL CART UPDATE

updateCart();
