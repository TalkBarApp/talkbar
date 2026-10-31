/* TalkBar shared behavior: theme toggle + themed logo + scroll reveal */
(function () {
  var root = document.documentElement;
  var KEY = "talkbar-theme";

  /* ---- themed logo (4 variants: theme × light/dark background) ---- */
  var LOGOS = {
    "warm-light": "assets/logo-warm-light.svg",
    "warm-dark": "assets/logo-warm-dark.svg",
    "blue-light": "assets/logo-blue-light.svg",
    "blue-dark": "assets/logo-blue-dark.svg"
  };
  function logoSrc(theme, onDark) {
    var t = theme === "blue" ? "blue" : "warm";
    return LOGOS[t + "-" + (onDark ? "dark" : "light")];
  }
  function onDarkFor(a) {
    var ctx = a.getAttribute("data-logo-ctx") || "light";
    if (ctx === "dark") return true;
    if (ctx === "nav") {
      var nav = document.getElementById("nav");
      return !(nav && nav.classList.contains("scrolled"));
    }
    return false;
  }
  function renderLogo() {
    document.querySelectorAll("a.brand").forEach(function (a) {
      if (!a.querySelector("img.tb-logo")) {
        var img = document.createElement("img");
        img.className = "tb-logo";
        img.alt = "TalkBar";
        a.innerHTML = "";
        a.appendChild(img);
        a.setAttribute("aria-label", "TalkBar home");
      }
    });
    updateLogos();
  }
  function updateLogos() {
    var theme = root.getAttribute("data-theme") || "warm";
    document.querySelectorAll("a.brand img.tb-logo").forEach(function (img) {
      var a = img.parentNode;
      img.src = logoSrc(theme, onDarkFor(a));
    });
  }
  window.__tbUpdateLogos = updateLogos;

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    document.querySelectorAll(".theme-toggle button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.set === theme));
    });
    updateLogos();
    try { localStorage.setItem(KEY, theme); } catch (e) {}
  }

  function init() {
    renderLogo();
    var saved = "warm";
    try { saved = localStorage.getItem(KEY) || "warm"; } catch (e) {}
    apply(saved);
    document.querySelectorAll(".theme-toggle button").forEach(function (b) {
      b.addEventListener("click", function () { apply(b.dataset.set); });
    });
    // scroll reveal — arm only if JS runs; reveal in-viewport synchronously (no flash)
    var motionOK = !window.matchMedia || !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var els = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
    if (!motionOK) { return; }
    root.classList.add("reveal-armed");
    els.forEach(function (el, i) { el.style.transitionDelay = (Math.min(i % 4, 3) * 60) + "ms"; });
    function showIfNear() {
      var h = window.innerHeight || document.documentElement.clientHeight;
      els.forEach(function (el) {
        if (el.classList.contains("in")) return;
        var r = el.getBoundingClientRect();
        if (r.top < h * 0.94 && r.bottom > 0) el.classList.add("in");
      });
    }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
        });
      }, { rootMargin: "0px 0px -6% 0px", threshold: 0.06 });
      els.forEach(function (el) { io.observe(el); });
    }
    showIfNear();
    window.addEventListener("scroll", showIfNear, { passive: true });
    window.addEventListener("resize", showIfNear);
    window.addEventListener("load", showIfNear);
    // ultimate safety: never leave content hidden
    setTimeout(function () { els.forEach(function (el) { el.classList.add("in"); }); }, 1600);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
