/* Nexus — language toggle (EN/ΕΛ) + mobile nav */

const translations = {
  en: {
    "nav.services": "Services",
    "nav.work": "Work",
    "nav.process": "How we work",
    "nav.testimonials": "Clients",
    "nav.contact": "Get in touch",

    "hero.t1": "We design and build",
    "hero.t2": "websites",
    "hero.t3": "for small businesses.",
    "hero.sub": "Nexus is a small web studio in Cyprus. We make fast, good-looking websites and online shops — and we stick around to keep them running.",
    "hero.cta1": "Message us on Instagram",
    "hero.cta2": "See our work",
    "hero.note": "Based in Cyprus · Working with clients everywhere · English & Ελληνικά",

    "services.title": "What we do",
    "services.s1.title": "Websites",
    "services.s1.body": "A site designed around your business, not a template. Clear pages, quick to load, easy for customers to find what they need — on their phone or anywhere else.",
    "services.s2.title": "Online shops",
    "services.s2.body": "A store your customers can actually buy from: card payments, product management you can handle yourself, and a checkout that doesn't get in the way.",
    "services.s3.title": "Redesigns & upkeep",
    "services.s3.body": "Already have a site that looks ten years old or keeps breaking? We rebuild it properly, then handle the updates and fixes so you don't have to think about it.",

    "work.title": "Recent work",
    "work.note": "These are example projects while we prepare our first case studies — our latest launches go up on Instagram first.",
    "work.p1.title": "Olive & Stone Tavern",
    "work.p1.body": "Menu, photos and table bookings for a family restaurant.",
    "work.p2.title": "Kyma Swimwear",
    "work.p2.body": "Online shop with card payments and stock management.",
    "work.p3.title": "Petrides Law",
    "work.p3.body": "Rebuild of an outdated firm website into something clients trust.",
    "work.p4.title": "FitLab Studio",
    "work.p4.body": "Class schedule and sign-ups for a neighbourhood gym.",

    "process.title": "How we work",
    "process.s1.title": "Talk",
    "process.s1.body": "Send us a message about your business. We'll ask a few questions and give you a straight answer on cost and timing.",
    "process.s2.title": "Design",
    "process.s2.body": "You see a design before anything is built. We adjust it together until it feels right.",
    "process.s3.title": "Build & launch",
    "process.s3.body": "We build the site, test it on real phones, and put it live. Most projects take two to four weeks.",
    "process.s4.title": "Stay in touch",
    "process.s4.body": "Need a change later? Text us. Small updates are usually done within days.",

    "testimonials.title": "What clients say",
    "testimonials.t1.body": "\"The website was ready in three weeks and bookings picked up almost straight away. They explained everything in plain language.\"",
    "testimonials.t1.name": "Maria K.",
    "testimonials.t1.role": "restaurant owner",
    "testimonials.t2.body": "\"Our old site embarrassed us. The new one actually looks like the firm we are. Any time we need a change, it's done in a day or two.\"",
    "testimonials.t2.name": "Andreas P.",
    "testimonials.t2.role": "law firm partner",
    "testimonials.t3.body": "\"I was nervous about running an online shop, but they set it up so I can manage products myself. Orders come in while I sleep.\"",
    "testimonials.t3.name": "Elena S.",
    "testimonials.t3.role": "boutique owner",

    "contact.title": "Have a project in mind?",
    "contact.sub": "Tell us what you do and what you need — we reply to every message, usually the same day.",
    "contact.cta": "Message @nexus_aea",

    "footer.copy": "© 2026 Nexus · Cyprus"
  },

  el: {
    "nav.services": "Υπηρεσίες",
    "nav.work": "Δουλειές",
    "nav.process": "Πώς δουλεύουμε",
    "nav.testimonials": "Πελάτες",
    "nav.contact": "Επικοινωνία",

    "hero.t1": "Σχεδιάζουμε και φτιάχνουμε",
    "hero.t2": "ιστοσελίδες",
    "hero.t3": "για μικρές επιχειρήσεις.",
    "hero.sub": "Η Nexus είναι ένα μικρό web studio στην Κύπρο. Φτιάχνουμε γρήγορες, όμορφες ιστοσελίδες και ηλεκτρονικά καταστήματα — και μένουμε δίπλα σου για να δουλεύουν σωστά.",
    "hero.cta1": "Στείλε μας μήνυμα στο Instagram",
    "hero.cta2": "Δες τις δουλειές μας",
    "hero.note": "Με έδρα την Κύπρο · Πελάτες παντού · English & Ελληνικά",

    "services.title": "Τι κάνουμε",
    "services.s1.title": "Ιστοσελίδες",
    "services.s1.body": "Μια σελίδα σχεδιασμένη γύρω από τη δική σου επιχείρηση, όχι από πρότυπο. Καθαρές σελίδες, γρήγορο φόρτωμα, και οι πελάτες βρίσκουν εύκολα αυτό που ψάχνουν — και από το κινητό.",
    "services.s2.title": "Ηλεκτρονικά καταστήματα",
    "services.s2.body": "Ένα κατάστημα από το οποίο οι πελάτες σου μπορούν πραγματικά να αγοράσουν: πληρωμές με κάρτα, διαχείριση προϊόντων που κάνεις μόνος σου, και checkout χωρίς εμπόδια.",
    "services.s3.title": "Ανανεώσεις & συντήρηση",
    "services.s3.body": "Έχεις ήδη σελίδα που δείχνει δέκα χρόνια πίσω ή χαλάει συνέχεια; Την ξαναφτιάχνουμε σωστά και αναλαμβάνουμε ενημερώσεις και διορθώσεις, για να μην σε απασχολεί.",

    "work.title": "Πρόσφατες δουλειές",
    "work.note": "Αυτά είναι ενδεικτικά έργα μέχρι να ετοιμάσουμε τα πρώτα μας case studies — τα νέα μας launches ανεβαίνουν πρώτα στο Instagram.",
    "work.p1.title": "Olive & Stone Tavern",
    "work.p1.body": "Μενού, φωτογραφίες και κρατήσεις τραπεζιών για οικογενειακό εστιατόριο.",
    "work.p2.title": "Kyma Swimwear",
    "work.p2.body": "Ηλεκτρονικό κατάστημα με πληρωμές με κάρτα και διαχείριση αποθέματος.",
    "work.p3.title": "Petrides Law",
    "work.p3.body": "Ανακατασκευή παλιάς εταιρικής ιστοσελίδας σε κάτι που εμπνέει εμπιστοσύνη.",
    "work.p4.title": "FitLab Studio",
    "work.p4.body": "Πρόγραμμα μαθημάτων και εγγραφές για γυμναστήριο της γειτονιάς.",

    "process.title": "Πώς δουλεύουμε",
    "process.s1.title": "Συζήτηση",
    "process.s1.body": "Στείλε μας μήνυμα για την επιχείρησή σου. Θα κάνουμε μερικές ερωτήσεις και θα σου πούμε καθαρά κόστος και χρόνο.",
    "process.s2.title": "Σχεδιασμός",
    "process.s2.body": "Βλέπεις το σχέδιο πριν χτιστεί οτιδήποτε. Το προσαρμόζουμε μαζί μέχρι να είναι όπως το θες.",
    "process.s3.title": "Κατασκευή & launch",
    "process.s3.body": "Χτίζουμε τη σελίδα, τη δοκιμάζουμε σε πραγματικά κινητά και τη βγάζουμε live. Τα περισσότερα έργα θέλουν δύο με τέσσερις εβδομάδες.",
    "process.s4.title": "Μένουμε σε επαφή",
    "process.s4.body": "Θες μια αλλαγή αργότερα; Στείλε μας. Οι μικρές αλλαγές γίνονται συνήθως μέσα σε λίγες μέρες.",

    "testimonials.title": "Τι λένε οι πελάτες μας",
    "testimonials.t1.body": "«Η ιστοσελίδα ήταν έτοιμη σε τρεις εβδομάδες και οι κρατήσεις ανέβηκαν σχεδόν αμέσως. Μας τα εξήγησαν όλα με απλά λόγια.»",
    "testimonials.t1.name": "Μαρία Κ.",
    "testimonials.t1.role": "ιδιοκτήτρια εστιατορίου",
    "testimonials.t2.body": "«Η παλιά μας σελίδα μάς ντρόπιαζε. Η καινούρια δείχνει επιτέλους το γραφείο που είμαστε. Όποτε χρειαστούμε αλλαγή, γίνεται σε μια-δυο μέρες.»",
    "testimonials.t2.name": "Ανδρέας Π.",
    "testimonials.t2.role": "συνέταιρος δικηγορικού γραφείου",
    "testimonials.t3.body": "«Είχα άγχος για το ηλεκτρονικό κατάστημα, αλλά το έστησαν έτσι που διαχειρίζομαι τα προϊόντα μόνη μου. Οι παραγγελίες έρχονται όσο κοιμάμαι.»",
    "testimonials.t3.name": "Έλενα Σ.",
    "testimonials.t3.role": "ιδιοκτήτρια boutique",

    "contact.title": "Έχεις κάτι στο μυαλό σου;",
    "contact.sub": "Πες μας τι κάνεις και τι χρειάζεσαι — απαντάμε σε κάθε μήνυμα, συνήθως αυθημερόν.",
    "contact.cta": "Μήνυμα στο @nexus_aea",

    "footer.copy": "© 2026 Nexus · Κύπρος"
  }
};

function setLanguage(lang) {
  const dict = translations[lang] || translations.en;
  document.documentElement.lang = lang === "el" ? "el" : "en";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
  const label = document.querySelector("[data-lang-label]");
  if (label) label.textContent = lang === "el" ? "EN" : "ΕΛ";
  localStorage.setItem("nexus-lang", lang);
}

const savedLang = localStorage.getItem("nexus-lang") || "en";
setLanguage(savedLang);

document.getElementById("langToggle").addEventListener("click", () => {
  const current = localStorage.getItem("nexus-lang") || "en";
  setLanguage(current === "en" ? "el" : "en");
});

/* Mobile navigation */
const burger = document.getElementById("navBurger");
const navLinks = document.getElementById("navLinks");

burger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", String(open));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  });
});
