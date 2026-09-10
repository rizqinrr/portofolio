import { motion, useReducedMotion } from 'framer-motion';
import type { IconType } from 'react-icons';
import { useEffect, useRef } from 'react';
import {
  SiTypescript,
  SiJavascript,
  SiPhp,
  SiPython,
  SiPostgresql,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiLaravel,
  SiNodedotjs,
  SiTailwindcss,
  SiFramer,
  SiGit,
  SiDocker,
  SiVite,
  SiFigma,
  SiLinux,
  SiGoogledocs,
  SiGooglesheets,
  SiGoogleslides,
  SiGoogledrive,
} from 'react-icons/si';
import { FaFileWord, FaFileExcel, FaFilePowerpoint } from 'react-icons/fa';

interface SkillsPageProps {
  isActive?: boolean;
}

interface LogoItem {
  Icon: IconType;
  color: string;
}

const col1: LogoItem[] = [
  { Icon: SiTypescript, color: '#3178C6' },
  { Icon: SiJavascript, color: '#F7DF1E' },
  { Icon: SiPhp, color: '#777BB4' },
  { Icon: SiPython, color: '#3776AB' },
  { Icon: SiPostgresql, color: '#4169E1' },
  { Icon: SiHtml5, color: '#E34F26' },
  { Icon: FaFileWord, color: '#2B579A' },
  { Icon: SiGoogledocs, color: '#4285F4' },
];

const col2: LogoItem[] = [
  { Icon: SiCss, color: '#1572B6' },
  { Icon: SiReact, color: '#61DAFB' },
  { Icon: SiNextdotjs, color: '#000000' },
  { Icon: SiLaravel, color: '#FF2D20' },
  { Icon: SiNodedotjs, color: '#339933' },
  { Icon: SiTailwindcss, color: '#06B6D4' },
  { Icon: FaFileExcel, color: '#217346' },
  { Icon: SiGooglesheets, color: '#0F9D58' },
  { Icon: SiGoogleslides, color: '#FFC107' },
];

const col3: LogoItem[] = [
  { Icon: SiFramer, color: '#0055FF' },
  { Icon: SiGit, color: '#F05032' },
  { Icon: SiDocker, color: '#2496ED' },
  { Icon: SiVite, color: '#646CFF' },
  { Icon: SiFigma, color: '#F24E1E' },
  { Icon: SiLinux, color: '#FCC624' },
  { Icon: FaFilePowerpoint, color: '#D24726' },
  { Icon: SiGoogledrive, color: '#1FA463' },
];

const columns = [
  { logos: col1, direction: 'up' as const },
  { logos: col2, direction: 'down' as const },
  { logos: col3, direction: 'up' as const },
];

function MarqueeColumn({
  logos,
  direction,
  reduceMotion,
}: {
  logos: LogoItem[];
  direction: 'up' | 'down';
  reduceMotion: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef(1.2);
  const offsetRef = useRef(0);
  const hoveringRef = useRef(false);
  const setHeightRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reduceMotion) return;

    let rafId: number;

    const measureSet = () => {
      setHeightRef.current = track.scrollHeight / 5;
    };

    const initOffset = () => {
      measureSet();
      if (direction === 'down' && offsetRef.current === 0 && setHeightRef.current > 0) {
        offsetRef.current = -setHeightRef.current;
      }
    };
    initOffset();

    const tick = () => {
      let setHeight = setHeightRef.current;
      if (setHeight <= 0) {
        initOffset();
        setHeight = setHeightRef.current;
      }

      const targetSpeed = hoveringRef.current ? 0.2 : 1.2;
      speedRef.current += (targetSpeed - speedRef.current) * 0.05;

      const dir = direction === 'up' ? -1 : 1;
      offsetRef.current += speedRef.current * dir;

      if (direction === 'up' && offsetRef.current <= -setHeight && setHeight > 0) {
        offsetRef.current += setHeight;
      } else if (direction === 'down' && offsetRef.current >= 0 && setHeight > 0) {
        offsetRef.current -= setHeight;
      }

      track.style.transform = `translateY(${offsetRef.current}px)`;
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    const resizeObserver = new ResizeObserver(measureSet);
    resizeObserver.observe(track);

    return () => {
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, [direction, reduceMotion]);

  return (
    <div
      className="skills-marquee-col"
      data-direction={direction}
      onMouseEnter={() => {
        hoveringRef.current = true;
      }}
      onMouseLeave={() => {
        hoveringRef.current = false;
      }}
    >
      <div className="skills-marquee-track" ref={trackRef}>
        {[...logos, ...logos, ...logos, ...logos, ...logos].map((item, i) => (
          <span
            key={i}
            className="skills-logo-item"
            style={{ color: item.color }}
          >
            <item.Icon size={80} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SkillsPage({ isActive = false }: SkillsPageProps) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <div className="book-page book-page-content skills-page">
      <motion.div
        className="chapter-header"
        initial={{ scale: 1.3, opacity: 0 }}
        animate={isActive ? { scale: 1, opacity: 1 } : { scale: 1.3, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="chapter-label">Chapter IV</span>
        <span className="chapter-subtitle">What I do & Stack</span>
      </motion.div>

      <div className="skills-marquee">
        {columns.map((col, colIdx) => (
          <MarqueeColumn
            key={colIdx}
            logos={col.logos}
            direction={col.direction}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </div>
  );
}
