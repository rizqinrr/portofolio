interface PageIndicatorProps {
  current: number;
  total: number;
}

export default function PageIndicator({ current, total }: PageIndicatorProps) {
  return (
    <div className="book-page-indicator">
      {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </div>
  );
}
