"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MAX_OPENING_MS = 4670;
const HERO_FADE_MS = 850;

export default function OpeningScreen() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const finishTimerRef = useRef<number | null>(null);
  const finishFadeTimerRef = useRef<number | null>(null);

  const finishStartedRef = useRef(false);
  const firstFrameReadyRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  /*
   * ---------------------------------------------------------
   * CREATE WEDDING AUDIO
   * ---------------------------------------------------------
   *
   * Audio file:
   * public/images/audio.mp3
   *
   * It will loop continuously after the opening starts.
   */
  useEffect(() => {
    const audio = new Audio("/images/audio.mp3");

    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.7;

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * LOCK PAGE SCROLL WHILE OPENING IS ACTIVE
   * ---------------------------------------------------------
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

      if (finishFadeTimerRef.current !== null) {
        window.clearTimeout(finishFadeTimerRef.current);
        finishFadeTimerRef.current = null;
      }
    };
  }, [isFinished]);

  /*
   * ---------------------------------------------------------
   * PREPARE VIDEO FIRST FRAME
   * ---------------------------------------------------------
   *
   * The video is loaded so Safari/iPhone can display frame 0.
   * It remains paused until the user taps.
   */
  const prepareFirstFrame = useCallback(() => {
    const video = videoRef.current;

    if (!video || firstFrameReadyRef.current) {
      return;
    }

    firstFrameReadyRef.current = true;

    try {
      video.pause();
      video.currentTime = 0;
    } catch {
      // Ignore Safari timing restrictions.
    }
  }, []);

  /*
   * ---------------------------------------------------------
   * STOP AUDIO
   * ---------------------------------------------------------
   */
  const stopAudio = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    try {
      audio.pause();
      audio.currentTime = 0;
    } catch {
      // Ignore audio cleanup errors.
    }
  }, []);

  /*
   * ---------------------------------------------------------
   * FINISH OPENING
   * ---------------------------------------------------------
   */
  const finishOpening = useCallback(() => {
    if (finishStartedRef.current) {
      return;
    }

    finishStartedRef.current = true;

    /*
     * Clear maximum-duration timer.
     */
    if (finishTimerRef.current !== null) {
      window.clearTimeout(finishTimerRef.current);
      finishTimerRef.current = null;
    }

    /*
     * Stop opening video.
     */
    const video = videoRef.current;

    if (video) {
      try {
        video.pause();
      } catch {
        // Ignore.
      }
    }

    /*
     * IMPORTANT:
     *
     * We do NOT stop the audio here.
     *
     * The audio continues playing after the opening
     * and loops throughout the invitation.
     */

    setIsClosing(true);

    /*
     * Fade the opening overlay away.
     */
    finishFadeTimerRef.current = window.setTimeout(() => {
      document.body.style.overflow = "";

      setIsFinished(true);

      finishFadeTimerRef.current = null;
    }, HERO_FADE_MS);
  }, []);

  /*
   * ---------------------------------------------------------
   * START OPENING
   * ---------------------------------------------------------
   *
   * This function is called directly from the user's tap.
   *
   * This is important for iPhone/Safari because audio playback
   * generally needs to be initiated by a user interaction.
   */
  const startOpening = useCallback(async () => {
    if (isPlaying || isClosing || isFinished) {
      return;
    }

    const video = videoRef.current;
    const audio = audioRef.current;

    if (!video) {
      return;
    }

    try {
      finishStartedRef.current = false;

      /*
       * Reset video to exact beginning.
       */
      video.currentTime = 0;

      /*
       * Reset audio to exact beginning.
       *
       * This makes the audio start at the same moment
       * as the video.
       */
      if (audio) {
        audio.currentTime = 0;
      }

      setIsPlaying(true);

      /*
       * Start both from the SAME user interaction.
       *
       * Do not move these calls into useEffect.
       */
      const videoPromise = video.play();

      let audioPromise: Promise<void> | undefined;

      if (audio) {
        audioPromise = audio.play();
      }

      /*
       * Wait for playback requests.
       *
       * If audio/video is already playing successfully,
       * continue normally.
       */
      await Promise.all([
        videoPromise,
        audioPromise ?? Promise.resolve(),
      ]);

      /*
       * Hard maximum duration.
       */
      finishTimerRef.current = window.setTimeout(() => {
        finishOpening();
      }, MAX_OPENING_MS);
    } catch (error) {
      console.warn("Unable to start wedding opening:", error);

      /*
       * If playback failed, reset the opening state
       * so the user can tap again.
       */
      if (finishTimerRef.current !== null) {
        window.clearTimeout(finishTimerRef.current);
        finishTimerRef.current = null;
      }

      /*
       * If audio started but video failed, stop the audio
       * so they remain synchronized for the next attempt.
       */
      if (audio) {
        try {
          audio.pause();
          audio.currentTime = 0;
        } catch {
          // Ignore.
        }
      }

      setIsPlaying(false);
    }
  }, [finishOpening, isClosing, isFinished, isPlaying]);

  /*
   * ---------------------------------------------------------
   * PREPARE VIDEO
   * ---------------------------------------------------------
   */
  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const handleLoaded = () => {
      prepareFirstFrame();
    };

    video.addEventListener("loadedmetadata", handleLoaded);
    video.addEventListener("loadeddata", handleLoaded);
    video.addEventListener("canplay", handleLoaded);

    /*
     * Explicitly request video loading.
     */
    video.load();

    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
      video.removeEventListener("loadeddata", handleLoaded);
      video.removeEventListener("canplay", handleLoaded);
    };
  }, [prepareFirstFrame]);

  /*
   * ---------------------------------------------------------
   * UNMOUNT COMPLETELY AFTER OPENING
   * ---------------------------------------------------------
   *
   * This is important because an invisible full-screen
   * element can otherwise remain above the Hero and intercept
   * touches on iPhone.
   */
  if (isFinished) {
    return null;
  }

  /*
   * ---------------------------------------------------------
   * RENDER
   * ---------------------------------------------------------
   */
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