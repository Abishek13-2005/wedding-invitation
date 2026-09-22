"use client";

export default function Hero() {
  const scrollToNext = () => {
    const nextSection = document.getElementById("date");

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="luxury-hero" id="home">

      {/* =================================================
          CENTER VIDEO
      ================================================= */}

      <div className="luxury-hero-shell">

        <div className="luxury-hero-video-frame">

          {/* Video */}

          <video
            className="luxury-hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source
              src="/images/hero.mp4"
              type="video/mp4"
            />

            Your browser does not support the video tag.
          </video>

          {/* =================================================
              DARK / SOFT OVERLAY
          ================================================= */}

          <div className="luxury-hero-video-overlay" />

          {/* =================================================
              WEDDING DETAILS INSIDE VIDEO
          ================================================= */}

          <div className="luxury-hero-content">

            {/* Ornament */}

            <div className="luxury-hero-ornament">
              <span />
              <b>✦</b>
              <span />
            </div>

            {/* Welcome */}

            <p className="luxury-hero-kicker">
              WELCOME TO THE
            </p>

            <p className="luxury-hero-ceremony">
              WEDDING CEREMONY
            </p>

            <p className="luxury-hero-of">
              OF
            </p>

            {/* Names */}

            <h1 className="luxury-hero-names">

              <span>
                Akila Giris Kezia
              </span>

              <em>
                &amp;
              </em>

              <span>
                Bennat Charles
              </span>

            </h1>

            {/* Divider */}

            <div className="luxury-hero-divider">
              <span />
              <i>❦</i>
              <span />
            </div>

            {/* Date */}

            <p className="luxury-hero-date">
              04 · DECEMBER · 2026
            </p>

          </div>

          {/* =================================================
              SCROLL BUTTON
          ================================================= */}

          <button
            type="button"
            className="luxury-hero-scroll"
            onClick={scrollToNext}
            aria-label="Scroll down"
          >
            <span className="luxury-hero-scroll-label">
              SCROLL DOWN
            </span>

            <span className="luxury-hero-scroll-line" />

            <span className="luxury-hero-scroll-arrow">
              ↓
            </span>
          </button>

        </div>

      </div>

      {/* =================================================
          SIDE DECORATIONS
      ================================================= */}

      <div className="luxury-hero-side-decoration luxury-hero-side-left">
        <span>✦</span>
      </div>

      <div className="luxury-hero-side-decoration luxury-hero-side-right">
        <span>✦</span>
      </div>

    </section>
  );
}