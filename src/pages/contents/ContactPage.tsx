import { motion } from 'framer-motion';

interface ContactPageProps {
  isActive?: boolean;
}

export default function ContactPage({ isActive = false }: ContactPageProps) {
  return (
    <div className="book-page book-page-content contact-page">
      <motion.div
        className="chapter-header"
        initial={{ scale: 1.3, opacity: 0 }}
        animate={isActive ? { scale: 1, opacity: 1 } : { scale: 1.3, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="chapter-label">Chapter V</span>
        <span className="chapter-subtitle">Next chapter</span>
      </motion.div>
      <a href="mailto:studyrizqi@gmail.com" className="contact-email">
        studyrizqi@gmail.com
      </a>
      <div className="contact-socials">
        <a
          href="https://github.com/rizqinrr"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-social"
        >
          github
        </a>
        <a
          href="https://www.linkedin.com/in/riznv/"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-social"
        >
          linkedin
        </a>
        <a
          href="https://www.instagram.com/rzqiinrr/"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-social"
        >
          instagram
        </a>
      </div>
    </div>
  );
}
