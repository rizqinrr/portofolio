import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences } from '../../data/projects';

interface ExperiencePageProps {
  isActive?: boolean;
}

export default function ExperiencePage({ isActive = false }: ExperiencePageProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="book-page book-page-content experience-page">
      <motion.div
        className="chapter-header"
        initial={{ scale: 1.3, opacity: 0 }}
        animate={isActive ? { scale: 1, opacity: 1 } : { scale: 1.3, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="chapter-label">Chapter III</span>
        <span className="chapter-subtitle">Work & Journey</span>
      </motion.div>

      <div className="experience-toc">
        {experiences.map((exp) => {
          const isExpanded = exp.id === activeId;
          return (
            <div key={exp.id} className="toc-entry-wrapper">
              <div
                className={`toc-entry ${isExpanded ? 'active' : ''}`}
                onClick={() => setActiveId(isExpanded ? null : exp.id)}
                onMouseEnter={() => setActiveId(exp.id)}
              >
                <span className="toc-title">{exp.role}</span>
                <span className="toc-leader" />
                <span className="toc-year">{exp.period}</span>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="toc-detail"
                  >
                    <p className="toc-company">{exp.company} — {exp.type}</p>
                    <p className="toc-desc">{exp.context}</p>
                    {exp.highlights && (
                      <ul className="toc-highlights">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="toc-highlight-item">
                            <span className="toc-bullet">—</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {exp.stack && exp.stack.length > 0 && (
                      <div className="toc-stack">
                        {exp.stack.map((s) => (
                          <span key={s} className="toc-stack-item">{s}</span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
