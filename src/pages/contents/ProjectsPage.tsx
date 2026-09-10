import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/projects';

interface ProjectsPageProps {
  isActive?: boolean;
}

export default function ProjectsPage({ isActive = false }: ProjectsPageProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="book-page book-page-content projects-page">
      <motion.div
        className="chapter-header"
        initial={{ scale: 1.3, opacity: 0 }}
        animate={isActive ? { scale: 1, opacity: 1 } : { scale: 1.3, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="chapter-label">Chapter II</span>
        <span className="chapter-subtitle">Selected works</span>
      </motion.div>

      <div className="projects-toc">
        {projects.map((project, i) => {
          const isExpanded = project.id === activeId;
          return (
            <div key={project.id} className="toc-entry-wrapper">
              <div
                className={`toc-entry ${isExpanded ? 'active' : ''}`}
                onClick={() => setActiveId(isExpanded ? null : project.id)}
                onMouseEnter={() => setActiveId(project.id)}
              >
                <span className="toc-number">{String(i + 1).padStart(2, '0')}</span>
                <span className="toc-title">{project.title}</span>
                <span className="toc-leader" />
                <span className="toc-year">{project.year}</span>
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
                    <p className="toc-desc">{project.description}</p>
                    <div className="toc-stack">
                      {project.stack.map((item) => (
                        <span key={item} className="toc-stack-item">{item}</span>
                      ))}
                    </div>
                    <ul className="toc-highlights">
                      {project.highlights.map((point, idx) => (
                        <li key={idx} className="toc-highlight-item">
                          <span className="toc-bullet">—</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="toc-links">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="toc-link">
                          github ↗
                        </a>
                      )}
                      {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="toc-link">
                          live demo ↗
                        </a>
                      )}
                    </div>
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
