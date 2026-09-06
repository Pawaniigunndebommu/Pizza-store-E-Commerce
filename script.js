/* =========================
   HERO PIZZA CHANGE
========================= */

function changePizza(image) {

    const heroPizza = document.getElementById("heroPizza");

    heroPizza.src = image;

    document.querySelectorAll(".food-option")
        .forEach(option => option.classList.remove("active"));

    event.currentTarget.classList.add("active");
}


/* =========================
   CHECK OUT MENU
========================= */

function scrollToPizza() {

    document.getElementById("pizzaSection")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =========================
   CART
========================= */

let cart = [];
let total = 0;


function addToCart(name, price) {

    cart.push({
        name: name,
        price: price
    });

    total += price;

    updateCart();

    alert(name + " added to cart!");
}


function updateCart() {

    const cartSummary =
        document.getElementById("cartSummary");

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    cartSummary.style.display = "block";

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {

        const li =
            document.createElement("li");

        li.textContent =
            `${item.name} - ₹${item.price}`;

        cartItems.appendChild(li);
    });

    cartTotal.textContent = total;
}


/* =========================
   BUY NOW
========================= */

function buyNow(name, price) {

    alert(
        "Thank you for choosing " +
        name +
        "! Your order amount is ₹" +
        price
    );
}
}
