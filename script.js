// ================= HERO IMAGE SLIDER =================

const heroImg = document.getElementById("heroImg");
const dots = document.querySelectorAll(".dot");

const sliderImages = [
    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=80"
];

dots.forEach((dot, index) => {

    dot.addEventListener("click", function () {

        heroImg.src = sliderImages[index];

        dots.forEach(d => {
            d.classList.remove("active");
        });

        this.classList.add("active");

    });

});


// ================= SEARCH =================

const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const searchInput = document.getElementById("searchInput");
const pizzaCards = document.querySelectorAll(".pizza-card");

searchBtn.addEventListener("click", function () {

    searchBox.classList.toggle("active");

    if (searchBox.classList.contains("active")) {
        searchInput.focus();
    }

});

searchInput.addEventListener("input", function () {

    const searchValue = this.value.toLowerCase().trim();

    pizzaCards.forEach(card => {

        const pizzaName =
            card.getAttribute("data-name").toLowerCase();

        if (pizzaName.includes(searchValue)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });

});


// ================= CART =================

let cart = [];

const cartBtn = document.getElementById("cartBtn");
const cartPanel = document.getElementById("cartPanel");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");


// Open cart

cartBtn.addEventListener("click", function () {

    cartPanel.classList.add("active");

    updateCart();

});


// Close cart

closeCart.addEventListener("click", function () {

    cartPanel.classList.remove("active");

});


// ================= ADD TO CART =================

function addToCart(name, price) {

    const existingItem = cart.find(
        item => item.name === name
    );

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

    showMessage(name + " added to cart!");

}


// ================= UPDATE CART =================

function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

        cartCount.textContent = "0";
        cartTotal.textContent = "0";

        return;
    }


    let total = 0;
    let count = 0;


    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        count += item.quantity;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div>

                <h4>${item.name}</h4>

                <p>
                    ₹${item.price} × ${item.quantity}
                </p>

            </div>

            <div>

                <button
                    onclick="decreaseQuantity(${index})">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="increaseQuantity(${index})">
                    +
                </button>

                <button
                    onclick="removeFromCart(${index})">
                    ✕
                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent = count;
    cartTotal.textContent = total;

}


// ================= INCREASE QUANTITY =================

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();

}


// ================= DECREASE QUANTITY =================

function decreaseQuantity(index) {

    cart[index].quantity--;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    updateCart();

}


// ================= REMOVE FROM CART =================

function removeFromCart(index) {

    const removedItem = cart[index].name;

    cart.splice(index, 1);

    updateCart();

    showMessage(removedItem + " removed from cart.");

}


// ================= BUY NOW =================

function buyNow(name, price) {

    cartPanel.classList.add("active");

    cart = [
        {
            name: name,
            price: price,
            quantity: 1
        }
    ];

    updateCart();

    showMessage(
        name + " is ready for checkout!"
    );

}


// ================= CHECKOUT =================

function checkout() {

    if (cart.length === 0) {

        showMessage("Your cart is empty!");

        return;
    }


    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );


    alert(
        "Order placed successfully!\n\n" +
        "Total Amount: ₹" + total +
        "\n\nThank you for ordering from pizz0!"
    );


    cart = [];

    updateCart();

    cartPanel.classList.remove("active");

}


// ================= MESSAGE =================

function showMessage(text) {

    const message =
        document.getElementById("message");

    message.textContent = text;

    message.classList.add("show");


    setTimeout(function () {

        message.classList.remove("show");

    }, 2000);

}


// ================= PHOTO ERROR FIX =================

// If any pizza photo fails,
// use the working pizza photo.

const fallbackImage =
    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80";


document.querySelectorAll("img").forEach(function (img) {

    img.addEventListener("error", function () {

        this.onerror = null;

        this.src = fallbackImage;

    });

});
