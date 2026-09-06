let cart = [];


// HERO MENU BUTTON
function scrollToMenu() {
    document.getElementById("pizzaSection").scrollIntoView({
        behavior: "smooth"
    });
}


// FOOD SELECTOR
const foodImages = [
    "food1.png",
    "food2.png",
    "food3.png",
    "food4.png"
];

const heroImage = document.querySelector(".hero-image img");

document.querySelectorAll(".items div").forEach((item, index) => {

    item.addEventListener("click", function () {

        heroImage.src = foodImages[index];

    });

});


// ADD TO CART
function addToCart(name, price) {

    cart.push({
        name: name,
        price: price
    });

    updateCart();

    alert(name + " added to cart!");
}


// UPDATE CART
function updateCart() {

    const cartSummary = document.getElementById("cartSummary");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item) => {

        const li = document.createElement("li");

        li.textContent = item.name + " - ₹" + item.price;

        cartItems.appendChild(li);

        total += item.price;

    });

    cartTotal.textContent = total;

    if (cart.length > 0) {
        cartSummary.style.display = "block";
    } else {
        cartSummary.style.display = "none";
    }
}


// BUY NOW
function buyNow(name, price) {

    alert(
        "Order placed for " +
        name +
        " - ₹" +
        price
    );

}
