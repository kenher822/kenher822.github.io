const header = document.querySelector(".site-header");
const themeToggle = document.querySelector(".theme-toggle");
const filterButtons = document.querySelectorAll(".filter");
const skillCards = document.querySelectorAll(".skill-card");
const revealItems = document.querySelectorAll(".reveal");

const storedTheme = localStorage.getItem("theme");
if (storedTheme === null || storedTheme === "dark") {
  document.body.classList.add("dark");
}

const syncThemeLabel = () => {
  const dark = document.body.classList.contains("dark");
  themeToggle.setAttribute("aria-label", dark ? "Cambiar a tema claro" : "Cambiar a tema oscuro");
  themeToggle.setAttribute("title", dark ? "Tema claro" : "Tema oscuro");
};

syncThemeLabel();

window.addEventListener("scroll", () => {
  header.dataset.elevated = String(window.scrollY > 12);
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  syncThemeLabel();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    skillCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));
