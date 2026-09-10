"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((current) => current + 1);
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="home">
      {/* Optical illusion */}
      <section className="illusion">
        <div className="illusion-label">
          <span>PERCEPTION</span>
          <span>∞</span>
        </div>

        <div className="illusion-stage">
          <div
            className="illusion-wheel"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <div className="ring ring-1" />
            <div className="ring ring-2" />
            <div className="ring ring-3" />
            <div className="ring ring-4" />
            <div className="ring ring-5" />
            <div className="ring ring-6" />
          </div>

          <div className="illusion-center" />
        </div>
      </section>

      <div className="home-title">
        computation & cognition lab @ nyu
      </div>

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
