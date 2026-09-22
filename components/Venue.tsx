import ChurchIllustration from "./ChurchIllustration";

export default function Venue() {
  return (
    <section className="venue-section">
      <p className="section-label">
        WHERE TO FIND US
      </p>

      <h2>
        The Venue
      </h2>

      <div className="venue-card">
        <div className="venue-image">
          <ChurchIllustration type="church" />
        </div>

        <div className="venue-details">
          <p className="venue-date">
            FRIDAY · 04 DECEMBER 2026
          </p>

          <h3>
            Holy Immanuel Church
          </h3>

          <p>
            Pattakkarai
            <br />
            Tamil Nadu
          </p>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Holy+Immanuel+Church+Pattakkarai"
            target="_blank"
            rel="noopener noreferrer"
            className="outline-button"
          >
            VIEW LOCATION
          </a>
        </div>
      </div>
    </section>
  );
}