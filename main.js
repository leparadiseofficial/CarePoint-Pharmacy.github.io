/* Shared interactive UI: accessible mobile nav, modals, tabs, lightbox and reveal animation. */
(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu-btn");
    const nav = document.getElementById("navLinks");

    if (menuButton && nav) {
      const closeMenu = () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open menu");
      };
      menuButton.addEventListener("click", () => {
        const opened = nav.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(opened));
        menuButton.setAttribute("aria-label", opened ? "Close menu" : "Open menu");
      });
      nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
      document.addEventListener("click", event => {
        if (!nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
      });
      document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
          closeMenu();
          menuButton.focus();
        }
      });
    }

    let previousFocus = null;
    const closeModal = modal => {
      if (!modal) return;
      modal.hidden = true;
      if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus();
    };

    document.querySelectorAll("[data-modal-open]").forEach(button => {
      button.addEventListener("click", () => {
        const modal = document.getElementById(button.dataset.modalOpen);
        if (!modal) return;
        previousFocus = document.activeElement;
        modal.hidden = false;
        modal.querySelector("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")?.focus();
      });
    });
    document.querySelectorAll("[data-modal-close]").forEach(button => {
      button.addEventListener("click", () => closeModal(button.closest(".modal-backdrop")));
    });
    document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
      backdrop.addEventListener("click", event => {
        if (event.target === backdrop) closeModal(backdrop);
      });
    });

    document.querySelectorAll("[data-tabs]").forEach(group => {
      const tabs = [...group.querySelectorAll('[role="tab"]')];
      const activate = tab => {
        tabs.forEach(current => {
          const active = current === tab;
          current.setAttribute("aria-selected", String(active));
          current.tabIndex = active ? 0 : -1;
          const panel = document.getElementById(current.getAttribute("aria-controls"));
          if (panel) panel.hidden = !active;
        });
        tab.focus();
      };
      tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => activate(tab));
        tab.addEventListener("keydown", event => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          let next = index;
          if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
          if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
          if (event.key === "Home") next = 0;
          if (event.key === "End") next = tabs.length - 1;
          activate(tabs[next]);
        });
      });
    });

    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
      const image = lightbox.querySelector("img");
      const closeButton = lightbox.querySelector(".lightbox-close");
      const closeLightbox = () => {
        lightbox.hidden = true;
        if (image) image.removeAttribute("src");
      };
      document.querySelectorAll("[data-lightbox-src]").forEach(button => {
        button.addEventListener("click", () => {
          if (!image) return;
          image.src = button.dataset.lightboxSrc;
          image.alt = button.dataset.lightboxAlt || button.getAttribute("aria-label") || "Expanded image";
          lightbox.hidden = false;
          closeButton?.focus();
        });
      });
      closeButton?.addEventListener("click", closeLightbox);
      lightbox.addEventListener("click", event => {
        if (event.target === lightbox) closeLightbox();
      });
      document.addEventListener("keydown", event => {
        if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
      });
    }

    // Escape closes open dialogs even on pages without a lightbox.
    document.addEventListener("keydown", event => {
      if (event.key !== "Escape") return;
      document.querySelectorAll(".modal-backdrop:not([hidden])").forEach(closeModal);
    });

    const revealItems = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealItems.forEach(item => observer.observe(item));
    } else {
      revealItems.forEach(item => item.classList.add("is-visible"));
    }
  });
})();