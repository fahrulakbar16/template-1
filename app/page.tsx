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
          <span>💌</span>
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
          📅&nbsp; {MOCK_DATA.labels.buttons.save_calendar}
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
          <div className="couple-avatar-placeholder">👨‍💼</div>
          <p className="couple-role">{MOCK_DATA.couple.groom.role_label}</p>
          <h3 className="couple-name">{MOCK_DATA.couple.groom.first_name}</h3>
          <p className="couple-fullname">{MOCK_DATA.couple.groom.full_name}</p>
          <p className="couple-parents">{MOCK_DATA.couple.groom.parents_desc}</p>
          <div className="couple-socials">
            <a href={MOCK_DATA.couple.groom.ig_link} className="social-link" id="groom-instagram">
              📸 {MOCK_DATA.couple.groom.ig_handle}
            </a>
          </div>
        </div>

        <div className="couple-sep">♡</div>

        {/* Bride */}
        <div className="couple-card">
          <div className="couple-avatar-placeholder">👰</div>
          <p className="couple-role">{MOCK_DATA.couple.bride.role_label}</p>
          <h3 className="couple-name">{MOCK_DATA.couple.bride.first_name}</h3>
          <p className="couple-fullname">{MOCK_DATA.couple.bride.full_name}</p>
          <p className="couple-parents">{MOCK_DATA.couple.bride.parents_desc}</p>
          <div className="couple-socials">
            <a href={MOCK_DATA.couple.bride.ig_link} className="social-link" id="bride-instagram">
              📸 {MOCK_DATA.couple.bride.ig_handle}
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
              <div className="event-icon">📅</div>
              <div>{evt.date_formatted}<br />{evt.time_range}</div>
            </div>
            <div className="event-detail">
              <div className="event-icon">{evt.icon}</div>
              <div><strong>{evt.venue_name}</strong><br />{evt.address}</div>
            </div>
            <a
              href={evt.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-maps"
              id={`btn-maps-${evt.id}`}
            >
              📍 {MOCK_DATA.labels.buttons.view_maps}
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
          <div key={s.year} className="story-item" style={{ animationDelay: `${i * 0.1}s` }}>
            {i % 2 === 0 ? (
              <>
                <div className="story-content" style={{ gridColumn: 1, textAlign: "right" }}>
                  <p className="story-year-label">{s.year}</p>
                  <p className="story-title-text">{s.title}</p>
                  <p className="story-desc">{s.description}</p>
                </div>
                <div className="story-spacer" style={{ display: "flex", justifyContent: "center", gridColumn: 2 }}>
                  <div className="story-dot" />
                </div>
                <div style={{ gridColumn: 3 }} />
              </>
            ) : (
              <>
                <div style={{ gridColumn: 1 }} />
                <div className="story-spacer" style={{ display: "flex", justifyContent: "center", gridColumn: 2 }}>
                  <div className="story-dot" />
                </div>
                <div className="story-content" style={{ gridColumn: 3 }}>
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
        <div className="gift-icon">🎁</div>
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
              {copied === b.id ? `✓ ${MOCK_DATA.labels.buttons.copied}` : `📋 ${MOCK_DATA.labels.buttons.copy}`}
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
                  <div className="wish-time">🕐 {w.time}</div>
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
          <div style={{ fontSize: 48, marginBottom: 16 }}>🌸</div>
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
  { label: MOCK_DATA.labels.navigation.home, href: "#hero", icon: "🏠" },
  { label: MOCK_DATA.labels.navigation.couple, href: "#mempelai", icon: "💑" },
  { label: MOCK_DATA.labels.navigation.event, href: "#acara", icon: "📅" },
  { label: MOCK_DATA.labels.navigation.gallery, href: "#galeri", icon: "📸" },
  { label: MOCK_DATA.labels.navigation.wish, href: "#ucapan", icon: "💌" },
  { label: MOCK_DATA.labels.navigation.rsvp, href: "#konfirmasi", icon: "✅" },
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
        gap: 4,
      }}
    >
      {NAV_ITEMS.map((item) => (
        <a
          key={item.href}
          href={item.href}
          id={`nav-${item.label.toLowerCase()}`}
          title={item.label}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            borderRadius: "50%",
            fontSize: 16,
            textDecoration: "none",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.background = "var(--pink-100)")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.background = "transparent")}
        >
          {item.icon}
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

