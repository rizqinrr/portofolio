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
  const { currentPage, goToPage, containerRef } = useHorizontalScroll({
    totalPages: TOTAL_PAGES,
  });

  const pageWidth = `calc(100vw - var(--sidebar-width))`;

  return (
    <div className="book-layout" ref={containerRef}>
      <Sidebar currentPage={currentPage} onNavigate={goToPage} />

      <div
        className="book-pages"
        style={{
          transform: `translateX(calc(-${currentPage} * ${pageWidth}))`,
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
