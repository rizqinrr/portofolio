import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';
import Sidebar from './Sidebar';
import PageIndicator from './PageIndicator';
import FrontCover from '../../pages/cover/FrontCover';
import BackCover from '../../pages/cover/BackCover';
import AboutPage from '../../pages/contents/AboutPage';
import SkillsPage from '../../pages/contents/SkillsPage';
import ProjectsPage from '../../pages/contents/ProjectsPage';
import ExperiencePage from '../../pages/contents/ExperiencePage';
import ContactPage from '../../pages/contents/ContactPage';

const TOTAL_PAGES = 7;

export default function BookLayout() {
  const { contentX, smoothScrollX, scrollProgress, currentPage, goToPage, containerRef, pageWidth } = useHorizontalScroll({
    totalPages: TOTAL_PAGES,
  });

  // Switch theme exactly when the dividing line touches the sidebar edge
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const unsubscribe = smoothScrollX.on('change', (pos) => {
      if (pageWidth <= 0) return;
      // Front cover is from 0 to pageWidth. At pos >= pageWidth - 4, page 1 touches the sidebar.
      // Pages 1 to 5 are light (totalPages - 1 = 6 is BackCover). At pos >= 6 * pageWidth - 4, back cover touches sidebar.
      const lightActive = pos >= pageWidth - 4 && pos < (TOTAL_PAGES - 1) * pageWidth - 4;
      setIsLight(lightActive);
    });

    return unsubscribe;
  }, [smoothScrollX, pageWidth]);

  return (
    <div className="book-layout" ref={containerRef}>
      <Sidebar
        currentPage={currentPage}
        onNavigate={goToPage}
        isLight={isLight}
        scrollProgress={scrollProgress}
      />

      <motion.div
        className="book-pages"
        style={{ x: contentX }}
      >
        <FrontCover />
        <AboutPage isActive={currentPage === 1} />
        <ProjectsPage isActive={currentPage === 2} />
        <ExperiencePage isActive={currentPage === 3} />
        <SkillsPage isActive={currentPage === 4} />
        <ContactPage isActive={currentPage === 5} />
        <BackCover isActive={currentPage === TOTAL_PAGES - 1} />
      </motion.div>

      <PageIndicator current={currentPage} total={TOTAL_PAGES} />
    </div>
  );
}
