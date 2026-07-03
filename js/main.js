/* Nexus — language toggle (EN/ΕΛ) + mobile nav */

const translations = {
  en: {
    "nav.services": "Services",
    "nav.work": "Work",
    "nav.process": "Process",
    "nav.testimonials": "Testimonials",
    "nav.contact": "Get in touch",

    "hero.kicker": "Web studio · Cyprus & worldwide",
    "hero.title1": "Websites that make your business",
    "hero.title2": "impossible to ignore.",
    "hero.sub": "Nexus designs and builds fast, modern websites and online shops for businesses that want to stand out and win more clients.",
    "hero.cta1": "DM us on Instagram",
    "hero.cta2": "See our work",

    "stats.n1": "15+", "stats.l1": "Projects delivered",
    "stats.n2": "100%", "stats.l2": "Custom-built",
    "stats.n3": "7 days", "stats.l3": "Average first draft",

    "services.kicker": "What we do",
    "services.title": "Services built around your goals",
    "services.s1.title": "Website design & build",
    "services.s1.body": "Custom websites designed from scratch around your brand — fast, mobile-first and built to turn visitors into customers.",
    "services.s2.title": "E-commerce & online shops",
    "services.s2.body": "Online stores with secure payments, easy product management and a checkout flow designed to sell.",
    "services.s3.title": "Redesigns & maintenance",
    "services.s3.body": "We modernise outdated websites and keep them running — updates, fixes and improvements, handled for you.",

    "work.kicker": "Selected work",
    "work.title": "Recent projects",
    "work.note": "Placeholder projects — real case studies coming soon. Follow our Instagram for the latest launches.",
    "work.p1.title": "Olive & Stone Tavern",
    "work.p1.body": "Restaurant website with menu, gallery and table booking.",
    "work.p1.tag": "Website",
    "work.p2.title": "Kyma Swimwear",
    "work.p2.body": "Online shop with payments, inventory and Instagram integration.",
    "work.p2.tag": "E-commerce",
    "work.p3.title": "Petrides Law",
    "work.p3.body": "Full redesign of an outdated firm website into a modern, trustworthy presence.",
    "work.p3.tag": "Redesign",
    "work.p4.title": "FitLab Studio",
    "work.p4.body": "Gym landing page with class schedule and membership sign-up.",
    "work.p4.tag": "Landing page",
    "work.p5.title": "Aegean Villas",
    "work.p5.body": "Property showcase with photo galleries and direct enquiry flow.",
    "work.p5.tag": "Website",
    "work.p6.title": "Your project here",
    "work.p6.body": "Have an idea? Let's design something your customers will remember.",
    "work.p6.tag": "Next up",

    "process.kicker": "How it works",
    "process.title": "From DM to launch in four steps",
    "process.s1.title": "Chat",
    "process.s1.body": "Message us on Instagram. We learn about your business and what you need.",
    "process.s2.title": "Design",
    "process.s2.body": "You get a design proposal matched to your brand — we refine it together.",
    "process.s3.title": "Build",
    "process.s3.body": "We build the site fast, mobile-friendly and ready for Google.",
    "process.s4.title": "Launch & support",
    "process.s4.body": "We go live and stay available for updates and improvements.",

    "testimonials.kicker": "Kind words",
    "testimonials.title": "What clients say",
    "testimonials.t1.body": "“Our new website looks incredible and bookings went up within the first month. The whole process was smooth.”",
    "testimonials.t1.name": "Maria K.",
    "testimonials.t1.role": "Restaurant owner",
    "testimonials.t2.body": "“They rebuilt our old site into something we're proud to share. Fast, professional and easy to work with.”",
    "testimonials.t2.name": "Andreas P.",
    "testimonials.t2.role": "Law firm partner",
    "testimonials.t3.body": "“The online shop paid for itself in weeks. Everything just works, and support is always one message away.”",
    "testimonials.t3.name": "Elena S.",
    "testimonials.t3.role": "Boutique founder",

    "contact.title1": "Ready to build something",
    "contact.title2": "great together?",
    "contact.sub": "Tell us about your project — we reply to every message, usually within a few hours.",
    "contact.cta": "Message @nexus_aea",

    "footer.tagline": "Websites for businesses that want more.",
    "footer.copy": "© 2026 Nexus. All rights reserved."
  },

  el: {
    "nav.services": "Υπηρεσίες",
    "nav.work": "Δουλειές",
    "nav.process": "Διαδικασία",
    "nav.testimonials": "Κριτικές",
    "nav.contact": "Επικοινωνία",

    "hero.kicker": "Web studio · Κύπρος & παντού",
    "hero.title1": "Ιστοσελίδες που κάνουν την επιχείρησή σου",
    "hero.title2": "αδύνατο να αγνοηθεί.",
    "hero.sub": "Η Nexus σχεδιάζει και κατασκευάζει γρήγορες, μοντέρνες ιστοσελίδες και ηλεκτρονικά καταστήματα για επιχειρήσεις που θέλουν να ξεχωρίσουν και να κερδίσουν περισσότερους πελάτες.",
    "hero.cta1": "Στείλε μας DM στο Instagram",
    "hero.cta2": "Δες τις δουλειές μας",

    "stats.n1": "15+", "stats.l1": "Ολοκληρωμένα έργα",
    "stats.n2": "100%", "stats.l2": "Κατασκευή από το μηδέν",
    "stats.n3": "7 μέρες", "stats.l3": "Μέσος χρόνος πρώτου σχεδίου",

    "services.kicker": "Τι κάνουμε",
    "services.title": "Υπηρεσίες φτιαγμένες για τους στόχους σου",
    "services.s1.title": "Σχεδιασμός & κατασκευή ιστοσελίδων",
    "services.s1.body": "Ιστοσελίδες σχεδιασμένες από το μηδέν γύρω από το brand σου — γρήγορες, mobile-first και φτιαγμένες να μετατρέπουν επισκέπτες σε πελάτες.",
    "services.s2.title": "E-commerce & ηλεκτρονικά καταστήματα",
    "services.s2.body": "Online καταστήματα με ασφαλείς πληρωμές, εύκολη διαχείριση προϊόντων και checkout σχεδιασμένο να πουλάει.",
    "services.s3.title": "Ανανεώσεις & συντήρηση",
    "services.s3.body": "Εκσυγχρονίζουμε παλιές ιστοσελίδες και τις κρατάμε σε λειτουργία — ενημερώσεις, διορθώσεις και βελτιώσεις, χωρίς κόπο για σένα.",

    "work.kicker": "Επιλεγμένα έργα",
    "work.title": "Πρόσφατα projects",
    "work.note": "Ενδεικτικά projects — σύντομα με πραγματικά case studies. Ακολούθησέ μας στο Instagram για τα νέα μας.",
    "work.p1.title": "Olive & Stone Tavern",
    "work.p1.body": "Ιστοσελίδα εστιατορίου με μενού, gallery και κρατήσεις τραπεζιών.",
    "work.p1.tag": "Ιστοσελίδα",
    "work.p2.title": "Kyma Swimwear",
    "work.p2.body": "Ηλεκτρονικό κατάστημα με πληρωμές, απόθεμα και σύνδεση με Instagram.",
    "work.p2.tag": "E-commerce",
    "work.p3.title": "Petrides Law",
    "work.p3.body": "Πλήρης ανανέωση παλιάς εταιρικής ιστοσελίδας σε μια μοντέρνα, αξιόπιστη παρουσία.",
    "work.p3.tag": "Ανανέωση",
    "work.p4.title": "FitLab Studio",
    "work.p4.body": "Landing page γυμναστηρίου με πρόγραμμα μαθημάτων και εγγραφή μελών.",
    "work.p4.tag": "Landing page",
    "work.p5.title": "Aegean Villas",
    "work.p5.body": "Παρουσίαση ακινήτων με photo galleries και άμεση φόρμα ενδιαφέροντος.",
    "work.p5.tag": "Ιστοσελίδα",
    "work.p6.title": "Το δικό σου project",
    "work.p6.body": "Έχεις μια ιδέα; Ας σχεδιάσουμε κάτι που οι πελάτες σου θα θυμούνται.",
    "work.p6.tag": "Επόμενο",

    "process.kicker": "Πώς δουλεύουμε",
    "process.title": "Από το DM στο launch σε τέσσερα βήματα",
    "process.s1.title": "Συζήτηση",
    "process.s1.body": "Στείλε μας μήνυμα στο Instagram. Μαθαίνουμε για την επιχείρησή σου και τι χρειάζεσαι.",
    "process.s2.title": "Σχεδιασμός",
    "process.s2.body": "Λαμβάνεις μια πρόταση σχεδιασμού στο ύφος του brand σου — τη βελτιώνουμε μαζί.",
    "process.s3.title": "Κατασκευή",
    "process.s3.body": "Χτίζουμε τη σελίδα γρήγορα, φιλική για κινητά και έτοιμη για την Google.",
    "process.s4.title": "Launch & υποστήριξη",
    "process.s4.body": "Βγαίνουμε live και παραμένουμε διαθέσιμοι για ενημερώσεις και βελτιώσεις.",

    "testimonials.kicker": "Καλά λόγια",
    "testimonials.title": "Τι λένε οι πελάτες μας",
    "testimonials.t1.body": "«Η νέα μας ιστοσελίδα είναι εκπληκτική και οι κρατήσεις αυξήθηκαν μέσα στον πρώτο μήνα. Όλη η διαδικασία ήταν άψογη.»",
    "testimonials.t1.name": "Μαρία Κ.",
    "testimonials.t1.role": "Ιδιοκτήτρια εστιατορίου",
    "testimonials.t2.body": "«Μετέτρεψαν την παλιά μας σελίδα σε κάτι που είμαστε περήφανοι να μοιραζόμαστε. Γρήγοροι, επαγγελματίες και άνετοι στη συνεργασία.»",
    "testimonials.t2.name": "Ανδρέας Π.",
    "testimonials.t2.role": "Συνέταιρος δικηγορικού γραφείου",
    "testimonials.t3.body": "«Το ηλεκτρονικό κατάστημα απέδωσε μέσα σε λίγες εβδομάδες. Όλα δουλεύουν άψογα και η υποστήριξη είναι πάντα ένα μήνυμα μακριά.»",
    "testimonials.t3.name": "Έλενα Σ.",
    "testimonials.t3.role": "Ιδρύτρια boutique",

    "contact.title1": "Έτοιμος να φτιάξουμε κάτι",
    "contact.title2": "σπουδαίο μαζί;",
    "contact.sub": "Πες μας για το project σου — απαντάμε σε κάθε μήνυμα, συνήθως μέσα σε λίγες ώρες.",
    "contact.cta": "Μήνυμα στο @nexus_aea",

    "footer.tagline": "Ιστοσελίδες για επιχειρήσεις που θέλουν περισσότερα.",
    "footer.copy": "© 2026 Nexus. Με επιφύλαξη παντός δικαιώματος."
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
