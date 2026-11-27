const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  navLinks.classList.toggle("is-open", !isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

const nextWorkshop = new Date("2026-12-05T10:00:00+05:30");
const countdownFields = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
};

function updateCountdown() {
  const remaining = Math.max(0, nextWorkshop.getTime() - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);
  countdownFields.days.textContent = String(Math.floor(totalSeconds / 86400)).padStart(2, "0");
  countdownFields.hours.textContent = String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, "0");
  countdownFields.minutes.textContent = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  countdownFields.seconds.textContent = String(totalSeconds % 60).padStart(2, "0");
}

updateCountdown();
window.setInterval(updateCountdown, 1000);

const registrationForm = document.querySelector("#registration-form");
const formMessage = document.querySelector("#form-message");
const fields = {
  name: document.querySelector("#student-name"),
  email: document.querySelector("#student-email"),
  department: document.querySelector("#department"),
  workshop: document.querySelector("#workshop"),
};

const validators = {
  name: (value) => value.trim().length >= 2 ? "" : "Please enter your name (at least 2 characters).",
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Please enter a valid email address.",
  department: (value) => value ? "" : "Please choose your department.",
  workshop: (value) => value ? "" : "Please choose a workshop.",
};

function validateField(name) {
  const field = fields[name];
  const error = validators[name](field.value);
  document.querySelector(`#${name}-error`).textContent = error;
  field.setAttribute("aria-invalid", String(Boolean(error)));
  return !error;
}

Object.keys(fields).forEach((name) => {
  fields[name].addEventListener("input", () => validateField(name));
  fields[name].addEventListener("change", () => validateField(name));
});

registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "";
  const isValid = Object.keys(fields).map(validateField).every(Boolean);

  if (!isValid) {
    formMessage.textContent = "Please check the highlighted fields and try again.";
    formMessage.style.color = "#c83e50";
    registrationForm.querySelector('[aria-invalid="true"]').focus();
    return;
  }

  const studentName = fields.name.value.trim();
  const workshopName = fields.workshop.value.split(" — ")[0];
  formMessage.textContent = `Thanks, ${studentName}! Your form for ${workshopName} is ready, but this demo does not submit registrations yet.`;
  formMessage.style.color = "#277a4d";
  registrationForm.reset();
  Object.keys(fields).forEach((name) => {
    fields[name].removeAttribute("aria-invalid");
    document.querySelector(`#${name}-error`).textContent = "";
  });
});
