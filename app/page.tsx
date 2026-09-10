"use client";

import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [playing, setPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [jumping, setJumping] = useState(false);
  const [score, setScore] = useState(0);
  const [obstacleLeft, setObstacleLeft] = useState(90);

  const scoreRef = useRef(0);
  const obstacleRef = useRef(90);
  const jumpRef = useRef(false);
  const animationRef = useRef<number | null>(null);

  const jump = () => {
    if (gameOver) {
      setGameOver(false);
      setPlaying(true);
      setScore(0);
      scoreRef.current = 0;
      obstacleRef.current = 90;
      setObstacleLeft(90);
    }

    if (!playing && !gameOver) {
      setPlaying(true);
    }

    if (!jumpRef.current) {
      jumpRef.current = true;
      setJumping(true);

      setTimeout(() => {
        jumpRef.current = false;
        setJumping(false);
      }, 650);
    }
  };

  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener("keydown", keyDown);

    return () => window.removeEventListener("keydown", keyDown);
  }, [playing, gameOver]);

  useEffect(() => {
    if (!playing) return;

    const loop = () => {
      obstacleRef.current -= 0.22;

      if (obstacleRef.current < -8) {
        obstacleRef.current = 90;
        scoreRef.current += 1;
        setScore(scoreRef.current);
      }

      setObstacleLeft(obstacleRef.current);

      /*
       * Very forgiving collision zone.
       * You only need to jump when the obstacle
       * gets close to the mushroom.
       */
      if (
        obstacleRef.current > 10 &&
        obstacleRef.current < 17 &&
        !jumpRef.current
      ) {
        setPlaying(false);
        setGameOver(true);
      }

      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [playing]);

  return (
    <main className="home">

      {/* GAME */}

      <section className="cognitive-game">

        <div className="game-header">
          <span>COGNITIVE GAME</span>

          <span>
            {String(score).padStart(4, "0")}
          </span>
        </div>

        <div className="game" onPointerDown={jump}>

          {/* subtle perception illusion */}

          <div className="illusion">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>

          {/* ground */}

          <div className="ground" />

          {/* mushroom */}

          <div
            className={`mushroom ${jumping ? "jump" : ""}`}
          >
            <div className="cap">
              <span />
              <span />
              <span />
            </div>

            <div className="head">
              <i />
              <i />
            </div>

            <div className="feet">
              <b />
              <b />
            </div>
          </div>

          {/* obstacle */}

          <div
            className="obstacle"
            style={{
              left: `${obstacleLeft}%`,
            }}
          >
            <div />
            <div />
          </div>

          {/* instruction */}

          {!playing && !gameOver && (
            <div className="message">
              <strong>TAP / SPACE</strong>
              <span>jump</span>
            </div>
          )}

          {/* game over */}

          {gameOver && (
            <div className="message">
              <strong>GAME OVER</strong>
              <span>tap to restart</span>
            </div>
          )}

        </div>

      </section>


      {/* TITLE */}

      <div className="home-title">
        computation & cognition lab @ nyu
      </div>


      {/* NAVIGATION */}

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
