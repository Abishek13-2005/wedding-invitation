"use client";

import { useEffect, useState } from "react";

type Heart = {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
  opacity: number;
};

export default function Footer() {
  const [showHearts, setShowHearts] = useState(false);
  const [hearts, setHearts] = useState<Heart[]>([]);

  const createHearts = () => {
    const newHearts: Heart[] = Array.from(
      { length: 85 },
      (_, index) => ({
        id: index,

        left:
          Math.random() * 100,

        size:
          12 + Math.random() * 32,

        delay:
          Math.random() * 2.8,

        duration:
          5 + Math.random() * 5,

        rotation:
          -25 + Math.random() * 50,

        opacity:
          0.25 + Math.random() * 0.55,
      }),
    );

    setHearts(newHearts);
    setShowHearts(true);
  };

  const closeHearts = () => {
    setShowHearts(false);

    setTimeout(() => {
      setHearts([]);
    }, 900);
  };

  useEffect(() => {
    if (!showHearts) return;

    const timer = window.setTimeout(() => {
      closeHearts();
    }, 12500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [showHearts]);

  return (
    <>
      <footer className="footer">

        {/* =====================================================
            FLOWERS
            ===================================================== */}

        <div
          className="footer-flower footer-flower-top-left"
          aria-hidden="true"
        >
          <img
            src="/images/flower.png"
            alt=""
          />
        </div>

        <div
          className="footer-flower footer-flower-top-right"
          aria-hidden="true"
        >
          <img
            src="/images/blue.png"
            alt=""
          />
        </div>

        <div
          className="footer-flower footer-flower-bottom-left"
          aria-hidden="true"
        >
          <img
            src="/images/blue.png"
            alt=""
          />
        </div>

        <div
          className="footer-flower footer-flower-bottom-right"
          aria-hidden="true"
        >
          <img
            src="/images/flower.png"
            alt=""
          />
        </div>


        {/* =====================================================
            BACKGROUND GLOW
            ===================================================== */}

        <div
          className="footer-glow footer-glow-top"
          aria-hidden="true"
        />

        <div
          className="footer-glow footer-glow-center"
          aria-hidden="true"
        />


        {/* =====================================================
            ORNAMENT
            ===================================================== */}

        <div
          className="footer-ornament"
          aria-hidden="true"
        >
          <span />
          <i>✦</i>
          <span />
        </div>


        {/* =====================================================
            MESSAGE
            ===================================================== */}

        <p className="footer-message">
          Hope to see you there
        </p>


        {/* =====================================================
            NAMES
            ===================================================== */}

        <div className="footer-names">

          <h2 className="footer-name">
            Akila
          </h2>

          <div
            className="footer-ampersand"
            aria-hidden="true"
          >
            &
          </div>

          <h2 className="footer-name">
            Bennat
          </h2>

        </div>


        {/* =====================================================
            DATE
            ===================================================== */}

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


        {/* =====================================================
            DIVIDER
            ===================================================== */}

        <div
          className="footer-line"
          aria-hidden="true"
        >
          <span />
          <i>✦</i>
          <span />
        </div>


        {/* =====================================================
            FINAL MESSAGE
            ===================================================== */}

        <p className="footer-small">
          With love and gratitude
        </p>


        {/* =====================================================
            HEART BUTTON
            ===================================================== */}

        <button
          type="button"
          className="footer-heart-button"
          onClick={
            showHearts
              ? closeHearts
              : createHearts
          }
          aria-label={
            showHearts
              ? "Close hearts"
              : "Send hearts"
          }
        >
          <span className="footer-heart-button-icon">
            ♡
          </span>

          <span className="footer-heart-button-text">
            {showHearts
              ? "A little more love"
              : "One more moment"}
          </span>

          <span className="footer-heart-button-arrow">
            ✦
          </span>
        </button>


        {/* =====================================================
            BOTTOM ORNAMENT
            ===================================================== */}

        <div
          className="footer-bottom-ornament"
          aria-hidden="true"
        >
          ✦
        </div>

      </footer>


      {/* =======================================================
          FULL SCREEN HEART EXPERIENCE
          ======================================================= */}

      {hearts.length > 0 && (
        <div
          className={`heart-finale ${
            showHearts
              ? "is-active"
              : "is-closing"
          }`}
          aria-hidden="true"
        >

          <div className="heart-finale-glow" />

          <div className="heart-finale-center">
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

          <div className="heart-particles">

            {hearts.map((heart) => (
              <span
                key={heart.id}
                className="floating-heart"
                style={{
                  left: `${heart.left}%`,
                  width: `${heart.size}px`,
                  height: `${heart.size}px`,
                  animationDelay: `${heart.delay}s`,
                  animationDuration: `${heart.duration}s`,
                  opacity: heart.opacity,
                  transform:
                    `rotate(${heart.rotation}deg)`,
                }}
              />
            ))}

          </div>

        </div>
      )}
    </>
  );
}