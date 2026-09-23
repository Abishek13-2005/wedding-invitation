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
  /*
   * IMPORTANT:
   * Do not call Date.now() while rendering.
   *
   * The server and browser must render exactly the same
   * initial HTML, otherwise Next.js can report:
   * "Hydration failed because the server rendered text
   * didn't match the client."
   */
  const [time, setTime] = useState<CountdownTime>(INITIAL_TIME);

  useEffect(() => {
    let mounted = true;

    const update = () => {
      if (mounted) {
        setTime(calculateCountdown());
      }
    };

    // First real countdown value is calculated only after hydration.
    update();

    const interval = window.setInterval(update, 1000);

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
      <div
        className="countdown-orbit countdown-orbit-left"
        aria-hidden="true"
      />

      <div
        className="countdown-orbit countdown-orbit-right"
        aria-hidden="true"
      />

      <div className="countdown-header">
        <div className="countdown-eyebrow">
          <span />
          <p>COUNTING DOWN TO FOREVER</p>
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
          Every second brings us closer to the moment
          <br className="countdown-desktop-break" />
          we begin this beautiful journey together.
        </p>
      </div>

      <div className="countdown-card">
        <div
          className="countdown-card-glow"
          aria-hidden="true"
        />

        <div className="countdown-grid">
          {values.map((item, index) => (
            <div
              className={`countdown-item ${
                index === values.length - 1
                  ? "countdown-item-last"
                  : ""
              }`}
              key={item.key}
            >
              <div
                className="countdown-star"
                aria-hidden="true"
              >
                ✦
              </div>

              <strong
                className={`countdown-value ${
                  item.key === "seconds"
                    ? "countdown-value-seconds"
                    : ""
                }`}
              >
                <span key={item.value}>
                  {String(item.value).padStart(2, "0")}
                </span>
              </strong>

              <span className="countdown-label">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="countdown-footer">
        <span />
        <p>04 · DECEMBER · 2026</p>
        <span />
      </div>
    </section>
  );
}
