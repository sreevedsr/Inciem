const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
    menu.classList.toggle('show');
});

// Close menu when clicking a link
document.querySelectorAll('#menu a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('show');
    });
});

// Change navbar background on scroll
window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    if (window.scrollY > 10) { // when user scrolls down
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});
