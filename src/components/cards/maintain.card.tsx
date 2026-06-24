'use client';

import { useEffect, useRef, useState } from 'react';

export default function MaintenancePage() {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const target = 0;

  useEffect(() => {
    const timeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= target) {
            clearInterval(intervalRef.current!);
            return target;
          }
          return prev + 1;
        });
      }, 55);
    }, 500);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden  px-4 py-8">
      {/* Card */}
      <div
        className="relative w-full max-w-[520px] bg-white rounded-md px-14 py-12 text-center shadow-[0_0_0_1px_rgba(99,102,241,0.10),0_32px_64px_rgba(0,0,0,0.50)]"
        style={{
          border: '1px solid rgba(255,255,255,0.10)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-md border border-primary-500/35 bg-primary-500/15 px-4 py-1.5">
          <span
            className="h-[7px] w-[7px] rounded-md bg-primary-700"
            style={{ animation: 'blink 1.4s ease-in-out infinite' }}
          />
          <span
            className="text-[11px] tracking-widest text-primary-700"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            SYSTEM · MAINTENANCE MODE
          </span>
        </div>

        {/* Icon */}
        <div className="relative mx-auto mb-7 h-[72px] w-[72px]">
          {/* Outer spinning ring */}
          <div
            className="absolute inset-0 flex items-center justify-center rounded-full border border-primary-500/40"
            style={{ animation: 'spin 8s linear infinite' }}
          >
            <span className="absolute -top-[3px] left-1/2 h-[6px] w-[6px] -translate-x-1/2 rounded-full bg-primary-400" />
          </div>

          {/* Inner counter-spinning circle with gear */}
          <div
            className="absolute inset-[10px] flex items-center justify-center rounded-full bg-primary-500/12"
            style={{ animation: 'spin 8s linear infinite reverse' }}
          >
            <GearIcon />
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-2.5 text-[26px] font-semibold leading-tight tracking-tight text-main">
          We&apos;ll be right back
        </h1>

        {/* Subtitle */}
        <p className="mb-9 text-[14.5px] font-light leading-relaxed text-primary-600">
          This page is currently undergoing scheduled maintenance.
          <br />
          We&apos;re upgrading our systems to serve you better.
        </p>

        {/* Progress bar */}
        <div className="mb-3 h-[4px] overflow-hidden rounded-md bg-white/[0.06]">
          <div
            className="h-full rounded-md"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #6366f1, #a78bfa)',
              transition: 'width 0.05s linear',
            }}
          />
        </div>

        {/* Progress labels */}
        <div
          className="mb-8 flex justify-between text-[11px] text-slate-500"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <span>Upgrade in progress</span>
          <span>{progress}%</span>
        </div>

        {/* Divider */}
        <hr className="mb-7 border-white/[0.07]" />

        {/* Meta row */}
        <div className="flex justify-center gap-8">
          <MetaItem label="STATUS" value="Upgrading" />
          <MetaItem label="ETA" value="N/A" accent />
          <MetaItem label="VERSION" value="v0.1.0" />
        </div>
      </div>

      {/* Keyframes injected via style tag */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600&family=JetBrains+Mono:wght@400;500&display=swap');

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}

function GearIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="#818cf8"
        strokeWidth="1.5"
      />
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
        stroke="#6366f1"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function MetaItem({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className="text-[11px] tracking-widest font-bold text-slate-800"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {label}
      </span>
      <span
        className={`text-[13px] ${accent ? 'text-primary-700' : 'text-slate-800'}`}
        style={accent ? { fontFamily: "'JetBrains Mono', monospace" } : {}}
      >
        {value}
      </span>
    </div>
  );
}
