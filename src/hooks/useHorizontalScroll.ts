import { useState, useEffect, useCallback, useRef } from 'react';

interface UseHorizontalScrollOptions {
  totalPages: number;
  transitionDuration?: number;
}

export function useHorizontalScroll({ totalPages }: UseHorizontalScrollOptions) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pageWidth = typeof window !== 'undefined' ? window.innerWidth - 62 : 0;

  // Calculate current page from scroll position
  const updateCurrentPage = useCallback((pos: number) => {
    const page = Math.round(pos / pageWidth);
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
  }, [pageWidth, totalPages]);

  // Wheel handler — free scroll, no snap
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const maxScroll = pageWidth * (totalPages - 1);
      const newPos = Math.max(0, Math.min(scrollPosition + e.deltaY, maxScroll));

      setScrollPosition(newPos);
      updateCurrentPage(newPos);

      // Debounce scroll end
      isScrolling.current = true;
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
      }, 150);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [scrollPosition, pageWidth, totalPages, updateCurrentPage]);

  // Touch handler — free scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartPos = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      touchStartPos = scrollPosition;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const deltaX = touchStartX.current - e.touches[0].clientX;
      const deltaY = touchStartY.current - e.touches[0].clientY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault();
        const maxScroll = pageWidth * (totalPages - 1);
        const newPos = Math.max(0, Math.min(touchStartPos + deltaX, maxScroll));
        setScrollPosition(newPos);
        updateCurrentPage(newPos);
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [scrollPosition, pageWidth, totalPages, updateCurrentPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const maxScroll = pageWidth * (totalPages - 1);
      let newPos = scrollPosition;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        newPos = Math.min(scrollPosition + pageWidth, maxScroll);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        newPos = Math.max(scrollPosition - pageWidth, 0);
      }

      if (newPos !== scrollPosition) {
        setScrollPosition(newPos);
        updateCurrentPage(newPos);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollPosition, pageWidth, totalPages, updateCurrentPage]);

  const goToPage = useCallback((index: number) => {
    if (index < 0 || index >= totalPages) return;
    const pos = index * pageWidth;
    setScrollPosition(pos);
    setCurrentPage(index);
  }, [pageWidth, totalPages]);

  return {
    scrollPosition,
    currentPage,
    goToPage,
    containerRef,
    pageWidth,
  };
}
