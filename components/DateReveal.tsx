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

function ScratchReveal({
  label,
  children,
  onRevealed,
}: ScratchRevealProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [revealed, setRevealed] = useState(false);

  const revealedRef = useRef(false);
  const drawingRef = useRef(false);
  const activePointerIdRef = useRef<number | null>(null);
  const lastPointRef = useRef<Point | null>(null);
  const revealTimerRef = useRef<number | null>(null);
  const suppressClickUntilRef = useRef(0);

  const drawCover = useCallback(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;

    if (!box || !canvas || revealedRef.current) return;

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!ctx) return;

    const rect = box.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = "source-over";

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#fffdf8");
    gradient.addColorStop(0.42, "#f5eee2");
    gradient.addColorStop(0.72, "#eaf4f7");
    gradient.addColorStop(1, "#dcecf3");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgba(145,116,66,0.035)";
    for (let y = 0; y < height; y += 8) {
      for (let x = 0; x < width; x += 8) {
        ctx.fillRect(x, y, 1, 1);
      }
    }

    ctx.strokeStyle = "rgba(196,167,106,0.72)";
    ctx.lineWidth = 1;
    ctx.strokeRect(9, 9, Math.max(1, width - 18), Math.max(1, height - 18));

    // Inner luxury frame.
    ctx.strokeStyle = "rgba(255,255,255,0.62)";
    ctx.lineWidth = 1;
    ctx.strokeRect(14, 14, Math.max(1, width - 28), Math.max(1, height - 28));

    const radius = Math.min(width, height) * 0.27;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(196,167,106,0.82)";
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = "#c4a76a";
    ctx.font = '15px "Cormorant Garamond", serif';
    ctx.fillText("✦", width / 2, height / 2 - 20);

    ctx.fillStyle = "#687e87";
    ctx.font = '500 7px Montserrat, sans-serif';
    ctx.fillText("SCRATCH TO REVEAL", width / 2, height / 2 + 4);

    ctx.fillStyle = "#ad9362";
    ctx.font = '500 5px Montserrat, sans-serif';
    ctx.fillText(label.toUpperCase(), width / 2, height / 2 + 22);
  }, [label]);

  const reveal = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealedRef.current) return;

    revealedRef.current = true;
    drawingRef.current = false;
    activePointerIdRef.current = null;
    lastPointRef.current = null;

    canvas.style.pointerEvents = "none";
    canvas.style.opacity = "0";

    if (revealTimerRef.current !== null) {
      window.clearTimeout(revealTimerRef.current);
    }

    revealTimerRef.current = window.setTimeout(() => {
      setRevealed(true);
      onRevealed?.();
    }, 420);
  }, [onRevealed]);

  const checkReveal = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealedRef.current || canvas.width === 0 || canvas.height === 0) {
      return;
    }

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let transparent = 0;
    let sampled = 0;

    // Every 16th pixel keeps this light enough for iPhone Safari.
    for (let pixel = 0; pixel < data.length; pixel += 64) {
      sampled += 1;
      if (data[pixel + 3] < 45) {
        transparent += 1;
      }
    }

    const percentage = sampled > 0 ? transparent / sampled : 0;

    if (percentage >= 0.30) {
      reveal();
    }
  }, [reveal]);

  const getPointFromClient = (clientX: number, clientY: number): Point | null => {
    const canvas = canvasRef.current;
    const box = boxRef.current;

    if (!canvas || !box) return null;

    const rect = box.getBoundingClientRect();

    if (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      return null;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const scratchAt = useCallback((point: Point) => {
    const canvas = canvasRef.current;
    if (!canvas || revealedRef.current || !drawingRef.current) return;

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 40;

    const previous = lastPointRef.current;

    if (previous) {
      ctx.beginPath();
      ctx.moveTo(previous.x, previous.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(point.x, point.y, 20, 0, Math.PI * 2);
    ctx.fill();

    lastPointRef.current = point;
  }, []);

  useEffect(() => {
    drawCover();

    const box = boxRef.current;
    if (!box) return;

    const isInsideBox = (clientX: number, clientY: number) => {
      const rect = box.getBoundingClientRect();
      return (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      );
    };

    const pointerDown = (event: PointerEvent) => {
      if (revealedRef.current) return;
      if (!isInsideBox(event.clientX, event.clientY)) return;

      event.preventDefault();
      event.stopPropagation();

      // Never allow the click generated by iOS Safari after a touch
      // to become a navigation / page refresh.
      suppressClickUntilRef.current = Date.now() + 1500;

      activePointerIdRef.current = event.pointerId;
      drawingRef.current = true;
      lastPointRef.current = null;

      const point = getPointFromClient(event.clientX, event.clientY);
      if (point) scratchAt(point);
    };

    const pointerMove = (event: PointerEvent) => {
      if (revealedRef.current) return;
      if (!drawingRef.current) return;
      if (activePointerIdRef.current !== event.pointerId) return;

      event.preventDefault();
      event.stopPropagation();

      const point = getPointFromClient(event.clientX, event.clientY);
      if (point) scratchAt(point);
    };

    const pointerEnd = (event: PointerEvent) => {
      if (activePointerIdRef.current !== event.pointerId) return;

      event.preventDefault();
      event.stopPropagation();

      // Keep Safari click suppression alive after the finger is lifted.
      suppressClickUntilRef.current = Math.max(
        suppressClickUntilRef.current,
        Date.now() + 1500,
      );

      drawingRef.current = false;
      activePointerIdRef.current = null;
      lastPointRef.current = null;

      checkReveal();
    };

    const clickCapture = (event: MouseEvent) => {
      const inside = isInsideBox(
        event.clientX,
        event.clientY,
      );

      // A scratch card is NOT a navigation element.
      // Always block clicks inside it, including the synthetic click
      // Safari creates after a finger gesture.
      if (
        inside ||
        Date.now() < suppressClickUntilRef.current
      ) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const auxClickCapture = (event: MouseEvent) => {
      if (
        isInsideBox(
          event.clientX,
          event.clientY,
        )
      ) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const submitCapture = (event: Event) => {
      if (!drawingRef.current) return;

      // A scratch gesture must never submit an ancestor form.
      event.preventDefault();
      event.stopPropagation();
    };

    document.addEventListener("pointerdown", pointerDown, {
      capture: true,
      passive: false,
    });
    document.addEventListener("pointermove", pointerMove, {
      capture: true,
      passive: false,
    });
    document.addEventListener("pointerup", pointerEnd, {
      capture: true,
      passive: false,
    });
    document.addEventListener("pointercancel", pointerEnd, {
      capture: true,
      passive: false,
    });
    document.addEventListener("click", clickCapture, {
      capture: true,
      passive: false,
    });
    document.addEventListener("auxclick", auxClickCapture, {
      capture: true,
      passive: false,
    });
    document.addEventListener("submit", submitCapture, {
      capture: true,
      passive: false,
    });

    const resizeObserver = new ResizeObserver(() => {
      if (!revealedRef.current) drawCover();
    });

    resizeObserver.observe(box);

    return () => {
      document.removeEventListener("pointerdown", pointerDown, true);
      document.removeEventListener("pointermove", pointerMove, true);
      document.removeEventListener("pointerup", pointerEnd, true);
      document.removeEventListener("pointercancel", pointerEnd, true);
      document.removeEventListener("click", clickCapture, true);
      document.removeEventListener("auxclick", auxClickCapture, true);
      document.removeEventListener("submit", submitCapture, true);
      resizeObserver.disconnect();

      if (revealTimerRef.current !== null) {
        window.clearTimeout(revealTimerRef.current);
      }
    };
  }, [checkReveal, drawCover, scratchAt]);

  return (
    <div
      ref={boxRef}
      className={`date-reveal-box${revealed ? " is-revealed" : ""}`}
    >
      <div className="date-reveal-content">
        {children}
      </div>

      {!revealed && (
        <canvas
          ref={canvasRef}
          className="date-scratch-canvas"
          aria-label={`Scratch to reveal ${label}`}
        />
      )}
    </div>
  );
}

export default function DateReveal() {
  const [revealedCount, setRevealedCount] = useState(0);

  const handleRevealed = useCallback(() => {
    setRevealedCount((current) => Math.min(3, current + 1));
  }, []);

  const blockDateSectionClick = (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    // Scratch cards are never navigation controls.
    // Prevent any click inside this section from reaching
    // an anchor, form, or other navigation handler.
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <section
      className="date-section"
      id="date"
      onClickCapture={blockDateSectionClick}
      onAuxClickCapture={blockDateSectionClick}
      onContextMenuCapture={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <p className="section-label">THE DATE</p>

      <h2>
        Our Special Day
      </h2>

      <div className="date-reveal-grid">
        <ScratchReveal label="Date" onRevealed={handleRevealed}>
          <span className="date-reveal-label">FRIDAY</span>
          <span className="date-reveal-number">04</span>
          <span className="date-reveal-word">DATE</span>
          <div className="date-reveal-ornament">
            <span />
            <i>❦</i>
            <span />
          </div>
        </ScratchReveal>

        <ScratchReveal label="Month" onRevealed={handleRevealed}>
          <span className="date-reveal-label">MONTH</span>
          <span className="date-reveal-month">DECEMBER</span>
          <span className="date-reveal-word">MONTH</span>
          <div className="date-reveal-ornament">
            <span />
            <i>❦</i>
            <span />
          </div>
        </ScratchReveal>

        <ScratchReveal label="Year" onRevealed={handleRevealed}>
          <span className="date-reveal-label">YEAR</span>
          <span className="date-reveal-year">2026</span>
          <span className="date-reveal-word">YEAR</span>
          <div className="date-reveal-ornament">
            <span />
            <i>❦</i>
            <span />
          </div>
        </ScratchReveal>
      </div>

      <p className={`date-reveal-caption${revealedCount === 3 ? " all-revealed" : ""}`}>
        {revealedCount === 3
          ? "THE DAY WE BEGIN FOREVER"
          : "SCRATCH EACH CARD TO REVEAL"}
      </p>
    </section>
  );
}
