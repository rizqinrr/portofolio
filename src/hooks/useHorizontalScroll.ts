import { useState, useEffect, useCallback, useRef } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

interface UseHorizontalScrollOptions {
  totalPages: number;
}

export function useHorizontalScroll({ totalPages }: UseHorizontalScrollOptions) {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageWidth, setPageWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth - 62 : 0
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  // Keep track of window resize
  useEffect(() => {
    const handleResize = () => {
      setPageWidth(window.innerWidth - 62);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxScroll = Math.max(0, pageWidth * (totalPages - 1));

  // Raw motion value for scroll position (0 to maxScroll)
  const rawScrollX = useMotionValue(0);

  // Spring physics for smooth inertia scrolling
  const smoothScrollX = useSpring(rawScrollX, {
    damping: 40,
    stiffness: 200,
    mass: 0.8,
    restDelta: 0.5,
  });

  // Transform to negative X for CSS translation (moves pages to the left)
  const contentX = useTransform(smoothScrollX, (val) => -val);

  // Calculate current page from scroll position
  const updateCurrentPage = useCallback((pos: number) => {
    if (pageWidth <= 0) return;
    const page = Math.floor(pos / pageWidth + 0.8);
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
  }, [pageWidth, totalPages]);

  // Update page index whenever rawScrollX changes
  useEffect(() => {
    const unsubscribe = rawScrollX.on('change', (latest) => {
      updateCurrentPage(latest);
    });
    return unsubscribe;
  }, [rawScrollX, updateCurrentPage]);

  // Wheel handler — smooth scroll with spring
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const current = rawScrollX.get();
      const newPos = Math.max(0, Math.min(current + e.deltaY, maxScroll));
      rawScrollX.set(newPos);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [rawScrollX, maxScroll]);

  // Touch handler — smooth scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartPos = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      touchStartPos = rawScrollX.get();
    };

    const handleTouchMove = (e: TouchEvent) => {
      const deltaX = touchStartX.current - e.touches[0].clientX;
      const deltaY = touchStartY.current - e.touches[0].clientY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault();
        const newPos = Math.max(0, Math.min(touchStartPos + deltaX, maxScroll));
        rawScrollX.set(newPos);
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [rawScrollX, maxScroll]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const current = rawScrollX.get();
      let newPos = current;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        newPos = Math.min(current + pageWidth, maxScroll);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        newPos = Math.max(current - pageWidth, 0);
      }

      if (newPos !== current) {
        rawScrollX.set(newPos);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [rawScrollX, pageWidth, maxScroll]);

  const goToPage = useCallback((index: number) => {
    if (index < 0 || index >= totalPages) return;
    const pos = index * pageWidth;
    rawScrollX.set(pos);
  }, [rawScrollX, pageWidth, totalPages]);

  // Scroll progress for sidebar line (0 to 1)
  const scrollProgress = useTransform(smoothScrollX, [0, maxScroll || 1], [0, 1]);

  return {
    contentX,
    smoothScrollX,
    scrollProgress,
    currentPage,
    goToPage,
    containerRef,
    pageWidth,
  };
}
