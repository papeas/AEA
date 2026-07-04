/* Nexus — language toggle (EN/ΕΛ), mobile nav, reviews, custom cursor */

/* Reviews backend. Two options:
   - Google Sheets (recommended, free, no hosting): follow the setup in
     google-apps-script/Code.gs, then paste the Web app URL here, e.g.
     "https://script.google.com/macros/s/XXXXX/exec"
   - Node backend (server/server.js): "" = same origin when the site is
     served by it, or the deployed URL, e.g. "https://your-app.onrender.com" */
const REVIEWS_API = "https://script.google.com/macros/s/AKfycbxpdR-zBbmnkC4eoOHroG-KiAMuPvcbY_tbVBlL5pjkWW8DU0LnrO-9FvdsBiuLHAea/exec";

const IS_SHEETS = REVIEWS_API.indexOf("script.google.com") !== -1;
const REVIEWS_LIST_URL = IS_SHEETS ? REVIEWS_API + "?action=list" : REVIEWS_API + "/api/reviews";
const REVIEWS_POST_URL = IS_SHEETS ? REVIEWS_API : REVIEWS_API + "/api/reviews";

const translations = {
  en: {
    "nav.services": "Services",
    "nav.work": "Work",
    "nav.process": "How we work",
    "nav.reviews": "Reviews",
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

    "reviews.title": "Reviews",
    "reviews.add": "Leave a review",
    "reviews.empty": "No reviews yet — we're just getting started. Worked with us? We'd love to hear how it went.",
    "reviews.form.title": "Leave a review",
    "reviews.form.name": "Your name",
    "reviews.form.business": "Your business (optional)",
    "reviews.form.rating": "Rating",
    "reviews.form.text": "Your review",
    "reviews.form.cancel": "Cancel",
    "reviews.form.submit": "Send review",
    "reviews.msg.thanks": "Thank you! Your review has been sent.",
    "reviews.msg.pending": "Thank you! Your review will appear once it's approved.",
    "reviews.msg.invalid": "Please fill in your name and review.",
    "reviews.msg.rate": "Please wait a minute before sending another review.",
    "reviews.msg.offline": "Reviews can't be sent right now — message us on Instagram instead.",

    "contact.title": "Have a project in mind?",
    "contact.sub": "Tell us what you do and what you need — we reply to every message, usually the same day.",
    "contact.cta": "Message @nexus_aea",

    "footer.copy": "© 2026 Nexus · Cyprus"
  },

  el: {
    "nav.services": "Υπηρεσίες",
    "nav.work": "Δουλειές",
    "nav.process": "Πώς δουλεύουμε",
    "nav.reviews": "Κριτικές",
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

    "reviews.title": "Κριτικές",
    "reviews.add": "Άφησε κριτική",
    "reviews.empty": "Δεν υπάρχουν κριτικές ακόμα — μόλις ξεκινήσαμε. Δουλέψαμε μαζί; Θα χαρούμε να μάθουμε πώς πήγε.",
    "reviews.form.title": "Άφησε κριτική",
    "reviews.form.name": "Το όνομά σου",
    "reviews.form.business": "Η επιχείρησή σου (προαιρετικό)",
    "reviews.form.rating": "Βαθμολογία",
    "reviews.form.text": "Η κριτική σου",
    "reviews.form.cancel": "Άκυρο",
    "reviews.form.submit": "Αποστολή",
    "reviews.msg.thanks": "Ευχαριστούμε! Η κριτική σου στάλθηκε.",
    "reviews.msg.pending": "Ευχαριστούμε! Η κριτική σου θα εμφανιστεί μόλις εγκριθεί.",
    "reviews.msg.invalid": "Συμπλήρωσε το όνομα και την κριτική σου.",
    "reviews.msg.rate": "Περίμενε ένα λεπτό πριν στείλεις άλλη κριτική.",
    "reviews.msg.offline": "Οι κριτικές δεν μπορούν να σταλούν αυτή τη στιγμή — στείλε μας μήνυμα στο Instagram.",

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

/* ============ Reviews ============ */
const reviewsList = document.getElementById("reviewsList");
const reviewsEmpty = document.getElementById("reviewsEmpty");
const reviewModal = document.getElementById("reviewModal");
const reviewForm = document.getElementById("reviewForm");
const reviewMsg = document.getElementById("reviewMsg");
const starPicker = document.getElementById("starPicker");
let currentRating = 5;

function t(key) {
  const lang = localStorage.getItem("nexus-lang") || "en";
  return (translations[lang] || translations.en)[key] || translations.en[key] || key;
}

function starString(n) {
  return "★".repeat(n) + "☆".repeat(5 - n);
}

function renderReviews(reviews) {
  if (!reviews.length) {
    reviewsList.hidden = true;
    reviewsEmpty.hidden = false;
    return;
  }
  reviewsList.textContent = "";
  reviews.forEach((r) => {
    const fig = document.createElement("figure");
    fig.className = "quote";

    const stars = document.createElement("div");
    stars.className = "quote__stars";
    stars.textContent = starString(r.rating);

    const quote = document.createElement("blockquote");
    quote.textContent = r.text;

    const cap = document.createElement("figcaption");
    const name = document.createElement("strong");
    name.textContent = r.name;
    cap.appendChild(name);
    if (r.business) cap.appendChild(document.createTextNode(" · " + r.business));

    fig.append(stars, quote, cap);
    reviewsList.appendChild(fig);
  });
  reviewsEmpty.hidden = true;
  reviewsList.hidden = false;
}

async function loadReviews() {
  try {
    const res = await fetch(REVIEWS_LIST_URL);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    if (Array.isArray(data)) renderReviews(data);
  } catch {
    /* no backend reachable (e.g. static hosting) — keep the empty state */
  }
}
loadReviews();

function setRating(n) {
  currentRating = n;
  starPicker.querySelectorAll("button").forEach((b) => {
    b.classList.toggle("on", Number(b.dataset.v) <= n);
  });
}
starPicker.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-v]");
  if (btn) setRating(Number(btn.dataset.v));
});

function openModal() {
  reviewModal.hidden = false;
  reviewMsg.hidden = true;
  setRating(5);
  reviewForm.reset();
  reviewForm.querySelector("input[name='name']").focus();
}
function closeModal() {
  reviewModal.hidden = true;
}
document.getElementById("addReviewBtn").addEventListener("click", openModal);
reviewModal.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", closeModal));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !reviewModal.hidden) closeModal();
});

function showMsg(key, ok) {
  reviewMsg.textContent = t(key);
  reviewMsg.className = "modal__msg " + (ok ? "modal__msg--ok" : "modal__msg--err");
  reviewMsg.hidden = false;
}

reviewForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(reviewForm);
  const payload = {
    name: (data.get("name") || "").trim(),
    business: (data.get("business") || "").trim(),
    rating: currentRating,
    text: (data.get("text") || "").trim(),
    website: data.get("website") || ""
  };
  if (!payload.name || !payload.text) {
    showMsg("reviews.msg.invalid", false);
    return;
  }
  const submitBtn = document.getElementById("reviewSubmit");
  submitBtn.disabled = true;
  try {
    /* text/plain avoids a CORS preflight, which Google Apps Script
       cannot answer; the Node backend parses the body either way */
    const res = await fetch(REVIEWS_POST_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
    if (res.status === 429) {
      showMsg("reviews.msg.rate", false);
      return;
    }
    if (!res.ok) throw new Error(res.status);
    const out = await res.json().catch(() => ({}));
    if (out.error) throw new Error(out.error);
    showMsg(out.pending ? "reviews.msg.pending" : "reviews.msg.thanks", true);
    await loadReviews();
    setTimeout(closeModal, 2000);
  } catch {
    showMsg("reviews.msg.offline", false);
  } finally {
    submitBtn.disabled = false;
  }
});

/* ============ Custom cursor ============ */
const finePointer = window.matchMedia("(pointer: fine)").matches;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (finePointer && !reducedMotion) {
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  document.body.classList.add("has-cursor");

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
  });

  (function follow() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";
    requestAnimationFrame(follow);
  })();

  document.addEventListener("mouseover", (e) => {
    ring.classList.toggle("is-active", Boolean(e.target.closest("a, button, .stars")));
  });
}
