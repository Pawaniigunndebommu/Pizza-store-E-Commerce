document.addEventListener("DOMContentLoaded", function () {

    /* ================= ELEMENTS ================= */

    const heroImg = document.getElementById("heroImg");

    const dots = document.querySelectorAll(".dot");

    const menuBtn = document.getElementById("menuBtn");

    const cartBtn = document.getElementById("cartBtn");

    const closeCart = document.getElementById("closeCart");

    const cartPanel = document.getElementById("cartPanel");

    const cartItems = document.getElementById("cartItems");

    const cartCount = document.getElementById("cartCount");

    const cartTotal = document.getElementById("cartTotal");

    const checkoutBtn = document.getElementById("checkoutBtn");

    const searchBtn = document.getElementById("searchBtn");

    const searchBox = document.getElementById("searchBox");

    const searchInput = document.getElementById("searchInput");

    const message = document.getElementById("message");


    /* ================= CART DATA ================= */

    let cart = [];


    /* ================= HERO SLIDER ================= */

    dots.forEach(function (dot) {

        dot.addEventListener("click", function () {

            const image = this.getAttribute("data-image");

            if (image) {
                heroImg.src = image;
            }

            dots.forEach(function (item) {
                item.classList.remove("active");
            });

            this.classList.add("active");

        });

    });


    /* ================= MENU BUTTON ================= */

    menuBtn.addEventListener("click", function () {

        document.getElementById("pizzas").scrollIntoView({
            behavior: "smooth"
        });

    });


    /* ================= OPEN CART ================= */

    cartBtn.addEventListener("click", function () {

        cartPanel.classList.add("active");

    });


    /* ================= CLOSE CART ================= */

    closeCart.addEventListener("click", function () {

        cartPanel.classList.remove("active");

    });


    /* ================= ADD TO CART ================= */

    document.querySelectorAll(".cart-btn").forEach(function (button) {

        button.addEventListener("click", function () {

            const name = this.dataset.name;

            const price = Number(this.dataset.price);

            addToCart(name, price);

        });

    });


    function addToCart(name, price) {

        const existing = cart.find(function (item) {

            return item.name === name;

        });


        if (existing) {

            existing.quantity++;

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


    /* ================= BUY NOW ================= */

    document.querySelectorAll(".buy-btn").forEach(function (button) {

        button.addEventListener("click", function () {

            const name = this.dataset.name;

            const price = Number(this.dataset.price);

            cart = [{
                name: name,
                price: price,
                quantity: 1
            }];

            updateCart();

            cartPanel.classList.add("active");

        });

    });


    /* ================= UPDATE CART ================= */

    function updateCart() {

        cartItems.innerHTML = "";

        let total = 0;

        let count = 0;


        if (cart.length === 0) {

            cartItems.innerHTML =
                '<p class="empty-cart">Your cart is empty.</p>';

        }


        cart.forEach(function (item, index) {

            const itemTotal =
                item.price * item.quantity;

            total += itemTotal;

            count += item.quantity;


            const div = document.createElement("div");

            div.className = "cart-item";


            div.innerHTML = `

                <div>
                    <h4>${item.name}</h4>
                    <p>₹${item.price} × ${item.quantity}</p>
                </div>

                <div class="cart-actions">

                    <button class="minus" data-index="${index}">
                        −
                    </button>

                    <button class="plus" data-index="${index}">
                        +
                    </button>

                    <button class="remove" data-index="${index}">
                        ✕
                    </button>

                </div>

            `;


            cartItems.appendChild(div);

        });


        cartTotal.textContent = total;

        cartCount.textContent = count;


        /* MINUS */

        document.querySelectorAll(".minus").forEach(function (button) {

            button.addEventListener("click", function () {

                const index = Number(this.dataset.index);

                cart[index].quantity--;

                if (cart[index].quantity <= 0) {
                    cart.splice(index, 1);
                }

                updateCart();

            });

        });


        /* PLUS */

        document.querySelectorAll(".plus").forEach(function (button) {

            button.addEventListener("click", function () {

                const index = Number(this.dataset.index);

                cart[index].quantity++;

                updateCart();

            });

        });


        /* REMOVE */

        document.querySelectorAll(".remove").forEach(function (button) {

            button.addEventListener("click", function () {

                const index = Number(this.dataset.index);

                cart.splice(index, 1);

                updateCart();

            });

        });

    }


    /* ================= CHECKOUT ================= */

    checkoutBtn.addEventListener("click", function () {

        if (cart.length === 0) {

            showMessage("Your cart is empty!");

            return;

        }


        showMessage("Order placed successfully! 🍕");

        cart = [];

        updateCart();

        setTimeout(function () {

            cartPanel.classList.remove("active");

        }, 1000);

    });


    /* ================= SEARCH ================= */

    searchBtn.addEventListener("click", function () {

        searchBox.classList.toggle("active");

        if (searchBox.classList.contains("active")) {
            searchInput.focus();
        }

    });


    searchInput.addEventListener("input", function () {

        const searchValue =
            this.value.toLowerCase().trim();


        document.querySelectorAll(".pizza-card").forEach(function (card) {

            const name =
                card.dataset.name.toLowerCase();


            if (name.includes(searchValue)) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });


    /* ================= MESSAGE ================= */

    function showMessage(text) {

        message.textContent = text;

        message.classList.add("show");


        setTimeout(function () {

            message.classList.remove("show");

        }, 2000);

    }


    /* ================= IMAGE ERROR FALLBACK ================= */

    const fallbackImage =
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80";


    document.querySelectorAll("img").forEach(function (img) {

        img.addEventListener("error", function () {

            this.onerror = null;

            this.src = fallbackImage;

        });

    });


    /* ================= INITIAL CART ================= */

    updateCart();

});
