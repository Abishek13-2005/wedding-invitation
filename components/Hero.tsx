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
      <div className="luxury-hero-shell">
        <div className="luxury-hero-video-frame">
          <video
            className="luxury-hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source src="/images/hero.mp4" type="video/mp4" />
          </video>

          <div className="luxury-hero-video-overlay" />

          <div className="luxury-hero-content">
            <div className="luxury-hero-ornament">
              <span />
              <b>✦</b>
              <span />
            </div>

            <p className="luxury-hero-kicker">
              WELCOME TO THE
            </p>

            <p className="luxury-hero-ceremony">
              WEDDING CEREMONY
            </p>

            <p className="luxury-hero-of">
              OF
            </p>

            <h1 className="luxury-hero-names">
              <span>Akila Giris Kezia</span>
              <em>&amp;</em>
              <span>Bennat Charles</span>
            </h1>

            <div className="luxury-hero-divider">
              <span />
              <i>❦</i>
              <span />
            </div>
          </div>

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
    </section>
  );
}
