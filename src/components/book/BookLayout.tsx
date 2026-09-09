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
  const { contentX, scrollProgress, currentPage, goToPage, containerRef } = useHorizontalScroll({
    totalPages: TOTAL_PAGES,
  });

  // Determine if current page is light (content pages 1-5)
  const isLight = currentPage >= 1 && currentPage <= 5;

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
        <AboutPage />
        <SkillsPage />
        <ProjectsPage />
        <ExperiencePage />
        <ContactPage />
        <BackCover />
      </motion.div>

      <PageIndicator current={currentPage} total={TOTAL_PAGES} />
    </div>
  );
}
