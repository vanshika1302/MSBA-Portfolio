// ==========================================================================
// Vanshika Srivastava — MSBA Portfolio — main.js
// ==========================================================================

(function () {
  "use strict";

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Theme toggle ---------- */
  var root = document.documentElement;
  var themeToggle = document.getElementById("theme-toggle");
  var THEME_KEY = "vs-portfolio-theme";

  function applyTheme(theme) {
    if (theme === "light" || theme === "dark") {
      root.setAttribute("data-theme", theme);
    } else {
      root.removeAttribute("data-theme");
    }
  }

  try {
    var savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) applyTheme(savedTheme);
  } catch (e) { /* localStorage unavailable — ignore, fall back to system theme */ }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      var current = root.getAttribute("data-theme") || (prefersDark ? "dark" : "light");
      var next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
    });
  }

  /* ---------- Sticky header shadow/blur on scroll ---------- */
  var header = document.getElementById("site-header");
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 12) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  var hamburger = document.getElementById("hamburger");
  var mainNav = document.getElementById("main-nav");
  if (hamburger && mainNav) {
    hamburger.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute("href").replace("#", "");
      return document.getElementById(id);
    })
    .filter(Boolean);

  function updateActiveNav() {
    var scrollPos = window.scrollY + window.innerHeight * 0.35;
    var current = null;
    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) current = section;
    });
    navLinks.forEach(function (link) {
      var id = link.getAttribute("href").replace("#", "");
      link.classList.toggle("active", current && current.id === id);
    });
  }
  document.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  /* ---------- Reveal-on-scroll ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }
  // Safety net: if for any reason an element never intersects (e.g. hidden
  // ancestor, unusual embed context), make sure content isn't stuck invisible.
  setTimeout(function () {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }, 4000);

  /* ---------- Hero rotating role word ---------- */
  var rotatorWords = Array.prototype.slice.call(document.querySelectorAll(".rotator-word"));
  if (rotatorWords.length > 1) {
    var activeIndex = 0;
    setInterval(function () {
      rotatorWords[activeIndex].classList.remove("is-active");
      activeIndex = (activeIndex + 1) % rotatorWords.length;
      rotatorWords[activeIndex].classList.add("is-active");
    }, 2200);
  }

  /* ---------- Copy email to clipboard ---------- */
  var copyBtn = document.getElementById("copy-email");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var email = copyBtn.getAttribute("data-email");
      var reset = function () {
        copyBtn.classList.remove("copied");
      };
      function fallbackCopy(text) {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); } catch (e) { /* ignore */ }
        document.body.removeChild(ta);
      }
      function markCopied() {
        copyBtn.classList.add("copied");
        setTimeout(reset, 1800);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(markCopied, function () {
          fallbackCopy(email);
          markCopied();
        });
      } else {
        fallbackCopy(email);
        markCopied();
      }
    });
  }

  /* ---------- Smooth scroll for in-page anchors (fallback for older browsers) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var targetId = anchor.getAttribute("href").slice(1);
      var target = document.getElementById(targetId) || document.getElementById("top");
      if (target && "scrollIntoView" in target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();
