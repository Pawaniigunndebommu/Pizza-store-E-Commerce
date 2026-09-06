// ===============================
// PIZZ0 - SCRIPT.JS
// ONLY: 3rd PHOTO FIX + CART FIX
// ===============================


// ===============================
// 3rd CIRCLE PHOTO FIX
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const heroImg = document.getElementById("heroImg");
    const dots = document.querySelectorAll(".dot");

    // Correct working pizza images
    const pizzaImages = [
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80",

        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80",

        "https://images.unsplash.com/photo-1593560708920-61dd98c8a48b?auto=format&fit=crop&w=700&q=80",

        "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=700&q=80"
    ];


    dots.forEach(function (dot, index) {

        dot.style.backgroundImage =
            "url('" + pizzaImages[index] + "')";

        dot.style.backgroundSize = "cover";
        dot.style.backgroundPosition = "center";
        dot.style.backgroundRepeat = "no-repeat";


        dot.addEventListener("click", function () {

            if (heroImg) {

                heroImg.src = pizzaImages[index];

            }

            dots.forEach(function (d) {
                d.classList.remove("active");
            });

            dot.classList.add("active");

        });

    });

});



// ===============================
// CART
// ===============================

let cart = [];


// Add to Cart
function addToCart(name, price) {

    cart.push({
        name: name,
        price: Number(price)
    });

    updateCart();

    showMessage(name + " added to cart!");
}


// Update Cart
function updateCart() {

    const cartCount =
        document.getElementById("cartCount");

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    // Cart count
    if (cartCount) {
        cartCount.textContent = cart.length;
    }


    // Cart items
    if (cartItems) {

        if (cart.length === 0) {

            cartItems.innerHTML =
                '<p class="empty-cart">Your cart is empty.</p>';

        } else {

            cartItems.innerHTML = "";

            let total = 0;


            cart.forEach(function (item, index) {

                total += item.price;


                const itemDiv =
                    document.createElement("div");

                itemDiv.className = "cart-item";


                itemDiv.innerHTML = `
                    <div>
                        <strong>${item.name}</strong>
                        <br>
                        ₹${item.price}
                    </div>

                    <button onclick="removeFromCart(${index})">
                        ✕
                    </button>
                `;


                cartItems.appendChild(itemDiv);

            });


            if (cartTotal) {
                cartTotal.textContent = total;
            }

        }

    }

}


// Remove from Cart
function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// ===============================
// CART OPEN / CLOSE
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const cartBtn =
        document.getElementById("cartBtn");

    const cartPanel =
        document.getElementById("cartPanel");

    const closeCart =
        document.getElementById("closeCart");


    if (cartBtn && cartPanel) {

        cartBtn.addEventListener("click", function () {

            cartPanel.classList.add("show");

        });

    }


    if (closeCart && cartPanel) {

        closeCart.addEventListener("click", function () {

            cartPanel.classList.remove("show");

        });

    }

});



// ===============================
// BUY NOW
// ===============================

function buyNow(name, price) {

    const address = prompt(
        "Enter your delivery address:"
    );


    if (address && address.trim() !== "") {

        alert(
            "Order placed successfully!\n\n" +
            "Pizza: " + name + "\n" +
            "Price: ₹" + price + "\n" +
            "Address: " + address
        );

    } else {

        alert("Order cancelled. Address is required.");

    }

}



// ===============================
// CHECKOUT
// ===============================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    let total = 0;

    cart.forEach(function (item) {

        total += item.price;

    });


    const address = prompt(
        "Enter your delivery address:"
    );


    if (address && address.trim() !== "") {

        alert(
            "Order placed successfully!\n\n" +
            "Total: ₹" + total + "\n" +
            "Delivery Address: " + address
        );


        cart = [];

        updateCart();

    }

}



// ===============================
// MESSAGE
// ===============================

function showMessage(text) {

    const message =
        document.getElementById("message");


    if (!message) {

        alert(text);

        return;

    }


    message.textContent = text;

    message.classList.add("show");


    setTimeout(function () {

        message.classList.remove("show");

    }, 2000);

}



// ===============================
// SEARCH
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const searchBtn =
        document.getElementById("searchBtn");

    const searchBox =
        document.getElementById("searchBox");

    const searchInput =
        document.getElementById("searchInput");


    if (searchBtn && searchBox) {

        searchBtn.addEventListener("click", function () {

            searchBox.classList.toggle("show");

            if (searchInput) {
                searchInput.focus();
            }

        });

    }


    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const value =
                searchInput.value.toLowerCase().trim();


            const cards =
                document.querySelectorAll(".pizza-card");


            cards.forEach(function (card) {

                const name =
                    card.dataset.name.toLowerCase();


                if (name.includes(value)) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

        });

    }

});
