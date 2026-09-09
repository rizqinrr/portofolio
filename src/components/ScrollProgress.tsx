import { motion, type MotionValue, useTransform } from "framer-motion";

interface ScrollProgressProps {
  total: number;
  progress: MotionValue<number>;
  activeColor?: string;
  className?: string;
}

function ProgressSegment({
  index,
  total,
  progress,
  activeColor = "#ffffff",
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  activeColor?: string;
}) {
  const segment = 1 / Math.max(total, 1);
  const start = index * segment;
  const end = (index + 1) * segment;

  // Nilai fill 0 sampai 1 untuk segmen ini
  const fill = useTransform(progress, [start, end], [0, 1]);
  // Opacity label/nomor
  const opacity = useTransform(
    progress,
    [start - segment * 0.2, start, end, end + segment * 0.2],
    [0.35, 1, 1, 0.35]
  );
  const scaleY = useTransform(
    progress,
    [start - segment * 0.1, start, end, end + segment * 0.1],
    [0.9, 1, 1, 0.9]
  );

  return (
    <div className="group relative flex flex-1 flex-col items-center justify-center py-1">
      {/* Batang vertikal segmen putus-putus */}
      <div className="relative h-full w-1.5 overflow-hidden rounded-full bg-black/15 shadow-inner">
        <motion.div
          className="absolute inset-x-0 top-0 rounded-full"
          style={{
            height: "100%",
            scaleY: fill,
            transformOrigin: "top",
            backgroundColor: activeColor,
          }}
        />
      </div>

      {/* Label nomor proyek kecil */}
      <motion.span
        style={{ opacity, scale: scaleY }}
        className="mt-1 font-mono text-[10px] font-bold text-black/60 select-none"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>
    </div>
  );
}

export function ScrollProgress({
  total,
  progress,
  activeColor,
  className,
}: ScrollProgressProps) {
  return (
    <aside
      aria-label="Progress Proyek"
      className={className ?? "flex h-full w-10 flex-col items-center justify-between py-8 select-none"}
    >
      <div className="flex h-full w-full flex-col justify-between gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <ProgressSegment
            key={i}
            index={i}
            total={total}
            progress={progress}
            activeColor={activeColor}
          />
        ))}
      </div>
    </aside>
  );
}
