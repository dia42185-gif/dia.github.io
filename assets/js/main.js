/* Portfolio — Abdou Latif Dia
   Rôles du JS : (1) afficher le registre des certifications depuis data/certificates.js,
   (2) écarter les strates 3D au défilement, (3) révéler titres et blocs, (4) menu mobile. */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var TYPES = { certificat: "Certificat", attestation: "Attestation", badge: "Badge" };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function formatDate(d) {
    if (!d) return "";
    var m = /^(\d{4})(?:-(\d{2}))?$/.exec(d);
    if (!m) return d;
    var months = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
    return m[2] ? months[parseInt(m[2], 10) - 1] + " " + m[1] : m[1];
  }

  /* ---- 1. Registre des certifications ---- */
  var data = window.PORTFOLIO_DATA;
  var host = document.getElementById("cert-groups");
  if (data && host) {
    data.domains.forEach(function (dom) {
      var items = data.certificates.filter(function (c) { return c.domain === dom.key; });
      if (!items.length) return;

      var group = el("div", "cert-group");
      var h3 = el("h3", null, dom.label);
      h3.appendChild(el("small", null, items.length + (items.length > 1 ? " documents" : " document")));
      group.appendChild(h3);

      var ul = el("ul", "cert-list");
      items.forEach(function (c) {
        var li = el("li");
        var left = el("div");
        left.appendChild(el("p", "cert-title", c.title));
        left.appendChild(el("p", "cert-issuer", c.issuer + (c.program ? " · " + c.program : "")));
        li.appendChild(left);

        var meta = el("div", "cert-meta");
        meta.appendChild(el("span", "t", TYPES[c.type] || "Certificat"));
        var d = formatDate(c.date);
        if (d) meta.appendChild(el("span", null, d));
        if (c.file) {
          var a = el("a", null, "Voir le document");
          a.href = c.file; a.target = "_blank"; a.rel = "noopener";
          meta.appendChild(document.createElement("br"));
          meta.appendChild(a);
        }
        li.appendChild(meta);
        if (c.summary) li.appendChild(el("p", "cert-summary", c.summary));
        ul.appendChild(li);
      });
      group.appendChild(ul);
      host.appendChild(group);
    });
    var count = document.getElementById("cert-count");
    if (count) count.textContent = data.certificates.length;
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---- 2. Strates 3D : elles s'écartent au défilement, suivent légèrement le pointeur ---- */
  var stage = document.getElementById("stage");
  var hero = document.querySelector(".hero");
  var header = document.querySelector(".site-header");
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || 0;
    if (header) header.classList.toggle("scrolled", y > 24);
    if (stage && hero && !reduce) {
      var p = Math.min(1, y / (hero.offsetHeight * 0.85));
      stage.style.setProperty("--spread", (p * 56).toFixed(1));
    }
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  if (stage && hero && !reduce && window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      stage.style.setProperty("--tilt", (x * 10).toFixed(2) + "deg");
    });
    hero.addEventListener("pointerleave", function () { stage.style.setProperty("--tilt", "0deg"); });
  }

  /* ---- 3. Révélation : titres (masque), blocs porteurs de sens, filets du registre ---- */
  var targets = document.querySelectorAll(".h2, [data-rise], .cert-list li");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.2, rootMargin: "0px 0px -6% 0px" });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add("in"); });
  }

  /* ---- 4. Menu mobile ---- */
  var btn = document.querySelector(".menu-btn");
  var nav = document.getElementById("nav");
  function setMenu(open) {
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.textContent = open ? "Fermer" : "Menu";
    nav.classList.toggle("open", open);
    header.classList.toggle("menu-open", open);
  }
  if (btn && nav) {
    btn.addEventListener("click", function () { setMenu(btn.getAttribute("aria-expanded") !== "true"); });
    nav.addEventListener("click", function (e) { if (e.target.tagName === "A") setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  }

  /* ---- Lien actif dans la navigation ---- */
  var links = {};
  document.querySelectorAll('.nav a[href^="#"]').forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
  if ("IntersectionObserver" in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var a = links[en.target.id];
        if (a && en.isIntersecting) {
          Object.keys(links).forEach(function (k) { links[k].removeAttribute("aria-current"); });
          a.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(links).forEach(function (id) { var s = document.getElementById(id); if (s) so.observe(s); });
  }
})();
