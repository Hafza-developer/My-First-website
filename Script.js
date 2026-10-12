
// =======================================
// HAFZA MURTAZA — PORTFOLIO INTERACTIONS
// Vanilla JavaScript only
// =======================================

// Mobile navigation
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Open navigation menu" : "Close navigation menu"
  );

  navLinks.classList.toggle("open", !isOpen);
});

// Close the mobile menu after selecting a navigation link.
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Close the menu when the Escape key is pressed.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    menuToggle.focus();
  }
});

// Close the menu if the screen becomes wider.
window.addEventListener("resize", () => {
  if (window.innerWidth > 680) {
    closeMenu();
  }
});

// Automatically update the footer year.
document.getElementById("year").textContent = new Date().getFullYear();

// Back-to-top button visibility.
const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 350);
}, { passive: true });

// Highlight the navigation link for the current section.
const pageSections = document.querySelectorAll("main section[id]");
const sectionLinks = document.querySelectorAll(
  '.nav-links a[href^="#"]:not(.btn)'
);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      sectionLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${entry.target.id}`) {
          link.classList.add("active");
          link.setAttribute("aria-current", "location");
        } else {
          link.classList.remove("active");
          link.removeAttribute("aria-current");
        }
      });
    });
  }, {
    rootMargin: "-25% 0px -60% 0px"
  });

  pageSections.forEach((section) => sectionObserver.observe(section));
}

// Contact form validation.
// Important: this demo does NOT send or store messages.
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Use the browser's built-in validation first.
  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    formStatus.textContent =
      "Please check the required fields and enter valid details.";
    formStatus.className = "form-note error";
    return;
  }

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Additional simple checks.
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name.length < 2) {
    formStatus.textContent = "Please enter a name with at least 2 characters.";
    formStatus.className = "form-note error";
    return;
  }

  if (!emailPattern.test(email)) {
    formStatus.textContent = "Please enter a valid email address.";
    formStatus.className = "form-note error";
    return;
  }

  if (message.length < 10) {
    formStatus.textContent =
      "Please write a message with at least 10 characters.";
    formStatus.className = "form-note error";
    return;
  }

  // Validation succeeded, but there is no server or email service.
  formStatus.textContent =
    "Your details passed validation! This demo does not send or save messages. Connect an email service to receive enquiries.";
  formStatus.className = "form-note success";
});