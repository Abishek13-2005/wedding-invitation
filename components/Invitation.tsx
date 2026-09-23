export default function Invitation() {
  return (
    <section className="invitation-section">
      {/* Decorative florals */}
      <img
        className="invitation-flower invitation-flower-beige-top"
        src="/images/flower.png"
        alt=""
        aria-hidden="true"
      />

      <img
        className="invitation-flower invitation-flower-blue-top"
        src="/images/blue.png"
        alt=""
        aria-hidden="true"
      />

      <img
        className="invitation-flower invitation-flower-beige-bottom"
        src="/images/flower.png"
        alt=""
        aria-hidden="true"
      />

      <img
        className="invitation-flower invitation-flower-blue-bottom"
        src="/images/blue.png"
        alt=""
        aria-hidden="true"
      />

      <div className="invitation-soft-glow invitation-soft-glow-one" />
      <div className="invitation-soft-glow invitation-soft-glow-two" />

      <div className="invitation-inner">
        <div className="invitation-top-ornament" aria-hidden="true">
          <span />
          <i>✦</i>
          <span />
        </div>

        <p className="invitation-intro">
          YOU ARE INVITED TO THE
        </p>

        <h2 className="invitation-title">
          Wedding
          <span>Celebration</span>
          <em>of</em>
        </h2>

        <div className="invitation-couple">
          <div className="person person-left">
            <p className="person-kicker">THE BRIDE</p>

            <p className="person-name">
              Akila Giris
              <span>Kezia</span>
            </p>

            <div className="person-rule" />

            <p className="person-label">
              DAUGHTER OF
            </p>

            <p className="parents">
              COL. YESUDIAN SUGUMAR P
              <br />
              <span>&amp; MRS. JEBALEELA SUGUMAR</span>
            </p>
          </div>

          <div className="invitation-center-mark">
            <span className="center-line" />
            <span className="center-heart">♥</span>
            <span className="center-line" />
            <div className="with">With</div>
          </div>

          <div className="person person-right">
            <p className="person-kicker">THE GROOM</p>

            <p className="person-name">
              Bennat
              <span>Charles</span>
            </p>

            <div className="person-rule" />

            <p className="person-label">
              SON OF
            </p>

            <p className="parents">
              MR. MAL JOSHUA R
              <br />
              <span>&amp; MRS. PREMILA J</span>
            </p>
          </div>
        </div>

        <div className="invitation-message">
          <div className="message-ornament" aria-hidden="true">
            <span />
            <b>❦</b>
            <span />
          </div>

          <p className="message-heading">
            Dear Friends &amp; Family
          </p>

          <p className="message-copy">
            Join us as we gather in love and gratitude
            to witness two hearts become one,
            surrounded by family, friends and God&apos;s
            blessings as Akila and Bennat begin their
            forever.
          </p>

          <div className="message-signature">
            <span />
            <p>AKILA &amp; BENNAT</p>
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}
