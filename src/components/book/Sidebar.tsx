import { motion, MotionValue } from 'framer-motion';

interface SidebarProps {
  currentPage: number;
  onNavigate: (index: number) => void;
  isLight?: boolean;
  scrollProgress?: MotionValue<number>;
}

export default function Sidebar({ isLight, scrollProgress }: SidebarProps) {
  return (
    <aside className={`book-sidebar ${isLight ? 'light' : ''}`}>
      {/* Sticky line — flows with scroll */}
      {scrollProgress && (
        <motion.div
          className="sidebar-line"
          style={{
            scaleY: scrollProgress,
          }}
        />
      )}

      {/* Hamburger */}
      <button className="sidebar-hamburger" aria-label="Open navigation">
        <span />
        <span />
        <span />
      </button>

      {/* Vertical text — top */}
      <div className="sidebar-vertical sidebar-top">
        FOLIO — EDITION
      </div>

      {/* Vertical text — center */}
      <div className="sidebar-vertical sidebar-center">
        MUHAMMAD RIZQI NURRAHMAN <span className="sidebar-reg">®</span>
      </div>

      {/* Vertical text — bottom */}
      <div className="sidebar-vertical sidebar-bottom">
        © 2026
      </div>
    </aside>
  );
}
