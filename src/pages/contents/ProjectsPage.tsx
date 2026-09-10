import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/projects';

interface ProjectsPageProps {
  isActive?: boolean;
}

export default function ProjectsPage({ isActive = false }: ProjectsPageProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeProject = projects.find((p) => p.id === activeId);

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

      <div className="projects-split">
        {/* LEFT — Table of Contents list */}
        <div className="projects-toc-list">
          {projects.map((project, i) => {
            const isActiveItem = project.id === activeId;
            return (
              <div key={project.id} className="toc-entry-wrapper">
                <div
                  className={`toc-entry ${isActiveItem ? 'active' : ''}`}
                  onMouseEnter={() => setActiveId(project.id)}
                  onClick={() => setActiveId(project.id)}
                >
                  <span className="toc-number">{String(i + 1).padStart(2, '0')}</span>
                  <span className="toc-title">{project.title}</span>
                  <span className="toc-leader" />
                  <span className="toc-year">{project.year}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT — Preview frame + book lines */}
        <div className="projects-preview">
          {/* Empty frame with book lines (visible when nothing hovered) */}
          <div className={`projects-preview-empty ${activeProject ? 'hidden' : ''}`}>
            <div className="projects-book-lines" />
          </div>

          {/* Active project preview */}
          <AnimatePresence mode="wait">
            {activeProject && (
              <motion.div
                key={activeProject.id}
                className="projects-preview-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Image — grows from center */}
                <div className="projects-preview-frame">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeProject.id}
                      src={activeProject.image}
                      alt={activeProject.title}
                      className="projects-preview-image"
                      initial={{ scale: 0.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.1, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </AnimatePresence>
                </div>

                {/* Book lines under frame */}
                <div className="projects-book-lines" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
