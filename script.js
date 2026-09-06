const slides = [

    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",

    "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",

    "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=80",

    "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=800&q=80"

];


let currentSlide = 0;

const heroImage = document.getElementById("heroImage");

const dots = document.querySelectorAll(".dot");


function changeSlide(index) {

    currentSlide = index;

    heroImage.style.opacity = "0";

    setTimeout(() => {

        heroImage.src = slides[index];

        heroImage.style.opacity = "1";

    }, 200);


    dots.forEach((dot, i) => {

        dot.classList.toggle(
            "active",
            i === index
        );

    });
}


/* AUTOMATIC SLIDER */

setInterval(() => {

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    changeSlide(currentSlide);

}, 4000);


/* CHECK OUT MENU */

function scrollToMenu() {

    document
        .getElementById("menu")
        .scrollIntoView({
            behavior: "smooth"
        });

}
