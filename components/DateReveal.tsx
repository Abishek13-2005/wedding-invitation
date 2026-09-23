"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type ScratchRevealProps = {
  label: string;
  children: ReactNode;
  onRevealed?: () => void;
};

type Point = {
  x: number;
  y: number;
};

/* =========================================================
   SCRATCH REVEAL
   ========================================================= */

function ScratchReveal({
  label,
  children,
  onRevealed,
}: ScratchRevealProps) {
  const surfaceRef = useRef<HTMLDivElement>(null);

  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  const heartImageRef =
    useRef<HTMLImageElement | null>(null);

  const cleanupRef =
    useRef<(() => void) | null>(null);

  const originalMaskRef =
    useRef<Uint8Array | null>(null);

  const originalPixelsRef =
    useRef(0);

  const [revealed, setRevealed] =
    useState(false);

  const revealedRef =
    useRef(false);

  const drawingRef =
    useRef(false);

  const pointerIdRef =
    useRef<number | null>(null);

  const lastPointRef =
    useRef<Point | null>(null);

  const revealTimerRef =
    useRef<number | null>(null);

  /* =========================================================
     LOAD HEART IMAGE
     ========================================================= */

  const loadHeart = useCallback(() => {
    return new Promise<HTMLImageElement>(
      (resolve, reject) => {
        if (heartImageRef.current) {
          resolve(heartImageRef.current);
          return;
        }

        const image = new Image();

        image.decoding = "async";

        image.src = "/images/heart.png";

        image.onload = () => {
          heartImageRef.current = image;
          resolve(image);
        };

        image.onerror = () => {
          reject(
            new Error(
              "Failed to load /images/heart.png",
            ),
          );
        };
      },
    );
  }, []);

  /* =========================================================
     DRAW HEART
     ========================================================= */

  const drawHeart = useCallback(async () => {
    const canvas =
      canvasRef.current;

    const surface =
      surfaceRef.current;

    if (
      !canvas ||
      !surface ||
      revealedRef.current
    ) {
      return;
    }

    const image =
      await loadHeart();

    if (
      !canvas ||
      !surface ||
      revealedRef.current
    ) {
      return;
    }

    const rect =
      surface.getBoundingClientRect();

    const width =
      Math.max(
        1,
        Math.round(rect.width),
      );

    const height =
      Math.max(
        1,
        Math.round(rect.height),
      );

    /*
     * Keep DPR controlled for iPhone.
     */
    const dpr =
      Math.min(
        window.devicePixelRatio || 1,
        2,
      );

    canvas.width =
      Math.round(width * dpr);

    canvas.height =
      Math.round(height * dpr);

    canvas.style.width =
      `${width}px`;

    canvas.style.height =
      `${height}px`;

    const ctx =
      canvas.getContext(
        "2d",
        {
          willReadFrequently: true,
        },
      );

    if (!ctx) {
      return;
    }

    ctx.setTransform(
      dpr,
      0,
      0,
      dpr,
      0,
      0,
    );

    ctx.clearRect(
      0,
      0,
      width,
      height,
    );

    /* =====================================================
       HEART SIZE

       The heart stays clearly visible without
       filling the entire area.
       ===================================================== */

    const maxHeartWidth =
      width * 0.86;

    const maxHeartHeight =
      height * 0.88;

    const imageRatio =
      image.width /
      image.height;

    let heartWidth =
      maxHeartWidth;

    let heartHeight =
      heartWidth /
      imageRatio;

    if (
      heartHeight >
      maxHeartHeight
    ) {
      heartHeight =
        maxHeartHeight;

      heartWidth =
        heartHeight *
        imageRatio;
    }

    const heartX =
      (width -
        heartWidth) /
      2;

    const heartY =
      Math.max(
        0,
        (height -
          heartHeight) /
          2 -
          2,
      );

    /*
     * Store geometry.
     */
    canvas.dataset.heartX =
      String(heartX);

    canvas.dataset.heartY =
      String(heartY);

    canvas.dataset.heartWidth =
      String(heartWidth);

    canvas.dataset.heartHeight =
      String(heartHeight);

    /* =====================================================
       DRAW HEART PNG
       ===================================================== */

    ctx.drawImage(
      image,
      heartX,
      heartY,
      heartWidth,
      heartHeight,
    );

    /* =====================================================
       BUILD HEART ALPHA MASK
       ===================================================== */

    const imageData =
      ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height,
      );

    const data =
      imageData.data;

    const mask =
      new Uint8Array(
        canvas.width *
          canvas.height,
      );

    let visiblePixels = 0;

    for (
      let i = 0, p = 0;
      i < data.length;
      i += 4, p++
    ) {
      /*
       * Only count actual visible
       * heart pixels.
       */
      if (
        data[i + 3] >
        35
      ) {
        mask[p] = 1;
        visiblePixels++;
      }
    }

    originalMaskRef.current =
      mask;

    originalPixelsRef.current =
      visiblePixels;
  }, [loadHeart]);

  /* =========================================================
     GET EXACT CANVAS POINT
     IMPORTANT:
     Pointer coordinates stay in CSS pixels.
     The canvas context handles devicePixelRatio internally.
     This prevents Retina/iPhone offset errors.
     ========================================================= */

  const getCanvasPoint =
    useCallback(
      (
        clientX: number,
        clientY: number,
      ): Point | null => {
        const canvas =
          canvasRef.current;

        if (!canvas) {
          return null;
        }

        const rect =
          canvas.getBoundingClientRect();

        if (
          rect.width <= 0 ||
          rect.height <= 0
        ) {
          return null;
        }

        return {
          x: clientX - rect.left,
          y: clientY - rect.top,
        };
      },
      [],
    );

  /* =========================================================
     SCRATCH
     IMPORTANT:
     Drawing coordinates are CSS pixels.
     The 2D context is scaled by DPR.
     ========================================================= */

  const scratch =
    useCallback(
      (point: Point) => {
        const canvas =
          canvasRef.current;

        if (
          !canvas ||
          !drawingRef.current ||
          revealedRef.current
        ) {
          return;
        }

        const ctx =
          canvas.getContext(
            "2d",
            {
              willReadFrequently: true,
            },
          );

        if (!ctx) {
          return;
        }

        const rect =
          canvas.getBoundingClientRect();

        if (
          rect.width <= 0 ||
          rect.height <= 0
        ) {
          return;
        }

        const dpr =
          Math.min(
            window.devicePixelRatio || 1,
            2,
          );

        /*
         * Keep the drawing coordinate system
         * in CSS pixels.
         */
        ctx.setTransform(
          dpr,
          0,
          0,
          dpr,
          0,
          0,
        );

        /*
         * Brush size is based on the visible
         * CSS size, not the Retina backing size.
         */
        const brush =
          Math.max(
            18,
            Math.min(
              30,
              rect.width * 0.075,
            ),
          );

        ctx.save();

        ctx.globalCompositeOperation =
          "destination-out";

        ctx.lineCap =
          "round";

        ctx.lineJoin =
          "round";

        ctx.lineWidth =
          brush;

        const previous =
          lastPointRef.current;

        /*
         * Continuous scratch line.
         */
        if (previous) {
          ctx.beginPath();

          ctx.moveTo(
            previous.x,
            previous.y,
          );

          ctx.lineTo(
            point.x,
            point.y,
          );

          ctx.stroke();
        }

        /*
         * Always erase directly underneath
         * the current finger/cursor position.
         */
        ctx.beginPath();

        ctx.arc(
          point.x,
          point.y,
          brush / 2,
          0,
          Math.PI * 2,
        );

        ctx.fill();

        ctx.restore();

        lastPointRef.current =
          point;
      },
      [],
    );

  /* =========================================================
     CHECK REVEAL
     ========================================================= */

  const checkReveal =
    useCallback(() => {
      const canvas =
        canvasRef.current;

      const mask =
        originalMaskRef.current;

      const originalCount =
        originalPixelsRef.current;

      if (
        !canvas ||
        !mask ||
        originalCount <= 0 ||
        revealedRef.current
      ) {
        return;
      }

      const ctx =
        canvas.getContext(
          "2d",
          {
            willReadFrequently: true,
          },
        );

      if (!ctx) {
        return;
      }

      const imageData =
        ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height,
        );

      const data =
        imageData.data;

      let remaining = 0;

      /*
       * Count only pixels that
       * originally belonged to the heart.
       */
      for (
        let i = 0, p = 0;
        i < data.length;
        i += 4, p++
      ) {
        if (
          mask[p] &&
          data[i + 3] >
            35
        ) {
          remaining++;
        }
      }

      const erased =
        1 -
        remaining /
          originalCount;

      /*
       * Reveal after 45%.
       */
      if (
        erased >= 0.45
      ) {
        revealedRef.current =
          true;

        drawingRef.current =
          false;

        pointerIdRef.current =
          null;

        lastPointRef.current =
          null;

        canvas.style.pointerEvents =
          "none";

        canvas.style.opacity =
          "0";

        revealTimerRef.current =
          window.setTimeout(() => {
            setRevealed(true);
            onRevealed?.();
          }, 350);
      }
    }, [onRevealed]);

  /* =========================================================
     POINTER EVENTS
     ========================================================= */

  useEffect(() => {
    let cancelled = false;

    const setup =
      async () => {
        try {
          await drawHeart();
        } catch (error) {
          console.error(error);
          return;
        }

        if (cancelled) {
          return;
        }

        const canvas =
          canvasRef.current;

        if (!canvas) {
          return;
        }

        /* ===================================================
           POINTER DOWN
           =================================================== */

        const handlePointerDown =
          (event: PointerEvent) => {
            if (
              revealedRef.current
            ) {
              return;
            }

            event.preventDefault();
            event.stopPropagation();

            pointerIdRef.current =
              event.pointerId;

            drawingRef.current =
              true;

            lastPointRef.current =
              null;

            try {
              canvas.setPointerCapture(
                event.pointerId,
              );
            } catch {
              // Safari fallback.
            }

            const point =
              getCanvasPoint(
                event.clientX,
                event.clientY,
              );

            if (point) {
              scratch(point);
            }
          };

        /* ===================================================
           POINTER MOVE
           =================================================== */

        const handlePointerMove =
          (event: PointerEvent) => {
            if (
              !drawingRef.current ||
              revealedRef.current ||
              pointerIdRef.current !==
                event.pointerId
            ) {
              return;
            }

            event.preventDefault();
            event.stopPropagation();

            const point =
              getCanvasPoint(
                event.clientX,
                event.clientY,
              );

            if (point) {
              scratch(point);
            }
          };

        /* ===================================================
           POINTER END
           =================================================== */

        const handlePointerEnd =
          (event: PointerEvent) => {
            if (
              pointerIdRef.current !==
              event.pointerId
            ) {
              return;
            }

            event.preventDefault();
            event.stopPropagation();

            drawingRef.current =
              false;

            pointerIdRef.current =
              null;

            lastPointRef.current =
              null;

            try {
              if (
                canvas.hasPointerCapture?.(
                  event.pointerId,
                )
              ) {
                canvas.releasePointerCapture(
                  event.pointerId,
                );
              }
            } catch {
              // Safari fallback.
            }

            checkReveal();
          };

        canvas.addEventListener(
          "pointerdown",
          handlePointerDown,
          {
            passive: false,
          },
        );

        canvas.addEventListener(
          "pointermove",
          handlePointerMove,
          {
            passive: false,
          },
        );

        canvas.addEventListener(
          "pointerup",
          handlePointerEnd,
          {
            passive: false,
          },
        );

        canvas.addEventListener(
          "pointercancel",
          handlePointerEnd,
          {
            passive: false,
          },
        );

        /* ===================================================
           RESIZE
           =================================================== */

        const observer =
          new ResizeObserver(() => {
            if (
              !revealedRef.current &&
              !drawingRef.current
            ) {
              void drawHeart();
            }
          });

        observer.observe(
          canvas.parentElement ||
            canvas,
        );

        cleanupRef.current =
          () => {
            canvas.removeEventListener(
              "pointerdown",
              handlePointerDown,
            );

            canvas.removeEventListener(
              "pointermove",
              handlePointerMove,
            );

            canvas.removeEventListener(
              "pointerup",
              handlePointerEnd,
            );

            canvas.removeEventListener(
              "pointercancel",
              handlePointerEnd,
            );

            observer.disconnect();
          };
      };

    void setup();

    return () => {
      cancelled = true;

      cleanupRef.current?.();

      cleanupRef.current =
        null;

      if (
        revealTimerRef.current !==
        null
      ) {
        window.clearTimeout(
          revealTimerRef.current,
        );
      }
    };
  }, [
    checkReveal,
    drawHeart,
    getCanvasPoint,
    scratch,
  ]);

  /* =========================================================
     JSX
     ========================================================= */

  return (
    <div
      className={`date-reveal-item ${
        revealed
          ? "is-revealed"
          : ""
      }`}
    >
      {/* =================================================
          TITLE ABOVE HEART
          ================================================= */}

      <div className="date-reveal-title">
        {label.toUpperCase()}
      </div>

      {/* =================================================
          HEART ONLY
          ================================================= */}

      <div
        ref={surfaceRef}
        className="date-heart-surface"
      >
        {/* Revealed value */}

        <div className="date-reveal-content">
          {children}
        </div>

        {/* Scratch heart */}

        {!revealed && (
          <canvas
            ref={canvasRef}
            className="date-scratch-canvas"
            aria-label={`Scratch to reveal ${label}`}
          />
        )}
      </div>
    </div>
  );
}

/* =========================================================
   MAIN DATE SECTION
   ========================================================= */

export default function DateReveal() {
  const [
    revealedCount,
    setRevealedCount,
  ] = useState(0);

  const handleRevealed =
    useCallback(() => {
      setRevealedCount(
        (current) =>
          Math.min(
            3,
            current + 1,
          ),
      );
    }, []);

  return (
    <section
      className="date-section"
      id="date"
      aria-label="Wedding date"
    >
      {/* =================================================
          BACKGROUND FLOWERS
          ================================================= */}

      <div
        className="date-floral date-floral-one"
        aria-hidden="true"
      >
        <img
          src="/images/flower.png"
          alt=""
        />
      </div>

      <div
        className="date-floral date-floral-two"
        aria-hidden="true"
      >
        <img
          src="/images/blue.png"
          alt=""
        />
      </div>

      <div
        className="date-floral date-floral-three"
        aria-hidden="true"
      >
        <img
          src="/images/flower.png"
          alt=""
        />
      </div>

      <div
        className="date-floral date-floral-four"
        aria-hidden="true"
      >
        <img
          src="/images/blue.png"
          alt=""
        />
      </div>

      {/* =================================================
          SPARKLES
          ================================================= */}

      <div
        className="date-section-sparkle date-section-sparkle-one"
        aria-hidden="true"
      >
        ✦
      </div>

      <div
        className="date-section-sparkle date-section-sparkle-two"
        aria-hidden="true"
      >
        ✦
      </div>

      {/* =================================================
          HEADING
          ================================================= */}

      <div className="date-section-heading-wrap">
        <p className="section-label">
          THE DATE
        </p>

        <span
          className="date-section-small-line"
          aria-hidden="true"
        >
          ✦
        </span>

        <h2>
          Our Special Day
        </h2>

        <p className="date-section-intro">
          Three little reveals.
          <br />
          One beautiful moment.
        </p>
      </div>

      {/* =================================================
          THREE HEARTS
          ================================================= */}

      <div className="date-reveal-grid">

        {/* DATE */}

        <ScratchReveal
          label="Date"
          onRevealed={
            handleRevealed
          }
        >
          <span className="date-reveal-label">
            FRIDAY
          </span>

          <span className="date-reveal-number">
            04
          </span>


          <div className="date-reveal-ornament">
            <span />
            <i>✦</i>
            <span />
          </div>
        </ScratchReveal>

        {/* MONTH */}

        <ScratchReveal
          label="Month"
          onRevealed={
            handleRevealed
          }
        >

          <span className="date-reveal-month">
            DECEMBER
          </span>

          <span className="date-reveal-word">
            12
          </span>

          <div className="date-reveal-ornament">
            <span />
            <i>✦</i>
            <span />
          </div>
        </ScratchReveal>

        {/* YEAR */}

        <ScratchReveal
          label="Year"
          onRevealed={
            handleRevealed
          }
        >

          <span className="date-reveal-year">
            2026
          </span>

          <span className="date-reveal-word">
            FOREVER
          </span>

          <div className="date-reveal-ornament">
            <span />
            <i>✦</i>
            <span />
          </div>
        </ScratchReveal>

      </div>

      {/* =================================================
          BOTTOM CAPTION
          ================================================= */}

      <p
        className={`date-reveal-caption ${
          revealedCount === 3
            ? "all-revealed"
            : ""
        }`}
      >
        {revealedCount === 3
          ? "THE DAY WE BEGIN FOREVER"
          : "✦  SCRATCH EACH HEART TO REVEAL  ✦"}
      </p>
    </section>
  );
}