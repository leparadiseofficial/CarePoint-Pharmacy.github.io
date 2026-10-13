/* Shared interactive UI: mobile nav, modal, tabs, accordions, lightbox and reveal animation. */
(() => {
  "use strict";
  document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu-btn");
    const nav = document.getElementById("navLinks");
    if (menuButton && nav) {
      menuButton.addEventListener("click", () => {
        const opened = nav.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(opened));
        menuButton.setAttribute("aria-label", opened ? "Close menu" : "Open menu");
      });
      nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open menu");
      }));
    }

    let previousFocus = null;
    document.querySelectorAll("[data-modal-open]").forEach(button => button.addEventListener("click", () => {
      const modal = document.getElementById(button.dataset.modalOpen);
      if (!modal) return;
      previousFocus = document.activeElement;
      modal.hidden = false;
      modal.querySelector("button")?.focus();
    }));
    document.querySelectorAll("[data-modal-close]").forEach(button => button.addEventListener("click", () => {
      const modal = button.closest(".modal-backdrop");
      if (modal) modal.hidden = true;
      previousFocus?.focus();
    }));
    document.querySelectorAll(".modal-backdrop").forEach(backdrop => backdrop.addEventListener("click", e => {
      if (e.target === backdrop) backdrop.hidden = true;
    }));

    document.querySelectorAll("[data-tabs]").forEach(group => {
      const tabs = [...group.querySelectorAll('[role="tab"]')];
      tabs.forEach(tab => tab.addEventListener("click", () => {
        tabs.forEach(t => {
          const active = t === tab;
          t.setAttribute("aria-selected", String(active));
          t.tabIndex = active ? 0 : -1;
          const panel = document.getElementById(t.getAttribute("aria-controls"));
          if (panel) panel.hidden = !active;
        });
      }));
    });

    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
      const image = lightbox.querySelector("img");
      const close = () => { lightbox.hidden = true; image.removeAttribute("src"); };
      document.querySelectorAll("[data-lightbox-src]").forEach(button => button.addEventListener("click", () => {
        image.src = button.dataset.lightboxSrc;
        lightbox.hidden = false;
        lightbox.querySelector("button")?.focus();
      }));
      lightbox.querySelector(".lightbox-close")?.addEventListener("click", close);
      lightbox.addEventListener("click", e => { if (e.target === lightbox) close(); });
      document.addEventListener("keydown", e => { if (e.key === "Escape") { close(); document.querySelectorAll(".modal-backdrop").forEach(m => m.hidden = true); } });
    }

    const revealItems = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
      }), { threshold: 0.12 });
      revealItems.forEach(item => observer.observe(item));
    } else revealItems.forEach(item => item.classList.add("is-visible"));
  });
})();