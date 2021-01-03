const bodyELement = document.querySelector("body");
const menuToggle = document.querySelector(".hamburger-menu");
const heroElement = document.querySelector(".hero");
const navList = document.querySelector(".nav-list");

menuToggle.addEventListener("click", function() {
    bodyELement.classList.toggle("is-open");
    heroElement.classList.add("is-open");
});

// add eventlistner to close nav when we click nav item
navList.addEventListener("click", function(e){
    let clickedElement = e.target;

    if(clickedElement.classList[0] === "nav-link"){
        bodyELement.classList.remove("is-open");
    }
});

// add eventlistener to window object to close nav when we click outside
window.addEventListener("click", function(e){
    let clickedElement = e.target;
    if(clickedElement.matches(".is-open")){
        bodyELement.classList.remove("is-open");
        heroElement.classList.remove("is-open");
    }
});

