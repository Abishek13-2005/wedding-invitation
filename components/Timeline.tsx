 "use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    date: "3 DECEMBER 2026",
    time: "8:00 PM",
    title: "Engagement",
    eyebrow: "A BEAUTIFUL BEGINNING",
    location: (
      <>
        Church Grounds
        <br />
        Holy Immanuel Church, Pattakkarai
      </>
    ),
    image: "/images/en.png",
  },
  {
    date: "4 DECEMBER 2026",
    time: "11:00 AM",
    title: "Wedding Ceremony",
    eyebrow: "THE DAY WE BEGIN FOREVER",
    location: (
      <>
        Holy Immanuel Church
        <br />
        Pattakkarai
      </>
    ),
    image: "/images/wc.png",
  },
  {
    date: null,
    time: "12:30 PM",
    title: "Greetings & Blessings",
    eyebrow: "LOVE & BLESSINGS",
    subtitle: "Immediately after the wedding",
    location: (
      <>
        Church Grounds, Holy Immanuel Church
        <br />
        Pattakkarai
      </>
    ),
    image: "/images/gb.png",
  },
  {
    date: null,
    time: "1:00 PM",
    title: "Lunch",
    eyebrow: "LET US CELEBRATE TOGETHER",
    location: (
      <>
        Bride&apos;s Residence
        <br />
        Pattakkarai
      </>
    ),
    image: "/images/ln.png",
  },
];

export default function Timeline() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = document.querySelector<HTMLElement>(
        ".celebration-section",
      );

      const heading = section?.querySelector(
        ".celebration-heading",
      );

      const headingPieces = section
        ? gsap.utils.toArray<HTMLElement>(
            ".celebration-heading-ornament, .celebration-heading .section-label, .celebration-kicker, .celebration-heading h2, .celebration-intro",
          )
        : [];

      const spine = section?.querySelector<HTMLElement>(
        ".celebration-timeline",
      );

      const spineProgress = section?.querySelector<HTMLElement>(
        ".timeline-spine-progress",
      );

      if (heading) {
        gsap.fromTo(
          headingPieces,
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 82%",
              once: true,
            },
          },
        );
      }

      if (spineProgress && spine) {
        gsap.fromTo(
          spineProgress,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: spine,
              start: "top 70%",
              end: "bottom 86%",
              scrub: 0.6,
            },
          },
        );
      }

      const items =
        gsap.utils.toArray<HTMLElement>(
          ".celebration-item",
        );

      items.forEach((item, index) => {
        const art = item.querySelector<HTMLElement>(
          ".timeline-art-wrapper",
        );

        const image = item.querySelector<HTMLElement>(
          ".timeline-illustration",
        );

        const content =
          item.querySelector<HTMLElement>(
            ".timeline-event-content",
          );

        const node =
          item.querySelector<HTMLElement>(
            ".timeline-node",
          );

        const date = item.querySelector<HTMLElement>(
          ".timeline-date",
        );

        const side =
          item.dataset.side === "left" ? -1 : 1;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 84%",
            once: true,
          },
        });

        if (date) {
          tl.fromTo(
            date,
            {
              opacity: 0,
              y: 18,
              scale: 0.96,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.55,
              ease: "power2.out",
            },
            0,
          );
        }

        if (node) {
          tl.fromTo(
            node,
            {
              opacity: 0,
              scale: 0,
            },
            {
              opacity: 1,
              scale: 1,
              duration: 0.65,
              ease: "back.out(1.8)",
            },
            0.08,
          );
        }

        if (art) {
          tl.fromTo(
            art,
            {
              opacity: 0,
              y: 42,
              x: side * -24,
              scale: 0.92,
              rotateZ: side * 1.3,
            },
            {
              opacity: 1,
              y: 0,
              x: 0,
              scale: 1,
              rotateZ: 0,
              duration: 0.95,
              ease: "power3.out",
            },
            0.14,
          );
        }

        if (image) {
          tl.fromTo(
            image,
            {
              scale: 1.09,
            },
            {
              scale: 1,
              duration: 1.2,
              ease: "power2.out",
            },
            0.14,
          );
        }

        if (content) {
          tl.fromTo(
            content,
            {
              opacity: 0,
              x: side * 40,
              y: 12,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            0.28,
          );
        }

        if (art) {
          gsap.to(art, {
            y: -7,
            ease: "sine.inOut",
            duration: 4.2 + index * 0.25,
            repeat: -1,
            yoyo: true,
          });
        }

        if (image) {
          gsap.to(image, {
            yPercent: -2.5,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="celebration-section"
      id="celebrations"
    >
      <div className="celebration-heading">
        <div
          className="celebration-heading-ornament"
          aria-hidden="true"
        >
          <span />
          <b>✦</b>
          <span />
        </div>

        <p className="section-label">JOIN US</p>

        <p className="celebration-kicker">
          FOUR MOMENTS · ONE BEAUTIFUL JOURNEY
        </p>

        <h2>
          The Wedding
          <em>Celebrations</em>
        </h2>

        <p className="celebration-intro">
          From the first promise to the final toast,
          <br className="celebration-desktop-break" />
          we would love to celebrate every beautiful
          moment with you.
        </p>
      </div>

      <div className="celebration-timeline">
        <div
          className="timeline-spine"
          aria-hidden="true"
        >
          <span className="timeline-spine-progress" />
        </div>

        {events.map((event, index) => {
          const isLeft = index % 2 === 1;

          return (
            <article
              className={`celebration-item ${
                isLeft
                  ? "celebration-item-left"
                  : "celebration-item-right"
              }`}
              data-side={isLeft ? "left" : "right"}
              key={`${event.time}-${event.title}`}
            >
              {event.date && (
                <div className="timeline-date">
                  <span className="timeline-date-line" />
                  <strong>{event.date}</strong>
                  <span className="timeline-date-line" />
                </div>
              )}

              <div className="timeline-column">
                <div
                  className="timeline-node"
                  aria-hidden="true"
                >
                  <span />
                </div>
              </div>

              <div className="timeline-event">
                <div className="timeline-art-wrapper">
                  <div className="timeline-art-frame">
                    <div
                      className="timeline-art-shine"
                      aria-hidden="true"
                    />

                    <img
                      src={event.image}
                      alt={`${event.title} invitation artwork`}
                      className="timeline-illustration"
                      draggable={false}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                      sizes="(max-width: 700px) 88vw, 430px"
                    />

                    <div
                      className="timeline-art-overlay"
                      aria-hidden="true"
                    />

                    <div
                      className="timeline-art-number"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div
                      className="timeline-art-label"
                      aria-hidden="true"
                    >
                      MOMENT {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                </div>

                <div className="timeline-event-content">
                  <p className="timeline-time">
                    {event.time}
                  </p>

                  <p className="timeline-eyebrow">
                    {event.eyebrow}
                  </p>

                  <h3>{event.title}</h3>

                  {event.subtitle && (
                    <p className="timeline-subtitle">
                      {event.subtitle}
                    </p>
                  )}

                  <div
                    className="gold-small-line"
                    aria-hidden="true"
                  />

                  <p className="timeline-location">
                    {event.location}
                  </p>

                  <div
                    className="timeline-content-mark"
                    aria-hidden="true"
                  >
                    <span />
                    <i>❦</i>
                    <span />
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div
        className="timeline-ending"
        aria-hidden="true"
      >
        <span>✦</span>
      </div>

      <p className="timeline-closing">
        WE LOOK FORWARD TO CELEBRATING WITH YOU
      </p>
    </section>
  );
}
