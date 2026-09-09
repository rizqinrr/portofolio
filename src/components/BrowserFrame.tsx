import React from "react";
import { cn } from "@/lib/utils";

interface BrowserFrameProps {
  url?: string;
  children: React.ReactNode;
  className?: string;
}

export function BrowserFrame({ url, children, className }: BrowserFrameProps) {
  // Bersihkan format URL untuk tampilan browser bar (misal: github.com/user/repo)
  const displayUrl = url
    ? url.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : "github.com/rizqinrr";

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/15 bg-[#121316] shadow-2xl backdrop-blur-md",
        className
      )}
    >
      {/* Browser Chrome Header */}
      <div className="flex items-center gap-3 border-b border-white/10 bg-black/40 px-4 py-2.5">
        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]/90 shadow-sm" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]/90 shadow-sm" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]/90 shadow-sm" />
        </div>

        {/* URL Bar */}
        <div className="flex flex-1 items-center justify-center">
          <div className="flex w-full max-w-[340px] items-center gap-2 rounded-md bg-white/10 px-3 py-1 text-[11px] font-mono text-white/80 transition-colors hover:bg-white/15">
            <svg
              className="h-3 w-3 shrink-0 text-white/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span className="truncate">{displayUrl}</span>
          </div>
        </div>

        {/* Window controls placeholder for balance */}
        <div className="w-10" />
      </div>

      {/* Browser Viewport Content */}
      <div className="relative flex-1 overflow-hidden bg-black/20">
        {children}
      </div>
    </div>
  );
}
