"use client";

import {
  FormEvent,
  useState,
} from "react";

export default function RSVP() {
  const [attendance, setAttendance] =
    useState<"yes" | "no">("yes");

  const [submitted, setSubmitted] =
    useState(false);

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setSubmitted(true);
  };

  return (
    <section className="rsvp-section">
      <p className="section-label">
        KINDLY RESPOND
      </p>

      <h2>
        Will You Join Us?
      </h2>

      {submitted ? (
        <div className="success-message">
          <div>✦</div>

          <h3>
            Thank You
          </h3>

          <p>
            Your response has been received.
            We look forward to celebrating
            this beautiful day with you.
          </p>
        </div>
      ) : (
        <form
          className="rsvp-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="name">
              YOUR NAME
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>
              WILL YOU ATTEND?
            </label>

            <div className="attendance">
              <button
                type="button"
                className={
                  attendance === "yes"
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  setAttendance("yes")
                }
              >
                JOYFULLY ACCEPT
              </button>

              <button
                type="button"
                className={
                  attendance === "no"
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  setAttendance("no")
                }
              >
                REGRETFULLY DECLINE
              </button>
            </div>
          </div>

          {attendance === "yes" && (
            <>
              <div className="form-group">
                <label htmlFor="guests">
                  NUMBER OF GUESTS
                </label>

                <select
                  id="guests"
                  name="guests"
                  defaultValue="1"
                >
                  <option value="1">
                    1 Guest
                  </option>

                  <option value="2">
                    2 Guests
                  </option>

                  <option value="3">
                    3 Guests
                  </option>

                  <option value="4">
                    4 Guests
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="meal">
                  MEAL PREFERENCE
                </label>

                <select
                  id="meal"
                  name="meal"
                  defaultValue="vegetarian"
                >
                  <option value="vegetarian">
                    Vegetarian
                  </option>

                  <option value="non-vegetarian">
                    Non-Vegetarian
                  </option>
                </select>
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="message">
              MESSAGE
            </label>

            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Leave us a message..."
            />
          </div>

          <button
            type="submit"
            className="submit-button"
          >
            SEND RSVP
          </button>
        </form>
      )}
    </section>
  );
}