import { motion } from 'framer-motion';

interface SkillsPageProps {
  isActive?: boolean;
}

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

export default function SkillsPage({ isActive = false }: SkillsPageProps) {
  return (
    <div className="book-page book-page-content skills-page">
      <motion.div
        className="chapter-header"
        initial={{ scale: 1.3, opacity: 0 }}
        animate={isActive ? { scale: 1, opacity: 1 } : { scale: 1.3, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="chapter-label">Chapter IV</span>
        <span className="chapter-subtitle">What I do & Stack</span>
      </motion.div>
      <div className="skills-columns">
        {skillsData.map((group) => (
          <div key={group.category} className="skills-column">
            <h3 className="skills-column-title">{group.category}</h3>
            <ul className="skills-list">
              {group.items.map((item) => (
                <li key={item} className="skills-list-item">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
