// Current and target scroll positions
let currentScroll = window.scrollY;
let targetScroll = window.scrollY;

// Easing factor (smaller = slower, smoother)
const ease = 0.1; 

// Smooth scrolling loop
function smoothScrollLoop() {
  // Interpolate towards the target scroll position
  currentScroll += (targetScroll - currentScroll) * ease;
  
  // Move the window to the new eased position
  window.scrollTo(0, currentScroll);
  
  requestAnimationFrame(smoothScrollLoop);
}

// Mouse wheel scrolling
window.addEventListener('wheel', (e) => {
  targetScroll += e.deltaY; // deltaY is the wheel movement amount
  
  // Clamp target so you can't scroll beyond limits
  targetScroll = Math.max(0, Math.min(
    targetScroll, 
    document.body.scrollHeight - window.innerHeight
  ));
  
  // Prevent the default instant jump
  e.preventDefault();
}, { passive: false });

// Touch scrolling
let touchStartY = 0;
window.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
});
window.addEventListener('touchmove', (e) => {
  let touchY = e.touches[0].clientY;
  let deltaY = touchStartY - touchY;
  targetScroll += deltaY;
  targetScroll = Math.max(0, Math.min(
    targetScroll, 
    document.body.scrollHeight - window.innerHeight
  ));
  touchStartY = touchY;
  e.preventDefault();
}, { passive: false });

// Start the smooth scroll animation
smoothScrollLoop();




const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

// Toggle mobile menu
menuToggle.addEventListener("click", () => {
  menu.classList.toggle("show");
});

// Close menu when clicking a link
document.querySelectorAll("#menu a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("show");
  });
});

// Change navbar background on scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 10) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

const contactForm = document.getElementById("contact-form");
const formOutput = document.getElementById("form-output");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();

    const firstName = contactForm["first_name"].value.trim();
    const lastName = contactForm["last_name"].value.trim();
    const email = contactForm["email"].value.trim();
    const phone = contactForm["phone"].value.trim();
    const message = contactForm["message"].value.trim();

    let isValid = true;

    if (firstName === "") {
      showError(
        "first-name",
        "First name cannot be empty. Please enter your first name."
      );
      isValid = false;
    }
    if (lastName === "") {
      showError(
        "last-name",
        "Last name cannot be empty. Please enter your last name."
      );
      isValid = false;
    }
    if (email === "") {
      showError("email", "Email address is required. Please enter your email.");
      isValid = false;
    } else if (!validateEmail(email)) {
      showError(
        "email",
        "Invalid email format. Please enter a valid email like example@domain.com."
      );
      isValid = false;
    }
    if (!phone) {
      showError("phone", "Phone number is required.");
      isValid = false;
    } else if (!/^\+?[0-9\s\-]{7,15}$/.test(phone)) {
      showError(
        "phone",
        "Please enter a valid phone number with 7 to 15 digits."
      );
      isValid = false;
    }

    if (!isValid) {
      formOutput.innerHTML = "";
      formOutput.style.display = "none";
      return;
    }

    formOutput.innerHTML = `
      <h3>Submitted Details:</h3>
      <p><strong>First Name:</strong> ${escapeHTML(firstName)}</p>
      <p><strong>Last Name:</strong> ${escapeHTML(lastName)}</p>
      <p><strong>Email:</strong> ${escapeHTML(email)}</p>
      <p><strong>Phone:</strong> ${escapeHTML(phone) || "N/A"}</p>
      <p><strong>Message:</strong> ${escapeHTML(message)}</p>
    `;
    formOutput.style.display = "block";

    contactForm.reset();
  });
}

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (!field) return;

  // Create error message element
  let error = document.createElement("small");
  error.className = "error-message";
  error.style.color = "red";
  error.textContent = message;

  // Insert error message if not already present
  if (
    !field.nextElementSibling ||
    !field.nextElementSibling.classList.contains("error-message")
  ) {
    field.parentNode.insertBefore(error, field.nextSibling);
  }
}

function clearErrors() {
  document.querySelectorAll(".error-message").forEach((el) => el.remove());
}

function validateEmail(email) {
  // Simple email regex validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHTML(text) {
  // Basic escape to prevent XSS attacks in output
  return text.replace(/[&<>"']/g, function (m) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[m];
  });
}
const formElements = Array.from(
  document.querySelectorAll("#contact-form input, #contact-form textarea")
);

const sendButton = document.querySelector(
  '#contact-form button[type="submit"]'
);

formElements.forEach((el, index) => {
  el.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const nextIndex = index + 1;

      if (nextIndex < formElements.length) {
        formElements[nextIndex].focus();
      } else {
        sendButton.focus();
      }
    }
  });
});

const closeMenu = document.getElementById("close-menu");

// Open menu
menuToggle.addEventListener("click", () => {
  menu.classList.add("show");
});

// Close menu (close button)
if (closeMenu) {
  closeMenu.addEventListener("click", () => {
    menu.classList.remove("show");
  });
}

// Close menu when clicking a link
document.querySelectorAll("#menu a").forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("show");
  });
});
