"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MAX_OPENING_MS = 4350;
const HERO_FADE_MS = 850;

export default function OpeningScreen() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const finishTimerRef = useRef<number | null>(null);
  const finishStartedRef = useRef(false);
  const firstFrameReadyRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  /*
   * Keep the real page underneath from scrolling while the video
   * opening is active.
   */
  useEffect(() => {
    if (!isFinished) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";

      if (finishTimerRef.current !== null) {
        window.clearTimeout(finishTimerRef.current);
        finishTimerRef.current = null;
      }
    };
  }, [isFinished]);

  /*
   * Force iPhone/Safari to decode and display frame 0 while paused.
   *
   * Muted autoplay is allowed by mobile browsers in normal cases.
   * We immediately pause it and reset to frame 0, so the user sees
   * the actual first frame of open.mp4 without the video starting
   * before the tap.
   */
  const prepareFirstFrame = useCallback(() => {
    const video = videoRef.current;
    if (!video || firstFrameReadyRef.current) return;

    firstFrameReadyRef.current = true;

    try {
      video.pause();
      video.currentTime = 0;
    } catch {
      // Ignore browsers that do not allow currentTime until metadata.
    }
  }, []);

  const finishOpening = useCallback(() => {
    if (finishStartedRef.current) return;

    finishStartedRef.current = true;

    if (finishTimerRef.current !== null) {
      window.clearTimeout(finishTimerRef.current);
      finishTimerRef.current = null;
    }

    const video = videoRef.current;

    if (video) {
      video.pause();
    }

    /*
     * The Hero is already rendered underneath.
     * We only fade this overlay away.
     */
    setIsClosing(true);

    window.setTimeout(() => {
      document.body.style.overflow = "";
      setIsFinished(true);
    }, HERO_FADE_MS);
  }, []);

  const startOpening = useCallback(async () => {
    if (isPlaying || isClosing || isFinished) return;

    const video = videoRef.current;
    if (!video) return;

    try {
      finishStartedRef.current = false;

      video.currentTime = 0;

      setIsPlaying(true);

      /*
       * Hard 4-second maximum.
       */
      finishTimerRef.current = window.setTimeout(() => {
        finishOpening();
      }, MAX_OPENING_MS);

      await video.play();
    } catch {
      /*
       * If Safari refuses playback, keep the first frame visible
       * and allow the next tap to try again.
       */
      if (finishTimerRef.current !== null) {
        window.clearTimeout(finishTimerRef.current);
        finishTimerRef.current = null;
      }

      setIsPlaying(false);
    }
  }, [finishOpening, isClosing, isFinished, isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    /*
     * Once metadata/data is loaded, show frame 0 and keep it paused.
     */
    const handleLoaded = () => {
      prepareFirstFrame();
    };

    video.addEventListener("loadedmetadata", handleLoaded);
    video.addEventListener("loadeddata", handleLoaded);
    video.addEventListener("canplay", handleLoaded);

    /*
     * Explicitly request loading.
     */
    video.load();

    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
      video.removeEventListener("loadeddata", handleLoaded);
      video.removeEventListener("canplay", handleLoaded);
    };
  }, [prepareFirstFrame]);

  if (isFinished) {
    return null;
  }

  return (
    <div
      className={`video-hero-opening${isPlaying ? " is-playing" : ""}${
        isClosing ? " is-closing" : ""
      }`}
      onClick={() => {
        void startOpening();
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          void startOpening();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Open wedding invitation"
    >
      <video
        ref={videoRef}
        className="video-hero-opening__video"
        src="/images/open.mp4"
        muted
        playsInline
        preload="auto"
        autoPlay
        disablePictureInPicture
        controls={false}
        onLoadedMetadata={prepareFirstFrame}
        onLoadedData={prepareFirstFrame}
        onCanPlay={prepareFirstFrame}
        onEnded={finishOpening}
      />
    </div>
  );
}
