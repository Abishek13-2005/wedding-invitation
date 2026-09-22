"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ChurchIllustration from "./ChurchIllustration";

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    date: "3 DECEMBER 2026",
    time: "8:00 PM",
    title: "Engagement",
    location: (
      <>
        Church Grounds
        <br />
        Holy Immanuel Church, Pattakkarai
      </>
    ),
    illustration: "rings" as const,
  },

  {
    date: "4 DECEMBER 2026",
    time: "11:00 AM",
    title: "Wedding Ceremony",
    location: (
      <>
        Holy Immanuel Church
        <br />
        Pattakkarai
      </>
    ),
    illustration: "church" as const,
  },

  {
    date: null,
    time: "12:30 PM",
    title: "Greetings & Blessings",
    subtitle: "Immediately after the wedding",
    location: (
      <>
        Church Grounds, Holy Immanuel Church
        <br />
        Pattakkarai
      </>
    ),
    illustration: "blessings" as const,
  },

  {
    date: null,
    time: "1:00 PM",
    title: "Lunch",
    location: (
      <>
        Bride's Residence
        <br />
        Pattakkarai
      </>
    ),
    illustration: "lunch" as const,
  },
];

export default function Timeline() {
  useEffect(() => {
    const items =
      gsap.utils.toArray<HTMLElement>(
        ".celebration-item",
      );

    items.forEach((item) => {
      const image = item.querySelector(
        ".timeline-art-wrapper",
      );

      const content = item.querySelector(
        ".timeline-event-content",
      );

      gsap.from(image, {
        opacity: 0,
        scale: 0.85,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 82%",
        },
      });

      gsap.from(content, {
        opacity: 0,
        x: 35,
        duration: 0.9,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 82%",
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(
        (trigger) => trigger.kill(),
      );
    };
  }, []);

  return (
    <section className="celebration-section">
      <div className="celebration-heading">
        <p className="section-label">
          JOIN US
        </p>

        <h2>
          The Wedding
          <br />
          Celebrations
        </h2>

        <div className="gold-ornament">
          ✦
        </div>
      </div>

      <div className="celebration-timeline">
        {events.map((event, index) => (
          <div
            className="celebration-item"
            key={`${event.time}-${event.title}`}
          >
            <div className="timeline-date">
              {event.date && (
                <>
                  <span className="timeline-date-line" />
                  <strong>
                    {event.date}
                  </strong>
                </>
              )}
            </div>

            <div className="timeline-column">
              <div className="timeline-node">
                <span />
              </div>
            </div>

            <div className="timeline-event">
              <div className="timeline-art-wrapper">
                <ChurchIllustration
                  type={event.illustration}
                />
              </div>

              <div className="timeline-event-content">
                <p className="timeline-time">
                  {event.time}
                </p>

                <h3>{event.title}</h3>

                {event.subtitle && (
                  <p className="timeline-subtitle">
                    {event.subtitle}
                  </p>
                )}

                <div className="gold-small-line" />

                <p className="timeline-location">
                  {event.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="timeline-ending">
        <span>✦</span>
      </div>
    </section>
  );
}