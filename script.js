/* ==================================================
   MENU HANDLING
================================================== */
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
const closeMenu = document.getElementById("close-menu");

// Open/close menu
menuToggle.addEventListener("click", () => menu.classList.toggle("show"));
if (closeMenu) closeMenu.addEventListener("click", () => menu.classList.remove("show"));
document.querySelectorAll("#menu a").forEach(link => link.addEventListener("click", () => menu.classList.remove("show")));

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 10) nav.classList.add("scrolled");
  else nav.classList.remove("scrolled");
});


/* ==================================================
   Enable smooth scroll only on real mobile devices
================================================== */
const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

if (!isMobile) {
  // Desktop / Laptop only → enable custom smooth scroll
  let currentScroll = window.scrollY;
  let targetScroll = window.scrollY;

  const wheelEase = 0.08; // smoothness factor

  /* Mouse wheel */
  window.addEventListener("wheel", e => {
    targetScroll += e.deltaY;
    targetScroll = Math.max(
      0,
      Math.min(targetScroll, document.body.scrollHeight - window.innerHeight)
    );
    e.preventDefault();
  }, { passive: false });

  /* Smooth scroll loop */
  function smoothScrollLoop() {
    currentScroll += (targetScroll - currentScroll) * wheelEase;
    window.scrollTo(0, currentScroll);
    requestAnimationFrame(smoothScrollLoop);
  }
  smoothScrollLoop();
} else {
  // Mobile → keep native scroll
  document.documentElement.style.scrollBehavior = "smooth";
  document.body.style.webkitOverflowScrolling = "touch";
}


/* ==================================================
   CONTACT FORM VALIDATION
================================================== */
const contactForm = document.getElementById("contact-form");
const formOutput = document.getElementById("form-output");
const formElements = Array.from(document.querySelectorAll("#contact-form input, #contact-form textarea"));
const sendButton = document.querySelector('#contact-form button[type="submit"]');

if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    clearErrors();

    const firstName = contactForm["first_name"].value.trim();
    const lastName = contactForm["last_name"].value.trim();
    const email = contactForm["email"].value.trim();
    const phone = contactForm["phone"].value.trim();
    const message = contactForm["message"].value.trim();
    let isValid = true;

    if (!firstName) { showError("first-name", "First name cannot be empty."); isValid = false; }
    if (!lastName) { showError("last-name", "Last name cannot be empty."); isValid = false; }
    if (!email) { showError("email", "Email is required."); isValid = false; }
    else if (!validateEmail(email)) { showError("email", "Invalid email format."); isValid = false; }
    if (!phone) { showError("phone", "Phone is required."); isValid = false; }
    else if (!/^\+?[0-9\s\-]{7,15}$/.test(phone)) { showError("phone", "Invalid phone number."); isValid = false; }

    if (!isValid) { formOutput.innerHTML = ""; formOutput.style.display = "none"; return; }

    formOutput.innerHTML = `
      <h3>Submitted Details:</h3>
      <p><strong>First Name:</strong> ${escapeHTML(firstName)}</p>
      <p><strong>Last Name:</strong> ${escapeHTML(lastName)}</p>
      <p><strong>Email:</strong> ${escapeHTML(email)}</p>
      <p><strong>Phone:</strong> ${escapeHTML(phone)}</p>
      <p><strong>Message:</strong> ${escapeHTML(message)}</p>
    `;
    formOutput.style.display = "block";
    contactForm.reset();
  });

  // Enter key navigation
  formElements.forEach((el, index) => {
    el.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const nextIndex = index + 1;
        if (nextIndex < formElements.length) formElements[nextIndex].focus();
        else sendButton.focus();
      }
    });
  });
}

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  let error = document.createElement("small");
  error.className = "error-message";
  error.style.color = "red";
  error.textContent = message;
  if (!field.nextElementSibling || !field.nextElementSibling.classList.contains("error-message"))
    field.parentNode.insertBefore(error, field.nextSibling);
}

function clearErrors() { document.querySelectorAll(".error-message").forEach(el => el.remove()); }
function validateEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
function escapeHTML(text) {
  return text.replace(/[&<>"']/g, m => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;", "'":"&#39;"}[m]));
}


/* ==================================================
   COUNTERS WITH INTERSECTION OBSERVER
================================================== */
const counters = document.querySelectorAll('.count');

function updateCount(el) {
  const target = +el.getAttribute('data-target');
  const start = +el.getAttribute('data-start') || 31;
  const duration = 4000;
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime)/duration,1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    el.innerText = Math.round(start + (target - start) * easedProgress) + "+";
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) { updateCount(entry.target); observer.unobserve(entry.target); }
  });
}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));


/* ==================================================
   SHARED SMOOTH SNAP FUNCTION
================================================== */
function smoothSnap(element, start, end, duration = 500) {
  let startTime = null;
  function animate(timestamp) {
    if(!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime)/duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.scrollLeft = start + (end - start) * eased;
    if(progress < 1) requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}


/* ==================================================
   FIRST CAROUSEL (DRAG + AUTO + SNAP + LOOP)
================================================== */
const scroller = document.getElementById("scroller");
if(scroller){
  const cards = Array.from(scroller.children);
  scroller.append(...cards.map(c=>c.cloneNode(true)), ...cards.map(c=>c.cloneNode(true)));
  const sectionWidth = scroller.scrollWidth / 3;
  scroller.scrollLeft = sectionWidth;

  let isDown=false, isHovered=false, startX=0, scrollLeftVal=0, velocity=0, lastX=0, rafId;

  // Drag & Touch
  scroller.addEventListener("mousedown", e => { isDown=true; startX=e.pageX-scroller.offsetLeft; scrollLeftVal=scroller.scrollLeft; velocity=0; lastX=e.pageX; cancelAnimationFrame(rafId); });
  scroller.addEventListener("mousemove", e => { if(!isDown) return; e.preventDefault(); const x=e.pageX-scroller.offsetLeft; const walk=(x-startX)*0.4; scroller.scrollLeft=scrollLeftVal-walk; velocity=e.pageX-lastX; lastX=e.pageX; loopCheck(scroller); });
  scroller.addEventListener("mouseup", () => { if(isDown){ isDown=false; inertiaScroll(); } });
  scroller.addEventListener("mouseleave", () => { if(isDown){ isDown=false; inertiaScroll(); } });

  scroller.addEventListener("touchstart", e => { isDown=true; startX=e.touches[0].clientX; scrollLeftVal=scroller.scrollLeft; velocity=0; lastX=startX; });
  scroller.addEventListener("touchmove", e => { if(!isDown) return; const x=e.touches[0].clientX; const walk=(x-startX)*0.4; scroller.scrollLeft=scrollLeftVal-walk; velocity=x-lastX; lastX=x; loopCheck(scroller); });
  scroller.addEventListener("touchend", () => { if(isDown){ isDown=false; inertiaScroll(); } });

  // Hover pause
  scroller.addEventListener("mouseenter", () => { isHovered=true; });
  scroller.addEventListener("mouseleave", () => { isHovered=false; });

  // Inertia + Snap
  function inertiaScroll() {
    scroller.scrollLeft -= velocity;
    velocity *= 0.92;
    loopCheck(scroller);
    if(Math.abs(velocity) > 0.1) rafId=requestAnimationFrame(inertiaScroll);
    else snapToCard();
  }

  function snapToCard() {
    const cardWidth = scroller.children[0].offsetWidth;
    const index = Math.round(scroller.scrollLeft / cardWidth);
    const target = index * cardWidth;
    smoothSnap(scroller, scroller.scrollLeft, target, 500);
  }

  function loopCheck(element) {
    const scrollWidth = element.scrollWidth;
    const sectionWidth = scrollWidth/3;
    if(element.scrollLeft <=0) element.scrollLeft+=sectionWidth;
    else if(element.scrollLeft >= sectionWidth*2) element.scrollLeft-=sectionWidth;
  }

  // Auto-scroll
  setInterval(()=>{
    if(isDown || isHovered) return;
    const cardWidth = scroller.children[0].offsetWidth;
    const currentIndex = Math.round(scroller.scrollLeft / cardWidth);
    const nextIndex = currentIndex +1;
    const target = nextIndex*cardWidth;
    smoothSnap(scroller, scroller.scrollLeft, target, 500);
  },3000);
}


/* ==================================================
   SECOND CAROUSEL (AUTO + LOOP, NO DRAG)
================================================== */
window.addEventListener('load', () => {
  const scroller = document.getElementById("autoScrollCarousel");
  if (!scroller) return;

  const cards = Array.from(scroller.children);
  const gap = parseInt(getComputedStyle(scroller).gap) || 0;
  const cardWidth = cards[0].offsetWidth + gap;
  const totalCards = cards.length;
  let currentIndex = 0;
  const autoScrollInterval = 3000; // ms per card
  let autoScrollTimer;
  let isHovered = false;

  function smoothSnap(start, end, duration = 500) {
    let startTime = null;
    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      scroller.scrollLeft = start + (end - start) * eased;
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  function autoScrollNext() {
    currentIndex = (currentIndex + 1) % totalCards;
    const target = currentIndex * cardWidth;
    smoothSnap(scroller.scrollLeft, target);
  }

  function startAutoScroll() {
    if (window.innerWidth < 768) { // small screens only
      autoScrollTimer = setInterval(() => {
        if (!isHovered) autoScrollNext();
      }, autoScrollInterval);
    }
  }

  function stopAutoScroll() {
    clearInterval(autoScrollTimer);
  }

  // Pause on hover
  scroller.addEventListener("mouseenter", () => {
    isHovered = true;
  });
  scroller.addEventListener("mouseleave", () => {
    isHovered = false;
  });

  // Initialize
  startAutoScroll();

  // Reset on resize
  window.addEventListener("resize", () => {
    stopAutoScroll();
    currentIndex = 0;
    scroller.scrollLeft = 0;
    startAutoScroll();
  });
});
window.addEventListener('load', () => {
  const scroller = document.getElementById("autoScrollCarousel1");
  if (!scroller) return;

  const cards = Array.from(scroller.children);
  const gap = parseInt(getComputedStyle(scroller).gap) || 0;
  const cardWidth = cards[0].offsetWidth + gap;

  // Duplicate cards to create infinite loop
  scroller.append(...cards.map(card => card.cloneNode(true)));
  scroller.append(...cards.map(card => card.cloneNode(true)));

  const totalWidth = scroller.scrollWidth / 3; // width of original set
  scroller.scrollLeft = totalWidth; // start from middle set

  const speed = 1; // pixels per frame
  let rafId;

  function scrollLoop() {
    scroller.scrollLeft += speed;

    // Loop around seamlessly
    if (scroller.scrollLeft >= totalWidth * 2) {
      scroller.scrollLeft -= totalWidth;
    }

    rafId = requestAnimationFrame(scrollLoop);
  }

  scrollLoop();
});

window.addEventListener('load', () => {
  const scroller = document.querySelector('.info-carousel');
  if (!scroller) return;

  const cards = Array.from(scroller.children);
  const gap = parseInt(getComputedStyle(scroller).gap) || 0;
  const cardWidth = cards[0].offsetWidth + gap;

  // Duplicate cards for infinite scroll
  scroller.append(...cards.map(c => c.cloneNode(true)));
  scroller.append(...cards.map(c => c.cloneNode(true)));

  const totalWidth = scroller.scrollWidth / 3; // original set width
  scroller.scrollLeft = totalWidth; // start from middle

  const speed = 1; // pixels per frame
  let rafId;

  function scrollLoop() {
    scroller.scrollLeft += speed;

    if (scroller.scrollLeft >= totalWidth * 2) {
      scroller.scrollLeft -= totalWidth;
    }

    rafId = requestAnimationFrame(scrollLoop);
  }

  scrollLoop();

  // Pause on hover
  scroller.addEventListener('mouseenter', () => cancelAnimationFrame(rafId));
  scroller.addEventListener('mouseleave', scrollLoop);
});
