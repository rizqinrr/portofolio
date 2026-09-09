import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';
import Sidebar from './Sidebar';
import PageIndicator from './PageIndicator';
import Cover from './pages/Cover';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import Colophon from './pages/Colophon';

const TOTAL_PAGES = 7;

export default function BookLayout() {
  const { scrollPosition, currentPage, goToPage, containerRef, pageWidth } = useHorizontalScroll({
    totalPages: TOTAL_PAGES,
  });

  const maxScroll = pageWidth * (TOTAL_PAGES - 1);
  const scrollProgress = maxScroll > 0 ? scrollPosition / maxScroll : 0;

  // Determine if current page is light (non-cover pages)
  const isLight = currentPage > 0;

  return (
    <div className="book-layout" ref={containerRef}>
      <Sidebar
        currentPage={currentPage}
        onNavigate={goToPage}
        isLight={isLight}
        scrollProgress={scrollProgress}
      />

      <div
        className="book-pages"
        style={{
          transform: `translateX(-${scrollPosition}px)`,
        }}
      >
        <Cover />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Colophon />
      </div>

      <PageIndicator current={currentPage} total={TOTAL_PAGES} />
    </div>
  );
}
