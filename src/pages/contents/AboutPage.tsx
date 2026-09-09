export default function AboutPage() {
  return (
    <div className="book-page book-page-content about-page">
      <span className="chapter-label">chapter i</span>
      <div className="about-content">
        <p className="about-paragraph">
          I am a software engineer based in Indonesia with a deep interest in building
          digital experiences that are both functional and considered. My work spans
          web development, system design, and the occasional experiment with
          AI-assisted workflows.
        </p>
        <p className="about-paragraph">
          I care about craft — the kind that shows up in clean abstractions,
          thoughtful interfaces, and code that reads well years later. I believe
          good software is quiet, intentional, and built to last.
        </p>
        <p className="about-paragraph">
          Currently exploring the intersection of developer tools, automation,
          and design systems. Always learning, always building.
        </p>
        <blockquote className="about-pullquote">
          "The best interfaces are the ones you don't notice — they simply
          get out of the way and let the work speak."
        </blockquote>
      </div>
    </div>
  );
}
