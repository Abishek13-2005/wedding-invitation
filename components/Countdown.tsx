"use client";

import { useEffect, useState } from "react";

const weddingDate = new Date(
  "2026-12-04T11:00:00+05:30",
).getTime();

type CountdownTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const INITIAL_TIME: CountdownTime = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function calculateCountdown(): CountdownTime {
  const difference = Math.max(0, weddingDate - Date.now());

  return {
    days: Math.floor(
      difference / (1000 * 60 * 60 * 24),
    ),

    hours: Math.floor(
      (difference / (1000 * 60 * 60)) % 24,
    ),

    minutes: Math.floor(
      (difference / (1000 * 60)) % 60,
    ),

    seconds: Math.floor(
      (difference / 1000) % 60,
    ),
  };
}

export default function Countdown() {
  const [time, setTime] =
    useState<CountdownTime>(INITIAL_TIME);

  useEffect(() => {
    let mounted = true;

    const update = () => {
      if (mounted) {
        setTime(calculateCountdown());
      }
    };

    update();

    const interval = window.setInterval(
      update,
      1000,
    );

    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, []);

  const values = [
    {
      key: "days",
      value: time.days,
      label: "DAYS",
    },
    {
      key: "hours",
      value: time.hours,
      label: "HOURS",
    },
    {
      key: "minutes",
      value: time.minutes,
      label: "MINUTES",
    },
    {
      key: "seconds",
      value: time.seconds,
      label: "SECONDS",
    },
  ];

  return (
    <section
      className="countdown-section"
      aria-label="Wedding countdown"
    >
      {/* =========================================
          FLORAL BACKGROUND
          ========================================= */}

      <div
        className="countdown-floral countdown-floral-one"
        aria-hidden="true"
      >
        <img
          src="/images/flower.png"
          alt=""
        />
      </div>

      <div
        className="countdown-floral countdown-floral-two"
        aria-hidden="true"
      >
        <img
          src="/images/blue.png"
          alt=""
        />
      </div>

      <div
        className="countdown-floral countdown-floral-three"
        aria-hidden="true"
      >
        <img
          src="/images/blue.png"
          alt=""
        />
      </div>

      <div
        className="countdown-floral countdown-floral-four"
        aria-hidden="true"
      >
        <img
          src="/images/flower.png"
          alt=""
        />
      </div>

      {/* =========================================
          DECORATIVE ORBITS
          ========================================= */}

      <div
        className="countdown-orbit countdown-orbit-left"
        aria-hidden="true"
      />

      <div
        className="countdown-orbit countdown-orbit-right"
        aria-hidden="true"
      />

      {/* =========================================
          HEADER
          ========================================= */}

      <div className="countdown-header">

        <div className="countdown-eyebrow">
          <span />
          <p>
            COUNTING DOWN TO FOREVER
          </p>
          <span />
        </div>

        <div
          className="countdown-monogram"
          aria-hidden="true"
        >
          <span />
          <b>✦</b>
          <span />
        </div>

        <h2>
          The Celebration
          <br />
          <em>Begins</em>
        </h2>

        <p className="countdown-intro">
          Every second brings us closer
          to the moment
          <br className="countdown-desktop-break" />
          we begin this beautiful journey
          together.
        </p>

      </div>

      {/* =========================================
          COUNTDOWN CARD
          ========================================= */}

      <div className="countdown-card">

        <div
          className="countdown-card-glow"
          aria-hidden="true"
        />

        <div className="countdown-grid">

          {values.map((item) => (
            <div
              className={`countdown-item countdown-item-${item.key}`}
              key={item.key}
            >

              <strong className="countdown-value">
                <span key={item.value}>
                  {String(item.value).padStart(
                    2,
                    "0",
                  )}
                </span>
              </strong>

              <span className="countdown-label">
                {item.label}
              </span>

            </div>
          ))}

        </div>
      </div>

      {/* =========================================
          DATE FOOTER
          ========================================= */}

      <div className="countdown-footer">
        <span />

        <p>
          04 · DECEMBER · 2026
        </p>

        <span />
      </div>

    </section>
  );
}