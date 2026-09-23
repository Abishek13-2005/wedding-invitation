"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Venue() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      /* --------------------------------
         VENUE HEADING
      -------------------------------- */
      gsap.fromTo(
        ".venue-heading > *",
        {
          opacity: 0,
          y: 22,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        }
      );

      /* --------------------------------
         VENUE CARD
      -------------------------------- */
      gsap.fromTo(
        ".venue-card",
        {
          opacity: 0,
          y: 42,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".venue-card",
            start: "top 84%",
            once: true,
          },
        }
      );

      /* --------------------------------
         CHURCH IMAGE
      -------------------------------- */
      gsap.fromTo(
        ".venue-art-image",
        {
          opacity: 0,
          scale: 1.08,
          y: 30,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".venue-card",
            start: "top 80%",
            once: true,
          },
        }
      );

      /* --------------------------------
         CHURCH FRAME
      -------------------------------- */
      gsap.fromTo(
        ".venue-art-frame",
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".venue-card",
            start: "top 80%",
            once: true,
          },
        }
      );

      /* --------------------------------
         VENUE DETAILS
      -------------------------------- */
      gsap.fromTo(
        ".venue-details-inner > *",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".venue-details",
            start: "top 82%",
            once: true,
          },
        }
      );

      /* --------------------------------
         DECORATIVE FLOWERS
      -------------------------------- */
      gsap.fromTo(
        ".venue-floral",
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        }
      );

      /* --------------------------------
         GLOW EFFECTS
      -------------------------------- */
      gsap.fromTo(
        ".venue-glow",
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.4,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        }
      );

      /* --------------------------------
         ART OVERLAY
      -------------------------------- */
      gsap.fromTo(
        ".venue-art-overlay",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".venue-card",
            start: "top 80%",
            once: true,
          },
        }
      );

      /* --------------------------------
         ART BADGE
      -------------------------------- */
      gsap.fromTo(
        ".venue-art-badge",
        {
          opacity: 0,
          scale: 0.8,
          y: 15,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".venue-card",
            start: "top 80%",
            once: true,
          },
        }
      );

      /* --------------------------------
         ART CAPTION
      -------------------------------- */
      gsap.fromTo(
        ".venue-art-caption",
        {
          opacity: 0,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".venue-card",
            start: "top 80%",
            once: true,
          },
        }
      );

      /* --------------------------------
         BOTTOM MARK
      -------------------------------- */
      gsap.fromTo(
        ".venue-bottom-mark",
        {
          opacity: 0,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".venue-bottom-mark",
            start: "top 90%",
            once: true,
          },
        }
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="venue-section"
      aria-label="Wedding venue"
    >
      {/* =========================================
          DECORATIVE FLORAL ARTWORK
      ========================================== */}

      <div
        className="venue-floral venue-floral-one"
        aria-hidden="true"
      >
        <img src="/images/flower.png" alt="" />
      </div>

      <div
        className="venue-floral venue-floral-two"
        aria-hidden="true"
      >
        <img src="/images/blue.png" alt="" />
      </div>

      <div
        className="venue-floral venue-floral-three"
        aria-hidden="true"
      >
        <img src="/images/blue.png" alt="" />
      </div>

      <div
        className="venue-floral venue-floral-four"
        aria-hidden="true"
      >
        <img src="/images/flower.png" alt="" />
      </div>

      {/* =========================================
          BACKGROUND GLOW
      ========================================== */}

      <div
        className="venue-glow venue-glow-one"
        aria-hidden="true"
      />

      <div
        className="venue-glow venue-glow-two"
        aria-hidden="true"
      />

      {/* =========================================
          VENUE HEADING
      ========================================== */}

      <div className="venue-heading">
        <div
          className="venue-ornament"
          aria-hidden="true"
        >
          <span />
          <b>✦</b>
          <span />
        </div>

        <p className="section-label">
          WHERE TO FIND US
        </p>

        <p className="venue-kicker">
          A PLACE TO BEGIN FOREVER
        </p>

        <h2>
          The
          <em>Venue</em>
        </h2>

        <p className="venue-intro">
          Join us at a place filled with grace,
          <br className="venue-desktop-break" />
          joy and beautiful memories.
        </p>
      </div>

      {/* =========================================
          VENUE CARD
      ========================================== */}

      <div className="venue-card">

        {/* =======================================
            CHURCH IMAGE
        ======================================== */}

        <div className="venue-art-panel">
          <div className="venue-art-frame">

            <img
              src="/images/ch.png"
              alt="Holy Immanuel Church"
              className="venue-art-image"
              draggable={false}
            />

            <div
              className="venue-art-overlay"
              aria-hidden="true"
            />

            {/* DATE BADGE */}

            <div className="venue-art-badge">
              <span>04</span>
              <small>DECEMBER</small>
            </div>

            {/* IMAGE CAPTION */}

            <div className="venue-art-caption">
              <span>
                HOLY IMMANUEL CHURCH
              </span>

              <small>
                PATTAKKARAI
              </small>
            </div>

          </div>
        </div>

        {/* =======================================
            VENUE DETAILS
        ======================================== */}

        <div className="venue-details">

          <div className="venue-details-inner">

            {/* DATE */}

            <div className="venue-date-row">

              <span className="venue-date-line" />

              <p className="venue-date">
                FRIDAY · 04 DECEMBER 2026
              </p>

              <span className="venue-date-line" />

            </div>

            {/* KICKER */}

            <p className="venue-details-kicker">
              THE WEDDING CEREMONY
            </p>

            {/* TITLE */}

            <h3>
              Holy Immanuel
              <span>
                Church
              </span>
            </h3>

            {/* DIVIDER */}

            <div
              className="venue-divider"
              aria-hidden="true"
            >
              <span />
              <b>❦</b>
              <span />
            </div>

            {/* ADDRESS */}

            <p className="venue-address">
              Pattakkarai
              <br />
              Tamil Nadu
            </p>

            {/* DESCRIPTION */}

            <p className="venue-note">
              A beautiful setting where family,
              friends and loved ones gather to
              celebrate the beginning of forever.
            </p>

            {/* LOCATION BUTTON */}

            <a
              href="https://www.google.com/maps/search/?api=1&query=Holy+Immanuel+Church+Pattakkarai"
              target="_blank"
              rel="noopener noreferrer"
              className="venue-location-button"
            >
              <span>
                VIEW LOCATION
              </span>

              <span
                className="venue-button-arrow"
                aria-hidden="true"
              >
                →
              </span>
            </a>

          </div>

        </div>

      </div>

      {/* =========================================
          BOTTOM DECORATIVE MARK
      ========================================== */}

      <div
        className="venue-bottom-mark"
        aria-hidden="true"
      >
        <span />
        <b>✦</b>
        <span />
      </div>

    </section>
  );
}