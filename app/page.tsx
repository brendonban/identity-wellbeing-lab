"use client";

import { useEffect, useState } from "react";

type Shape = {
  id: number;
  type: "circle" | "square" | "triangle";
  x: number;
  y: number;
  size: number;
};

const baseShapes: Shape[] = [
  { id: 1, type: "circle", x: 14, y: 25, size: 34 },
  { id: 2, type: "square", x: 32, y: 18, size: 30 },
  { id: 3, type: "triangle", x: 50, y: 29, size: 36 },
  { id: 4, type: "circle", x: 68, y: 20, size: 28 },
  { id: 5, type: "square", x: 84, y: 31, size: 34 },
  { id: 6, type: "triangle", x: 22, y: 61, size: 32 },
  { id: 7, type: "circle", x: 41, y: 72, size: 30 },
  { id: 8, type: "square", x: 59, y: 57, size: 36 },
  { id: 9, type: "triangle", x: 76, y: 68, size: 32 },
  { id: 10, type: "circle", x: 89, y: 57, size: 28 },
];

const TOTAL_ROUNDS = 5;

function createRound() {
  const changedId =
    baseShapes[Math.floor(Math.random() * baseShapes.length)].id;

  const changedShapes = baseShapes.map((shape) => {
    if (shape.id !== changedId) {
      return shape;
    }

    return {
      ...shape,
      type:
        shape.type === "circle"
          ? "square"
          : shape.type === "square"
            ? "triangle"
            : "circle",
    };
  });

  return {
    shapes: changedShapes,
    changedId,
  };
}

export default function Page() {
  const [shapes, setShapes] = useState<Shape[]>(baseShapes);
  const [changedId, setChangedId] = useState<number | null>(null);

  const [phase, setPhase] = useState<
    "start" | "showing" | "flicker" | "answer" | "finished"
  >("start");

  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);

  const [message, setMessage] = useState("");

  const startRound = () => {
    const newRound = createRound();

    setShapes(baseShapes);
    setChangedId(newRound.changedId);
    setMessage("");
    setPhase("showing");

    setTimeout(() => {
      setPhase("flicker");

      setTimeout(() => {
        setShapes(newRound.shapes);
        setPhase("answer");
      }, 180);
    }, 1200);
  };

  const handleShapeClick = (id: number) => {
    if (phase !== "answer") return;

    if (id === changedId) {
      setScore((current) => current + 1);
      setMessage("correct");

      setTimeout(() => {
        if (round >= TOTAL_ROUNDS) {
          setPhase("finished");
        } else {
          setRound((current) => current + 1);
          startRound();
        }
      }, 700);
    } else {
      setMessage("not this one");

      setTimeout(() => {
        if (round >= TOTAL_ROUNDS) {
          setPhase("finished");
        } else {
          setRound((current) => current + 1);
          startRound();
        }
      }, 700);
    }
  };

  const restart = () => {
    setRound(1);
    setScore(0);
    setMessage("");
    setChangedId(null);
    setShapes(baseShapes);
    setPhase("start");
  };

  useEffect(() => {
    if (phase === "showing") {
      // The timers inside startRound handle the sequence.
    }
  }, [phase]);

  return (
    <main className="home">

      {/* ================= GAME ================= */}

      <section className="cognitive-game">

        <div className="game-header">

          <span>COGNITIVE GAME</span>

          <span>
            {String(score).padStart(2, "0")} / {TOTAL_ROUNDS}
          </span>

        </div>


        <div className="game">

          {/* START */}

          {phase === "start" && (
            <div className="game-message">

              <strong>SPOT THE CHANGE</strong>

              <button onClick={startRound}>
                start →
              </button>

            </div>
          )}


          {/* FLICKER */}

          {phase === "flicker" && (
            <div className="flicker" />
          )}


          {/* SHAPES */}

          {phase !== "start" && phase !== "finished" && (
            <div className="shape-scene">

              {shapes.map((shape) => (
                <button
                  key={shape.id}
                  className={`shape-button ${
                    phase === "answer" ? "can-click" : ""
                  }`}
                  style={{
                    left: `${shape.x}%`,
                    top: `${shape.y}%`,
                    width: `${shape.size}px`,
                    height: `${shape.size}px`,
                  }}
                  onClick={() => handleShapeClick(shape.id)}
                  aria-label="Shape"
                >
                  {shape.type === "circle" && (
                    <span className="shape circle" />
                  )}

                  {shape.type === "square" && (
                    <span className="shape square" />
                  )}

                  {shape.type === "triangle" && (
                    <span className="shape triangle" />
                  )}
                </button>
              ))}

            </div>
          )}


          {/* ROUND */}

          {phase === "showing" && (
            <div className="round-label">
              remember
            </div>
          )}


          {phase === "answer" && (
            <div className="round-label">
              which changed?
            </div>
          )}


          {/* FEEDBACK */}

          {message && (
            <div className="feedback">
              {message}
            </div>
          )}


          {/* FINISHED */}

          {phase === "finished" && (
            <div className="game-message">

              <strong>
                {score} / {TOTAL_ROUNDS}
              </strong>

              <span>
                {score === TOTAL_ROUNDS
                  ? "you noticed everything."
                  : "nice try."}
              </span>

              <button onClick={restart}>
                play again →
              </button>

            </div>
          )}

        </div>


        <div className="game-footer">

          <span>
            {phase !== "finished" &&
              phase !== "start" &&
              `round ${round} / ${TOTAL_ROUNDS}`}
          </span>

        </div>

      </section>


      {/* ================= TITLE ================= */}

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
