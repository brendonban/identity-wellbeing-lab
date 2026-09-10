export default function Home() {
  return (
    <main className="home">
      <div className="home-title">
        computation & cognition lab @ nyu
      </div>

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
    </main>
  );
}
