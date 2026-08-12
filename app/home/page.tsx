"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  Mouse,
  Music,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Wind,
  X,
} from "lucide-react";

import ImageReveal from "@/components/ui/image-tiles";

// ======================================================
// TYPEWRITER
// ======================================================

interface TextSegment {
  text: string;
  className?: string;
}

const TypewriterText = ({
  segments,
  delay,
  isStarted,
}: {
  segments: TextSegment[];
  delay: number;
  isStarted: boolean;
}) => {
  const [displayedChars, setDisplayedChars] = useState(0);

  const totalChars = segments.reduce(
    (acc, segment) => acc + segment.text.length,
    0
  );

  useEffect(() => {
    if (!isStarted) return;

    setDisplayedChars(0);

    const timeout = setTimeout(() => {
      let currentChars = 0;

      const interval = setInterval(() => {
        currentChars += 2;

        if (currentChars >= totalChars) {
          currentChars = totalChars;
          clearInterval(interval);
        }

        setDisplayedChars(currentChars);
      }, 15);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isStarted, delay, totalChars]);

  let charCount = 0;

  return (
    <>
      {segments.map((segment, index) => {
        const segmentStart = charCount;
        const segmentEnd =
          charCount + segment.text.length;

        charCount += segment.text.length;

        if (displayedChars <= segmentStart) {
          return (
            <span
              key={index}
              className={`${segment.className || ""} invisible`}
            >
              {segment.text}
            </span>
          );
        }

        if (displayedChars < segmentEnd) {
          const visible = segment.text.substring(
            0,
            displayedChars - segmentStart
          );

          const invisible = segment.text.substring(
            displayedChars - segmentStart
          );

          return (
            <span
              key={index}
              className={segment.className || ""}
            >
              <span>{visible}</span>

              <span className="invisible">
                {invisible}
              </span>
            </span>
          );
        }

        return (
          <span
            key={index}
            className={segment.className || ""}
          >
            {segment.text}
          </span>
        );
      })}
    </>
  );
};

// ======================================================
// HOME PAGE
// ======================================================

export default function HomePage() {
  const [particles, setParticles] = useState<any[]>([]);
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const [giftState, setGiftState] = useState<
    "closed" | "opening" | "opened"
  >("closed");

  // ======================================================
  // NAVBAR ACTIVE STATE
  // ======================================================

  const [activeNav, setActiveNav] =
    useState("surface");

  // ======================================================
  // TIDE SCROLL PROGRESS
  // ======================================================

  const [scrollProgress, setScrollProgress] =
    useState(0);

  // ======================================================
  // CANDLE STATE
  // ======================================================

  const [litCandles, setLitCandles] =
    useState<boolean[]>(
      Array(3).fill(true)
    );

  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  // ======================================================
  // 17 FOTO MEMORY
  // ======================================================

  const memoryImages = [
    "/astri2.JPG",
    "/astri3.JPG",
    "/astri4.jpg",
    "/astri5.jpg",
    "/astri6.jpg",
    "/astri7.jpg",
    "/astri8.jpg",
    "/astri9.jpg",
    "/astri10.jpg",
    "/astri11.jpg",
    "/astri12.jpg",
    "/astri13.jpg",
    "/astri14.jpg",
    "/astri15.jpg",
    "/astri16.jpg",
    "/astri17.jpg",
  ];

  // ======================================================
  // CANDLE HELPERS
  // ======================================================

  const activeCandles =
    litCandles.filter(Boolean).length;

  const extinguishCandle = (index: number) => {
    setLitCandles((current) =>
      current.map((isLit, i) =>
        i === index ? false : isLit
      )
    );
  };

  // ======================================================
  // PARTICLES
  // ======================================================

  useEffect(() => {
    const particleArray = Array.from({
      length: 60,
    }).map((_, index) => ({
      id: index,
      left: `${Math.random() * 100}%`,
      animationDuration: `${
        Math.random() * 5 + 6
      }s`,
      animationDelay: `${Math.random() * 5}s`,
      size: `${Math.random() * 2.5 + 1}px`,
      opacity:
        Math.random() * 0.5 + 0.1,
    }));

    setParticles(particleArray);
  }, []);

  // ======================================================
  // TIDE SCROLL PROGRESS
  // ======================================================

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;

      const scrollableHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      if (scrollableHeight <= 0) {
        setScrollProgress(0);
        ticking = false;
        return;
      }

      const percentage =
        (scrollTop / scrollableHeight) * 100;

      setScrollProgress(
        Math.min(
          100,
          Math.max(0, percentage)
        )
      );

      ticking = false;
    };

    const requestUpdate = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(
        updateScrollProgress
      );
    };

    requestUpdate();

    window.addEventListener(
      "scroll",
      requestUpdate,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      requestUpdate
    );

    window.addEventListener(
      "load",
      requestUpdate
    );

    return () => {
      window.removeEventListener(
        "scroll",
        requestUpdate
      );

      window.removeEventListener(
        "resize",
        requestUpdate
      );

      window.removeEventListener(
        "load",
        requestUpdate
      );
    };
  }, []);

  // ======================================================
  // SCROLL REVEAL
  // ======================================================

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin:
        "0px 0px -50px 0px",
    };

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(
                "active-reveal"
              );
            }
          });
        },
        observerOptions
      );

    const revealElements =
      document.querySelectorAll(
        ".reveal-on-scroll"
      );

    revealElements.forEach((element) =>
      observer.observe(element)
    );

    return () => observer.disconnect();
  }, []);

  // ======================================================
  // GIFT
  // ======================================================

  const handleOpenGift = () => {
    if (giftState !== "closed") return;

    setGiftState("opening");

    setTimeout(() => {
      setGiftState("opened");
    }, 1500);
  };

  // ======================================================
  // MUSIC
  // ======================================================

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    const current =
      audioRef.current.currentTime;

    const duration =
      audioRef.current.duration;

    if (duration) {
      setProgress(
        (current / duration) * 100
      );
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  // ======================================================
  // SMOOTH SCROLL
  // ======================================================

  const scrollToSection = (id: string) => {
    const section =
      document.getElementById(id);

    if (!section) return;

    const top =
      section.getBoundingClientRect().top +
      window.scrollY -
      80;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  const scrollToLetter = () => {
    scrollToSection("letter-section");
  };

  const scrollToMemories = () => {
    scrollToSection("memories-section");
  };

  const scrollToWishes = () => {
    scrollToSection("wishes-section");
  };

  // ======================================================
  // NAVBAR SCROLL SPY
  // ======================================================

  useEffect(() => {
    const sectionMap = [
      {
        id: "surface-section",
        nav: "surface",
      },
      {
        id: "letter-section",
        nav: "letter",
      },
      {
        id: "memories-section",
        nav: "memories",
      },
      {
        id: "wishes-section",
        nav: "wishes",
      },
    ] as const;

    let ticking = false;

    const updateActiveNav = () => {
      const viewportMarker =
        window.scrollY + 180;

      let currentNav:
        (typeof sectionMap)[number]["nav"] =
        "surface";

      for (const section of sectionMap) {
        const element =
          document.getElementById(
            section.id
          );

        if (!element) continue;

        const sectionTop =
          element.getBoundingClientRect()
            .top + window.scrollY;

        if (
          viewportMarker >= sectionTop
        ) {
          currentNav = section.nav;
        }
      }

      const reachedBottom =
        window.scrollY +
          window.innerHeight >=
        document.documentElement
          .scrollHeight - 8;

      if (reachedBottom) {
        currentNav = "wishes";
      }

      setActiveNav((previous) =>
        previous === currentNav
          ? previous
          : currentNav
      );

      ticking = false;
    };

    const requestUpdate = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(
        updateActiveNav
      );
    };

    requestUpdate();

    window.addEventListener(
      "scroll",
      requestUpdate,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      requestUpdate
    );

    window.addEventListener(
      "load",
      requestUpdate
    );

    return () => {
      window.removeEventListener(
        "scroll",
        requestUpdate
      );

      window.removeEventListener(
        "resize",
        requestUpdate
      );

      window.removeEventListener(
        "load",
        requestUpdate
      );
    };
  }, []);

  // ======================================================
  // NAVBAR CLICK
  // ======================================================

  const handleNavClick = (
    navName: string,
    sectionId: string
  ) => {
    setActiveNav(navName);
    scrollToSection(sectionId);
  };

  return (
    <div className="relative w-full overflow-x-hidden bg-[#06010b] text-white font-sans selection:bg-purple-500/30">

      {/* ======================================================
          GLOBAL STYLE
      ====================================================== */}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,600&family=Inter:wght@300;400;500;600&display=swap');

            .font-playfair {
              font-family: 'Playfair Display', serif;
            }

            .font-inter {
              font-family: 'Inter', sans-serif;
            }

            /* ==================================================
               PARTICLES
            ================================================== */

            .particle {
              position: absolute;
              bottom: -10px;
              background: #fff;
              border-radius: 50%;
              box-shadow:
                0 0 10px 2px rgba(255,255,255,0.8),
                0 0 20px 4px rgba(167,139,250,0.6);
              animation: flyUp linear infinite;
            }

            @keyframes flyUp {
              0% {
                transform:
                  translateY(0)
                  scale(1);
                opacity: 0;
              }

              10% {
                opacity: var(--target-opacity);
              }

              90% {
                opacity: var(--target-opacity);
              }

              100% {
                transform:
                  translateY(-100vh)
                  scale(0.5);
                opacity: 0;
              }
            }

            /* ==================================================
               PARALLAX WAVE
            ================================================== */

            .parallax > use {
              animation:
                move-forever
                25s
                cubic-bezier(.55,.5,.45,.5)
                infinite;
            }

            .parallax > use:nth-child(1) {
              animation-delay: -2s;
              animation-duration: 15s;
            }

            .parallax > use:nth-child(2) {
              animation-delay: -3s;
              animation-duration: 20s;
            }

            .parallax > use:nth-child(3) {
              animation-delay: -4s;
              animation-duration: 25s;
            }

            @keyframes move-forever {
              0% {
                transform:
                  translate3d(-90px,0,0);
              }

              100% {
                transform:
                  translate3d(85px,0,0);
              }
            }

            /* ==================================================
               SCROLL REVEAL
            ================================================== */

            .reveal-on-scroll {
              opacity: 0;
              transform: translateY(40px);
              transition:
                all
                1s
                cubic-bezier(0.5,0,0,1);
            }

            .active-reveal {
              opacity: 1;
              transform: translateY(0);
            }

            /* ==================================================
               PAGE DIVIDER
            ================================================== */

            .page-divider {
              position: relative;
              width: 100%;
              height: 70px;
              overflow: hidden;
              pointer-events: none;
              z-index: 20;
              margin-top: -1px;
              margin-bottom: -1px;
            }

            .page-divider svg {
              position: absolute;
              width: 100%;
              height: 100%;
              left: 0;
              top: 0;
            }

            .divider-wave-1 {
              animation:
                dividerWave1
                12s
                ease-in-out
                infinite
                alternate;
            }

            .divider-wave-2 {
              animation:
                dividerWave2
                16s
                ease-in-out
                infinite
                alternate;
            }

            @keyframes dividerWave1 {
              0% {
                transform:
                  translateX(-20px);
              }

              100% {
                transform:
                  translateX(20px);
              }
            }

            @keyframes dividerWave2 {
              0% {
                transform:
                  translateX(20px);
              }

              100% {
                transform:
                  translateX(-20px);
              }
            }

            /* ==================================================
               SIMPLE NAVBAR
            ================================================== */

            .nav-item {
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;

              height: 36px;
              padding: 0 14px;

              border-radius: 999px;

              color:
                rgba(233,213,255,0.55);

              background: transparent;

              border: 1px solid transparent;

              transition:
                color 0.3s ease,
                background 0.3s ease,
                border-color 0.3s ease;
            }

            .nav-item:hover {
              color: rgba(255,255,255,0.95);

              background:
                rgba(147,51,234,0.08);
            }

            .nav-item.active {
              color: #ffffff;

              background:
                rgba(147,51,234,0.18);

              border-color:
                rgba(192,132,252,0.22);

              box-shadow:
                0 0 18px
                rgba(147,51,234,0.10);
            }

            .nav-item.active::after {
              content: "";

              position: absolute;

              left: 50%;
              bottom: 2px;

              width: 18px;
              height: 2px;

              transform:
                translateX(-50%);

              border-radius: 999px;

              background:
                linear-gradient(
                  to right,
                  transparent,
                  #c084fc,
                  transparent
                );

              box-shadow:
                0 0 7px
                rgba(192,132,252,0.75);
            }

            .nav-item:active {
              transform: scale(0.97);
            }

            /* ==================================================
               TIDE
            ================================================== */

            .tide-progress {
              position: relative;

              width: 2px;
              height: 180px;

              background:
                linear-gradient(
                  to bottom,
                  rgba(255,255,255,0.14),
                  rgba(255,255,255,0.04)
                );

              border-radius: 999px;

              box-shadow:
                0 0 5px
                rgba(255,255,255,0.03);
            }

            .tide-progress-fill {
              position: absolute;

              top: 0;
              left: 0;

              width: 100%;

              background:
                linear-gradient(
                  to bottom,
                  #fef08a 0%,
                  #facc15 45%,
                  #f59e0b 100%
                );

              border-radius: 999px;

              box-shadow:
                0 0 5px
                  rgba(254,240,138,0.9),
                0 0 12px
                  rgba(250,204,21,0.45);
            }

            .tide-progress-dot {
              position: absolute;

              left: 50%;

              width: 9px;
              height: 9px;

              transform:
                translate(-50%, -50%);

              border-radius: 50%;

              background:
                #fef08a;

              border:
                2px solid
                rgba(6,1,11,0.8);

              box-shadow:
                0 0 8px
                  rgba(254,240,138,0.95),
                0 0 18px
                  rgba(250,204,21,0.55);
            }

            .tide-start-dot,
            .tide-end-dot {
              position: absolute;

              left: 50%;

              width: 5px;
              height: 5px;

              transform:
                translateX(-50%);

              border-radius: 50%;

              background:
                rgba(255,255,255,0.55);
            }

            .tide-start-dot {
              top: 0;
            }

            .tide-end-dot {
              bottom: 0;
            }

            /* ==================================================
               RIBBON
            ================================================== */

            .ribbon-left {
              position: absolute;
              top: 50%;
              left: 0;
              width: 50%;
              height: 48px;

              background:
                linear-gradient(
                  to right,
                  #e9d5ff,
                  #c084fc,
                  #9333ea
                );

              transform:
                translateY(-50%);

              transform-origin:
                left center;

              box-shadow:
                0 10px 20px
                rgba(192,132,252,0.4);
            }

            .is-opening .ribbon-left {
              animation:
                ribbonDropLeft
                1.2s
                cubic-bezier(0.5,0,0.2,1)
                forwards;
            }

            .ribbon-right {
              position: absolute;
              top: 50%;
              right: 0;
              width: 50%;
              height: 48px;

              background:
                linear-gradient(
                  to left,
                  #e9d5ff,
                  #c084fc,
                  #9333ea
                );

              transform:
                translateY(-50%);

              transform-origin:
                right center;

              box-shadow:
                0 10px 20px
                rgba(192,132,252,0.4);
            }

            .is-opening .ribbon-right {
              animation:
                ribbonDropRight
                1.2s
                cubic-bezier(0.5,0,0.2,1)
                forwards;
            }

            .ribbon-top {
              position: absolute;
              top: 0;
              left: 50%;
              width: 48px;
              height: 50%;

              background:
                linear-gradient(
                  to bottom,
                  #e9d5ff,
                  #c084fc,
                  #9333ea
                );

              transform:
                translateX(-50%);

              transform-origin:
                top center;

              box-shadow:
                10px 0 20px
                rgba(192,132,252,0.4);
            }

            .is-opening .ribbon-top {
              animation:
                ribbonDropTop
                1.2s
                cubic-bezier(0.5,0,0.2,1)
                forwards;
            }

            .ribbon-bottom {
              position: absolute;
              bottom: 0;
              left: 50%;
              width: 48px;
              height: 50%;

              background:
                linear-gradient(
                  to top,
                  #e9d5ff,
                  #c084fc,
                  #9333ea
                );

              transform:
                translateX(-50%);

              transform-origin:
                bottom center;

              box-shadow:
                10px 0 20px
                rgba(192,132,252,0.4);
            }

            .is-opening .ribbon-bottom {
              animation:
                ribbonDropBottom
                1.2s
                cubic-bezier(0.5,0,0.2,1)
                forwards;
            }

            .ribbon-bow-center {
              position: relative;
              z-index: 40;
              cursor: pointer;

              transition:
                transform
                0.3s
                cubic-bezier(0.34,1.56,0.64,1);
            }

            .ribbon-bow-center:hover {
              transform: scale(1.1);
            }

            .is-opening
              .ribbon-bow-center {
              pointer-events: none;

              animation:
                bowUntie
                1.4s
                cubic-bezier(0.35,0,0.25,1)
                forwards;
            }

            @keyframes bowUntie {
              0% {
                transform:
                  scale(1)
                  rotate(0deg);
                opacity: 1;
              }

              15% {
                transform:
                  scale(1.4)
                  rotate(-10deg);
                opacity: 1;
                filter: brightness(1.3);
              }

              30% {
                transform:
                  scale(1.1)
                  rotate(15deg);
                opacity: 1;
              }

              100% {
                transform:
                  scale(0.6)
                  translateY(500px)
                  rotate(90deg);
                opacity: 0;
              }
            }

            @keyframes ribbonDropLeft {
              0% {
                transform:
                  translateY(-50%)
                  rotate(0deg);
                opacity: 1;
              }

              15% {
                transform:
                  translateY(-50%)
                  scaleX(1.05)
                  rotate(-3deg);
                opacity: 1;
              }

              100% {
                transform:
                  translateY(300px)
                  rotate(45deg);
                opacity: 0;
              }
            }

            @keyframes ribbonDropRight {
              0% {
                transform:
                  translateY(-50%)
                  rotate(0deg);
                opacity: 1;
              }

              15% {
                transform:
                  translateY(-50%)
                  scaleX(1.05)
                  rotate(3deg);
                opacity: 1;
              }

              100% {
                transform:
                  translateY(300px)
                  rotate(-45deg);
                opacity: 0;
              }
            }

            @keyframes ribbonDropTop {
              0% {
                transform:
                  translateX(-50%)
                  rotate(0deg);
                opacity: 1;
              }

              15% {
                transform:
                  translateX(-50%)
                  scaleY(1.05)
                  rotate(-3deg);
                opacity: 1;
              }

              100% {
                transform:
                  translateX(-50%)
                  translateY(300px)
                  rotate(45deg);
                opacity: 0;
              }
            }

            @keyframes ribbonDropBottom {
              0% {
                transform:
                  translateX(-50%)
                  rotate(0deg);
                opacity: 1;
              }

              15% {
                transform:
                  translateX(-50%)
                  scaleY(1.05)
                  rotate(3deg);
                opacity: 1;
              }

              100% {
                transform:
                  translateX(-50%)
                  translateY(300px)
                  rotate(-45deg);
                opacity: 0;
              }
            }

            /* ==================================================
               WISHES / CANDLE LIGHT
            ================================================== */

            .wishes-section {
              isolation: isolate;

              transition:
                background
                1.2s
                ease;
            }

            .candlelight-glow {
              position: absolute;

              left: 50%;
              top: 52%;

              width:
                min(900px, 100vw);

              height: 650px;

              transform:
                translate(-50%, -50%);

              border-radius: 50%;

              background:
                radial-gradient(
                  ellipse at center,
                  rgba(255,247,184,0.25) 0%,
                  rgba(255,230,125,0.20) 18%,
                  rgba(245,194,54,0.12) 42%,
                  rgba(234,179,8,0.06) 60%,
                  transparent 78%
                );

              filter: blur(16px);

              pointer-events: none;

              opacity: 0;

              transition:
                opacity 1s ease,
                transform 1s ease;
            }

            .candlelight-glow.active {
              opacity: 1;
            }

            .candlelight-glow.medium {
              opacity: 0.58;
            }

            .candlelight-glow.low {
              opacity: 0.25;
            }

            .candlelight-glow.off {
              opacity: 0;
            }

            .candlelight-flicker {
              animation:
                ambientFlicker
                2.8s
                ease-in-out
                infinite
                alternate;
            }

            @keyframes ambientFlicker {
              0% {
                transform:
                  translate(-50%, -50%)
                  scale(0.98);
              }

              100% {
                transform:
                  translate(-50%, -50%)
                  scale(1.035);
              }
            }

            .wishes-content {
              position: relative;
              z-index: 5;

              transition:
                filter
                1s
                ease;
            }

            .wishes-content.lit {
              filter:
                drop-shadow(
                  0 0 22px
                  rgba(245,193,72,0.12)
                );
            }

            .wishes-highlight {
              transition:
                text-shadow 1s ease,
                color 1s ease;
            }

            .wishes-highlight.lit {
              color: #fff0a6;

              text-shadow:
                0 0 15px
                rgba(254,240,138,0.42),
                0 0 35px
                rgba(250,204,21,0.24),
                0 0 70px
                rgba(245,194,54,0.12);
            }

            .wishes-description {
              transition:
                color 1s ease,
                text-shadow 1s ease;
            }

            .wishes-description.lit {
              color:
                rgba(255,247,210,0.84);

              text-shadow:
                0 0 18px
                rgba(245,194,54,0.10);
            }

            /* ==================================================
               CANDLE CONTAINER
            ================================================== */

            .birthday-candles {
              display: flex;
              align-items: flex-end;
              justify-content: center;
              gap: 18px;

              height: 155px;

              margin-top: 10px;
            }

            .candle-wrapper {
              position: relative;

              width: 52px;
              height: 145px;

              display: flex;
              align-items: flex-end;
              justify-content: center;
            }

            .candle-button {
              position: relative;

              width: 52px;
              height: 145px;

              padding: 0;

              border: 0;

              background: transparent;

              cursor: pointer;

              outline: none;
            }

            .candle-body {
              position: absolute;

              bottom: 8px;
              left: 50%;

              width: 28px;
              height: 92px;

              transform:
                translateX(-50%);

              border-radius:
                9px 9px 6px 6px;

              background:
                linear-gradient(
                  90deg,
                  #b98a2c 0%,
                  #f9df7a 13%,
                  #fff2a8 32%,
                  #f7d867 52%,
                  #c89b35 78%,
                  #8f6820 100%
                );

              box-shadow:
                inset 2px 0 3px
                  rgba(255,255,255,0.38),
                inset -3px 0 5px
                  rgba(79,53,12,0.28),
                0 0 10px
                  rgba(250,204,21,0.35),
                0 10px 18px
                  rgba(0,0,0,0.22);

              transition:
                transform 0.35s ease,
                filter 0.5s ease,
                box-shadow 0.6s ease,
                opacity 0.5s ease;
            }

            .candle-body::before {
              content: "";

              position: absolute;

              inset:
                10px 5px;

              border-top:
                1px solid
                rgba(255,255,255,0.42);

              border-bottom:
                1px solid
                rgba(255,255,255,0.24);

              opacity: 0.6;
            }

            .candle-body::after {
              content: "";

              position: absolute;

              top: -3px;
              left: 4px;
              right: 4px;

              height: 12px;

              border-radius: 50%;

              background:
                radial-gradient(
                  ellipse at center,
                  #fff4ab 0%,
                  #efd46a 58%,
                  #aa7b23 100%
                );

              box-shadow:
                inset 0 2px 2px
                rgba(255,255,255,0.38);
            }

            .candle-button:hover
              .candle-body {
              transform:
                translateX(-50%)
                translateY(-4px)
                scale(1.04);
            }

            .candle-button.extinguished
              .candle-body {
              background:
                linear-gradient(
                  90deg,
                  #3b3542,
                  #686070,
                  #4a4352,
                  #2f2a36
                );

              box-shadow:
                inset 2px 0 3px
                  rgba(255,255,255,0.08),
                inset -3px 0 5px
                  rgba(0,0,0,0.3),
                0 8px 15px
                  rgba(0,0,0,0.28);

              filter:
                brightness(0.62)
                saturate(0.35);
            }

            /* ==================================================
               WAX
            ================================================== */

            .wax-drip {
              position: absolute;

              left: 50%;
              top: 23px;

              width: 7px;
              height: 19px;

              border-radius:
                0 0 7px 7px;

              transform:
                translateX(-50%);

              background:
                linear-gradient(
                  to bottom,
                  #fff3a5,
                  #e5c85e
                );

              opacity: 0.85;

              filter:
                drop-shadow(
                  0 1px 2px
                  rgba(0,0,0,0.12)
                );
            }

            .wax-drip::after {
              content: "";

              position: absolute;

              top: 12px;
              left: 10px;

              width: 5px;
              height: 9px;

              border-radius:
                0 0 6px 6px;

              background:
                linear-gradient(
                  to bottom,
                  #f6de7d,
                  #d5b34b
                );
            }

            .candle-button.extinguished
              .wax-drip {
              background:
                linear-gradient(
                  to bottom,
                  #5c5564,
                  #3f3947
                );

              opacity: 0.45;
            }

            /* ==================================================
               WICK
            ================================================== */

            .candle-wick {
              position: absolute;

              top: 0;
              left: 50%;

              width: 3px;
              height: 15px;

              transform:
                translateX(-50%);

              border-radius: 999px;

              background:
                linear-gradient(
                  to bottom,
                  #4a3d31,
                  #1e1814
                );

              z-index: 4;
            }

            /* ==================================================
               FLAME
            ================================================== */

            .candle-flame {
              position: absolute;

              top: -27px;
              left: 50%;

              width: 25px;
              height: 40px;

              transform:
                translateX(-50%)
                rotate(45deg);

              border-radius:
                50% 50% 50% 0;

              background:
                linear-gradient(
                  135deg,
                  #fffde2 0%,
                  #fff5a3 34%,
                  #ffd43b 67%,
                  #f59e0b 100%
                );

              box-shadow:
                0 0 12px
                  rgba(255,248,180,0.98),
                0 0 26px
                  rgba(255,218,74,0.78),
                0 0 55px
                  rgba(245,158,11,0.35);

              animation:
                candleFlicker
                0.95s
                ease-in-out
                infinite
                alternate;

              z-index: 3;

              transition:
                opacity 0.4s ease,
                transform 0.45s ease,
                filter 0.45s ease;
            }

            .candle-flame::after {
              content: "";

              position: absolute;

              width: 11px;
              height: 20px;

              left: 7px;
              top: 10px;

              border-radius:
                50% 50% 50% 0;

              background:
                linear-gradient(
                  135deg,
                  #ffffff,
                  #fff4a3 70%,
                  #fde68a
                );

              filter:
                blur(0.5px);
            }

            @keyframes candleFlicker {
              0% {
                transform:
                  translateX(-50%)
                  rotate(42deg)
                  scale(0.92);

                opacity: 0.86;
              }

              30% {
                transform:
                  translateX(-50%)
                  rotate(47deg)
                  scale(1);

                opacity: 0.94;
              }

              65% {
                transform:
                  translateX(-50%)
                  rotate(43deg)
                  scale(1.08);

                opacity: 1;
              }

              100% {
                transform:
                  translateX(-50%)
                  rotate(49deg)
                  scale(0.96);

                opacity: 0.9;
              }
            }

            .candle-button.extinguished
              .candle-flame {
              opacity: 0;

              transform:
                translateX(-50%)
                translateY(13px)
                rotate(45deg)
                scale(0.25);

              filter: blur(5px);

              animation: none;

              pointer-events: none;
            }

            /* ==================================================
               SMOKE
            ================================================== */

            .candle-smoke {
              position: absolute;

              top: -13px;
              left: 50%;

              width: 5px;
              height: 5px;

              border-radius: 50%;

              background:
                rgba(222,216,226,0.42);

              transform:
                translateX(-50%)
                scale(0);

              opacity: 0;

              filter: blur(1px);

              pointer-events: none;

              z-index: 7;
            }

            .candle-button.extinguished
              .candle-smoke {
              animation:
                smokeRise
                1.7s
                ease-out
                forwards;
            }

            @keyframes smokeRise {
              0% {
                transform:
                  translateX(-50%)
                  translateY(0)
                  scale(0.5);

                opacity: 0;
              }

              18% {
                opacity: 0.42;
              }

              100% {
                transform:
                  translateX(
                    calc(-50% + 20px)
                  )
                  translateY(-48px)
                  scale(4.2);

                opacity: 0;

                filter: blur(5px);
              }
            }

            /* ==================================================
               CANDLE SIZES
            ================================================== */

            .candle-wrapper:nth-child(1)
              .candle-body {
              height: 88px;
            }

            .candle-wrapper:nth-child(2)
              .candle-body {
              height: 108px;
            }

            .candle-wrapper:nth-child(3)
              .candle-body {
              height: 96px;
            }

            .candle-wrapper:nth-child(2)
              .candle-flame {
              animation-delay: -0.28s;
            }

            .candle-wrapper:nth-child(3)
              .candle-flame {
              animation-delay: -0.58s;
            }

            /* ==================================================
               WISH DIVIDER
            ================================================== */

            .wish-divider {
              transition:
                opacity 1s ease,
                background 1s ease;
            }

            .wish-divider.lit {
              background:
                linear-gradient(
                  to right,
                  transparent,
                  rgba(250,204,21,0.55),
                  transparent
                );
            }

            .wish-divider.off {
              background:
                linear-gradient(
                  to right,
                  transparent,
                  rgba(167,139,250,0.18),
                  transparent
                );
            }
          `,
        }}
      />

      {/* ======================================================
          FIXED BACKGROUND
      ====================================================== */}

      <div className="fixed inset-0 pointer-events-none z-0">

        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[120%] h-[80%] bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.3)_0%,_rgba(88,28,135,0.15)_40%,_transparent_70%)] opacity-80 mix-blend-screen" />

        <div className="absolute bottom-0 left-[-20%] w-[70%] h-[70%] bg-[radial-gradient(circle_at_bottom_left,_rgba(109,40,217,0.15)_0%,_transparent_60%)]" />

        <div className="absolute top-0 right-[-20%] w-[70%] h-[70%] bg-[radial-gradient(circle_at_top_right,_rgba(167,139,250,0.1)_0%,_transparent_60%)]" />

        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 opacity-25">

          <svg
            className="relative block w-full h-[30vh] min-h-[200px] max-h-[350px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>

              <path
                id="gentle-wave-bg"
                d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
              />

              <linearGradient
                id="wave-gradient-bg"
                x1="0"
                x2="0"
                y1="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="rgba(167,139,250,0.6)"
                />

                <stop
                  offset="100%"
                  stopColor="rgba(88,28,135,0)"
                />

              </linearGradient>

            </defs>

            <g className="parallax">

              <use
                href="#gentle-wave-bg"
                x="48"
                y="0"
                fill="rgba(139,92,246,0.2)"
              />

              <use
                href="#gentle-wave-bg"
                x="48"
                y="3"
                fill="rgba(167,139,250,0.3)"
              />

              <use
                href="#gentle-wave-bg"
                x="48"
                y="5"
                fill="url(#wave-gradient-bg)"
              />

            </g>
          </svg>

        </div>

        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={
              {
                left: particle.left,
                width: particle.size,
                height: particle.size,
                animationDuration:
                  particle.animationDuration,
                animationDelay:
                  particle.animationDelay,
                "--target-opacity":
                  particle.opacity,
              } as React.CSSProperties
            }
          />
        ))}

      </div>

      {/* ======================================================
          NAVBAR
      ====================================================== */}

      <nav className="fixed top-0 left-0 w-full z-[100] px-5 md:px-10 py-4">

        <div className="max-w-7xl mx-auto rounded-full bg-[#06010b]/65 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.25)] px-5 md:px-7 py-3">

          <div className="flex items-center justify-between">

            <button
              type="button"
              onClick={() =>
                handleNavClick(
                  "surface",
                  "surface-section"
                )
              }
              className="flex items-center gap-2.5 text-purple-100 font-semibold tracking-wide hover:text-white transition-colors duration-300"
            >

              <Wind className="w-5 h-5 text-purple-300" />

              <span>
                Astri&apos;s Birthday
              </span>

            </button>

            <div className="hidden md:flex items-center gap-1 lg:gap-2 text-[12px] font-medium tracking-wide">

              <button
                type="button"
                onClick={() =>
                  handleNavClick(
                    "surface",
                    "surface-section"
                  )
                }
                className={`nav-item ${
                  activeNav === "surface"
                    ? "active"
                    : ""
                }`}
              >
                Surface
              </button>

              <button
                type="button"
                onClick={() =>
                  handleNavClick(
                    "letter",
                    "letter-section"
                  )
                }
                className={`nav-item ${
                  activeNav === "letter"
                    ? "active"
                    : ""
                }`}
              >
                The Letter
              </button>

              <button
                type="button"
                onClick={() =>
                  handleNavClick(
                    "memories",
                    "memories-section"
                  )
                }
                className={`nav-item ${
                  activeNav === "memories"
                    ? "active"
                    : ""
                }`}
              >
                Our Memories
              </button>

              <button
                type="button"
                onClick={() =>
                  handleNavClick(
                    "wishes",
                    "wishes-section"
                  )
                }
                className={`nav-item ${
                  activeNav === "wishes"
                    ? "active"
                    : ""
                }`}
              >
                Wishes
              </button>

            </div>

          </div>

        </div>

      </nav>

      {/* ======================================================
          HERO
      ====================================================== */}

      <section
        id="surface-section"
        className="relative min-h-screen flex flex-col justify-center pt-24 z-10"
      >

        {/* TIDE */}

        <div className="hidden lg:flex fixed right-10 xl:right-14 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-[90]">

          <span className="text-[10px] font-bold tracking-[0.35em] text-white/80 -rotate-90 origin-center uppercase">
            tide
          </span>

          <div className="tide-progress">

            <div className="tide-start-dot" />

            <div
              className="tide-progress-fill"
              style={{
                height: `${scrollProgress}%`,
              }}
            />

            <div
              className="tide-progress-dot"
              style={{
                top: `${scrollProgress}%`,
              }}
            />

            <div className="tide-end-dot" />

          </div>

          <span className="text-[9px] font-medium tracking-[0.2em] text-yellow-100/55 [writing-mode:vertical-rl]">
            {Math.round(scrollProgress)}%
          </span>

        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">

          <p className="reveal-on-scroll text-[9px] md:text-[11px] font-bold tracking-[0.35em] text-purple-200/80 uppercase mb-8 drop-shadow-sm">
            — A message carried in on the tide, for you —
          </p>

          <h1 className="reveal-on-scroll delay-100 font-playfair text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.1] mb-8 drop-shadow-[0_0_30px_rgba(167,139,250,0.5)]">

            Happy Birthday,
            <br />

            <span className="italic text-[#fef08a] pr-4">
              My Favorite Person
            </span>

          </h1>

          <p className="reveal-on-scroll delay-200 max-w-2xl text-[13px] md:text-[15px] text-purple-100/90 leading-relaxed mb-14 drop-shadow-md">

            Somewhere past the breakers, ada a letter
            yang udah lama waiting for this day.
            Scroll down, the tide is coming in,
            dan ternyata dia bawa something special
            just for you.{" "}

            <strong className="text-[#fce66f] font-semibold tracking-wide">
              you.
            </strong>

          </p>

          <div className="reveal-on-scroll delay-300 flex flex-col sm:flex-row items-center gap-5 mb-16">

            <button
              onClick={scrollToLetter}
              className="bg-gradient-to-r from-[#b560ff] to-[#9333ea] hover:from-[#c07bf7] hover:to-[#a855f7] text-white px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300 shadow-[0_0_25px_rgba(147,51,234,0.5)] hover:shadow-[0_0_35px_rgba(167,139,250,0.7)] hover:-translate-y-1 flex items-center gap-2 group"
            >

              Begin the Descent

            </button>

            <button
              onClick={scrollToWishes}
              className="relative border border-purple-400/40 bg-purple-900/20 backdrop-blur-sm hover:bg-purple-800/40 text-white px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:border-purple-300/60"
            >
              Jump Straight to the Wishes
            </button>

          </div>

          <div
            onClick={scrollToLetter}
            className="absolute bottom-8 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
          >

            <div className="border-[1.5px] border-purple-300 rounded-full p-2 mb-1">

              <Mouse className="w-4 h-4 text-purple-200 animate-bounce" />

            </div>

            <span className="text-[9px] font-bold tracking-[0.2em] text-purple-200 uppercase drop-shadow-md">
              Scroll to dive in
            </span>

          </div>

        </div>

      </section>

      {/* ======================================================
          DIVIDER
      ====================================================== */}

      <div className="page-divider">

        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >

          <path
            className="divider-wave-1"
            d="M0,35 C180,65 280,5 460,35 C640,65 740,5 920,35 C1100,65 1260,5 1440,35"
            fill="none"
            stroke="rgba(167,139,250,0.28)"
            strokeWidth="1.2"
          />

          <path
            className="divider-wave-2"
            d="M0,45 C180,15 300,70 500,42 C680,15 820,70 1010,42 C1200,15 1300,65 1440,40"
            fill="none"
            stroke="rgba(139,92,246,0.18)"
            strokeWidth="1"
          />

        </svg>

      </div>

      {/* ======================================================
          LETTER
      ====================================================== */}

      <section
        id="letter-section"
        className="relative min-h-screen flex items-center justify-center py-24 px-6 z-10"
      >

        <div
          id="letter-content"
          className="max-w-3xl w-full min-h-[550px] bg-[#160a24]/60 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-14 shadow-[0_0_60px_rgba(139,92,246,0.15)] relative overflow-hidden flex flex-col justify-center"
        >

          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] pointer-events-none" />

          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#fce66f]/10 rounded-full blur-[80px] pointer-events-none" />

          {/* RIBBON */}

          <div
            className={`absolute inset-0 z-30 flex items-center justify-center transition-all duration-[1.5s] ease-in-out ${
              giftState === "opening"
                ? "is-opening bg-transparent backdrop-blur-0"
                : giftState === "opened"
                ? "is-opening bg-transparent backdrop-blur-0 opacity-0 pointer-events-none"
                : "bg-[#10041a]/85 backdrop-blur-md"
            }`}
          >

            <div className="ribbon-left">
              <div className="absolute top-1 bottom-1 left-0 right-0 border-y border-white/20" />
            </div>

            <div className="ribbon-right">
              <div className="absolute top-1 bottom-1 left-0 right-0 border-y border-white/20" />
            </div>

            <div className="ribbon-top">
              <div className="absolute left-1 right-1 top-0 bottom-0 border-x border-white/20" />
            </div>

            <div className="ribbon-bottom">
              <div className="absolute left-1 right-1 top-0 bottom-0 border-x border-white/20" />
            </div>

            <div
              onClick={handleOpenGift}
              className="ribbon-bow-center"
            >

              <div className="absolute inset-0 bg-purple-400 rounded-full blur-[40px] opacity-40 animate-pulse" />

              <svg
                width="180"
                height="150"
                viewBox="0 0 120 130"
                className="drop-shadow-[0_15px_25px_rgba(168,85,247,0.7)] relative z-10"
              >

                <defs>

                  <linearGradient
                    id="purpleSatinLarge"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >

                    <stop
                      offset="0%"
                      stopColor="#e9d5ff"
                    />

                    <stop
                      offset="50%"
                      stopColor="#c084fc"
                    />

                    <stop
                      offset="100%"
                      stopColor="#9333ea"
                    />

                  </linearGradient>

                  <linearGradient
                    id="purpleSatinLargeRev"
                    x1="100%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >

                    <stop
                      offset="0%"
                      stopColor="#e9d5ff"
                    />

                    <stop
                      offset="50%"
                      stopColor="#c084fc"
                    />

                    <stop
                      offset="100%"
                      stopColor="#9333ea"
                    />

                  </linearGradient>

                </defs>

                <path
                  d="M55 60 Q30 110 15 130 L35 120 L45 135 Q50 80 62 60"
                  fill="url(#purpleSatinLarge)"
                />

                <path
                  d="M65 60 Q90 110 105 130 L85 120 L75 135 Q70 80 58 60"
                  fill="url(#purpleSatinLargeRev)"
                />

                <path
                  d="M58 58 C-10 15 -10 85 58 62"
                  fill="url(#purpleSatinLarge)"
                  stroke="#e9d5ff"
                  strokeWidth="2"
                />

                <path
                  d="M62 58 C130 15 130 85 62 62"
                  fill="url(#purpleSatinLargeRev)"
                  stroke="#e9d5ff"
                  strokeWidth="2"
                />

                <circle
                  cx="60"
                  cy="59"
                  r="14"
                  fill="url(#purpleSatinLarge)"
                  stroke="#e9d5ff"
                  strokeWidth="1.5"
                />

              </svg>

            </div>

            <p
              className={`absolute bottom-12 text-purple-200 font-bold tracking-[0.3em] uppercase text-xs transition-opacity duration-300 ${
                giftState !== "closed"
                  ? "opacity-0"
                  : "animate-pulse"
              }`}
            >
              Klik Pita Untuk Membuka Surat
            </p>

          </div>

          {/* ==================================================
              LETTER CONTENT
          ================================================== */}

          <div
            className={`transition-opacity duration-1000 z-20 relative ${
              giftState === "opened"
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >

            <h2 className="font-playfair text-4xl md:text-5xl text-white mb-8">

              <TypewriterText
                isStarted={
                  giftState === "opened"
                }
                delay={300}
                segments={[
                  {
                    text: "Dear ",
                  },
                  {
                    text: "Astri,",
                    className:
                      "italic text-[#fce66f]",
                  },
                ]}
              />

            </h2>

            <div className="font-inter text-[15px] md:text-[17px] leading-[1.8] text-purple-100/90 space-y-6">

              {/* PARAGRAPH 1 */}

              <p>
                <TypewriterText
                  isStarted={
                    giftState === "opened"
                  }
                  delay={700}
                  segments={[
                    {
                      text: "Sometimes I still think about how random our beginning was. We were both just bored, doing our own thing, and somehow ended up meeting in Roblox, in a game called Fish It. At first, it was just a simple game and a random meeting, nothing that I ever thought would become something this meaningful.",
                    },
                  ]}
                />
              </p>

              {/* PARAGRAPH 2 */}

              <p>
                <TypewriterText
                  isStarted={
                    giftState === "opened"
                  }
                  delay={3000}
                  segments={[
                    {
                      text: "But little by little, those random moments started becoming my favorite moments. We kept meeting, talking, laughing, and spending more time together. What started because we were bored somehow turned into something I never expected a story about us.",
                    },
                  ]}
                />
              </p>

              {/* PARAGRAPH 3 */}

              <p>
                <TypewriterText
                  isStarted={
                    giftState === "opened"
                  }
                  delay={5300}
                  segments={[
                    {
                      text: "And somehow, from a Roblox game, we ended up becoming a couple. Even more than that, we eventually got the chance to meet each other in real life. Thinking about it still feels a little crazy to me. Who would have thought that a random day playing Fish It could lead me to someone who would become such an important part of my life?",
                    },
                  ]}
                />
              </p>

              {/* PARAGRAPH 4 */}

              <p>
                <TypewriterText
                  isStarted={
                    giftState === "opened"
                  }
                  delay={8000}
                  segments={[
                    {
                      text: "Thank you for staying, for choosing me, and for becoming someone I can always look forward to. I am genuinely proud to have you in my life. I am proud of who you are, of how far you have come, and of every little thing that makes you the person I love.",
                    },
                  ]}
                />
              </p>

              {/* PARAGRAPH 5 */}

              <p>
                <TypewriterText
                  isStarted={
                    giftState === "opened"
                  }
                  delay={10500}
                  segments={[
                    {
                      text: "And honestly, I really love being able to ask you to cook for me. Even better, you actually do it. And every single time, your cooking is really, really good. Like, REALLY good. I don't know how you do it, but somehow everything you make always tastes better because it comes from you.",
                    },
                  ]}
                />
              </p>

              {/* PARAGRAPH 6 */}

              <p>
                <TypewriterText
                  isStarted={
                    giftState === "opened"
                  }
                  delay={13000}
                  segments={[
                    {
                      text: "So when I look back at everything, I don't just see a game anymore. I see the beginning of us. From one random day in Fish It, to all the conversations, all the laughter, becoming a couple, and finally being able to meet you. I am really grateful that our story started the way it did.",
                    },
                  ]}
                />
              </p>

              {/* CLOSING */}

              <div className="pt-8 mt-8 border-t border-white/10">

                <p className="font-playfair italic text-xl text-white/80">

                  <TypewriterText
                    isStarted={
                      giftState === "opened"
                    }
                    delay={15500}
                    segments={[
                      {
                        text: "And I would choose this story all over again.",
                      },
                    ]}
                  />

                </p>

                <p className="mt-2 text-purple-300 font-medium tracking-wide">

                  <TypewriterText
                    isStarted={
                      giftState === "opened"
                    }
                    delay={16300}
                    segments={[
                      {
                        text: "Someone who is very grateful to have you",
                      },
                    ]}
                  />

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ======================================================
          DIVIDER
      ====================================================== */}

      <div className="page-divider">

        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >

          <path
            className="divider-wave-1"
            d="M0,35 C180,65 280,5 460,35 C640,65 740,5 920,35 C1100,65 1260,5 1440,35"
            fill="none"
            stroke="rgba(167,139,250,0.28)"
            strokeWidth="1.2"
          />

          <path
            className="divider-wave-2"
            d="M0,45 C180,15 300,70 500,42 C680,15 820,70 1010,42 C1200,15 1300,65 1440,40"
            fill="none"
            stroke="rgba(139,92,246,0.18)"
            strokeWidth="1"
          />

        </svg>

      </div>

      {/* ======================================================
          OUR MEMORIES
      ====================================================== */}

      <section
        id="memories-section"
        className="relative min-h-screen py-28 px-5 md:px-8 z-10"
      >

        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">

          <div className="text-center mb-14 md:mb-20">

            <p className="reveal-on-scroll text-[9px] md:text-[11px] font-bold tracking-[0.35em] text-purple-200/70 uppercase mb-6">
              — Our Memories —
            </p>

            <h2 className="reveal-on-scroll font-playfair text-5xl md:text-6xl lg:text-7xl leading-tight">

              A few of{" "}

              <span className="italic text-[#fce66f]">
                my favorite
              </span>

              <br />

              shots of you

            </h2>

            <p className="reveal-on-scroll mt-6 max-w-md mx-auto text-sm md:text-[15px] leading-relaxed text-purple-200/60">
              Seventeen little moments,
              but somehow each one feels
              special.
            </p>

          </div>

          <ImageReveal
            images={memoryImages}
          />

          <div className="text-center mt-20">

            <div className="w-20 h-px mx-auto bg-gradient-to-r from-transparent via-purple-300/50 to-transparent mb-8" />

            <p className="font-playfair italic text-xl md:text-2xl text-white/75">

              &ldquo;Some moments are ordinary,
              until they become memories.&rdquo;

            </p>

            <p className="mt-4 text-[10px] tracking-[0.3em] uppercase text-purple-300/50">
              memories worth keeping
            </p>

          </div>

        </div>

      </section>

      {/* ======================================================
          DIVIDER
      ====================================================== */}

      <div className="page-divider">

        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >

          <path
            className="divider-wave-1"
            d="M0,35 C180,65 280,5 460,35 C640,65 740,5 920,35 C1100,65 1260,5 1440,35"
            fill="none"
            stroke="rgba(167,139,250,0.28)"
            strokeWidth="1.2"
          />

          <path
            className="divider-wave-2"
            d="M0,45 C180,15 300,70 500,42 C680,15 820,70 1010,42 C1200,15 1300,65 1440,40"
            fill="none"
            stroke="rgba(139,92,246,0.18)"
            strokeWidth="1"
          />

        </svg>

      </div>

      {/* ======================================================
          WISHES
      ====================================================== */}

      <section
        id="wishes-section"
        className="wishes-section relative min-h-screen flex items-center justify-center py-28 px-6 z-10 overflow-hidden"
      >

        {/* CANDLE LIGHT */}

        <div
          className={`candlelight-glow candlelight-flicker ${
            activeCandles === 3
              ? "active"
              : activeCandles === 2
              ? "medium"
              : activeCandles === 1
              ? "low"
              : "off"
          }`}
        />

        <div
          className="absolute left-1/2 bottom-[16%] -translate-x-1/2 w-[460px] h-[190px] rounded-full pointer-events-none blur-[90px]"
          style={{
            background:
              activeCandles > 0
                ? `radial-gradient(
                    ellipse,
                    rgba(255,215,90,${
                      0.03 +
                      activeCandles * 0.045
                    }) 0%,
                    rgba(245,158,11,${
                      0.015 +
                      activeCandles * 0.02
                    }) 48%,
                    transparent 76%
                  )`
                : "transparent",
            transition:
              "background 1s ease",
          }}
        />

        {/* WISH CONTENT */}

        <div
          className={`wishes-content ${
            activeCandles > 0
              ? "lit"
              : ""
          } relative z-10 max-w-4xl mx-auto text-center`}
        >

          <p className="reveal-on-scroll text-[9px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-purple-200/65 mb-6">
            — THE WISHES, ALMOST THERE —
          </p>

          <h2 className="reveal-on-scroll wishes-title font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] leading-[1.02]">

            Happy Birthday,

            <br />

            <span
              className={`wishes-highlight ${
                activeCandles > 0
                  ? "lit"
                  : ""
              }`}
            >
              Sayangku.
            </span>

          </h2>

          <p
            className={`reveal-on-scroll wishes-description mt-10 mx-auto max-w-2xl text-[13px] md:text-[15px] leading-[1.9] text-purple-100/75 ${
              activeCandles > 0
                ? "lit"
                : ""
            }`}
          >

            Thank you for letting me make a little
            space in your story today. Semoga setiap
            langkah yang kamu ambil selalu membawa
            kamu lebih dekat dengan hal-hal yang kamu
            impikan.

            <br />

            Semoga hari-hari kecilmu dipenuhi alasan
            untuk tersenyum, cerita-cerita yang indah,
            dan hati yang selalu merasa cukup.

          </p>

          <p
            className={`reveal-on-scroll mt-7 mx-auto max-w-xl text-[12px] md:text-[14px] leading-[1.8] transition-all duration-1000 ${
              activeCandles > 0
                ? "text-yellow-100/60"
                : "text-purple-200/55"
            }`}
          >

            Semoga semua momen yang kamu jalani menjadi
            kenangan yang hangat untuk dikenang nanti.
            Dan semoga kamu selalu dikelilingi
            orang-orang yang tulus menyayangimu.

          </p>

          {/* THREE CANDLES */}

          <div className="reveal-on-scroll mt-16">

            <div className="birthday-candles">

              {litCandles.map(
                (isLit, index) => (
                  <div
                    key={index}
                    className="candle-wrapper"
                  >

                    <button
                      type="button"
                      aria-label={
                        isLit
                          ? `Matikan lilin ${index + 1}`
                          : `Lilin ${index + 1} sudah mati`
                      }
                      onClick={() => {
                        if (isLit) {
                          extinguishCandle(
                            index
                          );
                        }
                      }}
                      className={`candle-button ${
                        !isLit
                          ? "extinguished"
                          : ""
                      }`}
                    >

                      <div className="candle-smoke" />

                      <div className="wax-drip" />

                      <div className="candle-body" />

                      <div className="candle-wick" />

                      <div className="candle-flame" />

                    </button>

                  </div>
                )
              )}

            </div>

          </div>

          {/* BOTTOM MESSAGE */}

          <div className="reveal-on-scroll mt-14">

            <div
              className={`wish-divider w-20 h-px mx-auto mb-7 ${
                activeCandles > 0
                  ? "lit"
                  : "off"
              }`}
            />

            <p
              className="font-playfair italic text-lg md:text-xl transition-all duration-1000"
              style={{
                color:
                  activeCandles > 0
                    ? "rgba(255,247,210,0.72)"
                    : "rgba(255,255,255,0.55)",

                textShadow:
                  activeCandles > 0
                    ? "0 0 20px rgba(245,194,54,0.10)"
                    : "none",
              }}
            >
              Make a wish. Keep smiling. Keep being you.
            </p>

            <p
              className="mt-4 text-[10px] tracking-[0.3em] uppercase transition-all duration-1000"
              style={{
                color:
                  activeCandles > 0
                    ? "rgba(253,224,71,0.48)"
                    : "rgba(196,181,253,0.35)",
              }}
            >
              {activeCandles > 0
                ? `${activeCandles} candle${
                    activeCandles > 1
                      ? "s"
                      : ""
                  } still glowing`
                : "the night is quiet now"}
            </p>

          </div>

        </div>

      </section>

      {/* ======================================================
          MUSIC PLAYER
      ====================================================== */}

      <audio
        ref={audioRef}
        src="hbd.mp3"
        onTimeUpdate={handleTimeUpdate}
      />

      <div className="fixed bottom-8 left-6 md:left-10 z-[110]">

        <button
          onClick={() =>
            setIsMusicOpen(!isMusicOpen)
          }
          className="w-[50px] h-[50px] rounded-full bg-[#1e0b3b]/80 backdrop-blur-md border border-purple-500/40 flex items-center justify-center text-purple-200 hover:text-white hover:bg-[#341166]/90 hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        >

          {isMusicOpen ? (
            <X className="w-[22px] h-[22px]" />
          ) : (
            <Music className="w-[22px] h-[22px]" />
          )}

        </button>

        <div
          className={`absolute bottom-20 left-0 w-[280px] bg-[#10041f]/95 backdrop-blur-xl border border-white/10 rounded-[28px] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-all duration-500 origin-bottom-left ${
            isMusicOpen
              ? "scale-100 opacity-100 translate-y-0"
              : "scale-75 opacity-0 pointer-events-none translate-y-4"
          }`}
        >

          <div className="relative w-full aspect-square bg-gray-900 rounded-2xl mb-5 overflow-hidden shadow-inner border border-white/5">

            <img
              src="/astri.jpg"
              alt="Album Art"
              className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
            />

          </div>

          <div className="text-left mb-5">

            <h3 className="text-white font-bold text-sm truncate tracking-wide">
              Love You ❤️
            </h3>

            <p className="text-purple-300 text-xs mt-1 font-medium tracking-wider">
              ILY
            </p>

          </div>

          <div className="flex items-center gap-3 mb-5">

            <span className="text-[10px] text-gray-400 font-medium w-6 text-right">
              {formatTime(
                audioRef.current
                  ?.currentTime || 0
              )}
            </span>

            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">

              <div
                className="h-full bg-gradient-to-r from-[#9333ea] to-[#d8b4fe] rounded-full transition-all duration-100"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

            <span className="text-[10px] text-gray-400 font-medium w-6 text-left">
              {formatTime(
                audioRef.current
                  ?.duration || 0
              )}
            </span>

          </div>

          <div className="flex items-center justify-center gap-6">

            <button className="text-gray-400 hover:text-white transition-colors hover:scale-110">

              <SkipBack className="w-5 h-5 fill-current" />

            </button>

            <button
              onClick={togglePlay}
              className="w-14 h-14 bg-gradient-to-tr from-purple-700 to-purple-400 hover:from-purple-600 hover:to-purple-300 rounded-full flex items-center justify-center text-white transition-all shadow-[0_0_20px_rgba(167,139,250,0.4)] hover:scale-105 active:scale-95"
            >

              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-1" />
              )}

            </button>

            <button className="text-gray-400 hover:text-white transition-colors hover:scale-110">

              <SkipForward className="w-5 h-5 fill-current" />

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}