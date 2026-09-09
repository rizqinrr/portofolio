const experienceData = [
  {
    year: '2024 — now',
    company: 'Freelance',
    role: 'Software Engineer',
  },
  {
    year: '2023 — 2024',
    company: 'Personal Projects',
    role: 'Full-Stack Developer',
  },
  {
    year: '2022 — 2023',
    company: 'University',
    role: 'Computer Science Student',
  },
];

export default function ExperiencePage() {
  return (
    <div className="book-page book-page-content experience-page">
      <span className="chapter-label">chapter iv</span>
      <div className="experience-list">
        {experienceData.map((item) => (
          <div key={item.year} className="experience-item">
            <span className="experience-year">{item.year}</span>
            <div className="experience-detail">
              <span className="experience-company">{item.company}</span>
              <span className="experience-role">{item.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
