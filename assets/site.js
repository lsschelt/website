/* =========================================================
   Shared site chrome.
   Each page includes this file plus an empty
   <div id="site-header"></div> and <div id="site-footer"></div>.
   The header and footer markup therefore only exists once,
   here, instead of being copy-pasted into every page.
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
          '<button type="button" class="nav-icon-btn" id="nav-toggle-btn" ' +
            'aria-haspopup="true" aria-expanded="false" aria-controls="nav-panel">' +
            MENU_ICON +
            '<span class="nav-icon-btn__label">Menu</span>' +
          '</button>' +
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
        '</nav>' +
      '</header>'
    );
  }

  function buildFooter(basePath) {
    return (
      '<footer class="site-footer">' +
        '<div class="site-footer__grid">' +
          '<div>' +
            '<h2>Empowering Learners</h2>' +
            '<p><a href="mailto:info@empoweringlearners.co.uk">info@empoweringlearners.co.uk</a></p>' +
          '</div>' +
          '<div>' +
            '<h2>Quick links</h2>' +
            '<ul>' +
              NAV_ITEMS.map(function (item) {
                return '<li><a href="' + basePath + item.href + '">' + item.label + "</a></li>";
              }).join("") +
            '</ul>' +
          '</div>' +
        '</div>' +
        '<p class="site-footer__bottom">&copy; ' +
          new Date().getFullYear() + ' Empowering Learners - Ruth Paterson</p>' +
      '</footer>'
    );
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
    var footerHost = document.getElementById("site-footer");
    if (!headerHost || !footerHost) { return; }

    var activeId = headerHost.getAttribute("data-active") || "home";
    var basePath = headerHost.getAttribute("data-base") || "";

    headerHost.outerHTML = buildHeader(activeId, basePath);
    footerHost.outerHTML = buildFooter(basePath);

    initTextSize(document.getElementById("nav-panel"));
    initMenu();
  }

  document.addEventListener("DOMContentLoaded", render);
})();
