"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type GameStatus = "ready" | "racing" | "finished";

const TOTAL_LAPS = 3;
const TRACK_WIDTH = 72;
const CAR_SIZE = 22;

export default function Home() {
  const [status, setStatus] = useState<GameStatus>("ready");
  const [lap, setLap] = useState(1);
  const [time, setTime] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [carX, setCarX] = useState(50);
  const [carY, setCarY] = useState(88);
  const [direction, setDirection] = useState<"left" | "right" | "straight">(
    "straight"
  );

  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef(0);
  const carXRef = useRef(50);
  const carYRef = useRef(88);
  const lapRef = useRef(1);
  const progressRef = useRef(0);

  const formatTime = (milliseconds: number) => {
    const seconds = milliseconds / 1000;
    return seconds.toFixed(2).padStart(5, "0");
  };

  const resetGame = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    setStatus("ready");
    setLap(1);
    setTime(0);
    setCarX(50);
    setCarY(88);
    setDirection("straight");

    carXRef.current = 50;
    carYRef.current = 88;
    lapRef.current = 1;
    progressRef.current = 0;
  }, []);

  const finishGame = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const finalTime = performance.now() - startTimeRef.current;

    setTime(finalTime);
    setStatus("finished");

    setBestTime((currentBest) => {
      if (currentBest === null || finalTime < currentBest) {
        return finalTime;
      }

      return currentBest;
    });
  }, []);

  const startGame = useCallback(() => {
    if (status === "racing") return;

    setStatus("racing");
    setLap(1);
    setTime(0);
    setCarX(50);
    setCarY(88);

    carXRef.current = 50;
    carYRef.current = 88;
    lapRef.current = 1;
    progressRef.current = 0;

    startTimeRef.current = performance.now();

    const loop = (now: number) => {
      const elapsed = now - startTimeRef.current;

      setTime(elapsed);

      /*
       * The car automatically moves around the illusion track.
       * The player controls horizontal steering.
       */
      progressRef.current += 0.13;

      const progress = progressRef.current % 100;

      let centerX = 50;

      if (progress < 25) {
        centerX = 50 - progress * 0.75;
      } else if (progress < 50) {
        centerX = 31 + (progress - 25) * 1.52;
      } else if (progress < 75) {
        centerX = 69 - (progress - 50) * 0.76;
      } else {
        centerX = 50 + (progress - 75) * 0.75;
      }

      const targetY = 88 - progress * 0.64;

      /*
       * Small automatic movement gives the track
       * its illusion-like drifting effect.
       */
      const illusionOffset = Math.sin(progress / 7) * 3;

      const nextX = carXRef.current * 0.88 + (centerX + illusionOffset) * 0.12;
      const nextY = carYRef.current * 0.88 + targetY * 0.12;

      carXRef.current = nextX;
      carYRef.current = nextY;

      setCarX(nextX);
      setCarY(nextY);

      if (progress < 0.13 && elapsed > 1000) {
        const nextLap = lapRef.current + 1;

        if (nextLap > TOTAL_LAPS) {
          finishGame();
          return;
        }

        lapRef.current = nextLap;
        setLap(nextLap);
      }

      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);
  }, [finishGame, status]);

  const steer = useCallback((amount: number) => {
    if (status !== "racing") return;

    const nextX = Math.max(
      18,
      Math.min(82, carXRef.current + amount)
    );

    carXRef.current = nextX;
    setCarX(nextX);

    if (amount < 0) {
      setDirection("left");
    } else if (amount > 0) {
      setDirection("right");
    }
  }, [status]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        event.preventDefault();
        steer(-4);
      }

      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        event.preventDefault();
        steer(4);
      }

      if (event.code === "Space" && status === "ready") {
        event.preventDefault();
        startGame();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [startGame, steer, status]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleTouchSteer = (side: "left" | "right") => {
    steer(side === "left" ? -5 : 5);
  };

  return (
    <main className="home">

      {/* ================= COGNITIVE GAME ================= */}

      <section className="cognitive-game">

        <div className="game-header">

          <div>
            <h1>COGNITIVE RACE</h1>

            <p>
              An illusion-based test of attention and perception.
            </p>
          </div>

          <div className="game-stats">

            <div>
              <span>TIME</span>
              <strong>
                {formatTime(time)}
              </strong>
            </div>

            <div>
              <span>LAP</span>
              <strong>
                {lap} / {TOTAL_LAPS}
              </strong>
            </div>

            <div>
              <span>BEST</span>
              <strong>
                {bestTime === null
                  ? "--.--"
                  : formatTime(bestTime)}
              </strong>
            </div>

          </div>

        </div>


        {/* ================= TRACK ================= */}

        <div className="race-track">

          <div className="track-background" />

          <div className="illusion-lines">

            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />

          </div>


          <div className="track-road">

            <div className="road-line line-one" />
            <div className="road-line line-two" />
            <div className="road-line line-three" />

            <div className="start-line">
              START
            </div>

          </div>


          {/* CAR */}

          <div
            className={`race-car ${direction}`}
            style={{
              left: `${carX}%`,
              top: `${carY}%`,
            }}
          >
            <div className="car-roof" />
            <div className="car-body" />
            <div className="car-window" />
            <div className="car-wheel wheel-left" />
            <div className="car-wheel wheel-right" />
          </div>


          {/* READY */}

          {status === "ready" && (
            <div className="game-overlay">

              <div className="overlay-title">
                READY?
              </div>

              <p>
                Steer with ← → or A / D.
              </p>

              <button onClick={startGame}>
                start race →
              </button>

            </div>
          )}


          {/* FINISHED */}

          {status === "finished" && (
            <div className="game-overlay">

              <div className="overlay-title">
                FINISHED
              </div>

              <p>
                Your time: <strong>{formatTime(time)}s</strong>
              </p>

              {bestTime === time && (
                <p className="new-best">
                  new best time.
                </p>
              )}

              <button onClick={resetGame}>
                race again →
              </button>

            </div>
          )}

        </div>


        {/* TOUCH CONTROLS */}

        {status === "racing" && (
          <div className="touch-controls">

            <button
              onPointerDown={() => handleTouchSteer("left")}
              aria-label="Steer left"
            >
              ←
            </button>

            <span>
              steer
            </span>

            <button
              onPointerDown={() => handleTouchSteer("right")}
              aria-label="Steer right"
            >
              →
            </button>

          </div>
        )}


        {status === "racing" && (
          <div className="game-help">
            avoid the illusion. complete three laps.
          </div>
        )}

      </section>


      {/* ================= SITE TITLE ================= */}

      <div className="home-title">
        computation & cognition lab @ nyu
      </div>


      {/* ================= NAVIGATION ================= */}

      <div className="home-navigation">

        <section className="home-section">

          <div className="home-section-title">
            research
          </div>

          <a href="#">overview</a>
          <a href="#">teaching</a>
          <a href="#">smile new</a>
          <a href="#">psiturk</a>
          <a href="#">nyuconcats</a>
          <a href="#">minds, brains & machines</a>
          <a href="#">videos</a>

        </section>


        <section className="home-section">

          <div className="home-section-title">
            publications
          </div>

          <a href="#">by year</a>
          <a href="#">by topic</a>
          <a href="#">preprints</a>
          <a href="#">osf.io</a>
          <a href="#">github</a>

        </section>


        <section className="home-section">

          <div className="home-section-title">
            people
          </div>

          <a href="#">todd gureckis (pi)</a>
          <a href="#">the team</a>

        </section>


        <section className="home-section">

          <div className="home-section-title">
            location
          </div>

          <a href="#">compcogsci@nyu</a>
          <a href="#">getting involved</a>
          <a href="#">lab docs</a>

        </section>

      </div>

    </main>
  );
}
