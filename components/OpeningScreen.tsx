"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function OpeningScreen() {
  const screenRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLButtonElement>(null);
  const instructionRef = useRef<HTMLDivElement>(null);

  const [isOpening, setIsOpening] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  /*
   * Lock page scrolling while the opening screen is visible.
   */
  useEffect(() => {
    if (!isFinished) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isFinished]);

  const openInvitation = () => {
    if (isOpening || isFinished) return;

    const screen = screenRef.current;
    const envelope = envelopeRef.current;
    const card = cardRef.current;
    const body = bodyRef.current;
    const flap = flapRef.current;
    const seal = sealRef.current;
    const instruction = instructionRef.current;

    if (
      !screen ||
      !envelope ||
      !card ||
      !body ||
      !flap ||
      !seal ||
      !instruction
    ) {
      return;
    }

    setIsOpening(true);

    /*
     * Disable interaction immediately.
     */
    screen.classList.add("is-opening");

    /*
     * Make sure the initial GSAP state is clean.
     */
    gsap.killTweensOf([
      screen,
      envelope,
      card,
      body,
      flap,
      seal,
      instruction,
    ]);

    /*
     * Card starts hidden behind the envelope.
     */
    gsap.set(card, {
      opacity: 1,
      visibility: "visible",
      y: 0,
      scale: 1,
    });

    /*
     * Keep envelope in original position.
     */
    gsap.set(envelope, {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
    });

    /*
     * Keep flap closed initially.
     */
    gsap.set(flap, {
      rotateX: 0,
      opacity: 1,
    });

    /*
     * Keep seal visible.
     */
    gsap.set(seal, {
      scale: 1,
      opacity: 1,
    });

    /*
     * Instruction visible.
     */
    gsap.set(instruction, {
      opacity: 1,
      y: 0,
    });

    const timeline = gsap.timeline({
      defaults: {
        overwrite: "auto",
      },
    });

    /*
     * ==========================================
     * 1. Hide "OPEN INVITATION"
     * ==========================================
     */

    timeline.to(instruction, {
      opacity: 0,
      y: 15,
      duration: 0.35,
      ease: "power2.out",
    });

    /*
     * ==========================================
     * 2. Wax seal disappears
     * ==========================================
     */

    timeline.to(
      seal,
      {
        scale: 0.65,
        opacity: 0,
        duration: 0.45,
        ease: "power2.inOut",
      },
      "-=0.12",
    );

    /*
     * ==========================================
     * 3. Open envelope flap
     * ==========================================
     */

    timeline.to(
      flap,
      {
        rotateX: -180,
        duration: 1.15,
        ease: "power3.inOut",
      },
      "-=0.08",
    );

    /*
     * ==========================================
     * 4. Card rises out of envelope
     * ==========================================
     */

    timeline.to(
      card,
      {
        y: "-32%",
        scale: 1.015,
        duration: 1.15,
        ease: "power3.out",
      },
      "-=0.42",
    );

    /*
     * ==========================================
     * 5. Envelope body fades away
     * ==========================================
     */

    timeline.to(
      body,
      {
        opacity: 0,
        duration: 0.55,
        ease: "power2.out",
      },
      "-=0.45",
    );

    /*
     * Hide flap after card comes forward.
     */

    timeline.to(
      flap,
      {
        opacity: 0,
        duration: 0.35,
        ease: "power2.out",
      },
      "<",
    );

    /*
     * ==========================================
     * 6. Small pause
     * ==========================================
     */

    timeline.to({}, {
      duration: 0.45,
    });

    /*
     * ==========================================
     * 7. Card zooms toward the screen
     * ==========================================
     */

    timeline.to(card, {
      scale: 5.2,
      duration: 1.25,
      ease: "power3.inOut",
    });

    /*
     * ==========================================
     * 8. Fade opening screen
     * ==========================================
     */

    timeline.to(
      screen,
      {
        opacity: 0,
        duration: 0.7,
        ease: "power2.inOut",

        onComplete: () => {
          /*
           * Restore normal page scrolling.
           */
          document.body.style.overflow = "";

          /*
           * CRITICAL FIX:
           *
           * Completely remove OpeningScreen
           * from the React DOM.
           *
           * This prevents an invisible full-screen
           * layer from intercepting clicks.
           */
          setIsFinished(true);
        },
      },
      "-=0.25",
    );
  };

  /*
   * ==========================================
   * IMPORTANT:
   *
   * Once the opening animation is complete,
   * render NOTHING.
   *
   * Do not use:
   * display:none
   * visibility:hidden
   * opacity:0
   *
   * The component must be removed from the DOM.
   * ==========================================
   */

  if (isFinished) {
    return null;
  }

  return (
    <div
      ref={screenRef}
      className="invitation-opening"
      aria-label="Wedding invitation opening"
    >
      {/* =====================================
          DECORATIONS
      ====================================== */}

      <div className="opening-decoration opening-decoration-top">
        <span>✦</span>
      </div>

      <div className="opening-decoration opening-decoration-bottom">
        <span>✦</span>
      </div>

      {/* =====================================
          ENVELOPE
      ====================================== */}

      <div
        ref={envelopeRef}
        className="wedding-envelope"
      >
        {/* ===================================
            INVITATION CARD
        ==================================== */}

        <div
          ref={cardRef}
          className="envelope-card"
        >
          <div className="card-border">
            <div className="card-flower top-flower">
              ❦
            </div>

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

            <div className="card-flower bottom-flower">
              ❦
            </div>
          </div>
        </div>

        {/* ===================================
            ENVELOPE BODY
        ==================================== */}

        <div
          ref={bodyRef}
          className="envelope-body"
        >
          <div className="envelope-left-fold" />

          <div className="envelope-right-fold" />

          <div className="envelope-bottom-fold" />
        </div>

        {/* ===================================
            ENVELOPE FLAP
        ==================================== */}

        <div
          ref={flapRef}
          className="envelope-flap"
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

        {/* ===================================
            WAX SEAL
        ==================================== */}

        <button
          ref={sealRef}
          type="button"
          className="wax-seal"
          aria-label="Open wedding invitation"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();

            openInvitation();
          }}
        >
          <span>AK</span>

          <small>
            &amp;
          </small>

          <span>BC</span>
        </button>
      </div>

      {/* =====================================
          OPEN INVITATION BUTTON
      ====================================== */}

      <div
        ref={instructionRef}
        className="opening-instruction"
      >
        <p>
          CLICK TO OPEN
        </p>

        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();

            openInvitation();
          }}
        >
          OPEN INVITATION
        </button>
      </div>
    </div>
  );
}