import {
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useReducedMotion } from 'framer-motion';

export interface ScrollTiltedGridImage {
  src: string;
  alt: string;
}

export interface ScrollTiltedGridProps {
  images: readonly ScrollTiltedGridImage[];
  aspectRatio?: string;
  perspective?: number;
  maxTilt?: number;
  maxBlur?: number;
  rounded?: string;
  sectionPadding?: string;
  className?: string;
  loop?: boolean;
  initialCycles?: number;
  batchSize?: number;
}

type TileVariables = CSSProperties & {
  '--tile-blur': string;
  '--tile-brightness': number;
  '--tile-saturation': number;
  '--tile-transform': string;
  '--tile-image-scale': number;
};

function clamp(value: number, minimum = 0, maximum = 1) {
  return Math.min(maximum, Math.max(minimum, value));
}

function GalleryTile({
  image,
  index,
  aspectRatio,
  perspective,
  maxTilt,
  maxBlur,
  rounded,
  reduceMotion,
}: {
  image: ScrollTiltedGridImage;
  index: number;
  aspectRatio: string;
  perspective: number;
  maxTilt: number;
  maxBlur: number;
  rounded: string;
  reduceMotion: boolean;
}) {
  const tileRef = useRef<HTMLElement>(null);
  const side = index % 2 === 0 ? -1 : 1;

  useEffect(() => {
    const tile = tileRef.current;
    if (!tile || reduceMotion) return;

    const scroller = tile.closest('[data-inner-scroll]') as HTMLElement | null;
    const scrollTarget: HTMLElement | Window = scroller ?? window;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = tile.getBoundingClientRect();
      const viewRect = scroller
        ? scroller.getBoundingClientRect()
        : { top: 0, bottom: window.innerHeight, height: window.innerHeight };
      const viewHeight = viewRect.height;
      const travel = viewHeight + rect.height;
      const position = clamp((viewRect.bottom - rect.top) / travel);
      const distance = Math.abs(position - 0.5) * 2;
      const signed = (position - 0.5) * 2;
      const eased = distance * distance * (3 - 2 * distance);
      const x = side * eased * 18;
      const y = -signed * eased * 24;
      const tilt = -signed * maxTilt;
      const roll = side * signed * 3;
      const skew = -side * signed * 7;

      tile.style.setProperty('--tile-blur', `${eased * maxBlur}px`);
      tile.style.setProperty('--tile-brightness', String(1 - eased * 0.5));
      tile.style.setProperty('--tile-saturation', String(1 - eased * 0.5));
      tile.style.setProperty('--tile-image-scale', String(1.03 + eased * 0.15));
      tile.style.setProperty(
        '--tile-transform',
        `translate3d(${x}%, ${y}%, ${eased * 180}px) rotateX(${tilt}deg) rotateZ(${roll}deg) skewX(${skew}deg)`,
      );
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(tile);
    scrollTarget.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      resizeObserver.disconnect();
      scrollTarget.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [maxBlur, maxTilt, reduceMotion, side]);

  const variables: TileVariables = {
    aspectRatio,
    borderRadius: rounded,
    perspective,
    '--tile-blur': '0px',
    '--tile-brightness': 1,
    '--tile-saturation': 1,
    '--tile-transform': 'translate3d(0, 0, 0)',
    '--tile-image-scale': 1.03,
  };

  return (
    <figure
      ref={tileRef}
      className={`gallery-tile${side > 0 ? ' gallery-tile--offset' : ''}`}
      style={variables}
    >
      <div
        className={`gallery-tile-frame${reduceMotion ? '' : ' is-motion'}`}
        style={{ aspectRatio, borderRadius: rounded }}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="gallery-tile-image"
          loading={index < 4 ? 'eager' : 'lazy'}
          draggable={false}
        />
        <span className="gallery-tile-overlay" />
      </div>
    </figure>
  );
}

export function ScrollTiltedGrid({
  images,
  aspectRatio = '4 / 5',
  perspective = 1000,
  maxTilt = 62,
  maxBlur = 7,
  rounded = '0.25rem',
  sectionPadding = '18vh',
  className = '',
  loop = false,
  initialCycles = 1,
  batchSize = 2,
}: ScrollTiltedGridProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const [cycleCount, setCycleCount] = useState(() =>
    Math.max(1, loop ? initialCycles : 1),
  );
  const scrollerRef = useRef<HTMLElement | null>(null);
  const appendLock = useRef(false);

  // Reset cycle count when inputs change
  useEffect(() => {
    setCycleCount(Math.max(1, loop ? initialCycles : 1));
  }, [loop, initialCycles]);

  // Append more cycles as the user approaches the bottom (uncapped)
  useEffect(() => {
    if (!loop) return;
    const scroller = scrollerRef.current?.closest('[data-inner-scroll]') as HTMLElement | null;
    if (!scroller) return;

    const onScroll = () => {
      if (appendLock.current) return;
      const { scrollTop, clientHeight, scrollHeight } = scroller;
      if (scrollTop + clientHeight >= scrollHeight - 1500) {
        appendLock.current = true;
        setCycleCount((c) => c + Math.max(1, batchSize));
      }
    };

    onScroll();
    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => scroller.removeEventListener('scroll', onScroll);
  }, [loop, batchSize]);

  // Unlock after each append so the next batch can be queued
  useEffect(() => {
    appendLock.current = false;
  }, [cycleCount]);

  const tiles = useMemo(() => {
    const count = loop ? cycleCount : 1;
    return Array.from({ length: count }, (_, cycle) =>
      images.map((image, index) => ({ globalIndex: cycle * images.length + index, image })),
    ).flat();
  }, [cycleCount, images, loop]);

  return (
    <section
      ref={scrollerRef}
      className={`gallery-section${className ? ` ${className}` : ''}`}
      aria-label="Scroll-reactive image gallery"
    >
      <div className="gallery-grid" style={{ paddingBlock: sectionPadding }}>
        {tiles.map(({ globalIndex, image }) => (
          <GalleryTile
            key={`${globalIndex}-${image.src}`}
            image={image}
            index={globalIndex}
            aspectRatio={aspectRatio}
            perspective={perspective}
            maxTilt={maxTilt}
            maxBlur={maxBlur}
            rounded={rounded}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </section>
  );
}
