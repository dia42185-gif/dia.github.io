/* Rend la liste des certifications du CV depuis data/certificates.js (même source que le portfolio). */
(function () {
  var data = window.PORTFOLIO_DATA, host = document.getElementById("cv-certs");
  if (!data || !host) return;
  var TYPES = { certificat: "Certificat", attestation: "Attestation", badge: "Badge" };
  var months = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];

  function fmt(d) {
    if (!d) return "";
    var m = /^(\d{4})(?:-(\d{2}))?$/.exec(d);
    return m ? (m[2] ? months[+m[2] - 1] + " " + m[1] : m[1]) : d;
  }
  function el(t, c, x) { var n = document.createElement(t); if (c) n.className = c; if (x != null) n.textContent = x; return n; }

  data.domains.forEach(function (dom) {
    var items = data.certificates.filter(function (c) { return c.domain === dom.key; });
    if (!items.length) return;
    var g = el("div", "cert-group");
    g.appendChild(el("h3", null, dom.label));
    var ul = el("ul");
    items.forEach(function (c) {
      var li = el("li");
      var b = el("strong", null, c.title);
      li.appendChild(b);
      var tail = " — " + c.issuer + (c.program ? " (" + c.program + ")" : "") + " · " + (TYPES[c.type] || "Certificat");
      var d = fmt(c.date);
      if (d) tail += " · " + d;
      li.appendChild(document.createTextNode(tail));
      ul.appendChild(li);
    });
    g.appendChild(ul);
    host.appendChild(g);
  });

  document.querySelectorAll("[data-cert-count]").forEach(function (n) { n.textContent = data.certificates.length; });
})();
