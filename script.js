// ===============================
// PIZZA DATA
// ===============================

const pizzas = [

    {
        name: "Margherita",
        price: 199,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=90"
    },

    {
        name: "Farmhouse",
        price: 249,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=90"
    },

    {
        name: "Peppy Paneer",
        price: 299,
        image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=90"
    },

    {
        name: "Veggie Delight",
        price: 269,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=90"
    },

    {
        name: "Spicy Chicken",
        price: 329,
        image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=90"
    },

    {
        name: "Pepperoni",
        price: 620,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=700&q=90"
    },

    {
        name: "Cheese Burst",
        price: 389,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=90"
    },

    {
        name: "Kuadaval",
        price: 450,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=90"
    },

    {
        name: "Belgium Choco",
        price: 567,
        image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=90"
    },

    {
        name: "Kethgrin",
        price: 600,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=90"
    },

    {
        name: "Kunafa",
        price: 500,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=90"
    },

    {
        name: "Japanese",
        price: 350,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=90"
    },

    {
        name: "Chenidu",
        price: 432,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=90"
    },

    {
        name: "Premium Pulp",
        price: 680,
        image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=90"
    },

    {
        name: "Neapolitan",
        price: 800,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=90"
    }
];


// ===============================
// CART
// ===============================

let cart = [];

const pizzaGrid = document.getElementById("pizzaGrid");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");


// ===============================
// DISPLAY PIZZAS
// ===============================

function displayPizzas() {

    pizzaGrid.innerHTML = "";

    pizzas.forEach((pizza, index) => {

        const card = document.createElement("div");

        card.className = "pizza-card";

        card.innerHTML = `
            <img src="${pizza.image}" alt="${pizza.name}">

            <h3>${pizza.name}</h3>

            <div class="price">₹${pizza.price}</div>

            <div class="card-buttons">

                <button class="add-btn"
                    onclick="addToCart(${index})">
                    Add to Cart
                </button>

                <button class="buy-btn"
                    onclick="buyNow(${index})">
                    Buy Now
                </button>

            </div>
        `;

        pizzaGrid.appendChild(card);
    });
}

displayPizzas();


// ===============================
// ADD TO CART
// ===============================

function addToCart(index) {

    const pizza = pizzas[index];

    const existing = cart.find(item => item.name === pizza.name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...pizza,
            quantity: 1
        });
    }

    updateCart();

    // Open cart automatically
    openCart();
}


// ===============================
// UPDATE CART
// ===============================

function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
            `<p class="empty-cart">Your cart is empty.</p>`;

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
            <img src="${item.image}" alt="${item.name}">

            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>₹${item.price} × ${item.quantity}</p>
            </div>

            <button class="remove-btn"
                onclick="removeFromCart(${index})">
                ✕
            </button>
        `;

        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = count;
    cartTotal.textContent = total;
}


// ===============================
// REMOVE FROM CART
// ===============================

function removeFromCart(index) {

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    updateCart();
}


// ===============================
// CART OPEN / CLOSE
// ===============================

const cartBox = document.getElementById("cartBox");
const cartOverlay = document.getElementById("cartOverlay");
const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");

function openCart() {

    cartBox.classList.add("show");
    cartOverlay.classList.add("show");
}

function closeCartBox() {

    cartBox.classList.remove("show");
    cartOverlay.classList.remove("show");
}

cartBtn.addEventListener("click", openCart);

closeCart.addEventListener("click", closeCartBox);

cartOverlay.addEventListener("click", closeCartBox);


// ===============================
// BUY NOW
// ===============================

function buyNow(index) {

    const pizza = pizzas[index];

    alert(
        "Order placed for " +
        pizza.name +
        " - ₹" +
        pizza.price
    );
}


// ===============================
// CHECKOUT
// ===============================

document.getElementById("checkoutBtn")
    .addEventListener("click", function () {

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        alert(
            "Order confirmed!\n\n" +
            "Total Amount: ₹" +
            cartTotal.textContent
        );

        cart = [];

        updateCart();

        closeCartBox();
    });


// ===============================
// HERO SLIDER
// ===============================

const circles = document.querySelectorAll(".slide-circle");
const heroPizza = document.getElementById("heroPizza");

circles.forEach(circle => {

    circle.addEventListener("click", function () {

        const image = this.getAttribute("data-image");

        heroPizza.src = image;

        circles.forEach(c =>
            c.classList.remove("active")
        );

        this.classList.add("active");
    });

});


// ===============================
// CHECK OUT MENU
// ===============================

document.getElementById("menuBtn")
    .addEventListener("click", function () {

        document.getElementById("pizzas")
            .scrollIntoView({
                behavior: "smooth"
            });
    });


// ===============================
// SEARCH BUTTON
// ===============================

document.getElementById("searchBtn")
    .addEventListener("click", function () {

        const search = prompt("Search for a pizza:");

        if (!search) return;

        const cards = document.querySelectorAll(".pizza-card");

        cards.forEach(card => {

            const name =
                card.querySelector("h3")
                    .textContent
                    .toLowerCase();

            if (name.includes(search.toLowerCase())) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
