// assets/js/menu.js
document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     MENÚ HAMBURGUESA (MÓVIL)
     ========================= */
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  function closeMobileMenu() {
    if (!mainNav || !menuToggle) return;
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  /* =========================
     DROPDOWNS (TERAPIAS + TRANSFORMACIÓN)
     - SOLO UNO ABIERTO
     - Soporta: ids nuevos + estructura vieja
     ========================= */

  // Busca ambos dropdowns por id si existen; si no, toma todos los .dropdown
  const candidates = [
    document.getElementById("terapiasItem"),
    document.getElementById("transformacionItem")
  ].filter(Boolean);

  const dropdowns =
    candidates.length ? candidates : Array.from(document.querySelectorAll(".nav-item.dropdown"));

  function getButton(dropdown) {
    // prioriza ids nuevos
    const byId =
      dropdown.id === "terapiasItem"
        ? document.getElementById("btnTerapias") || document.getElementById("btn-terapias")
        : dropdown.id === "transformacionItem"
        ? document.getElementById("btnTransformacion")
        : null;

    return byId || dropdown.querySelector("button.nav-link, .nav-link");
  }

  function getMenu(dropdown) {
    const byId =
      dropdown.id === "terapiasItem"
        ? document.getElementById("terapiasMenu")
        : dropdown.id === "transformacionItem"
        ? document.getElementById("transformacionMenu")
        : null;

    return byId || dropdown.querySelector(".dropdown-menu");
  }

  function closeDropdown(dropdown) {
    dropdown.classList.remove("open");
    const btn = getButton(dropdown);
    if (btn) btn.setAttribute("aria-expanded", "false");
  }

  function closeAllDropdowns(except = null) {
    dropdowns.forEach((d) => {
      if (d !== except) closeDropdown(d);
    });
  }

  dropdowns.forEach((dropdown) => {
    const btn = getButton(dropdown);
    const menu = getMenu(dropdown);
    if (!btn || !menu) return;

    btn.setAttribute("aria-expanded", "false");

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      const willOpen = !dropdown.classList.contains("open");
      closeAllDropdowns(dropdown);

      dropdown.classList.toggle("open", willOpen);
      btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });

    // clicks dentro del dropdown no cierran nada
    menu.addEventListener("click", (e) => e.stopPropagation());

    // si das click en un link del dropdown -> cerrar dropdown
    dropdown.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => closeDropdown(dropdown));
    });
  });

  /* =========================
     CERRAR AL CLICK FUERA
     ========================= */
  document.addEventListener("click", (e) => {
    // cerrar dropdowns si click afuera
    dropdowns.forEach((d) => {
      if (!d.contains(e.target)) closeDropdown(d);
    });

    // cerrar menú móvil si click fuera del header
    const clickedInsideHeader = e.target.closest(".site-header");
    if (mainNav && mainNav.classList.contains("open") && !clickedInsideHeader) {
      closeMobileMenu();
    }
  });

  /* =========================
     CERRAR CON ESC
     ========================= */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      dropdowns.forEach(closeDropdown);
      closeMobileMenu();
    }
  });

  /* =========================
     CERRAR MENÚ MÓVIL AL CLICK EN LINK
     (pero NO si fue click al botón de dropdown)
     ========================= */
  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (mainNav?.classList.contains("open")) closeMobileMenu();
    });
  });
});

// =========================
// CTA -> Abrir primera FAQ
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-faq");
  const faq = document.getElementById("faq-primera");

  if (!btn || !faq) return;

  btn.addEventListener("click", (e) => {
    // Evita que el anchor salte "a lo bruto"
    e.preventDefault();

    // Abre la primera pregunta
    faq.open = true;

    // Baja suave hasta esa pregunta
    faq.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
