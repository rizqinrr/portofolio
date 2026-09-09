interface SidebarProps {
  currentPage: number;
  onNavigate: (index: number) => void;
}

export default function Sidebar(_props: SidebarProps) {
  return (
    <aside className="book-sidebar">
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
        muhammad rizqi nurrahman ™
      </div>

      {/* Vertical text — bottom */}
      <div className="sidebar-vertical sidebar-bottom">
        © 2026
      </div>
    </aside>
  );
}
