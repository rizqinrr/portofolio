import { cn } from "@/lib/utils";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { ScrollProgress } from "./ScrollProgress";

export interface CaseStudyFlipItem {
  number?: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  background: string;
  foreground?: string;
  githubUrl?: string;
  demoUrl?: string;
  tags?: string[];
}

interface CaseStudyFlipStackProps {
  items: CaseStudyFlipItem[];
  className?: string;
}

function FullPageFlipCard({
  item,
  index,
  total,
  progress,
  reduceMotion,
}: {
  item: CaseStudyFlipItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const segment = 1 / Math.max(total, 1);
  const start = index * segment;
  const end = Math.min(start + segment, 1);
  const entryStart = Math.max(0, start - segment);
  const entryEnd =
    index === 0 ? 0.0001 : Math.min(start, entryStart + segment * 0.7);
  const exitStart = start;
  const exitEnd = end;

  // Stacking offset subtle
  const stackedCardGap = Math.min(16, 48 / Math.max(total - 1, 1));
  const stackedOffset = index * stackedCardGap;
  const restingOffset = Math.min(index * 8, 24);
  const restingScale = 1 - Math.min(index * 0.015, 0.04);

  // Animasi Flip 3D kartu saat exit
  const exitYPercent = useTransform(
    progress,
    [exitStart, exitEnd],
    reduceMotion ? [0, 0] : [0, -112]
  );
  const exitStackOffset = useTransform(
    progress,
    [exitStart, exitEnd],
    reduceMotion ? [0, 0] : [0, stackedOffset]
  );
  const exitY = useMotionTemplate`calc(${exitYPercent}% + ${exitStackOffset}px)`;
  const rotateX = useTransform(
    progress,
    [exitStart, exitEnd],
    reduceMotion ? [0, 0] : [0, 18]
  );
  const opacity = useTransform(
    progress,
    [exitStart, exitEnd],
    reduceMotion ? [1, 0] : [1, 1]
  );

  // Animasi saat kartu masuk
  const entryScale = useTransform(
    progress,
    [entryStart, entryEnd],
    index === 0 ? [1, 1] : [restingScale, 1]
  );
  const entryY = useTransform(
    progress,
    [entryStart, entryEnd],
    index === 0 ? [0, 0] : [restingOffset, 0]
  );

  return (
    <motion.article
      className="absolute inset-0 will-change-transform"
      style={{
        y: exitY,
        rotateX,
        opacity,
        zIndex: total - index,
        transformOrigin: "50% 50%",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
    >
      <motion.div
        className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
        style={{
          backgroundColor: item.background,
          color: item.foreground ?? "#ffffff",
          y: entryY,
          scale: entryScale,
          transformOrigin: "50% 100%",
        }}
      >
        {/* Konten Teks di Sisi Kiri (Full Height) */}
        <div className="flex flex-1 flex-col justify-between p-6 sm:p-8 md:p-12 pr-6 sm:pr-[75%] md:pr-[60%] lg:pr-[55%]">
          {/* Header Kartu: Nomor & Tombol Action */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-3xl font-bold tracking-tight opacity-90 sm:text-4xl">
              {item.number ?? String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-2">
              {item.githubUrl && (
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md transition hover:scale-105 hover:bg-white/25 active:scale-95"
                  style={{ color: item.foreground ?? "#ffffff" }}
                >
                  <span>GitHub</span>
                  <span className="text-sm">↗</span>
                </a>
              )}
            </div>
          </div>

          {/* Konten Utama */}
          <div className="my-auto py-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest opacity-75">
              {item.eyebrow}
            </p>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl lg:leading-[1.1]">
              {item.title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed opacity-85 sm:text-base md:text-lg">
              {item.description}
            </p>

            {/* Tags Teknologi */}
            {item.tags && item.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-black/20 px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Footer Kartu: Status Proyek */}
          <div className="pt-2 text-xs opacity-60">
            Proyek {index + 1} dari {total}
          </div>
        </div>

        {/* Foto Proyek di Pojok Kanan Atas Card (~50% width, 4x luas, rasio 16:9) tanpa browser chrome */}
        <div className="pointer-events-auto absolute right-4 top-4 z-20 w-[85%] sm:right-6 sm:top-6 sm:w-[70%] md:w-[56%] lg:w-[50%] aspect-video overflow-hidden rounded-xl border border-white/15 shadow-2xl backdrop-blur-sm">
          <img
            src={item.image}
            alt={item.imageAlt}
            className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
            loading={index < 2 ? "eager" : "lazy"}
            draggable={false}
          />
        </div>
      </motion.div>
    </motion.article>
  );
}

export function CaseStudyFlipStack({
  items,
  className,
}: CaseStudyFlipStackProps) {
  const stackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.8,
    restDelta: 0.0005,
  });

  const cardProgress = reduceMotion ? scrollYProgress : smoothProgress;

  return (
    <main className={cn("relative min-h-screen bg-[#0f1013] text-white", className)}>
      {/* Kontainer scroll panjang untuk menggerakkan flip stack */}
      <div
        ref={stackRef}
        className="relative"
        style={{ height: `${Math.max(items.length, 1) * 110}vh` }}
      >
        {/* Sticky viewport full-screen dengan padding kecil di pinggir agar mengambang */}
        <div className="sticky top-0 flex h-screen w-full items-stretch gap-3 p-3 sm:gap-4 sm:p-4 md:p-5">
          {/* Sisi Kiri: Kartu Proyek Full-Size Mepet Kiri */}
          <div className="relative flex-1 [perspective:1000px]">
            {[...items].reverse().map((item, reverseIndex) => {
              const index = items.length - reverseIndex - 1;
              return (
                <FullPageFlipCard
                  key={`${item.title}-${index}`}
                  item={item}
                  index={index}
                  total={items.length}
                  progress={cardProgress}
                  reduceMotion={reduceMotion}
                />
              );
            })}
          </div>

          {/* Sisi Kanan: Indikator Sticky Putus-putus Sesuai Jumlah Proyek */}
          <div className="flex h-full w-8 shrink-0 items-center justify-center sm:w-12">
            <ScrollProgress
              total={items.length}
              progress={cardProgress}
              activeColor="#f59e0b"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
