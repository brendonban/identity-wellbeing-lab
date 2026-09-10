const sections = [
  {
    title: "research",
    links: [
      { name: "overview", href: "/research" },
      { name: "identity & belonging", href: "/research#identity" },
      { name: "mental health & wellbeing", href: "/research#wellbeing" },
      { name: "sexuality & HIV", href: "/research#sexuality" },
    ],
  },
  {
    title: "publications",
    links: [
      { name: "by year", href: "/publications#year" },
      { name: "by topic", href: "/publications#topic" },
      { name: "research outputs", href: "/publications#outputs" },
    ],
  },
  {
    title: "people",
    links: [
      { name: "brendon ban", href: "/people" },
      { name: "collaborators", href: "/people#collaborators" },
    ],
  },
  {
    title: "location",
    links: [
      { name: "kuala lumpur, malaysia", href: "/people#location" },
    ],
  },
];

export default function Home() {
  return (
    <main className="home">
      <div className="home-title">
        identity &amp; wellbeing lab @ malaysia
      </div>

      <div className="home-content">
        {sections.map((section) => (
          <section className="home-section" key={section.title}>
            <div className="home-section-title">
              {section.title}
            </div>

            {section.links.map((link) => (
              <a
                className="home-link"
                href={link.href}
                key={link.name}
              >
                {link.name}
              </a>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
