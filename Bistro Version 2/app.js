
// const links = document.querySelectorAll(".nav-list li");

// const navSlide = () => {
//     const hamburger = document.querySelector(".hamburger");
//     const nav = document.querySelector(".nav-list");
//     const navLinks = document.querySelectorAll(".nav-list li")
    
//     // Toggle Nav
//     hamburger.addEventListener("click", () => {
//         nav.classList.toggle("nav-active");

//         // Animate Links
//         navLinks.forEach((link, index) => {
//             if(link.style.animation) {
//                 link.style.animation = "";
//             } else {
//                 link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + .3}s`;
//             }
//         });

//         // Burger animation
//         hamburger.classList.toggle("toggle");
//     });

    
// }

// navSlide();

const selectElement = function(element) {
    return document.querySelector(element);
};

let menuToggler = selectElement(".menu-toggle");
let body = selectElement("body");

menuToggler.addEventListener("click", function() {
    body.classList.toggle("open");
});