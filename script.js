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

// Handle contact form submission
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault(); // prevent page reload

        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const message = document.getElementById("message").value;

        document.getElementById("form-output").innerHTML = `
            <p><strong>First Name:</strong> ${firstName}</p>
            <p><strong>Last Name:</strong> ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong> ${message}</p>
        `;
    });
}
