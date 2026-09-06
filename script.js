/* =====================================================
   PIZZA STORE - COMPLETE SCRIPT.JS
   Only fixes:
   1. Cart functionality
   2. Slider 3rd circle image
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ================================
       CART VARIABLES
       ================================ */

    let cart = [];

    const cartBtn = document.getElementById("cartBtn");
    const cartPanel = document.getElementById("cartPanel");
    const closeCart = document.getElementById("closeCart");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const cartCount = document.getElementById("cartCount");
    const message = document.getElementById("message");


    /* ================================
       OPEN CART
       ================================ */

    if (cartBtn) {
        cartBtn.addEventListener("click", function () {
            cartPanel.classList.add("active");
        });
    }


    /* ================================
       CLOSE CART
       ================================ */

    if (closeCart) {
        closeCart.addEventListener("click", function () {
            cartPanel.classList.remove("active");
        });
    }


    /* ================================
       ADD TO CART
       ================================ */

    window.addToCart = function (name, price) {

        const existingItem = cart.find(function (item) {
            return item.name === name;
        });

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

        cartPanel.classList.add("active");
    };


    /* ================================
       UPDATE CART
       ================================ */

    function updateCart() {

        if (!cartItems) return;

        cartItems.innerHTML = "";

        if (cart.length === 0) {

            cartItems.innerHTML =
                '<p class="empty-cart">Your cart is empty.</p>';

            cartTotal.textContent = "0";
            cartCount.textContent = "0";

            return;
        }


        let total = 0;
        let count = 0;


        cart.forEach(function (item, index) {

            total += item.price * item.quantity;
            count += item.quantity;


            const itemDiv = document.createElement("div");

            itemDiv.className = "cart-item";


            itemDiv.innerHTML = `
                <div>
                    <h4>${item.name}</h4>
                    <p>₹${item.price} × ${item.quantity}</p>
                </div>

                <div class="cart-controls">

                    <button onclick="decreaseItem(${index})">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button onclick="increaseItem(${index})">
                        +
                    </button>

                    <button onclick="removeItem(${index})">
                        ✕
                    </button>

                </div>
            `;


            cartItems.appendChild(itemDiv);

        });


        cartTotal.textContent = total;
        cartCount.textContent = count;
    }


    /* ================================
       INCREASE ITEM
       ================================ */

    window.increaseItem = function (index) {

        if (cart[index]) {
            cart[index].quantity++;
        }

        updateCart();
    };


    /* ================================
       DECREASE ITEM
       ================================ */

    window.decreaseItem = function (index) {

        if (!cart[index]) return;

        cart[index].quantity--;

        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }

        updateCart();
    };


    /* ================================
       REMOVE ITEM
       ================================ */

    window.removeItem = function (index) {

        if (!cart[index]) return;

        cart.splice(index, 1);

        updateCart();

        showMessage("Item removed from cart");
    };


    /* ================================
       BUY NOW
       ================================ */

    window.buyNow = function (name, price) {

        cart = [{
            name: name,
            price: price,
            quantity: 1
        }];

        updateCart();

        cartPanel.classList.add("active");

        showMessage("Ready to checkout!");
    };


    /* ================================
       CHECKOUT
       ================================ */

    window.checkout = function () {

        if (cart.length === 0) {

            showMessage("Your cart is empty!");

            return;
        }

        let total = 0;

        cart.forEach(function (item) {
            total += item.price * item.quantity;
        });


        alert(
            "Order placed successfully!\n\n" +
            "Total Amount: ₹" + total
        );


        cart = [];

        updateCart();

        cartPanel.classList.remove("active");
    };


    /* ================================
       MESSAGE
       ================================ */

    function showMessage(text) {

        if (!message) return;

        message.textContent = text;

        message.classList.add("show");


        setTimeout(function () {
            message.classList.remove("show");
        }, 2000);
    }


    /* =================================================
       SLIDER
       3rd CIRCLE FIX
       ================================================= */

    const heroImg = document.getElementById("heroImg");

    const dots = document.querySelectorAll(".dot");


    /*
       These are working pizza images.
       IMPORTANT:
       The 3rd image is replaced with a reliable
       pizza image instead of the broken URL.
    */

    const sliderImages = [

        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80",

        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80",

        "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80",

        "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=80"

    ];


    /* ================================
       PUT IMAGES INSIDE CIRCLES
       ================================ */

    dots.forEach(function (dot, index) {

        if (sliderImages[index]) {

            dot.style.backgroundImage =
                "url('" + sliderImages[index] + "')";

            dot.style.backgroundSize = "cover";

            dot.style.backgroundPosition = "center";

            dot.style.backgroundRepeat = "no-repeat";

        }


        /* ================================
           CIRCLE CLICK
           ================================ */

        dot.addEventListener("click", function () {

            if (!heroImg) return;


            heroImg.src = sliderImages[index];


            dots.forEach(function (d) {
                d.classList.remove("active");
            });


            dot.classList.add("active");

        });

    });


    /* ================================
       FORCE 3RD CIRCLE IMAGE
       ================================ */

    if (dots[2]) {

        dots[2].style.backgroundImage =
            "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80')";

        dots[2].style.backgroundSize = "cover";

        dots[2].style.backgroundPosition = "center";

        dots[2].style.backgroundRepeat = "no-repeat";

    }


    /* ================================
       IMAGE ERROR PROTECTION
       ================================ */

    document.querySelectorAll("img").forEach(function (img) {

        img.addEventListener("error", function () {

            this.onerror = null;

            this.src =
                "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80";

        });

    });


    /* ================================
       SEARCH
       ================================ */

    const searchBtn = document.getElementById("searchBtn");
    const searchBox = document.getElementById("searchBox");
    const searchInput = document.getElementById("searchInput");


    if (searchBtn && searchBox) {

        searchBtn.addEventListener("click", function () {

            searchBox.classList.toggle("active");

            if (searchBox.classList.contains("active")) {

                searchInput.focus();

            }

        });

    }


    /* ================================
       SEARCH PIZZAS
       ================================ */

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const searchValue =
                searchInput.value.toLowerCase().trim();


            const pizzaCards =
                document.querySelectorAll(".pizza-card");


            pizzaCards.forEach(function (card) {

                const name =
                    card.dataset.name.toLowerCase();


                if (name.includes(searchValue)) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

        });

    }


    /* ================================
       INITIAL CART
       ================================ */

    updateCart();

});

    }

});
