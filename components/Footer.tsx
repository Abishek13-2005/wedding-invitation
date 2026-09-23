"use client";

import { useEffect, useState, type CSSProperties } from "react";

type HeartParticle = {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
  opacity: number;
  type: "heart" | "white";
};

export default function Footer() {
  const [showFinale, setShowFinale] = useState(false);
  const [hearts, setHearts] = useState<HeartParticle[]>([]);

  /*
   * PRELOAD FINAL SECTION IMAGES
   *
   * This makes the Save the Date section appear much faster
   * when the user clicks "One more moment".
   */
  useEffect(() => {
    const images = [
      "/images/couple.png",
      "/images/heart.png",
      "/images/whiteheart.png",
      "/images/flower.png",
      "/images/blue.png",
    ];

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  /*
   * Generate the floating hearts before opening the finale.
   */
  const createHearts = (): HeartParticle[] => {
    return Array.from(
      { length: 42 },
      (_, index) => ({
        id: index,

        /*
         * Keep most hearts toward the sides
         * so they don't cover the couple.
         */
        left:
          index % 3 === 0
            ? Math.random() * 24
            : index % 3 === 1
              ? 76 + Math.random() * 24
              : 8 + Math.random() * 84,

        size: 18 + Math.random() * 38,

        delay: Math.random() * 4,

        duration: 7 + Math.random() * 5,

        rotation: -20 + Math.random() * 40,

        opacity: 0.35 + Math.random() * 0.5,

        type:
          index % 2 === 0
            ? "heart"
            : "white",
      })
    );
  };

  const openFinale = () => {
    /*
     * Generate particles first.
     * React will render them together with the finale.
     */
    const generatedHearts = createHearts();

    setHearts(generatedHearts);

    /*
     * requestAnimationFrame lets the browser render
     * the overlay smoothly instead of blocking the click.
     */
    requestAnimationFrame(() => {
      setShowFinale(true);
    });
  };

  const closeFinale = () => {
    setShowFinale(false);

    window.setTimeout(() => {
      setHearts([]);
    }, 700);
  };

  return (
    <>
      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="footer">

        {/* =================================================
            BACKGROUND FLOWERS
        ================================================= */}

        <div
          className="footer-flower footer-flower-top-left"
          aria-hidden="true"
        >
          <img
            src="/images/flower.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>

        <div
          className="footer-flower footer-flower-top-right"
          aria-hidden="true"
        >
          <img
            src="/images/blue.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>

        <div
          className="footer-flower footer-flower-bottom-left"
          aria-hidden="true"
        >
          <img
            src="/images/blue.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>

        <div
          className="footer-flower footer-flower-bottom-right"
          aria-hidden="true"
        >
          <img
            src="/images/flower.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* =================================================
            BACKGROUND GLOWS
        ================================================= */}

        <div
          className="footer-glow footer-glow-top"
          aria-hidden="true"
        />

        <div
          className="footer-glow footer-glow-center"
          aria-hidden="true"
        />

        {/* =================================================
            ORNAMENT
        ================================================= */}

        <div
          className="footer-ornament"
          aria-hidden="true"
        >
          <span />
          <i>✦</i>
          <span />
        </div>

        {/* =================================================
            MESSAGE
        ================================================= */}

        <p className="footer-message">
          Hope to see you there
        </p>

        {/* =================================================
            NAMES
        ================================================= */}

        <div className="footer-names">
          <h2 className="footer-name">
            Akila
          </h2>

          <div className="footer-ampersand">
            &
          </div>

          <h2 className="footer-name">
            Bennat
          </h2>
        </div>

        {/* =================================================
            DATE
        ================================================= */}

        <div className="footer-date-wrap">
          <span className="footer-date-line" />

          <p className="footer-date">
            04
            <span>·</span>
            12
            <span>·</span>
            2026
          </p>

          <span className="footer-date-line" />
        </div>

        {/* =================================================
            DIVIDER
        ================================================= */}

        <div className="footer-line">
          <span />
          <i>✦</i>
          <span />
        </div>

        {/* =================================================
            SMALL MESSAGE
        ================================================= */}

        <p className="footer-small">
          With love and gratitude
        </p>

        {/* =================================================
            HEART BUTTON
        ================================================= */}

        <button
          type="button"
          className="footer-heart-button"
          onClick={openFinale}
          aria-label="Open save the date finale"
        >
          <span className="footer-heart-button-icon">
            ♡
          </span>

          <span className="footer-heart-button-text">
            One more moment
          </span>

          <span
            className="footer-heart-button-arrow"
            aria-hidden="true"
          >
            ✦
          </span>
        </button>

        {/* =================================================
            BOTTOM ORNAMENT
        ================================================= */}

        <div
          className="footer-bottom-ornament"
          aria-hidden="true"
        >
          ✦
        </div>
      </footer>

      {/* =====================================================
          FULL SCREEN HEART FINALE
      ===================================================== */}

      {hearts.length > 0 && (
        <div
          className={`heart-finale ${
            showFinale
              ? "is-active"
              : "is-closing"
          }`}
          onClick={closeFinale}
          role="dialog"
          aria-label="Save the date"
        >

          {/* =================================================
              BACKGROUND GLOW
          ================================================= */}

          <div
            className="heart-finale-glow"
            aria-hidden="true"
          />

          {/* =================================================
              BACKGROUND SPARKLES
          ================================================= */}

          <div
            className="finale-star finale-star-one"
            aria-hidden="true"
          >
            ✦
          </div>

          <div
            className="finale-star finale-star-two"
            aria-hidden="true"
          >
            ✦
          </div>

          <div
            className="finale-star finale-star-three"
            aria-hidden="true"
          >
            ✧
          </div>

          <div
            className="finale-star finale-star-four"
            aria-hidden="true"
          >
            ✦
          </div>

          <div
            className="finale-star finale-star-five"
            aria-hidden="true"
          >
            ✧
          </div>

          {/* =================================================
              COUPLE + SAVE THE DATE CONTENT
          ================================================= */}

          <div
            className="heart-finale-content"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* Couple image */}

            <div className="finale-couple-image">
              <div className="finale-couple-glow" />

              <img
                src="/images/couple.webp"
                alt="Akila and Bennat"
                decoding="async"
                fetchPriority="high"
              />
            </div>

            {/* Small heading */}

            <p className="finale-kicker">
              ✦ &nbsp; A LITTLE REMINDER &nbsp; ✦
            </p>

            {/* SAVE THE DATE */}

            <h3 className="finale-save">
              <span className="finale-save-main">
                Save
              </span>

              <span className="finale-save-sub">
                the date
              </span>
            </h3>

            {/* Decorative line */}

            <div
              className="finale-small-line"
              aria-hidden="true"
            >
              <span />

              <i>
                ♡
              </i>

              <span />
            </div>

            {/* Names */}

            <div className="finale-names">
              <span>
                Akila
              </span>

              <i>
                &
              </i>

              <span>
                Bennat
              </span>
            </div>

            {/* Date */}

            <div className="finale-date">
              <span>
                04
              </span>

              <i>
                ·
              </i>

              <span>
                12
              </span>

              <i>
                ·
              </i>

              <span>
                2026
              </span>
            </div>

            {/* Caption */}

            <p className="finale-location">
              OUR FOREVER BEGINS
            </p>

            <p className="finale-message">
              Keep this beautiful day
              <br />
              close to your heart.
            </p>
          </div>

          {/* =================================================
              FLOATING HEARTS
          ================================================= */}

          <div
            className="heart-particles"
            aria-hidden="true"
          >
            {hearts.map((heart) => (
              <img
                key={heart.id}
                src={
                  heart.type === "white"
                    ? "/images/whiteheart.png"
                    : "/images/heart.png"
                }
                alt=""
                className="floating-heart-image"
                loading="eager"
                decoding="async"
                style={
                  {
                    left: `${heart.left}%`,
                    width: `${heart.size}px`,
                    animationDelay:
                      `${heart.delay}s`,
                    animationDuration:
                      `${heart.duration}s`,
                    opacity: heart.opacity,
                    "--heart-rotation":
                      `${heart.rotation}deg`,
                  } as CSSProperties
                }
              />
            ))}
          </div>

          {/* =================================================
              CLOSE TEXT
          ================================================= */}

          <p className="finale-touch">
            TAP ANYWHERE OUTSIDE TO CLOSE
          </p>

        </div>
      )}
    </>
  );
}