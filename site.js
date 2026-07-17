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
    { id: "services", label: "Additional Services", href: "services.html" },
    { id: "testimonials", label: "Testimonials", href: "testimonials.html" },
    { id: "policies", label: "Policies", href: "policies.html" },
    { id: "contact", label: "Contact", href: "contact.html" }
  ];

  var POLICY_LINKS = [
    { label: "Terms & Conditions", href: "policies/terms-conditions.html" },
    { label: "Privacy Policy", href: "policies/privacy-policy.html" }
  ];

  function buildHeader(activeId, basePath) {
    var links = NAV_ITEMS.map(function (item) {
      var isActive = item.id === activeId;
      return (
        '<li><a class="nav-link' + (isActive ? " is-active" : "") + '" ' +
        (isActive ? 'aria-current="page" ' : "") +
        'href="' + basePath + item.href + '">' + item.label + "</a></li>"
      );
    }).join("");

    var subLinks = "";
    if (activeId === "policies") {
      subLinks =
        '<ul class="sub-nav">' +
        POLICY_LINKS.map(function (p) {
          return '<li><a href="' + basePath + p.href + '">' + p.label + "</a></li>";
        }).join("") +
        "</ul>";
    }

    return (
      '<header class="site-header">' +
        '<div class="site-header__bar">' +
          '<a class="brand" href="' + basePath + 'index.html">' +
            '<img class="brand__logo" src="' + basePath + 'assets/logo-placeholder.svg" ' +
              'alt="Your organisation logo - replace assets/logo-placeholder.svg with your own logo file">' +
            '<span class="brand__name">[Your Organisation Name]</span>' +
          '</a>' +
          '<div class="text-size" role="group" aria-label="Text size">' +
            '<span class="text-size__label">Text size</span>' +
            '<button type="button" data-scale="0.9" aria-label="Smaller text">A-</button>' +
            '<button type="button" data-scale="1" aria-label="Default text size">A</button>' +
            '<button type="button" data-scale="1.25" aria-label="Larger text">A+</button>' +
          '</div>' +
          '<input type="checkbox" id="nav-toggle" class="nav-toggle">' +
          '<label for="nav-toggle" class="nav-toggle-label">Menu</label>' +
        '</div>' +
        '<nav aria-label="Main">' +
          '<ul class="site-nav__list">' + links + '</ul>' +
        '</nav>' +
        subLinks +
      '</header>'
    );
  }

  function buildFooter(basePath) {
    return (
      '<footer class="site-footer">' +
        '<div class="site-footer__grid">' +
          '<div>' +
            '<h2>[Your Organisation Name]</h2>' +
            '<p>[Town], [County] [Postcode]<br>' +
              '<a href="tel:+440000000000">[Phone number]</a><br>' +
              '<a href="mailto:hello@example.co.uk">hello@example.co.uk</a></p>' +
          '</div>' +
          '<div>' +
            '<h2>Quick links</h2>' +
            '<ul>' +
              NAV_ITEMS.map(function (item) {
                return '<li><a href="' + basePath + item.href + '">' + item.label + "</a></li>";
              }).join("") +
            '</ul>' +
          '</div>' +
          '<div>' +
            '<h2>Policies</h2>' +
            '<ul>' +
              POLICY_LINKS.map(function (p) {
                return '<li><a href="' + basePath + p.href + '">' + p.label + "</a></li>";
              }).join("") +
            '</ul>' +
          '</div>' +
        '</div>' +
        '<p class="site-footer__bottom">Prototype site - placeholder content. &copy; ' +
          new Date().getFullYear() + ' [Your Organisation Name]</p>' +
      '</footer>'
    );
  }

  function initTextSize() {
    var buttons = document.querySelectorAll(".text-size button");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.documentElement.style.setProperty("--text-scale", btn.getAttribute("data-scale"));
      });
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

    initTextSize();
  }

  document.addEventListener("DOMContentLoaded", render);
})();
