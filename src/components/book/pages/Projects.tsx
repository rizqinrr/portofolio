import { useState, useRef, useCallback } from 'react';
import { projects } from '../../../data/projects';

export default function Projects() {
  const [preview, setPreview] = useState<{ image: string; x: number; y: number } | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback((image: string) => {
    setPreview({ image, x: 0, y: 0 });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (previewRef.current) {
      const rect = previewRef.current.getBoundingClientRect();
      setPreview((prev) =>
        prev ? { ...prev, x: e.clientX + 20, y: e.clientY - rect.height / 2 } : null
      );
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPreview(null);
  }, []);

  return (
    <div className="book-page projects-page">
      <span className="chapter-label">chapter iii</span>
      <div className="projects-list">
        {projects.map((project, i) => (
          <a
            key={project.id}
            className="project-item"
            href={project.githubUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => handleMouseEnter(project.image)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <span className="project-number">{String(i + 1).padStart(2, '0')}</span>
            <span className="project-name">{project.title}</span>
            <span className="project-phrase">{project.description.split('.')[0]}.</span>
          </a>
        ))}
      </div>

      {/* Floating image preview */}
      <div
        ref={previewRef}
        className={`project-preview ${preview ? 'visible' : ''}`}
        style={
          preview
            ? { left: preview.x, top: preview.y }
            : undefined
        }
      >
        {preview && <img src={preview.image} alt="" />}
      </div>
    </div>
  );
}
