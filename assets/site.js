/* =========================================================
   Shared site chrome.
   Each page includes this file plus an empty
   <div id="site-header"></div>.
   The header markup therefore only exists once, here, instead
   of being copy-pasted into every page.
   ========================================================= */

(function () {
  "use strict";

  // Pages in the main navigation. Add/remove entries here and every
  // page updates automatically.
  var NAV_ITEMS = [
    { id: "home", label: "Home", href: "index.html" },
    { id: "about", label: "About Us", href: "about.html" },
    { id: "testimonials", label: "Testimonials", href: "testimonials.html" },
    { id: "faq", label: "FAQs", href: "faq.html" },
    { id: "policies", label: "Policies", href: "policies.html" },
    { id: "contact", label: "Contact", href: "contact.html" }
  ];

  var MENU_ICON =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">' +
      '<path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>' +
    '</svg>';

  function buildHeader(activeId, basePath) {
    var links = NAV_ITEMS.map(function (item) {
      var isActive = item.id === activeId;
      return (
        '<li><a class="nav-link' + (isActive ? " is-active" : "") + '" ' +
        (isActive ? 'aria-current="page" ' : "") +
        'href="' + basePath + item.href + '">' + item.label + "</a></li>"
      );
    }).join("");

    return (
      '<header class="site-header">' +
        '<div class="site-header__bar">' +
          '<a class="brand" href="' + basePath + 'index.html">' +
            '<img class="brand__logo" src="' + basePath + 'assets/logo-small.png" ' +
              'alt="Empowering Learners - Ruth Paterson" width="320" height="320">' +
          '</a>' +
          '<div class="site-header__actions">' +
            '<a class="button button--ghost header-contact-btn" href="' + basePath + 'contact.html">Contact Us</a>' +
            '<button type="button" class="nav-icon-btn" id="nav-toggle-btn" ' +
              'aria-haspopup="true" aria-expanded="false" aria-controls="nav-panel">' +
              MENU_ICON +
              '<span class="nav-icon-btn__label">Menu</span>' +
            '</button>' +
          '</div>' +
        '</div>' +
        '<div class="nav-backdrop" id="nav-backdrop"></div>' +
        '<nav class="nav-panel" id="nav-panel" aria-label="Main">' +
          '<ul class="site-nav__list">' + links + '</ul>' +
          '<hr class="nav-panel__divider">' +
          '<div class="text-size" role="group" aria-label="Text size">' +
            '<span class="text-size__label">Text size</span>' +
            '<button type="button" data-scale="0.9" aria-label="Smaller text">A-</button>' +
            '<button type="button" data-scale="1" aria-label="Default text size">A</button>' +
            '<button type="button" data-scale="1.25" aria-label="Larger text">A+</button>' +
          '</div>' +
          '<hr class="nav-panel__divider">' +
          '<div class="theme-toggle" role="group" aria-label="Colour theme">' +
            '<span class="theme-toggle__label">Theme</span>' +
            '<button type="button" data-theme-choice="green" aria-label="Green theme">Green</button>' +
            '<button type="button" data-theme-choice="blue" aria-label="Blue tint theme">Blue</button>' +
            '<button type="button" data-theme-choice="pink" aria-label="Pink tint theme">Pink</button>' +
            '<button type="button" data-theme-choice="yellow" aria-label="Yellow tint theme">Yellow</button>' +
          '</div>' +
        '</nav>' +
      '</header>'
    );
  }

  var THEME_KEY = "theme";
  var THEMES = ["green", "blue", "pink", "yellow"];

  function getPreferredTheme() {
    var stored = localStorage.getItem(THEME_KEY);
    if (THEMES.indexOf(stored) !== -1) { return stored; }
    return "green";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }

  // Applied immediately (not just on DOMContentLoaded) so the correct
  // theme is set as early as possible even if a page is ever missing
  // the no-flash bootstrap script in its <head>.
  applyTheme(getPreferredTheme());

  function initTheme(root) {
    var buttons = root.querySelectorAll(".theme-toggle button");

    function refreshPressed() {
      var current = document.documentElement.getAttribute("data-theme");
      buttons.forEach(function (btn) {
        var isActive = btn.getAttribute("data-theme-choice") === current;
        btn.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var choice = btn.getAttribute("data-theme-choice");
        localStorage.setItem(THEME_KEY, choice);
        applyTheme(choice);
        refreshPressed();
      });
    });

    refreshPressed();
  }

  function initCarousels(root) {
    var carousels = root.querySelectorAll(".testimonial-carousel");
    carousels.forEach(function (carousel) {
      var track = carousel.querySelector(".testimonial-grid");
      var prevBtn = carousel.querySelector(".carousel-arrow--prev");
      var nextBtn = carousel.querySelector(".carousel-arrow--next");
      if (!track || !prevBtn || !nextBtn) { return; }

      function updateArrows() {
        var maxScroll = track.scrollWidth - track.clientWidth;
        prevBtn.disabled = track.scrollLeft <= 1;
        nextBtn.disabled = track.scrollLeft >= maxScroll - 1;
      }

      prevBtn.addEventListener("click", function () {
        track.scrollBy({ left: -track.clientWidth * 0.9, behavior: "smooth" });
      });
      nextBtn.addEventListener("click", function () {
        track.scrollBy({ left: track.clientWidth * 0.9, behavior: "smooth" });
      });
      track.addEventListener("scroll", updateArrows);
      window.addEventListener("resize", updateArrows);
      updateArrows();
    });
  }

  function initReadMore(root) {
    var buttons = root.querySelectorAll(".bio-toggle");
    buttons.forEach(function (btn) {
      var text = btn.previousElementSibling;
      if (!text || !text.classList.contains("bio-text")) { return; }
      btn.addEventListener("click", function () {
        var expanded = text.classList.toggle("is-expanded");
        btn.setAttribute("aria-expanded", expanded ? "true" : "false");
        btn.textContent = expanded ? "Read less" : "Read more";
      });
    });
  }

  function initTextSize(root) {
    var buttons = root.querySelectorAll(".text-size button");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.documentElement.style.setProperty("--text-scale", btn.getAttribute("data-scale"));
      });
    });
  }

  // Menu icon opens a small dropdown panel, so people never have to
  // scroll back up a long page to find navigation - it is always
  // reachable from the same spot, top right, on every page.
  function initMenu() {
    var toggleBtn = document.getElementById("nav-toggle-btn");
    var panel = document.getElementById("nav-panel");
    var backdrop = document.getElementById("nav-backdrop");
    if (!toggleBtn || !panel || !backdrop) { return; }

    function openMenu() {
      panel.classList.add("is-open");
      backdrop.classList.add("is-open");
      toggleBtn.setAttribute("aria-expanded", "true");
    }
    function closeMenu() {
      panel.classList.remove("is-open");
      backdrop.classList.remove("is-open");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
    function toggleMenu() {
      if (panel.classList.contains("is-open")) { closeMenu(); } else { openMenu(); }
    }

    toggleBtn.addEventListener("click", toggleMenu);
    backdrop.addEventListener("click", closeMenu);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeMenu(); }
    });
    // Closing after choosing a link keeps the panel out of the way
    // of the page the person just navigated to.
    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  function render() {
    var headerHost = document.getElementById("site-header");
    if (!headerHost) { return; }

    var activeId = headerHost.getAttribute("data-active") || "home";
    var basePath = headerHost.getAttribute("data-base") || "";

    headerHost.outerHTML = buildHeader(activeId, basePath);

    initTextSize(document.getElementById("nav-panel"));
    initTheme(document.getElementById("nav-panel"));
    initMenu();
    initReadMore(document);
    initCarousels(document);
  }

  document.addEventListener("DOMContentLoaded", render);
})();
