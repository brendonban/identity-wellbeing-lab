"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );

    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <main className="home">
      {/* Theme control */}
      <div className="theme-control">
        <button
          onClick={() => setDarkMode(false)}
          className={!darkMode ? "active" : ""}
        >
          light
        </button>

        <span>/</span>

        <button
          onClick={() => setDarkMode(true)}
          className={darkMode ? "active" : ""}
        >
          dark
        </button>
      </div>

      {/* Pattern */}
      <section className="pattern-video">
        <video
          src="https://www.gureckislab.org/assets/pattern.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </section>

      {/* Title */}
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
}
