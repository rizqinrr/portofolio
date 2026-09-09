import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function FrontCover() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="book-page cover-page">
      <motion.div
        className="cover-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="cover-tagline" variants={itemVariants}>
          software engineer crafting digital experiences with intention and care
        </motion.p>

        <motion.h1 className="cover-name" variants={itemVariants}>
          MUHAMMAD<br />RIZQI
        </motion.h1>

        <motion.div className="cover-bottom-bar" variants={itemVariants}>
          <span className="cover-bottom-left">
            jakarta, indonesia — {time}
          </span>
          <span className="cover-bottom-center">
            open for collaborations
          </span>
          <span className="cover-bottom-right">
            SCROLL
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
