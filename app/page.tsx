"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 18;

      setOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const triggerGame = () => {
    setActive(true);

    setTimeout(() => {
      setActive(false);
    }, 900);
  };

  return (
    <main className="home">
      {/* Perception Game */}

      <button
        className={`perception-game ${active ? "game-active" : ""}`}
        onClick={triggerGame}
        aria-label="Play perception game"
      >
        <span
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
          }}
        >
          PERCEPTION
        </span>

        <span
          style={{
            transform: `translate(${-offset.x}px, ${-offset.y}px)`,
          }}
        >
          GAME
        </span>
      </button>

      {/* Lab title */}

      <div className="home-title">
        computation & cognition lab @ nyu
      </div>

      {/* Navigation */}

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
}        <a href="#">getting involved</a>
        <a href="#">lab docs</a>
      </section>
    </main>
  );
}
