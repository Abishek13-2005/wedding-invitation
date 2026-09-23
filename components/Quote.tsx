export default function Quote() {
  return (
    <section className="quote-section">
      <img
        className="quote-flower quote-flower-beige quote-flower-top"
        src="/images/flower.png"
        alt=""
        aria-hidden="true"
      />

      <img
        className="quote-flower quote-flower-blue quote-flower-top-right"
        src="/images/blue.png"
        alt=""
        aria-hidden="true"
      />

      <img
        className="quote-flower quote-flower-beige quote-flower-bottom"
        src="/images/flower.png"
        alt=""
        aria-hidden="true"
      />

      <img
        className="quote-flower quote-flower-blue quote-flower-bottom-right"
        src="/images/blue.png"
        alt=""
        aria-hidden="true"
      />

      <div className="quote-orbit quote-orbit-left" aria-hidden="true" />
      <div className="quote-orbit quote-orbit-right" aria-hidden="true" />

      <div className="quote-inner">
        <div className="quote-top-ornament" aria-hidden="true">
          <span />
          <b>✦</b>
          <span />
        </div>

        <p className="quote-label">A WORD FOR YOUR JOURNEY</p>

        <p className="quote-kicker">
          TWO HEARTS · ONE COVENANT
        </p>

        <div className="quote-card">
          <div className="quote-card-corner quote-card-corner-tl" />
          <div className="quote-card-corner quote-card-corner-tr" />
          <div className="quote-card-corner quote-card-corner-bl" />
          <div className="quote-card-corner quote-card-corner-br" />

          <div className="quote-card-inner">
            <span className="quote-mark quote-mark-open">“</span>

            <blockquote>
              A cord of three strands is not
              <span>quickly broken.</span>
            </blockquote>

            <span className="quote-mark quote-mark-close">”</span>

            <div className="quote-divider" aria-hidden="true">
              <span />
              <b>❦</b>
              <span />
            </div>

            <p className="quote-reference">
              Ecclesiastes 4:12
            </p>

            <p className="quote-note">
              A beautiful reminder of love,
              unity and a life woven together.
            </p>
          </div>
        </div>

        <div className="quote-bottom-ornament" aria-hidden="true">
          <span />
          <b>✦</b>
          <span />
        </div>
      </div>
    </section>
  );
}
