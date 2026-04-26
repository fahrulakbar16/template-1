"use client";

import { useState, useEffect, useRef } from "react"; // useRef kept for potential future use
import Image from "next/image";

import { MOCK_DATA } from "../data/MockData";
import { initAnimations } from "../lib/animations";


/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc());
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  });
  return time;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimSection({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <div id={id} className={className}>
      {children}
    </div>
  );
}


function Ornament() {
  return <div className="ornament">✦</div>;
}

// ── Themed SVG Icons ──────────────────────────
const IconMail = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const IconCalendar = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>
);

const IconPin = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconCamera = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z"/>
    <circle cx="12" cy="13" r="3"/>
  </svg>
);

const IconHome = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const IconHeart = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
);

const IconCheck = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const IconMosque = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20h20"/>
    <path d="M7 20V10c0-1.1.9-2 2-2h6a2 2 0 0 1 2 2v10"/>
    <path d="M12 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor" stroke="none"/>
    <path d="M9 8c0-1.7 1.3-3 3-3s3 1.3 3 3"/>
    <path d="M4 20V14a2 2 0 0 1 2-2"/>
    <path d="M20 20V14a2 2 0 0 0-2-2"/>
  </svg>
);

const IconBuilding = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="1"/>
    <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/>
  </svg>
);

const IconGift = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="8" width="18" height="4" rx="1"/>
    <path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/>
    <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>
  </svg>
);

const IconClock = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const IconFlower = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m7.5 0a4.5 4.5 0 1 1-4.5 4.5m4.5-4.5H15m-3 4.5V15"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconClipboard = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <path d="m9 14 2 2 4-4"/>
  </svg>
);

// Map event icon string to SVG component
function EventVenueIcon({ icon }: { icon: string }) {
  if (icon === "🕌") return <IconMosque size={15} />;
  if (icon === "🏛️") return <IconBuilding size={15} />;
  return <IconBuilding size={15} />;
}

/* ─────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────── */

/* ── Cover ──────────────────────────────────── */
function CoverSection({ onOpen }: { onOpen: () => void }) {
  const petals = Array.from({ length: 8 }, (_, i) => ({
    left: `${10 + i * 11}%`,
    animationDuration: `${6 + (i % 4)}s`,
    animationDelay: `${i * 0.7}s`,
    background: i % 2 === 0 ? "var(--pink-300)" : "var(--brown-200)",
    top: "-20px",
  }));

  return (
    <section className="cover-section" id="cover">
      <Image src="/images/hero.png" alt="Wedding couple" fill className="cover-hero-img" priority />
      <div className="cover-overlay" />

      {petals.map((p, i) => (
        <div key={i} className="petal" style={p} />
      ))}

      <div className="cover-content">
        <p className="cover-label">{MOCK_DATA.hero_section.label}</p>
        <h1 className="cover-title">{MOCK_DATA.hero_section.main_title}</h1>
        <p className="cover-names">
          {MOCK_DATA.couple.groom.first_name} &amp; {MOCK_DATA.couple.bride.first_name}
        </p>
        <p className="cover-date">27 · 09 · 2025</p>
        <button id="btn-open-invitation" className="btn-open" onClick={onOpen}>
          <span style={{ display: 'flex', alignItems: 'center' }}><IconMail size={16} /></span>
          <span>{MOCK_DATA.labels.buttons.open_invitation}</span>
        </button>
      </div>
    </section>
  );
}

/* ── Hero ───────────────────────────────────── */
function HeroSection() {
  const ics = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:20250927T080000
DTEND:20250927T140000
SUMMARY:The Wedding of Rizky & Aulia
LOCATION:Jakarta Selatan
DESCRIPTION:Pernikahan Rizky & Aulia
END:VEVENT
END:VCALENDAR`;

  const handleCalendar = () => {
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wedding-rizky-aulia.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimSection className="hero-section" id="hero">
      <p className="hero-eyebrow">{MOCK_DATA.hero_section.eyebrow}</p>
      <h2 className="hero-title">{MOCK_DATA.couple.groom.first_name} &amp; {MOCK_DATA.couple.bride.first_name}</h2>
      <p className="hero-subtitle">{MOCK_DATA.couple.groom.full_name.split(",")[0]} &amp; {MOCK_DATA.couple.bride.full_name.split(",")[0]}</p>

      <Ornament />

      <div style={{ marginTop: 32 }}>
        <div className="hero-date-card">
          <div className="hero-date-item">
            <div className="hero-date-number">27</div>
            <div className="hero-date-label">{MOCK_DATA.labels.date.months}</div>
          </div>
          <div className="hero-date-sep" />
          <div className="hero-date-item">
            <div className="hero-date-number">2025</div>
            <div className="hero-date-label">{MOCK_DATA.labels.date.years}</div>
          </div>
          <div className="hero-date-sep" />
          <div className="hero-date-item">
            <div className="hero-date-number">Jakarta</div>
            <div className="hero-date-label">{MOCK_DATA.labels.date.location}</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <button id="btn-save-calendar" className="btn-calendar" onClick={handleCalendar}>
          <span style={{ display: 'flex', alignItems: 'center' }}><IconCalendar size={14} /></span>
          {MOCK_DATA.labels.buttons.save_calendar}
        </button>
      </div>
    </AnimSection>
  );
}

/* ── Doa ────────────────────────────────────── */
function DoaSection() {
  const quote = MOCK_DATA.quotes[0];
  return (
    <AnimSection className="doa-section" id="doa">
      <div className="doa-card">
        <p className="doa-bismillah">{quote.bismillah}</p>
        <Ornament />
        <p className="doa-ayat" style={{ marginTop: 24 }}>
          {quote.content}
        </p>
        <p className="doa-source">{quote.source}</p>
        <div className="doa-translation">
          &ldquo;{quote.translation}&rdquo;
        </div>
      </div>
    </AnimSection>
  );
}

/* ── Couple ─────────────────────────────────── */
function CoupleSection() {
  return (
    <AnimSection className="couple-section" id="mempelai">
      <p className="section-label">{MOCK_DATA.labels.navigation.couple}</p>
      <h2 className="section-title" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px,6vw,44px)", fontWeight: 300, color: "var(--brown-600)", marginBottom: 8 }}>
        {MOCK_DATA.couple.section_title}
      </h2>
      <Ornament />
      <p className="couple-intro" style={{ marginTop: 24 }}>
        {MOCK_DATA.couple.intro_text}
      </p>

      <div className="couple-grid">
        {/* Groom */}
        <div className="couple-card">
          <div className="couple-avatar-placeholder" style={{ color: 'var(--brown-400)' }}><IconHeart size={36} /></div>
          <p className="couple-role">{MOCK_DATA.couple.groom.role_label}</p>
          <h3 className="couple-name">{MOCK_DATA.couple.groom.first_name}</h3>
          <p className="couple-fullname">{MOCK_DATA.couple.groom.full_name}</p>
          <p className="couple-parents">{MOCK_DATA.couple.groom.parents_desc}</p>
          <div className="couple-socials">
            <a href={MOCK_DATA.couple.groom.ig_link} className="social-link" id="groom-instagram">
              <IconCamera size={13} /> {MOCK_DATA.couple.groom.ig_handle}
            </a>
          </div>
        </div>

        <div className="couple-sep">♡</div>

        {/* Bride */}
        <div className="couple-card">
          <div className="couple-avatar-placeholder" style={{ color: 'var(--pink-400)' }}><IconHeart size={36} /></div>
          <p className="couple-role">{MOCK_DATA.couple.bride.role_label}</p>
          <h3 className="couple-name">{MOCK_DATA.couple.bride.first_name}</h3>
          <p className="couple-fullname">{MOCK_DATA.couple.bride.full_name}</p>
          <p className="couple-parents">{MOCK_DATA.couple.bride.parents_desc}</p>
          <div className="couple-socials">
            <a href={MOCK_DATA.couple.bride.ig_link} className="social-link" id="bride-instagram">
              <IconCamera size={13} /> {MOCK_DATA.couple.bride.ig_handle}
            </a>
          </div>
        </div>
      </div>
    </AnimSection>
  );
}

/* ── Events / Save the Date ─────────────────── */
function EventsSection() {
  const { days, hours, minutes, seconds } = useCountdown(new Date(MOCK_DATA.hero_section.target_date));

  return (
    <AnimSection className="events-section" id="acara">
      <div className="section-head">
        <p className="section-label">Save the Date</p>
        <h2 className="section-title">Rangkaian Acara</h2>
        <Ornament />
        <p className="section-desc">Kami mengundang kehadiran Anda untuk turut merayakan momen istimewa kami.</p>
      </div>

      {/* Countdown */}
      <div className="countdown" id="countdown">
        {[
          { num: days, lbl: MOCK_DATA.labels.countdown.days },
          { num: hours, lbl: MOCK_DATA.labels.countdown.hours },
          { num: minutes, lbl: MOCK_DATA.labels.countdown.minutes },
          { num: seconds, lbl: MOCK_DATA.labels.countdown.seconds },
        ].map(({ num, lbl }) => (
          <div key={lbl} className="countdown-item">
            <div className="countdown-num">{String(num).padStart(2, "0")}</div>
            <div className="countdown-lbl">{lbl}</div>
          </div>
        ))}
      </div>

      {/* Event cards */}
      <div className="events-grid">
        {MOCK_DATA.events.map((evt) => (
          <div key={evt.id} className="event-card" id={evt.id}>
            <span className="event-badge">{evt.type}</span>
            <h3 className="event-name">{evt.title}</h3>
            <div className="event-detail">
              <div className="event-icon"><IconCalendar size={15} /></div>
              <div>{evt.date_formatted}<br />{evt.time_range}</div>
            </div>
            <div className="event-detail">
              <div className="event-icon"><EventVenueIcon icon={evt.icon} /></div>
              <div><strong>{evt.venue_name}</strong><br />{evt.address}</div>
            </div>
            <a
              href={evt.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-maps"
              id={`btn-maps-${evt.id}`}
            >
              <span style={{ display: 'flex', alignItems: 'center' }}><IconPin size={13} /></span> {MOCK_DATA.labels.buttons.view_maps}
            </a>
          </div>
        ))}
      </div>
    </AnimSection>
  );
}

/* ── Our Story ──────────────────────────────── */
function StorySection() {
  return (
    <AnimSection className="story-section" id="our-story">
      <div className="section-head">
        <p className="section-label">{MOCK_DATA.story.section_label}</p>
        <h2 className="section-title">{MOCK_DATA.story.section_title}</h2>
        <Ornament />
        <p className="section-desc" style={{ marginTop: 8 }}>
          {MOCK_DATA.story.section_desc}
        </p>
      </div>

      <div className="story-timeline">
        {MOCK_DATA.story.timeline.map((s, i) => (
          <div key={s.year} className="story-item">
            {i % 2 === 0 ? (
              <>
                <div className="story-content">
                  <p className="story-year-label">{s.year}</p>
                  <p className="story-title-text">{s.title}</p>
                  <p className="story-desc">{s.description}</p>
                </div>
                <div className="story-spacer">
                  <div className="story-dot" />
                </div>
                <div className="story-empty" />
              </>
            ) : (
              <>
                <div className="story-empty" />
                <div className="story-spacer">
                  <div className="story-dot" />
                </div>
                <div className="story-content">
                  <p className="story-year-label">{s.year}</p>
                  <p className="story-title-text">{s.title}</p>
                  <p className="story-desc">{s.description}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </AnimSection>
  );
}

/* ── Gallery ────────────────────────────────── */
function GallerySection() {
  const [index, setIndex] = useState<number | null>(null);

  const images = MOCK_DATA.gallery.images;

  const next = () => {
    if (index === null) return;
    setIndex((index + 1) % images.length);
  };

  const prev = () => {
    if (index === null) return;
    setIndex((index - 1 + images.length) % images.length);
  };

  return (
    <section className="gallery-section" id="galeri">
      <AnimSection>
        <div className="gallery-title-wrap">
          <p className="section-label">{MOCK_DATA.gallery.section_label}</p>
          <h2 className="section-title">{MOCK_DATA.gallery.section_title}</h2>
          <Ornament />
        </div>

        <div className="gallery-grid">
          {images.map((img, i) => (
            <div
              key={i}
              className="gallery-item"
              id={`gallery-item-${i + 1}`}
              onClick={() => setIndex(i)}
            >
              <Image src={img.url} alt={img.alt} fill style={{ objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </AnimSection>

      {/* Lightbox Overlay */}
      {index !== null && (
        <div
          id="gallery-lightbox"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(4px)",
            animation: "fadeIn 0.3s ease forwards",
          }}
          onClick={() => setIndex(null)}
        >
          {/* Close button */}
          <button
            style={{
              position: "absolute",
              top: 24,
              right: 24,
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: 32,
              cursor: "pointer",
              padding: 10,
              zIndex: 1001,
            }}
            onClick={(e) => { e.stopPropagation(); setIndex(null); }}
          >
            ✕
          </button>

          {/* Prev button */}
          <button
            style={{
              position: "absolute",
              left: 20,
              background: "rgba(255,255,255,0.1)",
              border: "none",
              color: "white",
              width: 50,
              height: 50,
              borderRadius: "50%",
              fontSize: 24,
              cursor: "pointer",
              zIndex: 1001,
            }}
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            ‹
          </button>

          {/* Image Container */}
          <div
            style={{
              position: "relative",
              width: "90vw",
              height: "80vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[index].url}
              alt={images[index].alt}
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>

          {/* Next button */}
          <button
            style={{
              position: "absolute",
              right: 20,
              background: "rgba(255,255,255,0.1)",
              border: "none",
              color: "white",
              width: 50,
              height: 50,
              borderRadius: "50%",
              fontSize: 24,
              cursor: "pointer",
              zIndex: 1001,
            }}
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            ›
          </button>

          {/* Counter/Label */}
          <div
            style={{
              position: "absolute",
              bottom: 40,
              color: "rgba(255,255,255,0.7)",
              fontSize: 14,
              letterSpacing: "0.1em",
            }}
          >
            {index + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
}

/* ── Gift ───────────────────────────────────── */
function GiftSection() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (num: string, key: string) => {
    const clean = num.replace(/\s/g, "");
    navigator.clipboard.writeText(clean);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <AnimSection className="gift-section" id="wedding-gift">
      <div className="section-head text-center">
        <p className="section-label">{MOCK_DATA.gift.section_label}</p>
        <h2 className="section-title">{MOCK_DATA.gift.section_title}</h2>
        <Ornament />
      </div>

      <div className="gift-card">
        <div className="gift-icon" style={{ color: 'var(--pink-400)' }}><IconGift size={40} /></div>
        <p className="gift-desc">
          {MOCK_DATA.gift.instruction_text}
        </p>

        {MOCK_DATA.gift.bank_accounts.map((b) => (
          <div key={b.id} className="bank-card" id={`bank-${b.id}`}>
            <div className="bank-info">
              <div className="bank-name">{b.bank_name}</div>
              <div className="bank-number">{b.account_number}</div>
              <div className="bank-holder">{b.account_holder}</div>
            </div>
            <button
              className={`btn-copy ${copied === b.id ? "copied" : ""}`}
              onClick={() => handleCopy(b.account_number, b.id)}
              id={`btn-copy-${b.id}`}
            >
              {copied === b.id ? (
                <><IconCheck size={14} /> {MOCK_DATA.labels.buttons.copied}</>
              ) : (
                <><IconClipboard size={14} /> {MOCK_DATA.labels.buttons.copy}</>
              )}
            </button>
          </div>
        ))}
      </div>
    </AnimSection>
  );
}

/* ── Wishes ─────────────────────────────────── */
function WishesSection() {
  const [wishes, setWishes] = useState(MOCK_DATA.wishes);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const newWish = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      time: "Baru saja",
      attend: "hadir",
    };
    setWishes([newWish, ...wishes]);
    setName("");
    setMessage("");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section className="wishes-section" id="ucapan">
      <AnimSection>
        <div className="section-head text-center">
          <p className="section-label">Ucapan &amp; Doa</p>
          <h2 className="section-title">Kirim Doa &amp; Ucapan</h2>
          <Ornament />
          <p className="section-desc" style={{ marginTop: 8 }}>
            Doa dan ucapan tulus Anda adalah kebahagiaan terbesar bagi kami.
          </p>
        </div>

        <form className="wishes-form" onSubmit={handleSubmit} id="form-ucapan">
          <div className="form-field">
            <label className="form-label" htmlFor="wish-name">Nama</label>
            <input
              id="wish-name"
              className="form-input"
              type="text"
              placeholder={MOCK_DATA.labels.placeholders.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="wish-message">Ucapan &amp; Doa</label>
            <textarea
              id="wish-message"
              className="form-textarea"
              placeholder={MOCK_DATA.labels.placeholders.message}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button id="btn-send-wish" type="submit" className="btn-submit">
            {sent ? "✓ Terikirim — Terima Kasih! 💕" : MOCK_DATA.labels.buttons.send_wish}
          </button>
        </form>

        <div className="wishes-list" id="wishes-list">
          {wishes.map((w) => (
            <div key={w.id} className="wish-card">
              <div className="wish-header">
                <div className="wish-avatar">{w.name[0].toUpperCase()}</div>
                <div className="wish-meta">
                  <div className="wish-name">{w.name}</div>
                  <div className="wish-time" style={{ display: 'flex', alignItems: 'center', gap: 4 }}><IconClock size={12} /> {w.time}</div>
                </div>
                <span style={{
                  fontSize: 11, padding: "4px 10px",
                  background: w.attend === "hadir" ? "var(--pink-100)" : "var(--brown-100)",
                  color: w.attend === "hadir" ? "var(--pink-500)" : "var(--brown-400)",
                  borderRadius: "var(--radius-full)", fontWeight: 500,
                  letterSpacing: "0.08em", whiteSpace: "nowrap"
                }}>
                  {w.attend === "hadir" ? "✓ Hadir" : "✗ Tidak Hadir"}
                </span>
              </div>
              <p className="wish-text">{w.message}</p>
            </div>
          ))}
        </div>
      </AnimSection>
    </section>
  );
}

/* ── RSVP ───────────────────────────────────── */
function RsvpSection() {
  const [name, setName] = useState("");
  const [attend, setAttend] = useState<"hadir" | "tidak">("hadir");
  const [guests, setGuests] = useState("1");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <AnimSection className="rsvp-section" id="konfirmasi">
      <div className="section-head">
        <p className="section-label">Konfirmasi Kehadiran</p>
        <h2 className="section-title">Apakah Anda Hadir?</h2>
        <Ornament />
        <p className="section-desc" style={{ marginTop: 8 }}>
          Konfirmasi kehadiran Anda sangat berarti agar kami dapat mempersiapkan dengan baik.
        </p>
      </div>

      {sent ? (
        <div className="rsvp-form" id="rsvp-success" style={{ background: "linear-gradient(135deg, var(--pink-50), var(--brown-50))" }}>
          <div style={{ marginBottom: 16, color: 'var(--pink-400)', display: 'flex', justifyContent: 'center' }}><IconFlower size={48} /></div>
          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 24, color: "var(--brown-600)", marginBottom: 8 }}>
            Terima Kasih, {name}!
          </h3>
          <p style={{ fontSize: 14, color: "var(--brown-400)", lineHeight: 1.8 }}>
            {attend === "hadir"
              ? "Kami sangat senang Anda akan hadir. Sampai jumpa di hari bahagia kami! 💕"
              : "Kami sangat memahami. Doa dan ucapan Anda sudah cukup membuat kami bahagia. 🙏"}
          </p>
        </div>
      ) : (
        <form className="rsvp-form" onSubmit={handleSubmit} id="form-rsvp">
          <div className="form-field">
            <label className="form-label" htmlFor="rsvp-name">Nama Lengkap</label>
            <input
              id="rsvp-name"
              className="form-input"
              type="text"
              placeholder={MOCK_DATA.labels.placeholders.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label">Kehadiran</label>
            <div className="attend-toggle">
              <button
                type="button"
                id="btn-hadir"
                className={`attend-btn ${attend === "hadir" ? "active" : ""}`}
                onClick={() => setAttend("hadir")}
              >
                ✓ Hadir
              </button>
              <button
                type="button"
                id="btn-tidak-hadir"
                className={`attend-btn ${attend === "tidak" ? "active" : ""}`}
                onClick={() => setAttend("tidak")}
              >
                ✗ Tidak Hadir
              </button>
            </div>
          </div>

          {attend === "hadir" && (
            <div className="form-field">
              <label className="form-label" htmlFor="rsvp-guests">Jumlah Tamu</label>
              <select
                id="rsvp-guests"
                className="form-input"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                {["1", "2", "3", "4", "5+"].map((n) => (
                  <option key={n} value={n}>{n} {MOCK_DATA.labels.placeholders.guests}</option>
                ))}
              </select>
            </div>
          )}

          <button id="btn-submit-rsvp" type="submit" className="btn-submit">
            {MOCK_DATA.labels.buttons.confirm_rsvp}
          </button>
        </form>
      )}
    </AnimSection>
  );
}

/* ── Footer ─────────────────────────────────── */
function FooterSection() {
  return (
    <footer className="footer-section" id="footer">
      <p className="footer-script">
        {MOCK_DATA.couple.groom.first_name} &amp; {MOCK_DATA.couple.bride.first_name}
      </p>
      <p className="footer-names">
        {MOCK_DATA.couple.groom.full_name.split(",")[0]} &amp; {MOCK_DATA.couple.bride.full_name.split(",")[0]}
      </p>
      <div className="footer-divider" />
      <p className="footer-message">
        Atas kehadiran dan doa restu dari Bapak/Ibu/Saudara/i sekalian, kami mengucapkan
        terima kasih yang sebesar-besarnya. Wassalamualaikum Wr. Wb.
        <br /><br />
        <em style={{ fontFamily: "var(--font-serif)", fontSize: 15 }}>
          Kami yang berbahagia,
          <br />
          {MOCK_DATA.couple.groom.first_name} &amp; {MOCK_DATA.couple.bride.first_name}
        </em>
      </p>
      <div className="footer-divider" />
      <p className="footer-copy">
        Made with 💕 · 27 September 2025 · Jakarta
      </p>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   FLOATING NAV
───────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: MOCK_DATA.labels.navigation.home,    href: "#hero",      Icon: IconHome },
  { label: MOCK_DATA.labels.navigation.couple,  href: "#mempelai",  Icon: IconHeart },
  { label: MOCK_DATA.labels.navigation.event,   href: "#acara",     Icon: IconCalendar },
  { label: MOCK_DATA.labels.navigation.gallery, href: "#galeri",    Icon: IconCamera },
  { label: MOCK_DATA.labels.navigation.wish,    href: "#ucapan",    Icon: IconMail },
  { label: MOCK_DATA.labels.navigation.rsvp,    href: "#konfirmasi",Icon: IconCheck },
];

function FloatingNav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      id="floating-nav"
      className="floating-nav"
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: `translateX(-50%) translateY(${show ? 0 : 100}px)`,
        opacity: show ? 1 : 0,
        transition: "transform 0.4s ease, opacity 0.4s ease",
        zIndex: 100,
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid var(--pink-100)",
        borderRadius: "var(--radius-full)",
        padding: "10px 20px",
        boxShadow: "0 8px 40px rgba(139,109,70,0.15)",
        display: "flex",
      }}
    >
      {NAV_ITEMS.map((item) => (
        <a
          key={item.href}
          href={item.href}
          id={`nav-${item.label.toLowerCase()}`}
          title={item.label}
          className="nav-link"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            borderRadius: "50%",
            textDecoration: "none",
            color: "var(--brown-400)",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--pink-100)";
            (e.currentTarget as HTMLElement).style.color = "var(--pink-500)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "var(--brown-400)";
          }}
        >
          <item.Icon size={18} />
        </a>
      ))}
    </nav>
  );
}

/* ── Music Player ─────────────────────────── */
function MusicPlayer({ url, autoPlay }: { url: string; autoPlay: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play().catch(() => {
        console.log("Audio play blocked by browser. Waiting for interaction.");
      });
      setPlaying(true);
    }
  }, [autoPlay]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} src={url} loop />
      <button
        onClick={toggle}
        id="btn-music-toggle"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
          border: "1px solid var(--pink-100)",
          boxShadow: "var(--shadow-float)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          cursor: "pointer",
          zIndex: 101,
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <span style={{ animation: playing ? "spin 4s linear infinite" : "none" }}>
          {playing ? "🎵" : "🔇"}
        </span>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}} />
      </button>
    </>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function Page() {
  const [opened, setOpened] = useState(false);
  const [startMusic, setStartMusic] = useState(false);

  // Handle open
  const handleOpen = () => {
    setOpened(true);
    setStartMusic(true);
  };

  // Kick off cover animations immediately
  useEffect(() => {
    import("../lib/animations").then(({ animateCover }) => {
      animateCover();
    });
  }, []);

  // Kick off all scroll-based animations after content is rendered
  useEffect(() => {
    if (!opened) return;
    // Small delay so DOM is fully painted before GSAP reads positions
    const timer = setTimeout(() => {
      import("../lib/animations").then(({ initAnimations }) => {
        initAnimations();
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [opened]);

  return (
    <>
      {!opened && <CoverSection onOpen={handleOpen} />}

      {opened && (
        <main>
          <HeroSection />
          <DoaSection />
          <CoupleSection />
          <EventsSection />
          <StorySection />
          <GallerySection />
          <GiftSection />
          <WishesSection />
          <RsvpSection />
          <FooterSection />
          <FloatingNav />
        </main>
      )}

      {startMusic && <MusicPlayer url={MOCK_DATA.invitation_meta.music_url} autoPlay={true} />}
    </>
  );
}

