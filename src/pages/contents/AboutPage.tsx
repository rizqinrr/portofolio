import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const photoVariants = {
  hidden: { opacity: 0, scale: 1.12, rotate: -4, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 1.5,
    y: 0,
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const chapterVariants = {
  hidden: { scale: 1.3, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

interface AboutPageProps {
  isActive?: boolean;
}

export default function AboutPage({ isActive = false }: AboutPageProps) {
  return (
    <div className="book-page book-page-content about-page">
      <motion.div
        className="chapter-header"
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={chapterVariants}
      >
        <span className="chapter-label">Chapter I</span>
        <span className="chapter-subtitle">Quick intro</span>
      </motion.div>

      <motion.div
        className="about-wrapper"
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Kolom Kiri: Editorial Intro & CTA */}
        <div className="about-content">
          <motion.h2 className="about-lead" variants={fadeUpVariants}>
            Hi, I’m Rizqi — a software engineer crafting digital products, web experiences, and scalable systems with clarity, structure, and intention.
          </motion.h2>

          <motion.p className="about-paragraph" variants={fadeUpVariants}>
            I care about craft — the quiet discipline reflected in clean abstractions,
            responsive interfaces, and codebases that stay reliable over time.
          </motion.p>

          <motion.div variants={fadeUpVariants}>
            <a href="#projects" className="about-cta">
              <span>More about my work</span>
              <span className="about-cta-arrow">→</span>
            </a>
          </motion.div>
        </div>

        {/* Kolom Kanan: Foto Bingkai Stiker + Quote + Micro-note */}
        <div className="about-aside">
          <motion.div className="about-photo-wrapper" variants={photoVariants}>
            <div className="photo-frame sticker-effect">
              <img
                src="/assets/jpg/foto1nobg.png"
                alt="Muhammad Rizqi"
                className="about-photo"
              />
            </div>
          </motion.div>

          <motion.div className="about-quote-block" variants={fadeUpVariants}>
            <blockquote className="about-pullquote">
              “Code for purpose.
              <br />
              Build for longevity.”
            </blockquote>
            <p className="about-beyond">
              Beyond engineering: system architecture, reading, coffee, and minimal aesthetics.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}


