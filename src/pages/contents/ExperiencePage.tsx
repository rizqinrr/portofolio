import { motion } from 'framer-motion';
import { experiences } from '../../data/projects';

interface ExperiencePageProps {
  isActive?: boolean;
}

export default function ExperiencePage({ isActive = false }: ExperiencePageProps) {
  return (
    <div className="book-page book-page-content experience-page">
      <motion.div
        className="chapter-header"
        initial={{ scale: 1.3, opacity: 0 }}
        animate={isActive ? { scale: 1, opacity: 1 } : { scale: 1.3, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="chapter-label">Chapter III</span>
        <span className="chapter-subtitle">Work &amp; Journey</span>
      </motion.div>

      <div className="experience-scroll" data-inner-scroll>
        <div className="experience-list">
          {experiences.map((exp, i) => (
            <div key={exp.id}>
              <article className="exp-entry">
                <span className="exp-marker" aria-hidden="true" />
                <span className="exp-year">{exp.period}</span>

                <div className="exp-body">
                  <h3 className="exp-role">{exp.role}</h3>
                  <p className="exp-meta">
                    {exp.company} — {exp.type}
                  </p>
                  <p className="exp-context">{exp.context}</p>

                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="exp-highlights">
                      {exp.highlights.map((h, idx) => (
                        <li key={idx} className="exp-highlight-item">
                          <span className="exp-bullet">—</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.stack && exp.stack.length > 0 && (
                    <p className="exp-stack">
                      {exp.stack.map((s, idx) => (
                        <span key={s} className="exp-stack-item">
                          {s}
                          {idx < exp.stack!.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              </article>

              {i < experiences.length - 1 && (
                <div className="exp-fleuron" aria-hidden="true">
                  ❦
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
