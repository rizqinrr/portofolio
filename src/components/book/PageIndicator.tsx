interface PageIndicatorProps {
  current: number;
  total: number;
}

export default function PageIndicator({ current, total }: PageIndicatorProps) {
  // Hide on cover pages (first and last)
  if (current === 0 || current === total - 1) {
    return null;
  }

  return (
    <div className="book-page-indicator">
      {String(current + 1).padStart(2, '0')}
    </div>
  );
}
