const skillsData = [
  {
    category: 'languages',
    items: ['TypeScript', 'JavaScript', 'PHP', 'Python', 'SQL', 'HTML/CSS'],
  },
  {
    category: 'frameworks',
    items: ['React', 'Next.js', 'Laravel', 'Node.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'tools',
    items: ['Git', 'Docker', 'Vite', 'Figma', 'PostgreSQL', 'Linux'],
  },
];

export default function SkillsPage() {
  return (
    <div className="book-page book-page-content skills-page">
      <span className="chapter-label">chapter ii</span>
      <div className="skills-grid">
        {skillsData.map((group) => (
          <div key={group.category} className="skills-category">
            <h3 className="skills-category-title">{group.category}</h3>
            {group.items.map((item) => (
              <span key={item} className="skills-item">{item}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
