import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   DEFAULTS
───────────────────────────────────────────── */
const EASE = "power2.out";
const DUR = { short: 0.8, normal: 1.0, long: 1.2 } as const;
const TRIGGER_START = "top 80%";

function fadeUp(
  targets: gsap.TweenTarget,
  opts: Partial<gsap.TweenVars> = {}
): gsap.core.Tween {
  return gsap.from(targets, {
    y: 40,
    opacity: 0,
    duration: DUR.normal,
    ease: EASE,
    ...opts,
  });
}

function makeScrollTrigger(trigger: string, extra: Partial<ScrollTrigger.Vars> = {}): ScrollTrigger.Vars {
  return {
    trigger,
    start: TRIGGER_START,
    toggleActions: "play none none none",
    ...extra,
  };
}

/* ─────────────────────────────────────────────
   #cover — Sampul
───────────────────────────────────────────── */
export function animateCover() {
  const tl = gsap.timeline({ defaults: { ease: EASE } });

  // Label + title fade in from above
  tl.from(".cover-label", { y: -20, opacity: 0, duration: DUR.short })
    .from(".cover-title", { y: 30, opacity: 0, duration: DUR.long, scale: 0.92 }, "-=0.4")
    .from(".cover-names", { y: 20, opacity: 0, duration: DUR.normal }, "-=0.5")
    .from(".cover-date", { y: 20, opacity: 0, duration: DUR.normal }, "-=0.5")
    .from(".btn-open", { scale: 0.8, opacity: 0, duration: DUR.normal }, "-=0.3");

  // Petals continuous loop
  gsap.utils.toArray<HTMLElement>(".petal").forEach((petal, i) => {
    gsap.to(petal, {
      y: "110vh",
      x: `+=${gsap.utils.random(-60, 60)}`,
      rotation: gsap.utils.random(-180, 180),
      duration: gsap.utils.random(6, 10),
      delay: i * 0.7,
      ease: "none",
      repeat: -1,
      repeatDelay: 0,
    });
  });

  return tl;
}

/* ─────────────────────────────────────────────
   #hero — Hero utama
───────────────────────────────────────────── */
export function animateHero() {
  const tl = gsap.timeline({
    defaults: { ease: EASE },
    scrollTrigger: makeScrollTrigger("#hero"),
  });

  tl.from("#hero .hero-eyebrow", { y: 20, opacity: 0, duration: DUR.short })
    .from("#hero .hero-title", { y: 32, opacity: 0, duration: DUR.long, scale: 0.94 }, "-=0.5")
    .from("#hero .hero-subtitle", { y: 20, opacity: 0, duration: DUR.normal }, "-=0.5")
    .from("#hero .ornament", { scale: 0, opacity: 0, duration: DUR.short }, "-=0.3")
    .from("#hero .hero-date-card", { y: 24, opacity: 0, duration: DUR.normal }, "-=0.3")
    .from("#hero .hero-date-item", { y: 12, opacity: 0, duration: DUR.short, stagger: 0.12 }, "-=0.5")
    .from("#hero .btn-calendar", { scale: 0.85, opacity: 0, duration: DUR.short }, "-=0.3");

  // Hover scale on button
  const calBtn = document.querySelector<HTMLElement>(".btn-calendar");
  if (calBtn) {
    calBtn.addEventListener("mouseenter", () =>
      gsap.to(calBtn, { scale: 1.05, duration: 0.2 })
    );
    calBtn.addEventListener("mouseleave", () =>
      gsap.to(calBtn, { scale: 1, duration: 0.2 })
    );
  }

  return tl;
}

/* ─────────────────────────────────────────────
   #doa — Ayat & Terjemahan
───────────────────────────────────────────── */
export function animateDoa() {
  const tl = gsap.timeline({
    defaults: { ease: EASE },
    scrollTrigger: makeScrollTrigger("#doa"),
  });

  tl.from("#doa .doa-card", { y: 30, opacity: 0, duration: DUR.normal })
    .from("#doa .doa-bismillah", { opacity: 0, filter: "blur(8px)", duration: DUR.long }, "-=0.5")
    .from("#doa .doa-ayat", { opacity: 0, filter: "blur(4px)", y: 16, duration: DUR.long }, "-=0.4")
    .from("#doa .doa-source", { opacity: 0, y: 10, duration: DUR.short }, "-=0.3")
    .from("#doa .doa-translation", { opacity: 0, y: 16, duration: DUR.normal }, "-=0.3");

  return tl;
}

/* ─────────────────────────────────────────────
   #mempelai — Pasangan
───────────────────────────────────────────── */
export function animateCoupleSection() {
  const tl = gsap.timeline({
    defaults: { ease: EASE },
    scrollTrigger: makeScrollTrigger("#mempelai"),
  });

  const cards = gsap.utils.toArray<HTMLElement>("#mempelai .couple-card");

  tl.from("#mempelai .section-label", { y: 20, opacity: 0, duration: DUR.short })
    .from("#mempelai .section-title", { y: 24, opacity: 0, duration: DUR.normal }, "-=0.4")
    .from("#mempelai .ornament", { scale: 0, opacity: 0, duration: DUR.short }, "-=0.3")
    .from("#mempelai .couple-intro", { y: 16, opacity: 0, duration: DUR.normal }, "-=0.3");

  if (cards[0]) tl.from(cards[0], { x: -60, opacity: 0, duration: DUR.long }, "-=0.3");
  tl.from("#mempelai .couple-sep", { scale: 0, opacity: 0, duration: DUR.short }, "-=0.5");
  if (cards[1]) tl.from(cards[1], { x: 60, opacity: 0, duration: DUR.long }, "-=0.7");

  // Hover scale on social links
  gsap.utils.toArray<HTMLElement>(".social-link").forEach((el) => {
    el.addEventListener("mouseenter", () => gsap.to(el, { scale: 1.08, duration: 0.2 }));
    el.addEventListener("mouseleave", () => gsap.to(el, { scale: 1, duration: 0.2 }));
  });

  return tl;
}

/* ─────────────────────────────────────────────
   #acara — Acara & Countdown
───────────────────────────────────────────── */
export function animateEvents() {
  const tl = gsap.timeline({
    defaults: { ease: EASE },
    scrollTrigger: makeScrollTrigger("#acara"),
  });

  tl.from("#acara .section-label", { y: 20, opacity: 0, duration: DUR.short })
    .from("#acara .section-title", { y: 24, opacity: 0, duration: DUR.normal }, "-=0.4")
    .from("#acara .ornament", { scale: 0, opacity: 0, duration: DUR.short }, "-=0.3")
    .from("#acara .section-desc", { y: 16, opacity: 0, duration: DUR.normal }, "-=0.3");

  // Countdown scale-in (stagger each box)
  tl.from("#acara .countdown-item", {
    scale: 0.7,
    opacity: 0,
    duration: DUR.normal,
    stagger: 0.12,
  }, "-=0.3");

  // Event cards fade-up with stagger
  tl.from("#acara .event-card", {
    y: 40,
    opacity: 0,
    duration: DUR.long,
    stagger: 0.2,
  }, "-=0.4");

  // Map buttons fade-in
  tl.from("#acara .btn-maps", { opacity: 0, y: 10, duration: DUR.short, stagger: 0.1 }, "-=0.5");

  return tl;
}

/* ─────────────────────────────────────────────
   #our-story — Timeline
───────────────────────────────────────────── */
export function animateStory() {
  gsap.utils.toArray<HTMLElement>(".story-item").forEach((item, i) => {
    const isLeft = i % 2 === 0;
    gsap.from(item, {
      x: isLeft ? -60 : 60,
      opacity: 0,
      duration: DUR.long,
      ease: EASE,
      scrollTrigger: {
        trigger: item,
        start: TRIGGER_START,
        toggleActions: "play none none none",
      },
    });
  });
}

/* ─────────────────────────────────────────────
   #galeri — Galeri Foto
───────────────────────────────────────────── */
export function animateGallery() {
  const tl = gsap.timeline({
    defaults: { ease: EASE },
    scrollTrigger: makeScrollTrigger("#galeri"),
  });

  tl.from("#galeri .section-label", { y: 20, opacity: 0, duration: DUR.short })
    .from("#galeri .section-title", { y: 24, opacity: 0, duration: DUR.normal }, "-=0.4")
    .from("#galeri .ornament", { scale: 0, opacity: 0, duration: DUR.short }, "-=0.3");

  tl.from("#galeri .gallery-item", {
    opacity: 0,
    scale: 0.9,
    duration: DUR.long,
    stagger: 0.15,
  }, "-=0.3");

  // Hover zoom
  gsap.utils.toArray<HTMLElement>(".gallery-item").forEach((el) => {
    const img = el.querySelector("img");
    el.addEventListener("mouseenter", () =>
      gsap.to(img, { scale: 1.08, duration: 0.4, ease: "power1.out" })
    );
    el.addEventListener("mouseleave", () =>
      gsap.to(img, { scale: 1, duration: 0.4, ease: "power1.inOut" })
    );
  });

  return tl;
}

/* ─────────────────────────────────────────────
   #wedding-gift — Hadiah
───────────────────────────────────────────── */
export function animateGift() {
  const tl = gsap.timeline({
    defaults: { ease: EASE },
    scrollTrigger: makeScrollTrigger("#wedding-gift"),
  });

  tl.from("#wedding-gift .section-label", { y: 20, opacity: 0, duration: DUR.short })
    .from("#wedding-gift .section-title", { y: 24, opacity: 0, duration: DUR.normal }, "-=0.4")
    .from("#wedding-gift .ornament", { scale: 0, opacity: 0, duration: DUR.short }, "-=0.3")
    .from("#wedding-gift .gift-card", { y: 40, opacity: 0, duration: DUR.long }, "-=0.3")
    .from("#wedding-gift .gift-icon", { scale: 0, rotation: -15, opacity: 0, duration: DUR.normal }, "-=0.6")
    .from("#wedding-gift .gift-desc", { y: 16, opacity: 0, duration: DUR.normal }, "-=0.4")
    .from("#wedding-gift .bank-card", { y: 24, opacity: 0, duration: DUR.normal, stagger: 0.15 }, "-=0.3");

  // Copy button click feedback
  gsap.utils.toArray<HTMLElement>(".btn-copy").forEach((btn) => {
    btn.addEventListener("click", () => {
      gsap.timeline()
        .to(btn, { scale: 0.9, duration: 0.1 })
        .to(btn, { scale: 1.05, duration: 0.15 })
        .to(btn, { scale: 1, duration: 0.1 });
    });
  });

  return tl;
}

/* ─────────────────────────────────────────────
   #ucapan — Ucapan & Doa
───────────────────────────────────────────── */
export function animateWishes() {
  const tl = gsap.timeline({
    defaults: { ease: EASE },
    scrollTrigger: makeScrollTrigger("#ucapan"),
  });

  tl.from("#ucapan .section-label", { y: 20, opacity: 0, duration: DUR.short })
    .from("#ucapan .section-title", { y: 24, opacity: 0, duration: DUR.normal }, "-=0.4")
    .from("#ucapan .ornament", { scale: 0, opacity: 0, duration: DUR.short }, "-=0.3")
    .from("#ucapan .section-desc", { y: 16, opacity: 0, duration: DUR.normal }, "-=0.3")
    .from("#ucapan .wishes-form", { y: 32, opacity: 0, duration: DUR.long }, "-=0.3")
    .from("#ucapan .form-field", { y: 16, opacity: 0, duration: DUR.normal, stagger: 0.15 }, "-=0.6");

  // Wish cards stagger
  const animateWishCards = () => {
    const cards = gsap.utils.toArray<HTMLElement>("#ucapan .wish-card");
    gsap.from(cards, {
      y: 20,
      opacity: 0,
      duration: DUR.normal,
      stagger: 0.12,
      ease: EASE,
    });
  };
  animateWishCards();

  // Input focus animation
  gsap.utils.toArray<HTMLElement>(".form-input, .form-textarea").forEach((el) => {
    el.addEventListener("focus", () =>
      gsap.to(el, { scale: 1.01, duration: 0.2, ease: "power1.out" })
    );
    el.addEventListener("blur", () =>
      gsap.to(el, { scale: 1, duration: 0.2, ease: "power1.inOut" })
    );
  });

  return tl;
}

/* ─────────────────────────────────────────────
   #konfirmasi — RSVP
───────────────────────────────────────────── */
export function animateRsvp() {
  const tl = gsap.timeline({
    defaults: { ease: EASE },
    scrollTrigger: makeScrollTrigger("#konfirmasi"),
  });

  tl.from("#konfirmasi .section-label", { y: 20, opacity: 0, duration: DUR.short })
    .from("#konfirmasi .section-title", { y: 24, opacity: 0, duration: DUR.normal }, "-=0.4")
    .from("#konfirmasi .ornament", { scale: 0, opacity: 0, duration: DUR.short }, "-=0.3")
    .from("#konfirmasi .section-desc", { y: 16, opacity: 0, duration: DUR.normal }, "-=0.3")
    .from("#konfirmasi .rsvp-form", { y: 32, opacity: 0, duration: DUR.long }, "-=0.3")
    .from("#konfirmasi .form-field", {
      y: 16,
      opacity: 0,
      duration: DUR.normal,
      stagger: 0.15,
    }, "-=0.6")
    .from("#konfirmasi .attend-toggle", { scale: 0.9, opacity: 0, duration: DUR.normal }, "-=0.4")
    .from("#btn-submit-rsvp", { scale: 0.85, opacity: 0, duration: DUR.normal }, "-=0.3");

  // Input focus glow
  gsap.utils.toArray<HTMLElement>(".rsvp-form .form-input").forEach((el) => {
    el.addEventListener("focus", () =>
      gsap.to(el, { scale: 1.01, duration: 0.2 })
    );
    el.addEventListener("blur", () =>
      gsap.to(el, { scale: 1, duration: 0.2 })
    );
  });

  return tl;
}

/* ─────────────────────────────────────────────
   #footer — Penutup
───────────────────────────────────────────── */
export function animateFooter() {
  const tl = gsap.timeline({
    defaults: { ease: EASE },
    scrollTrigger: makeScrollTrigger("#footer"),
  });

  tl.from("#footer", { opacity: 0, duration: DUR.short })
    .from("#footer .footer-script", { y: 30, opacity: 0, duration: DUR.long, scale: 0.9 }, "-=0.5")
    .from("#footer .footer-names", { y: 20, opacity: 0, duration: DUR.normal }, "-=0.6")
    .from("#footer .footer-divider", { scaleX: 0, opacity: 0, duration: DUR.normal }, "-=0.4")
    .from("#footer .footer-message", { y: 16, opacity: 0, duration: DUR.long }, "-=0.3")
    .from("#footer .footer-copy", { opacity: 0, duration: DUR.normal }, "-=0.3");

  return tl;
}

/* ─────────────────────────────────────────────
   INIT ALL — Panggil satu fungsi ini saja
───────────────────────────────────────────── */
export function initAnimations() {
  // NOTE: animateCover() dipanggil terpisah di Page sebelum konten dibuka
  animateHero();
  animateDoa();
  animateCoupleSection();
  animateEvents();
  animateStory();
  animateGallery();
  animateGift();
  animateWishes();
  animateRsvp();
  animateFooter();

  // Re-calculate positions after layout shifts
  ScrollTrigger.refresh();
}
