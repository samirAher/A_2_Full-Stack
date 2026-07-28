/*====================================================
        KBTCOE WEBSITE
        script.js
====================================================*/


// ============================================
// LOADER
// ============================================

window.addEventListener("load", function () {

    const loader = document.querySelector(".loader");

    if (loader) {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 500);

    }

});



// ============================================
// STICKY NAVBAR
// ============================================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {

    if (window.scrollY > 80) {

        navbar.classList.add("shadow");

        navbar.style.padding = "10px 0";

    }

    else {

        navbar.classList.remove("shadow");

        navbar.style.padding = "15px 0";

    }

});




// ============================================
// SCROLL REVEAL
// ============================================

const reveals = document.querySelectorAll(".reveal");

function revealSection() {

    const windowHeight = window.innerHeight;

    reveals.forEach(function (element) {

        const top = element.getBoundingClientRect().top;

        if (top < windowHeight - 120) {

            element.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealSection);

revealSection();




// ============================================
// COUNTER ANIMATION
// ============================================

const counters = document.querySelectorAll(".counter");

const speed = 200;

counters.forEach(counter => {

    function updateCount() {

        const target = +counter.getAttribute("data-target");

        const count = +counter.innerText;

        const increment = target / speed;

        if (count < target) {

            counter.innerText = Math.ceil(count + increment);

            setTimeout(updateCount, 10);

        }

        else {

            counter.innerText = target;

        }

    }

    updateCount();

});




// ============================================
// BACK TO TOP BUTTON
// ============================================

const topButton = document.querySelector(".top-btn");

window.addEventListener("scroll", function () {

    if (!topButton) return;

    if (window.scrollY > 300) {

        topButton.style.display = "flex";

    }

    else {

        topButton.style.display = "none";

    }

});

if (topButton) {

    topButton.addEventListener("click", function (e) {

        e.preventDefault();

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}




// ============================================
// ACTIVE NAVIGATION
// ============================================

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {

    const href = link.getAttribute("href");

    if (href === currentPage) {

        link.classList.add("active");

    }

});




// ============================================
// CONTACT FORM VALIDATION
// ============================================

const form = document.querySelector("form");

if (form) {

    form.addEventListener("submit", function (e) {

        const name = document.querySelector("#name");

        const email = document.querySelector("#email");

        const message = document.querySelector("#message");

        if (

            name.value.trim() === "" ||

            email.value.trim() === "" ||

            message.value.trim() === ""

        ) {

            e.preventDefault();

            alert("Please fill all required fields.");

        }

    });

}




// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});




// ============================================
// CARD HOVER EFFECT
// ============================================

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});




// ============================================
// IMAGE ZOOM EFFECT
// ============================================

const images = document.querySelectorAll(".zoom img");

images.forEach(img => {

    img.addEventListener("mouseenter", () => {

        img.style.transform = "scale(1.1)";

    });

    img.addEventListener("mouseleave", () => {

        img.style.transform = "scale(1)";

    });

});




// ============================================
// BUTTON RIPPLE EFFECT
// ============================================

const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {

    button.addEventListener("click", function (e) {

        const circle = document.createElement("span");

        const diameter = Math.max(button.clientWidth, button.clientHeight);

        circle.style.width = diameter + "px";

        circle.style.height = diameter + "px";

        circle.style.position = "absolute";

        circle.style.borderRadius = "50%";

        circle.style.background = "rgba(255,255,255,.4)";

        circle.style.left =

            e.offsetX - diameter / 2 + "px";

        circle.style.top =

            e.offsetY - diameter / 2 + "px";

        circle.style.transform = "scale(0)";

        circle.style.animation = "ripple .6s linear";

        button.appendChild(circle);

        setTimeout(() => {

            circle.remove();

        }, 600);

    });

});




// ============================================
// CURRENT YEAR
// ============================================

const year = document.querySelector("#year");

if (year) {

    year.innerHTML = new Date().getFullYear();

}




// ============================================
// CONSOLE MESSAGE
// ============================================

console.log("KBTCOE Bootstrap Website Loaded Successfully.");