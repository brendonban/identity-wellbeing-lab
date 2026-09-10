"use client";

import { useEffect, useState } from "react";

type Shape = {
  id: number;
  type: "circle" | "square" | "triangle";
  x: number;
  y: number;
  size: number;
  rotation: number;
};

const originalShapes: Shape[] = [
  { id: 1, type: "circle", x: 15, y: 25, size: 34, rotation: 0 },
  { id: 2, type: "square", x: 32, y: 18, size: 30, rotation: 0 },
  { id: 3, type: "triangle", x: 49, y: 30, size: 36, rotation: 0 },
  { id: 4, type: "circle", x: 67, y: 20, size: 28, rotation: 0 },
  { id: 5, type: "square", x: 83, y: 32, size: 34, rotation: 0 },
  { id: 6, type: "triangle", x: 22, y: 58, size: 32, rotation: 0 },
  { id: 7, type: "circle", x: 40, y: 70, size: 30, rotation: 0 },
  { id: 8, type: "square", x: 58, y: 55, size: 36, rotation: 0 },
  { id: 9, type: "triangle", x: 75, y: 68, size: 32, rotation: 0 },
  { id: 10, type: "circle", x: 88, y: 58, size: 28, rotation: 0 },
  { id: 11, type: "square", x: 12, y: 78, size: 30, rotation: 0 },
  { id: 12, type: "triangle", x: 52, y: 85, size: 34, rotation: 0 },
];

const changedId = 8;

const changedShapes: Shape[] = originalShapes.map((shape) =>
  shape.id === changedId
    ? { ...shape, type: "circle", size: 48, rotation: 20 }
    : shape
);

export default function Home() {
  const [phase, setPhase] = useState<"watch" | "blank" | "find" | "result">(
    "watch"
  );
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);

  useEffect(() => {
    if (phase !== "watch") return;

    const timer = setTimeout(() => {
      setPhase("blank");

      setTimeout(() => {
        setPhase("find");
      }, 700);
    }, 2500);

    return () => clearTimeout(timer);
  }, [phase]);

  const handleShapeClick = (id: number) => {
    if (phase !== "find") return;

    if (id === changedId) {
      setResult("correct");
    } else {
      setResult("wrong");
    }

    setPhase("result");
  };

  const playAgain = () => {
    setResult(null);
    setPhase("watch");
  };

  const renderShape = (shape: Shape) => {
    const commonStyle = {
      position: "absolute" as const,
      left: `${shape.x}%`,
      top: `${shape.y}%`,
      width: `${shape.size}px`,
      height: `${shape.size}px`,
      transform: `translate(-50%, -50%) rotate(${shape.rotation}deg)`,
    };

    if (shape.type === "circle") {
      return (
        <button
          key={shape.id}
          className="game-shape circle"
          style={commonStyle}
          onClick={() => handleShapeClick(shape.id)}
          aria-label={`Shape ${shape.id}`}
        />
      );
    }

    if (shape.type === "square") {
      return (
        <button
          key={shape.id}
          className="game-shape square"
          style={commonStyle}
          onClick={() => handleShapeClick(shape.id)}
          aria-label={`Shape ${shape.id}`}
        />
      );
    }

    return (
      <button
        key={shape.id}
        className="game-shape triangle"
        style={commonStyle}
        onClick={() => handleShapeClick(shape.id)}
        aria-label={`Shape ${shape.id}`}
      />
    );
  };

  return (
    <main className="home">
      {/* GAME */}

      <section className="game">
        <div className="game-heading">
          <div className="game-title">CAN YOU SPOT THE CHANGE?</div>

          <div className="game-instruction">
            {phase === "watch" && "Remember the shapes."}
            {phase === "blank" && "What changed?"}
            {phase === "find" && "Click the shape that changed."}
            {phase === "result" &&
              (result === "correct"
                ? "Correct."
                : "Not quite. Look closely.")}
          </div>
        </div>

        <div className="game-board">
          {phase === "blank" ? (
            <div className="game-blank">...</div>
          ) : (
            (phase === "watch" ? originalShapes : changedShapes).map(
              renderShape
            )
          )}
        </div>

        {phase === "result" && (
          <div className="game-result">
            <div className="result-message">
              {result === "correct" ? "you noticed it." : "easy to miss."}
            </div>

            <p>
              Change blindness is a phenomenon in which people can fail to
              notice visual changes when their attention is disrupted.
            </p>

            <button className="play-again" onClick={playAgain}>
              play again →
            </button>
          </div>
        )}
      </section>

      {/* LAB */}

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
