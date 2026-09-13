interface PageArrowsProps {
  currentPage: number;
  totalPages: number;
  onNavigate: (index: number) => void;
}

export default function PageArrows({
  currentPage,
  totalPages,
  onNavigate,
}: PageArrowsProps) {
  const atStart = currentPage <= 0;
  const atEnd = currentPage >= totalPages - 1;

  // Cover pages carry no chapter header — arrows would break the composition.
  if (atStart || atEnd) return null;

  return (
    <>
      <button
        type="button"
        className="page-arrow page-arrow-prev"
        onClick={() => onNavigate(currentPage - 1)}
        aria-label="Previous page"
      >
        <span aria-hidden="true">←</span>
      </button>
      <button
        type="button"
        className="page-arrow page-arrow-next"
        onClick={() => onNavigate(currentPage + 1)}
        aria-label="Next page"
      >
        <span aria-hidden="true">→</span>
      </button>
    </>
  );
}
