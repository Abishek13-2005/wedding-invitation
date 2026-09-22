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

export default function Countdown() {
  const [time, setTime] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const update = () => {
      const difference = weddingDate - Date.now();

      if (difference <= 0) {
        setTime({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        return;
      }

      setTime({
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
      });
    };

    update();

    const interval = window.setInterval(
      update,
      1000,
    );

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const values = [
    {
      value: time.days,
      label: "DAYS",
    },
    {
      value: time.hours,
      label: "HOURS",
    },
    {
      value: time.minutes,
      label: "MINUTES",
    },
    {
      value: time.seconds,
      label: "SECONDS",
    },
  ];

  return (
    <section className="countdown-section">
      <p className="section-label">
        COUNTING DOWN TO FOREVER
      </p>

      <h2>
        The Celebration
        <br />
        Begins
      </h2>

      <div className="countdown">
        {values.map((item) => (
          <div key={item.label}>
            <strong>
              {String(item.value).padStart(2, "0")}
            </strong>

            <span>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
