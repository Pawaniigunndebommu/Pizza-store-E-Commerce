// ===============================
// PIZZA STORE - SCRIPT.JS
// ===============================

// Food image switching
const food = document.getElementById("food");
const food1 = document.getElementById("food1");
const food2 = document.getElementById("food2");
const food3 = document.getElementById("food3");
const food4 = document.getElementById("food4");

if (food1) {
    food1.addEventListener("click", () => {
        food.style.backgroundImage = "url('food1.png')";
    });
}

if (food2) {
    food2.addEventListener("click", () => {
        food.style.backgroundImage = "url('food2.png')";
    });
}

if (food3) {
    food3.addEventListener("click", () => {
        food.style.backgroundImage = "url('food3.png')";
    });
}

if (food4) {
    food4.addEventListener("click", () => {
        food.style.backgroundImage = "url('food4.png')";
    });
}


// ===============================
// LOGIN
// ===============================

function openLoginModal() {
    const modal = document.getElementById("loginModal");

    if (modal) {
        modal.style.display = "block";
    }
}

function closeLoginModal() {
    const modal = document.getElementById("loginModal");

    if (modal) {
        modal.style.display = "none";
    }
}

function login() {
    const username = document.getElementById("modalUsername");
    const password = document.getElementById("modalPassword");

    if (!username || !password) {
        return;
    }

    if (username.value === "admin" && password.value === "1234") {
        alert("Login successful!");
        closeLoginModal();
    } else {
        alert("Invalid credentials!");
    }
}


// Close login modal when clicking outside
window.addEventListener("click", function (event) {
    const modal = document.getElementById("loginModal");

    if (modal && event.target === modal) {
        modal.style.display = "none";
    }
});


// ===============================
// CART
// ===============================

const cart = [];

function updateCartDisplay() {
    const cartSection = document.getElementById("cartSummary");
    const itemList = document.getElementById("cartItems");
    const totalDisplay = document.getElementById("cartTotal");

    if (!cartSection || !itemList || !totalDisplay) {
        return;
    }

    itemList.innerHTML = "";

    let total = 0;

    cart.forEach(function (item) {
        const li = document.createElement("li");

        li.textContent = `${item.name} - ₹${item.price}`;

        itemList.appendChild(li);

        total += item.price;
    });

    totalDisplay.textContent = total;

    cartSection.style.display = cart.length > 0 ? "block" : "none";
}


// ===============================
// PIZZA CARDS
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".pizza-card");

    cards.forEach(function (card) {

        const titleElement = card.querySelector("h3");
        const priceElement = card.querySelector("p");

        if (!titleElement || !priceElement) {
            return;
        }

        const title = titleElement.innerText;
        const priceText = priceElement.innerText.replace(/[^\d]/g, "");
        const price = parseInt(priceText);

        // Add to Cart Button
        const addToCartButton = document.createElement("button");

        addToCartButton.textContent = "Add to Cart";

        addToCartButton.className = "add-cart-btn";

        addToCartButton.addEventListener("click", function () {

            cart.push({
                name: title,
                price: price
            });

            updateCartDisplay();

            alert(`${title} added to cart!`);
        });


        // Buy Now Button
        const buyNowButton = document.createElement("button");

        buyNowButton.textContent = "Buy Now";

        buyNowButton.className = "buy-now-btn";

        buyNowButton.addEventListener("click", function () {

            const address = prompt(
                `You're buying ${title} for ₹${price}.\n\nPlease enter your delivery address:`
            );

            if (address && address.trim() !== "") {

                alert(
                    `Order placed successfully!\n\n` +
                    `Pizza: ${title}\n` +
                    `Price: ₹${price}\n` +
                    `Delivery Address: ${address}`
                );

            } else {

                alert("Order cancelled. Address is required.");

            }
        });


        card.appendChild(addToCartButton);
        card.appendChild(buyNowButton);

    });

});
