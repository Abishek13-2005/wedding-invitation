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
        },
      );

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
        },
      );

      gsap.fromTo(
        ".venue-art",
        {
          scale: 1.08,
        },
        {
          scale: 1,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".venue-card",
            start: "top 84%",
            once: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="venue-section"
      aria-label="Wedding venue"
    >
      {/* Decorative floral artwork */}
      <div className="venue-floral venue-floral-one" aria-hidden="true">
        <img src="/images/flower.png" alt="" />
      </div>

      <div className="venue-floral venue-floral-two" aria-hidden="true">
        <img src="/images/blue.png" alt="" />
      </div>

      <div className="venue-floral venue-floral-three" aria-hidden="true">
        <img src="/images/blue.png" alt="" />
      </div>

      <div className="venue-floral venue-floral-four" aria-hidden="true">
        <img src="/images/flower.png" alt="" />
      </div>

      <div className="venue-glow venue-glow-one" aria-hidden="true" />
      <div className="venue-glow venue-glow-two" aria-hidden="true" />

      <div className="venue-heading">
        <div className="venue-ornament" aria-hidden="true">
          <span />
          <b>✦</b>
          <span />
        </div>

        <p className="section-label">WHERE TO FIND US</p>

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

      <div className="venue-card">
        <div className="venue-art-panel">
          <div className="venue-art-frame">
            <img
              src="/images/ch.png"
              alt="Holy Immanuel Church"
              className="venue-art-image"
              draggable={false}
            />

            <div className="venue-art-overlay" aria-hidden="true" />

            <div className="venue-art-badge">
              <span>04</span>
              <small>DECEMBER</small>
            </div>

            <div className="venue-art-caption">
              <span>HOLY IMMANUEL CHURCH</span>
              <small>PATTAKKARAI</small>
            </div>
          </div>
        </div>

        <div className="venue-details">
          <div className="venue-details-inner">
            <div className="venue-date-row">
              <span className="venue-date-line" />
              <p className="venue-date">
                FRIDAY · 04 DECEMBER 2026
              </p>
              <span className="venue-date-line" />
            </div>

            <p className="venue-details-kicker">
              THE WEDDING CEREMONY
            </p>

            <h3>
              Holy Immanuel
              <span>Church</span>
            </h3>

            <div className="venue-divider" aria-hidden="true">
              <span />
              <b>❦</b>
              <span />
            </div>

            <p className="venue-address">
              Pattakkarai
              <br />
              Tamil Nadu
            </p>

            <p className="venue-note">
              A beautiful setting where family,
              friends and loved ones gather to
              celebrate the beginning of forever.
            </p>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Holy+Immanuel+Church+Pattakkarai"
              target="_blank"
              rel="noopener noreferrer"
              className="venue-location-button"
            >
              <span>VIEW LOCATION</span>
              <span className="venue-button-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      <div className="venue-bottom-mark" aria-hidden="true">
        <span />
        <b>✦</b>
        <span />
      </div>
    </section>
  );
}
