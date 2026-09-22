"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function OpeningScreen() {
  const screenRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const instructionRef = useRef<HTMLDivElement>(null);

  const openingRef = useRef(false);

  /* =====================================================
     LOCK SCROLL WHILE OPENING SCREEN IS VISIBLE
     ===================================================== */

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /* =====================================================
     OPEN INVITATION
     ===================================================== */

  const openInvitation = () => {
    if (openingRef.current) {
      return;
    }

    const screen = screenRef.current;
    const envelope = envelopeRef.current;
    const flap = flapRef.current;
    const card = cardRef.current;
    const seal = sealRef.current;
    const instruction = instructionRef.current;

    if (
      !screen ||
      !envelope ||
      !flap ||
      !card ||
      !seal
    ) {
      console.error(
        "Opening animation elements not found."
      );

      return;
    }

    openingRef.current = true;

    document.body.style.overflow = "hidden";

    /* ===================================================
       STOP ANY PREVIOUS GSAP ANIMATION
       =================================================== */

    gsap.killTweensOf([
      screen,
      envelope,
      flap,
      card,
      seal,
      instruction,
    ]);

    /* ===================================================
       INITIAL STATE
       =================================================== */

    gsap.set(screen, {
      opacity: 1,
      visibility: "visible",
      display: "flex",
    });

    gsap.set(envelope, {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotation: 0,
    });

    gsap.set(flap, {
      rotationX: 0,
      transformOrigin: "50% 0%",
    });

    gsap.set(card, {
      opacity: 0,
      visibility: "hidden",
      y: "8%",
      scale: 0.985,
      rotation: 0,
      zIndex: 2,
    });

    gsap.set(seal, {
      opacity: 1,
      scale: 1,
      rotation: 0,
    });

    /* ===================================================
       ANIMATION TIMELINE
       =================================================== */

    const timeline = gsap.timeline({
      defaults: {
        ease: "power3.inOut",
      },

      onComplete: () => {
        document.body.style.overflow = "";

        gsap.set(screen, {
          display: "none",
        });

        openingRef.current = false;
      },
    });

    /* ===================================================
       1. HIDE OPENING INSTRUCTION
       =================================================== */

    if (instruction) {
      timeline.to(
        instruction,
        {
          opacity: 0,
          y: 18,
          duration: 0.35,
          ease: "power2.out",
        },
        0
      );
    }

    /* ===================================================
       2. WAX SEAL RELEASES
       =================================================== */

    timeline.to(
      seal,
      {
        scale: 0.2,
        opacity: 0,
        rotation: -12,
        duration: 0.45,
        ease: "power2.in",
      },
      0
    );

    /* ===================================================
       3. REVEAL INVITATION CARD
       =================================================== */

    timeline.set(
      card,
      {
        visibility: "visible",
        opacity: 1,
        zIndex: 10,
      },
      0.45
    );

    /* ===================================================
       4. OPEN ENVELOPE FLAP
       =================================================== */

    timeline.to(
      flap,
      {
        rotationX: -175,
        duration: 1.15,
        ease: "power3.inOut",
      },
      0.2
    );

    /* ===================================================
       5. INVITATION COMES OUT
       =================================================== */

    timeline.to(
      card,
      {
        y: "-38%",
        duration: 1,
        ease: "power3.out",
      },
      0.62
    );

    /* ===================================================
       6. ENVELOPE FADES AWAY
       =================================================== */

    timeline.to(
      envelope,
      {
        opacity: 0,
        duration: 0.55,
        ease: "power2.inOut",
      },
      1.55
    );

    /* ===================================================
       7. INVITATION ZOOMS TOWARD SCREEN
       =================================================== */

    timeline.to(
      card,
      {
        scale: 4.8,
        opacity: 0,
        duration: 1.25,
        ease: "power3.inOut",
      },
      1.75
    );

    /* ===================================================
       8. FADE OPENING SCREEN
       =================================================== */

    timeline.to(
      screen,
      {
        opacity: 0,
        duration: 0.45,
        ease: "power2.inOut",
      },
      2.7
    );
  };

  return (
    <div
      ref={screenRef}
      className="invitation-opening"
    >
      {/* ==================================================
          FULL SCREEN TOUCH TARGET
          ================================================== */}

      <button
        type="button"
        className="opening-hit-area"
        aria-label="Open wedding invitation"
        onClick={openInvitation}
      />

      {/* ==================================================
          DECORATIVE STARS
          ================================================== */}

      <div
        className="opening-decoration opening-decoration-top"
        aria-hidden="true"
      >
        <span>✦</span>
      </div>

      <div
        className="opening-decoration opening-decoration-bottom"
        aria-hidden="true"
      >
        <span>✦</span>
      </div>

      {/* ==================================================
          ENVELOPE
          ================================================== */}

      <div
        ref={envelopeRef}
        className="wedding-envelope"
      >
        {/* =================================================
            INVITATION CARD
            ================================================= */}

        <div
          ref={cardRef}
          className="envelope-card"
        >
          <div className="card-border">

            {/* Top ornament */}

            <div
              className="card-flower top-flower"
              aria-hidden="true"
            >
              ❦
            </div>

            {/* Card content */}

            <div className="envelope-card-content">

              <p className="card-small">
                WELCOME TO THE
              </p>

              <p className="card-small">
                WEDDING CEREMONY
              </p>

              <p className="card-of">
                OF
              </p>

              <h1>
                Akila Giris Kezia

                <span>
                  &amp;
                </span>

                Bennat Charles
              </h1>

              <div className="card-divider" />

              <p className="card-date">
                04 · DECEMBER · 2026
              </p>

            </div>

            {/* Bottom ornament */}

            <div
              className="card-flower bottom-flower"
              aria-hidden="true"
            >
              ❦
            </div>

          </div>
        </div>

        {/* =================================================
            ENVELOPE BODY
            ================================================= */}

        <div
          className="envelope-body"
          aria-hidden="true"
        >
          <div className="envelope-left-fold" />

          <div className="envelope-right-fold" />

          <div className="envelope-bottom-fold" />
        </div>

        {/* =================================================
            TOP FLAP
            ================================================= */}

        <div
          ref={flapRef}
          className="envelope-flap"
          aria-hidden="true"
        >
          <div className="flap-decoration">

            <span className="floral-branch branch-left">
              ❧
            </span>

            <span className="floral-branch branch-right">
              ❧
            </span>

          </div>
        </div>

        {/* =================================================
            WAX SEAL
            ================================================= */}

        <div
          ref={sealRef}
          className="wax-seal"
          aria-hidden="true"
        >
          <span>
            AK
          </span>

          <small>
            &amp;
          </small>

          <span>
            BC
          </span>
        </div>
      </div>

      {/* ==================================================
          OPENING INSTRUCTION
          ================================================== */}

      <div
        ref={instructionRef}
        className="opening-instruction"
        aria-hidden="true"
      >
        <p>
          CLICK TO OPEN
        </p>

        <span>
          OPEN INVITATION
        </span>
      </div>
    </div>
  );
}