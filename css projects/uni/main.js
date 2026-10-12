document.addEventListener("DOMContentLoaded", () => {
  // Mobile Burger Menu
  const burger = document.getElementById("burger");
  const header = document.querySelector(".site-header");
  if (burger && header) {
    burger.addEventListener("click", () => {
      const isOpen = header.classList.toggle("nav-open");
      burger.setAttribute("aria-expanded", isOpen);
    });
  }

  // Auto-populate current year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Simple Program Filter (used on academics.html)
  const chips = document.querySelectorAll(".filter-chip");
  const cards = document.querySelectorAll(".program-card");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const filter = chip.dataset.filter;
      cards.forEach(card => {
        if (filter === "all" || card.dataset.cat === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});