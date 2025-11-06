// --- Fade-in animation for sections ---
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll("section, header, p, form");

  elements.forEach(el => {
    el.style.opacity = "0";
    el.style.transition = "opacity 1s ease";
    setTimeout(() => { el.style.opacity = "1"; }, 200);
  });
});

// --- Highlight active nav link while scrolling ---
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".top nav a");

  let currentSection = "";

  sections.forEach(sec => {
    const offset = sec.offsetTop - 60;
    if (pageYOffset >= offset) {
      currentSection = sec.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active-link");
    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active-link");
    }
  });
});

// --- Live character counter for textarea ---
const textarea = document.getElementById("comments");

if (textarea) {
  const counter = document.createElement("p");
  counter.style.color = "#ffb84d";
  counter.style.fontSize = "14px";
  counter.textContent = "0 / 300 characters";

  textarea.parentNode.insertBefore(counter, textarea.nextSibling);

  textarea.addEventListener("input", () => {
    const len = textarea.value.length;
    counter.textContent = `${len} / 300 characters`;
  });
}

// --- Submit button ripple effect ---
document.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", function (e) {
    let ripple = document.createElement("span");
    ripple.classList.add("ripple");
    this.appendChild(ripple);

    const x = e.clientX - this.offsetLeft;
    const y = e.clientY - this.offsetTop;

    ripple.style.left = x + "px";
    ripple.style.top = y + "px";

    setTimeout(() => ripple.remove(), 600);
  });
});


// ✅✅✅ --- FORM SUBMISSION WITH JSON (Formspree, no redirect) ---
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Stop page reload/redirect

    // Build JSON object for Formspree
    const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("comments").value
    };

    // Send JSON request to Formspree
    const response = await fetch("https://formspree.io/f/mzzknwzr", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert("✅ Your message has been sent!");
      form.reset(); // Clear inputs
    } else {
      alert("❌ There was an error sending your message.");
    }
  });
}

