import { useEffect } from 'react';
import { projects, experiences } from '../../data/projects';
import { certificates } from '../../data/certificates';
import { getAssetUrl } from '../../utils/assets';

const PRINT_COPY = {
  aboutLead:
    'Hi, I’m Rizqi — a software engineer crafting digital products, web experiences, and scalable systems with clarity, structure, and intention.',
  aboutParagraph:
    'I care about craft — the quiet discipline reflected in clean abstractions, responsive interfaces, and codebases that stay reliable over time.',
  pullquote: '“Code for purpose. Build for longevity.”',
  beyond:
    'Beyond engineering: system architecture, reading, coffee, and minimal aesthetics.',
  coverTagline:
    'software engineer crafting digital experiences with intention and care',
  coverName: ['MUHAMMAD', 'RIZQI'],
  coverMeta: ['jakarta, indonesia', 'open for collaborations'],
  galleryChapter: 'Chapter IV',
  galleryTitle: 'Certifications & Courses',
  skillsChapter: 'Chapter V',
  skillsTitle: 'Skills & Stack',
  contactChapter: 'Chapter VI',
  contactTitle: 'Next chapter',
  backcoverLines: [
    'built with react, typescript, and vite',
    'styled with tailwind css',
    'typeset in playfair display and inter',
    'deployed on github pages',
    '© 2026 muhammad rizqi nurrahman',
  ],
  backcoverClosing: '"this page intentionally left blank."',
  signature: 'Muhammad Rizqi Nurrahman',
  skillsGroups: [
    {
      name: 'Languages',
      items: ['TypeScript', 'JavaScript', 'PHP', 'Python', 'HTML', 'CSS'],
    },
    {
      name: 'Frontend',
      items: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Alpine.js'],
    },
    {
      name: 'Backend & Data',
      items: ['Node.js', 'Laravel', 'Express.js', 'PostgreSQL', 'MySQL', 'Supabase'],
    },
    {
      name: 'Tools',
      items: ['Git', 'Docker', 'Vite', 'Figma', 'Linux', 'Postman'],
    },
  ],
};

function PrintSection({
  chapter,
  title,
  children,
  className = '',
}: {
  chapter: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`print-section ${className}`.trim()}>
      <header className="print-section-head">
        <span className="print-chapter-label">{chapter}</span>
        <h2 className="print-chapter-title">{title}</h2>
      </header>
      {children}
    </section>
  );
}

function PrintProjectCard({ index }: { index: number }) {
  const project = projects[index];

  return (
    <article className="print-project">
      <div className="print-project-head">
        <span className="print-project-number">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="print-project-title">{project.title}</h3>
        <span className="print-project-year">{project.year}</span>
      </div>

      <span className="print-project-status">{project.status}</span>

      <div className="print-project-body">
        <div>
          <p className="print-project-desc">{project.description}</p>

          <p className="print-project-stack">{project.stack.join(' · ')}</p>

          <ul className="print-project-highlights">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="print-project-highlight">
                <span className="print-project-bullet">—</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          {(project.githubUrl || project.demoUrl) && (
            <div className="print-project-links">
              {project.githubUrl && (
                <a className="print-project-link" href={project.githubUrl}>
                  GitHub
                </a>
              )}
              {project.demoUrl && (
                <a className="print-project-link" href={project.demoUrl}>
                  Live Demo
                </a>
              )}
            </div>
          )}
        </div>

        <figure className="print-project-figure">
          <img
            className="print-project-image"
            src={project.image}
            alt={project.title}
          />
        </figure>
      </div>
    </article>
  );
}

function PrintExperienceEntry({ index }: { index: number }) {
  const exp = experiences[index];

  return (
    <article className="print-exp-entry">
      <span className="print-exp-period">{exp.period}</span>
      <h3 className="print-exp-role">{exp.role}</h3>
      <p className="print-exp-meta">
        {exp.company} — {exp.type}
      </p>
      <p className="print-exp-context">{exp.context}</p>

      {exp.highlights.length > 0 && (
        <ul className="print-exp-highlights">
          {exp.highlights.map((highlight) => (
            <li key={highlight} className="print-exp-highlight">
              <span className="print-project-bullet">—</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      )}

      {exp.stack && exp.stack.length > 0 && (
        <p className="print-exp-stack">{exp.stack.join(', ')}</p>
      )}
    </article>
  );
}

export default function PrintDocument() {
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    root.classList.add('is-print');
    body.classList.add('is-print');
    return () => {
      root.classList.remove('is-print');
      body.classList.remove('is-print');
    };
  }, []);

  return (
    <div className="print-doc">
      {/* Cover */}
      <section className="print-cover">
        <p className="print-cover-tagline">{PRINT_COPY.coverTagline}</p>
        <h1 className="print-cover-name">
          {PRINT_COPY.coverName[0]}
          <br />
          {PRINT_COPY.coverName[1]}
        </h1>
        <div className="print-cover-meta">
          {PRINT_COPY.coverMeta.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      {/* About */}
      <PrintSection chapter="Chapter I" title="Quick intro">
        <div className="print-about">
          <div className="print-about-content">
            <p className="print-about-lead">{PRINT_COPY.aboutLead}</p>
            <p className="print-about-paragraph">{PRINT_COPY.aboutParagraph}</p>
          </div>

          <div className="print-about-aside">
            <div className="print-photo-frame">
              <img
                className="print-about-photo"
                src={getAssetUrl('assets/jpg/foto1nobg.png')}
                alt="Muhammad Rizqi"
              />
            </div>
            <div>
              <blockquote className="print-pullquote">
                {PRINT_COPY.pullquote}
              </blockquote>
              <p className="print-beyond">{PRINT_COPY.beyond}</p>
            </div>
          </div>
        </div>
      </PrintSection>

      {/* Projects */}
      <PrintSection chapter="Chapter II" title="Projects">
        {projects.map((project, index) => (
          <PrintProjectCard key={project.id} index={index} />
        ))}
      </PrintSection>

      {/* Experience */}
      <PrintSection chapter="Chapter III" title="Work &amp; Journey">
        <div className="print-experience">
          {experiences.map((exp, index) => (
            <PrintExperienceEntry key={exp.id} index={index} />
          ))}
        </div>
      </PrintSection>

      {/* Gallery */}
      <PrintSection chapter={PRINT_COPY.galleryChapter} title={PRINT_COPY.galleryTitle}>
        <div className="print-gallery-grid">
          {certificates.map((cert) => (
            <figure key={cert.id} className="print-cert-tile">
              <div className="print-cert-frame">
                <img
                  className="print-cert-image"
                  src={cert.image}
                  alt={cert.subtitle}
                />
              </div>
              <figcaption className="print-cert-caption">
                {cert.subtitle}
              </figcaption>
            </figure>
          ))}
        </div>
      </PrintSection>

      {/* Skills */}
      <PrintSection chapter={PRINT_COPY.skillsChapter} title={PRINT_COPY.skillsTitle}>
        <div className="print-skills">
          {PRINT_COPY.skillsGroups.map((group) => (
            <div key={group.name} className="print-skill-group">
              <span className="print-skill-group-name">{group.name}</span>
              <span className="print-skill-group-items">
                {group.items.join(' · ')}
              </span>
            </div>
          ))}
        </div>
      </PrintSection>

      {/* Contact */}
      <PrintSection chapter={PRINT_COPY.contactChapter} title={PRINT_COPY.contactTitle}>
        <div className="print-contact">
          <span className="print-contact-email">studyrizqi@gmail.com</span>
          <div className="print-contact-socials">
            <span className="print-contact-social">
              github.com/rizqinrr
            </span>
            <span className="print-contact-social">
              linkedin.com/in/riznv
            </span>
            <span className="print-contact-social">
              instagram.com/rzqiinrr
            </span>
          </div>
        </div>
      </PrintSection>

      {/* Back cover */}
      <section className="print-backcover">
        <div>
          {PRINT_COPY.backcoverLines.map((line) => (
            <p key={line} className="print-colophon-line">
              {line}
            </p>
          ))}
          <p className="print-colophon-closing">{PRINT_COPY.backcoverClosing}</p>
          <p className="print-signature">{PRINT_COPY.signature}</p>
        </div>
      </section>
    </div>
  );
}
