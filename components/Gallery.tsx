"use client";

import { useState } from "react";

const images = [
  "/images/couple-1.jpg",
  "/images/couple-2.jpg",
  "/images/couple-3.jpg",
  "/images/gallery-1.jpg",
  "/images/gallery-2.jpg",
  "/images/gallery-3.jpg",
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

  return (
    <section className="gallery-section">
      <p className="section-label">
        MEMORIES
      </p>

      <h2>
        Moments to Remember
      </h2>

      <div className="gallery">
        {images.map((image, index) => (
          <button
            key={image}
            className={`gallery-image gallery-${index + 1}`}
            onClick={() =>
              setSelectedImage(image)
            }
            aria-label={`Open wedding photo ${index + 1}`}
          >
            <img
              src={image}
              alt={`Wedding memory ${index + 1}`}
            />
          </button>
        ))}
      </div>

      {selectedImage && (
        <div
          className="lightbox"
          onClick={() =>
            setSelectedImage(null)
          }
        >
          <img
            src={selectedImage}
            alt="Wedding memory"
          />

          <button
            className="close-lightbox"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedImage(null);
            }}
            aria-label="Close image"
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}