"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type GameStatus = "ready" | "playing" | "gameover";

export default function Page() {
  const [status, setStatus] = useState<GameStatus>("ready");
  const [score, setScore] = useState(0);
  const [playerY, setPlayerY] = useState(0);
  const [obstacleX, setObstacleX] = useState(100);

  const velocityRef = useRef(0);
  const playerYRef = useRef(0);
  const obstacleXRef = useRef(100);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const scoreRef = useRef(0);
  const speedRef = useRef(0.42);

  const jump = useCallback(() => {
    if (status === "ready") {
      setStatus("playing");
      lastTimeRef.current = performance.now();
    }

    if (status === "playing" && playerYRef.current === 0) {
      velocityRef.current = 0.85;
    }

    if (status === "gameover") {
      setStatus("playing");
      setScore(0);
      scoreRef.current = 0;
      playerYRef.current = 0;
      obstacleXRef.current = 100;
      velocityRef.current = 0;
      speedRef.current = 0.42;
      lastTimeRef.current = performance.now();
    }
  }, [status]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.code === "Space" ||
        event.code === "ArrowUp" ||
        event.code === "KeyW"
      ) {
        event.preventDefault();
        jump();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [jump]);

  useEffect(() => {
    if (status !== "playing") {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const animate = (time: number) => {
      const delta = Math.min(time - lastTimeRef.current, 32);
      lastTimeRef.current = time;

      // Gravity
      velocityRef.current -= 0.0032 * delta;
      playerYRef.current += velocityRef.current * delta;

      if (playerYRef.current <= 0) {
        playerYRef.current = 0;
        velocityRef.current = 0;
      }

      // Move obstacle
      obstacleXRef.current -= speedRef.current * delta;

      if (obstacleXRef.current < -10) {
        obstacleXRef.current = 100 + Math.random() * 20;
        scoreRef.current += 1;
        setScore(scoreRef.current);

        // Gradually increase speed
        speedRef.current = Math.min(
          0.75,
          0.42 + scoreRef.current * 0.008
        );
      }

      // Collision
      const playerLeft = 11;
      const playerRight = 17;
      const obstacleLeft = obstacleXRef.current;
      const obstacleRight = obstacleXRef.current + 5;

      const playerBottom = playerYRef.current;
      const playerTop = playerYRef.current + 9;

      if (
        obstacleRight > playerLeft &&
        obstacleLeft < playerRight &&
        playerBottom < 8 &&
        playerTop > 0
      ) {
        setStatus("gameover");
        return;
      }

      setPlayerY(playerYRef.current);
      setObstacleX(obstacleXRef.current);

      animationRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [status]);

  return (
    <main className="home">
      {/* GAME */}

      <section className="cognitive-game">
        <div className="game-top">
          <div className="game-name">COGNITIVE GAME</div>

          <div className="game-score">
            {String(score).padStart(5, "0")}
          </div>
        </div>

        <div
          className="game"
          onPointerDown={jump}
          role="button"
          tabIndex={0}
          aria-label="Cognitive game. Tap or press space to jump."
        >
          <div className="illusion">
            <div className="illusion-shape illusion-one" />
            <div className="illusion-shape illusion-two" />
            <div className="illusion-shape illusion-three" />
          </div>

          <div className="cloud cloud-one" />
          <div className="cloud cloud-two" />

          <div className="ground">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          {/* Mushroom */}

          <div
            className="mushroom"
            style={{
              bottom: `${playerY + 7}%`,
            }}
          >
            <div className="mushroom-cap">
              <i className="spot spot-one" />
              <i className="spot spot-two" />
              <i className="spot spot-three" />
            </div>

            <div className="mushroom-face">
              <i className="eye eye-left" />
              <i className="eye eye-right" />
            </div>

            <div className="mushroom-feet">
              <i />
              <i />
            </div>
          </div>

          {/* Obstacle */}

          <div
            className="obstacle"
            style={{
              left: `${obstacleX}%`,
            }}
          >
            <div className="obstacle-top" />
            <div className="obstacle-body" />
          </div>

          {/* Start */}

          {status === "ready" && (
            <div className="game-message">
              <strong>SPACE / TAP</strong>
              <span>jump</span>
            </div>
          )}

          {/* Game Over */}

          {status === "gameover" && (
            <div className="game-message">
              <strong>GAME OVER</strong>
              <span>tap to restart</span>
            </div>
          )}
        </div>
      </section>

      {/* SITE TITLE */}

      <div className="home-title">
        computation & cognition lab @ nyu
      </div>

      {/* NAVIGATION */}

      <div className="home-navigation">
        <section className="home-section">
          <div className="home-section-title">research</div>

          <a href="#">overview</a>
          <a href="#">teaching</a>
          <a href="#">smile new</a>
          <a href="#">psiturk</a>
          <a href="#">nyuconcats</a>
          <a href="#">minds, brains & machines</a>
          <a href="#">videos</a>
        </section>

        <section className="home-section">
          <div className="home-section-title">publications</div>

          <a href="#">by year</a>
          <a href="#">by topic</a>
          <a href="#">preprints</a>
          <a href="#">osf.io</a>
          <a href="#">github</a>
        </section>

        <section className="home-section">
          <div className="home-section-title">people</div>

          <a href="#">todd gureckis (pi)</a>
          <a href="#">the team</a>
        </section>

        <section className="home-section">
          <div className="home-section-title">location</div>

          <a href="#">compcogsci@nyu</a>
          <a href="#">getting involved</a>
          <a href="#">lab docs</a>
        </section>
      </div>
    </main>
  );
}
