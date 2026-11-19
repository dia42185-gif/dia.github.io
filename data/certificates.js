/* ==========================================================================
   SOURCE UNIQUE DES CERTIFICATIONS, UTILISÉE PAR index.html ET cv.html
   --------------------------------------------------------------------------
   Pour ajouter un document :
     1. Copier le fichier (PDF ou image) dans  assets/certificates/
     2. Ajouter un objet dans le tableau `certificates` ci-dessous
     3. C'est tout : le portfolio, le CV et le compteur se mettent à jour.

   Champs :
     id        identifiant unique (kebab-case)
     title     intitulé EXACT figurant sur le document
     issuer    organisme émetteur
     program   programme / plateforme (optionnel)
     type      "certificat" | "attestation" | "badge"
     domain    clé d'un groupe défini dans `domains`
     date      "AAAA-MM" ou "AAAA" quand elle est connue, sinon null
     summary   ce que le document atteste, tel que formulé sur le document
               (optionnel : ne rien inventer, laisser null en cas de doute)
     file      chemin du document original, ex. "assets/certificates/nom.pdf",
               ou null tant que le fichier n'est pas ajouté
   ========================================================================== */
window.PORTFOLIO_DATA = {
  domains: [
    { key: "cyber",  label: "Cybersécurité" },
    { key: "ia",     label: "IA et données" },
    { key: "cloud",  label: "Cloud, réseaux et systèmes" },
    { key: "dev",    label: "Développement et entrepreneuriat numérique" }
  ],

  certificates: [
    /* ---- Cybersécurité ---- */
    {
      id: "aws-cybersecurity-sbo",
      title: "Cybersecurity for Small Business Owners",
      issuer: "AWS Training & Certification",
      type: "certificat",
      domain: "cyber",
      date: null, summary: null, file: null
    },
    {
      id: "nta-intro-cybersecurite",
      title: "Introduction à la cybersécurité",
      issuer: "Network Training Academy (NTA)",
      program: "Cisco Networking Academy",
      type: "certificat",
      domain: "cyber",
      date: null, summary: null, file: null
    },
    {
      id: "hp-life-cyber",
      title: "Introduction de sensibilisation à la cybersécurité",
      issuer: "HP LIFE",
      type: "certificat",
      domain: "cyber",
      date: null,
      summary: "Reconnaître les menaces courantes en cybersécurité et acquérir les connaissances de base pour mieux sécuriser les données et les informations en ligne.",
      file: null
    },

    /* ---- IA et données ---- */
    {
      id: "nvidia-deep-learning",
      title: "Fundamentals of Deep Learning",
      issuer: "NVIDIA",
      type: "certificat",
      domain: "ia",
      date: null, summary: null, file: null
    },
    {
      id: "aws-ai-ml-sbo",
      title: "Automating with AI/ML for Small Business Owners",
      issuer: "AWS Training & Certification",
      type: "certificat",
      domain: "ia",
      date: null, summary: null, file: null
    },
    {
      id: "hp-life-data-science",
      title: "Sciences et analyses des données",
      issuer: "HP LIFE",
      type: "certificat",
      domain: "ia",
      date: null,
      summary: "Pratiques, méthodologies et outils des sciences et analyses des données ; avantages et défis d'une approche orientée données pour les entreprises ; compétences nécessaires pour une carrière dans ce domaine.",
      file: null
    },
    {
      id: "aws-strands-shell",
      title: "Introduction to Strands Shell",
      issuer: "AWS Training & Certification",
      type: "certificat",
      domain: "ia",
      date: null, summary: null, file: null
    },

    /* ---- Cloud, réseaux et systèmes ---- */
    {
      id: "cisco-packet-tracer",
      title: "Premiers pas avec Cisco Packet Tracer",
      issuer: "Networking Academy",
      program: "Cisco Networking Academy",
      type: "certificat",
      domain: "cloud",
      date: null, summary: null, file: null
    },
    {
      id: "ms-windows-server-2025",
      title: "Présentation de Windows Server 2025",
      issuer: "Microsoft Learn",
      type: "badge",
      domain: "cloud",
      date: null, summary: null, file: null
    },
    {
      id: "ms-cloud-benefits",
      title: "Décrire les avantages de l'utilisation des services cloud",
      issuer: "Microsoft Learn",
      type: "badge",
      domain: "cloud",
      date: null, summary: null, file: null
    },

    /* ---- Développement et entrepreneuriat numérique ---- */
    {
      id: "ms-csharp-first-lines",
      title: "Écrire vos premières lignes de code en C#",
      issuer: "Microsoft Learn",
      type: "badge",
      domain: "dev",
      date: null, summary: null, file: null
    },
    {
      id: "forcen-entrepreneuriat",
      title: "Acculturation à l'entrepreneuriat numérique",
      issuer: "forceN",
      type: "attestation",
      domain: "dev",
      date: null, summary: null, file: null
    }
  ]
};
