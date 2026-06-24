'use client';
/* eslint-disable react-hooks/exhaustive-deps */

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from '@/hooks';

// 1. Winning Pitch Decks (Sliding Presentation Effect)
export function SystemCard({ isHovered }: { isHovered?: boolean }) {
  const controls = useAnimation();
  const { ref, isInView } = useInView();

  const desktopVariants = {
    stacked: { width: '60%', height: '60%' },
    expanded: { width: '90%', height: '75%' },
    highlighted: {
      width: '90%',
      height: '75%',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.8)',
    },
    final: {
      width: '90%',
      height: '75%',
      boxShadow: '0 0 0 1px rgba(255,255,255,0)',
    },
  };

  const layers = [
    { label: 'frontend', w: '85%', delay: 1.5 },
    { label: 'api', w: '65%', delay: 1.9 },
    { label: 'database', w: '50%', delay: 2.3 },
  ];

  const metrics = [
    { label: 'perf', value: '98', delay: 2.7 },
    { label: 'seo', value: '100', delay: 2.9 },
    { label: 'speed', value: '0.8s', delay: 3.1 },
  ];

  useEffect(() => {
    if (!isInView) return;

    async function sequence() {
      await controls.start('stacked');
      await controls.start('expanded', { duration: 1.5, ease: 'easeOut' });
      await controls.start('highlighted', { duration: 0.3 });
      await controls.start('final', { duration: 0.5 });
    }
    sequence();
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      className="h-[250px] p-8 mx-auto max-w-lg flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute border-2 border-main rounded-md bg-transparent flex flex-col"
        initial="stacked"
        animate={controls}
        variants={desktopVariants}
      >
        {/* Topbar */}
        <div className="h-7 border-b-2 border-main flex items-center px-2 gap-1 shrink-0">
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <span className="text-main/80 text-[9px]  ml-1">system.tsx</span>
        </div>

        {/* Content */}
        <div className="flex-1 bg-main flex flex-col justify-between p-3 overflow-hidden">
          {/* Stack layers */}
          <div className="flex flex-col gap-1.5">
            {layers.map((layer) => (
              <motion.div
                key={layer.label}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: isHovered ? layer.delay - 1.3 : layer.delay,
                  duration: 0.3,
                }}
              >
                <span className="text-white/30 text-[7px]  w-10 text-right shrink-0">
                  {layer.label}
                </span>
                <div className="flex-1 h-1 bg-white/10 rounded-md overflow-hidden">
                  <motion.div
                    className="h-full bg-white/60 rounded-md"
                    initial={{ width: '0%' }}
                    animate={{ width: layer.w }}
                    transition={{
                      delay: isHovered ? layer.delay - 1.2 : layer.delay + 0.1,
                      duration: 0.6,
                      ease: 'easeOut',
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <motion.div
            className="w-full h-px bg-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: isHovered ? 1.2 : 2.5, duration: 0.3 }}
          />

          {/* Metrics */}
          <div className="flex justify-between px-1">
            {metrics.map((m) => (
              <motion.div
                key={m.label}
                className="flex flex-col items-center gap-0.5"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: isHovered ? m.delay - 1.3 : m.delay,
                  duration: 0.3,
                }}
              >
                <span className="text-white/90 text-[11px]  font-bold">
                  {m.value}
                </span>
                <span className="text-white/30 text-[7px] ">{m.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// 2. Social Media Graphics (Synchronized Icon Swap Effect)
export function UxUiCard({ isHovered }: { isHovered?: boolean }) {
  const controls = useAnimation();
  const { ref, isInView } = useInView();

  const desktopVariants = {
    stacked: { width: '60%', height: '60%' },
    expanded: { width: '90%', height: '75%' },
    highlighted: {
      width: '90%',
      height: '75%',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.8)',
    },
    final: {
      width: '90%',
      height: '75%',
      boxShadow: '0 0 0 1px rgba(255,255,255,0)',
    },
  };

  useEffect(() => {
    if (!isInView) return;

    async function sequence() {
      await controls.start('stacked');
      await controls.start('expanded', { duration: 1.5, ease: 'easeOut' });
      await controls.start('highlighted', { duration: 0.3 });
      await controls.start('final', { duration: 0.5 });
    }
    sequence();
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      className="h-[250px] p-8 mx-auto max-w-lg flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute border-2 border-main rounded-md bg-transparent flex flex-col"
        initial="stacked"
        animate={controls}
        variants={desktopVariants}
      >
        {/* Topbar */}
        <div className="h-7 border-b-2 border-main flex items-center px-2 gap-1 shrink-0">
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <span className="text-main/80 text-[9px]  ml-1">
            vietstrix.design
          </span>
        </div>

        {/* UI Mockup */}
        <div className="flex-1 p-2 bg-main flex flex-col gap-1.5 overflow-hidden">
          {/* Navbar */}
          <motion.div
            className="flex items-center justify-between px-2 py-1"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: isHovered ? 0.2 : 1.5, duration: 0.3 }}
          >
            <div className="w-8 h-1.5 bg-white/80 rounded-md" />
            <div className="flex gap-1.5">
              <div className="w-5 h-1 bg-white/30 rounded-md" />
              <div className="w-5 h-1 bg-white/30 rounded-md" />
              <div className="w-5 h-1 bg-white/30 rounded-md" />
            </div>
            <div className="w-6 h-2 bg-white/60 rounded-sm" />
          </motion.div>

          {/* Hero */}
          <motion.div
            className="flex flex-col items-center gap-1 py-1"
            initial={{ opacity: 0, y: 3 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 3 }}
            transition={{ delay: isHovered ? 0.4 : 1.9, duration: 0.3 }}
          >
            <div className="w-20 h-2 bg-white/80 rounded-md" />
            <div className="w-14 h-1.5 bg-white/40 rounded-md" />
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex justify-center gap-2"
            initial={{ opacity: 0, y: 3 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 3 }}
            transition={{ delay: isHovered ? 0.6 : 2.3, duration: 0.3 }}
          >
            <div className="w-10 h-3 bg-white/80 rounded-sm" />
            <div className="w-10 h-3 border border-white/40 rounded-sm" />
          </motion.div>

          {/* Cards */}
          <motion.div
            className="flex gap-1.5 px-1 mt-auto"
            initial={{ opacity: 0, y: 3 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 3 }}
            transition={{ delay: isHovered ? 0.8 : 2.7, duration: 0.3 }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex-1 h-8 border border-white/20 rounded-sm flex flex-col gap-1 p-1"
              >
                <div className="w-full h-1 bg-white/30 rounded-md" />
                <div className="w-3/4 h-1 bg-white/15 rounded-md" />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function MvpCard({ isHovered }: { isHovered?: boolean }) {
  const controls = useAnimation();
  const { ref, isInView } = useInView();

  const desktopVariants = {
    stacked: { width: '60%', height: '60%' },
    expanded: { width: '90%', height: '75%' },
    highlighted: {
      width: '90%',
      height: '75%',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.8)',
    },
    final: {
      width: '90%',
      height: '75%',
      boxShadow: '0 0 0 1px rgba(255,255,255,0)',
    },
  };

  useEffect(() => {
    if (!isInView) return;

    async function sequence() {
      await controls.start('stacked');
      await controls.start('expanded', { duration: 1.5, ease: 'easeOut' });
      await controls.start('highlighted', { duration: 0.3 });
      await controls.start('final', { duration: 0.5 });
    }
    sequence();
  }, [isInView]);

  const steps = [
    { label: 'idea', icon: '◆', delay: 1.5 },
    { label: 'build', icon: '▣', delay: 2.0 },
    { label: 'launch', icon: '▲', delay: 2.5 },
  ];

  return (
    <motion.div
      ref={ref}
      className="h-[250px] p-8 mx-auto max-w-lg flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute border-2 border-main rounded-md bg-transparent flex flex-col"
        initial="stacked"
        animate={controls}
        variants={desktopVariants}
      >
        {/* Topbar */}
        <div className="h-7 border-b-2 border-main flex items-center px-2 gap-1 shrink-0">
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <span className="text-main/80 text-[9px]  ml-1">mvp.tsx</span>
        </div>

        {/* Content */}
        <div className="flex-1 bg-main flex flex-col justify-between p-3 overflow-hidden">
          {/* Progress bar */}
          <motion.div
            className="w-full h-0.5 bg-white/10 rounded-md overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: isHovered ? 0.1 : 1.4, duration: 0.3 }}
          >
            <motion.div
              className="h-full bg-white/70 rounded-md"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{
                delay: isHovered ? 0.2 : 1.5,
                duration: isHovered ? 1.0 : 1.5,
                ease: 'easeOut',
              }}
            />
          </motion.div>

          {/* 3 steps */}
          <div className="flex items-center justify-between px-1">
            {steps.map((step, _i) => (
              <motion.div
                key={step.label}
                className="flex flex-col items-center gap-1"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: isHovered ? step.delay - 1.2 : step.delay,
                  duration: 0.3,
                }}
              >
                {/* circle */}
                <motion.div
                  className="w-7 h-7 rounded-md border-2 border-white/60 flex items-center justify-center"
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: isHovered ? step.delay - 1.2 : step.delay,
                    duration: 0.3,
                    type: 'spring',
                  }}
                >
                  <span className="text-white/80 text-[8px]">{step.icon}</span>
                </motion.div>
                <span className="text-white/50 text-[7px] ">{step.label}</span>
              </motion.div>
            ))}
          </div>

          {/* fake metrics */}
          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: isHovered ? 1.5 : 3.0, duration: 0.4 }}
          >
            {[
              { label: 'users', w: 'w-12' },
              { label: 'speed', w: 'w-16' },
              { label: 'scale', w: 'w-10' },
            ].map((m) => (
              <div key={m.label} className="flex-1 flex flex-col gap-1">
                <span className="text-white/30 text-[7px] ">{m.label}</span>
                <div className="w-full h-1 bg-white/10 rounded-md overflow-hidden">
                  <motion.div
                    className="h-full bg-white/60 rounded-md"
                    initial={{ width: '0%' }}
                    animate={{
                      width:
                        m.w === 'w-12' ? '60%' : m.w === 'w-16' ? '80%' : '50%',
                    }}
                    transition={{
                      delay: isHovered ? 1.6 : 3.1,
                      duration: 0.8,
                      ease: 'easeOut',
                    }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function DevelopmentCard({ isHovered }: { isHovered?: boolean }) {
  const controls = useAnimation();

  const desktopVariants = {
    stacked: { width: '60%', height: '60%' },
    expanded: { width: '90%', height: '75%' },
    highlighted: {
      width: '90%',
      height: '75%',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.8)',
    },
    final: {
      width: '90%',
      height: '75%',
      boxShadow: '0 0 0 1px rgba(255,255,255,0)',
    },
  };

  const codeLines = [
    {
      ln: 1,
      parts: [
        { c: 'kw', t: 'export' },
        { t: ' ' },
        { c: 'kw', t: 'function' },
        { t: ' ' },
        { c: 'fn', t: 'Vietstrix' },
        { c: 'pu', t: '() {' },
      ],
    },
    {
      ln: 2,
      parts: [
        { t: '  ' },
        { c: 'kw', t: 'const' },
        { t: ' name = ' },
        { c: 'str', t: '"web"' },
      ],
    },
    {
      ln: 3,
      parts: [
        { t: '  ' },
        { c: 'kw', t: 'return' },
        { t: ' (' },
        { c: 'tag', t: '<div' },
      ],
    },
    {
      ln: 4,
      parts: [
        { t: '    ' },
        { c: 'attr', t: 'className' },
        { c: 'pu', t: '=' },
        { c: 'str', t: '"identity"' },
      ],
    },
    {
      ln: 5,
      parts: [{ t: '  ' }, { c: 'pu', t: '/>' }, { c: 'pu', t: ')' }],
    },
  ];

  useEffect(() => {
    async function sequence() {
      await controls.start('stacked');
      await controls.start('expanded', { duration: 1.5, ease: 'easeOut' });
      await controls.start('highlighted', { duration: 0.3 });
      await controls.start('final', { duration: 0.5 });
    }
    sequence();
  }, []);

  return (
    <motion.div
      className="h-[250px] p-8 mx-auto w-full max-w-lg flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute border-2 border-main rounded-md bg-transparent flex flex-col"
        initial="stacked"
        animate={controls}
        variants={desktopVariants}
      >
        {/* Topbar */}
        <div className="h-7 border-b-2 border-main flex items-center px-2 gap-1 shrink-0">
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <span className="text-main/80 text-[9px]  ml-1">vietstrix.tsx</span>
        </div>

        {/* Code lines */}
        <div className="flex-1 p-2 flex bg-main flex-col gap-1 overflow-hidden  text-[10px]">
          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              className="flex items-center "
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: isHovered ? i * 0.15 : 1.5 + i * 0.4,
                duration: 0.2,
              }}
            >
              <span className="text-white/30 w-4 text-right mr-2">
                {line.ln}
              </span>
              {line.parts.map((p, j) => {
                const totalCharsBeforePart = line.parts
                  .slice(0, j)
                  .reduce((sum, part) => sum + part.t.length, 0);

                return (
                  <motion.span
                    key={j}
                    style={{ whiteSpace: 'pre' }}
                    className={
                      p.c === 'kw'
                        ? 'text-blue-300'
                        : p.c === 'fn'
                          ? 'text-yellow-200'
                          : p.c === 'str'
                            ? 'text-green-300'
                            : p.c === 'pu'
                              ? 'text-white/50'
                              : 'text-white/85'
                    }
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: isHovered
                        ? i * 0.15 + totalCharsBeforePart * 0.02
                        : 1.5 + i * 0.4,
                      duration: 0.1,
                    }}
                  >
                    {p.t}
                  </motion.span>
                );
              })}
            </motion.div>
          ))}
          {/* blinking cursor */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: isHovered ? 1.2 : 3.5 }}
          >
            <span className="text-white/30 w-4 text-right mr-2">
              {codeLines.length + 1}
            </span>
            <span className="w-0.5 h-3 bg-white/90 animate-pulse" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function RedesignCard({ isHovered }: { isHovered?: boolean }) {
  const controls = useAnimation();
  const { ref, isInView } = useInView();

  const desktopVariants = {
    stacked: { width: '60%', height: '60%' },
    expanded: { width: '90%', height: '75%' },
    highlighted: {
      width: '90%',
      height: '75%',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.8)',
    },
    final: {
      width: '90%',
      height: '75%',
      boxShadow: '0 0 0 1px rgba(255,255,255,0)',
    },
  };

  useEffect(() => {
    if (!isInView) return;

    async function sequence() {
      await controls.start('stacked');
      await controls.start('expanded', { duration: 1.5, ease: 'easeOut' });
      await controls.start('highlighted', { duration: 0.3 });
      await controls.start('final', { duration: 0.5 });
    }
    sequence();
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      className="h-[250px] p-8 mx-auto max-w-lg flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute border-2 border-main rounded-md bg-transparent flex flex-col"
        initial="stacked"
        animate={controls}
        variants={desktopVariants}
      >
        {/* Topbar */}
        <div className="h-7 border-b-2 border-main flex items-center px-2 gap-1 shrink-0">
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <span className="text-main/80 text-[9px]  ml-1">
            vietstrix.design
          </span>
        </div>

        {/* Before → After */}
        <div className="flex-1 bg-main flex overflow-hidden">
          {/* BEFORE — old, messy */}
          <motion.div
            className="flex-1 flex flex-col gap-1.5 p-2 border-r border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ delay: isHovered ? 0.2 : 1.5, duration: 0.4 }}
          >
            <span className="text-white/30 text-[7px] ">before</span>
            {/* navbar lộn xộn */}
            <div className="flex gap-1 items-center">
              <div className="w-4 h-1.5 bg-white/20 rounded-sm" />
              <div className="w-3 h-1 bg-white/10 rounded-sm" />
              <div className="w-3 h-1 bg-white/10 rounded-sm" />
            </div>
            {/* hero xấu */}
            <div className="flex flex-col gap-1">
              <div className="w-full h-1.5 bg-white/20 rounded-sm" />
              <div className="w-full h-1 bg-white/10 rounded-sm" />
              <div className="w-3/4 h-1 bg-white/10 rounded-sm" />
            </div>
            {/* blocks lộn xộn */}
            <div className="flex gap-1">
              <div className="w-1/2 h-5 bg-white/10 rounded-sm" />
              <div className="flex-1 flex flex-col gap-0.5">
                <div className="w-full h-2 bg-white/10 rounded-sm" />
                <div className="w-full h-2 bg-white/10 rounded-sm" />
              </div>
            </div>
            <div className="w-1/2 h-2 bg-white/10 rounded-sm" />
            <div className="w-full h-1 bg-white/10 rounded-sm" />
          </motion.div>

          {/* AFTER — clean, modern */}
          <motion.div
            className="flex-1 flex flex-col gap-1.5 p-2"
            initial={{ opacity: 0, x: 6 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 6 }}
            transition={{ delay: isHovered ? 0.5 : 2.2, duration: 0.5 }}
          >
            <span className="text-white/60 text-[7px] ">after</span>
            {/* navbar clean */}
            <div className="flex items-center justify-between">
              <div className="w-5 h-1.5 bg-white/80 rounded-md" />
              <div className="flex gap-1">
                <div className="w-3 h-1 bg-white/40 rounded-md" />
                <div className="w-3 h-1 bg-white/40 rounded-md" />
              </div>
              <div className="w-4 h-2 bg-white/70 rounded-sm" />
            </div>
            {/* hero đẹp */}
            <div className="flex flex-col items-center gap-1 py-0.5">
              <div className="w-16 h-2 bg-white/90 rounded-md" />
              <div className="w-12 h-1 bg-white/40 rounded-md" />
              <div className="w-8 h-2.5 bg-white/70 rounded-sm mt-0.5" />
            </div>
            {/* cards đều */}
            <div className="flex gap-1 mt-auto">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="flex-1 h-6 border border-white/30 rounded-sm flex flex-col gap-0.5 p-1"
                  initial={{ opacity: 0, y: 3 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 3 }
                  }
                  transition={{
                    delay: isHovered ? 0.8 + i * 0.1 : 2.7 + i * 0.15,
                    duration: 0.2,
                  }}
                >
                  <div className="w-full h-1 bg-white/40 rounded-md" />
                  <div className="w-2/3 h-0.5 bg-white/20 rounded-md" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ContactCard({ isHovered }: { isHovered?: boolean }) {
  const controls = useAnimation();

  const desktopVariants = {
    stacked: { width: '60%', height: '60%' },
    expanded: { width: '90%', height: '75%' },
    highlighted: {
      width: '90%',
      height: '75%',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.8)',
    },
    final: {
      width: '90%',
      height: '75%',
      boxShadow: '0 0 0 1px rgba(255,255,255,0)',
    },
  };

  const codeLines = [
    {
      ln: 1,
      parts: [
        { c: 'kw', t: 'export' },
        { t: ' ' },
        { c: 'kw', t: 'function' },
        { t: ' ' },
        { c: 'fn', t: 'ContactCard' },
        { c: 'pu', t: '() {' },
      ],
    },
    {
      ln: 2,
      parts: [
        { t: '  ' },
        { c: 'kw', t: 'const' },
        { t: ' email = ' },
        { c: 'str', t: '"hello@vietstrix"' },
      ],
    },
    {
      ln: 3,
      parts: [
        { t: '  ' },
        { c: 'kw', t: 'const' },
        { t: ' subject = ' },
        { c: 'str', t: '"Let\'s build"' },
      ],
    },
    {
      ln: 4,
      parts: [
        { t: '  ' },
        { c: 'kw', t: 'return' },
        { t: ' (' },
        { c: 'tag', t: '<Form' },
      ],
    },
    {
      ln: 5,
      parts: [
        { t: '    ' },
        { c: 'attr', t: 'onSubmit' },
        { c: 'pu', t: '={' },
        { c: 'fn', t: 'sendMessage' },
        { c: 'pu', t: '}' },
      ],
    },
    {
      ln: 6,
      parts: [{ t: '  ' }, { c: 'pu', t: '/>' }, { c: 'pu', t: ')' }],
    },
  ];

  useEffect(() => {
    async function sequence() {
      await controls.start('stacked');
      await controls.start('expanded', { duration: 1.5, ease: 'easeOut' });
      await controls.start('highlighted', { duration: 0.3 });
      await controls.start('final', { duration: 0.5 });
    }
    sequence();
  }, []);

  return (
    <motion.div
      className="h-[250px] p-8 mx-auto max-w-lg flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute border-2 border-main rounded-md bg-transparent flex flex-col"
        initial="stacked"
        animate={controls}
        variants={desktopVariants}
      >
        {/* Topbar */}
        <div className="h-7 border-b-2 border-main flex items-center px-2 gap-1 shrink-0">
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <span className="text-main/80 text-[9px]  ml-1">contact.tsx</span>
        </div>

        {/* Code lines */}
        <div className="flex-1 p-2 flex bg-main flex-col gap-1 overflow-hidden  text-[10px]">
          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              className="flex items-center"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: isHovered ? i * 0.15 : 1.5 + i * 0.4,
                duration: 0.2,
              }}
            >
              <span className="text-white/30 w-4 text-right mr-2">
                {line.ln}
              </span>
              {line.parts.map((p, j) => {
                const totalCharsBeforePart = line.parts
                  .slice(0, j)
                  .reduce((sum, part) => sum + part.t.length, 0);

                return (
                  <motion.span
                    key={j}
                    style={{ whiteSpace: 'pre' }}
                    className={
                      p.c === 'kw'
                        ? 'text-blue-300'
                        : p.c === 'fn'
                          ? 'text-yellow-200'
                          : p.c === 'str'
                            ? 'text-green-300'
                            : p.c === 'pu'
                              ? 'text-white/50'
                              : p.c === 'attr'
                                ? 'text-orange-300'
                                : 'text-white/85'
                    }
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: isHovered
                        ? i * 0.15 + totalCharsBeforePart * 0.02
                        : 1.5 + i * 0.4,
                      duration: 0.1,
                    }}
                  >
                    {p.t}
                  </motion.span>
                );
              })}
            </motion.div>
          ))}
          {/* blinking cursor */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: isHovered ? 1.2 : 3.5 }}
          >
            <span className="text-white/30 w-4 text-right mr-2">
              {codeLines.length + 1}
            </span>
            <span className="w-0.5 h-3 bg-white/90 animate-pulse" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ContactFormCard({ isHovered }: { isHovered?: boolean }) {
  const controls = useAnimation();

  const desktopVariants = {
    stacked: { width: 260, height: 200 },
    expanded: { width: 'min(420px, 90vw)', height: 320 },
    highlighted: {
      width: 'min(420px, 90vw)',
      height: 320,
      boxShadow: '0 0 0 1px rgba(255,255,255,0.8)',
    },
    final: {
      width: 'min(420px, 90vw)',
      height: 320,
      boxShadow: '0 0 0 1px rgba(255,255,255,0)',
    },
  };

  useEffect(() => {
    async function sequence() {
      await controls.start('stacked');
      await controls.start('expanded', { duration: 1.5, ease: 'easeOut' });
      await controls.start('highlighted', { duration: 0.3 });
      await controls.start('final', { duration: 0.5 });
    }
    sequence();
  }, []);

  const fields = [
    {
      label: 'Name',
      value: 'Nguyen Van An',
      delay: isHovered ? 0.2 : 1.6,
      typeDelay: isHovered ? 0.3 : 1.7,
    },
    {
      label: 'Email',
      value: 'an@email.com',
      delay: isHovered ? 0.5 : 2.2,
      typeDelay: isHovered ? 0.6 : 2.3,
    },
    {
      label: 'Message',
      value: "Hi! I'd love to work with you...",
      delay: isHovered ? 0.8 : 2.8,
      typeDelay: isHovered ? 0.9 : 2.9,
      isTextarea: true,
    },
  ];

  return (
    <motion.div
      className="h-[360px] w-full flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute border-2 border-main rounded-md bg-transparent flex flex-col"
        initial="stacked"
        animate={controls}
        variants={desktopVariants}
      >
        {/* Topbar */}
        <div className="h-8 border-b-2 border-main flex items-center px-3 gap-1.5 shrink-0">
          <div className="w-2 h-2 bg-main rounded-md" />
          <div className="w-2 h-2 bg-main rounded-md" />
          <div className="w-2 h-2 bg-main rounded-md" />
          <span className="text-main/80 text-[10px]  ml-1">
            vietstrix.com/contact
          </span>
        </div>

        {/* Form content */}
        <div className="flex-1 bg-main p-3 flex flex-col gap-2.5 overflow-hidden">
          {fields.map((field, i) => (
            <motion.div
              key={i}
              className="flex flex-col gap-1"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: field.delay, duration: 0.25 }}
            >
              <span className="text-white/40 text-[9px]  uppercase tracking-wider">
                {field.label}
              </span>
              <div
                className={`bg-white/5 border border-white/15 rounded px-2  text-[11px] text-white/80 overflow-hidden ${
                  field.isTextarea
                    ? 'h-9 flex items-start pt-1.5'
                    : 'h-6 flex items-center'
                }`}
              >
                <motion.span
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    display: 'inline-block',
                  }}
                  initial={{ maxWidth: 0 }}
                  animate={{ maxWidth: 380 }}
                  transition={{
                    delay: field.typeDelay,
                    duration: field.value.length * 0.04,
                    ease: 'linear',
                  }}
                >
                  {field.value}
                </motion.span>
                <motion.span
                  className="inline-block w-px h-3 bg-white/80 ml-px"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: [1, 1, 0] }}
                  transition={{
                    delay: field.typeDelay + field.value.length * 0.04,
                    duration: 0.6,
                    times: [0, 0.6, 1],
                  }}
                />
              </div>
            </motion.div>
          ))}

          {/* Send button */}
          <motion.div
            className="flex justify-end mt-auto pt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: isHovered ? 1.8 : 4.2, duration: 0.3 }}
          >
            <motion.button
              className=" text-[10px] font-bold px-3 py-1.5 rounded"
              initial={{
                background: 'rgba(255,255,255,0.9)',
                color: '#0f1117',
              }}
              animate={{
                background: [
                  'rgba(255,255,255,0.9)',
                  'rgba(255,255,255,0.9)',
                  '#85e89d',
                  '#85e89d',
                ],
                scale: [1, 1, 0.95, 1],
              }}
              transition={{
                delay: isHovered ? 2.2 : 4.8,
                duration: 0.5,
                times: [0, 0.4, 0.7, 1],
              }}
            >
              Send →
            </motion.button>
          </motion.div>

          {/* Success message */}
          <motion.p
            className="text-green-300 text-[10px]  text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: isHovered ? 2.8 : 5.4, duration: 0.4 }}
          >
            Message sent ✓
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function DesktopLoader() {
  return (
    <div className="h-[250px] p-2 mx-auto max-w-lg flex flex-col items-center justify-center relative overflow-hidden">
      {/* Desktop frame — giữ nguyên style từ MvpCard */}
      <div className="border-2 border-main rounded-md bg-transparent flex flex-col w-[90%] h-[75%]">
        {/* Titlebar */}
        <div className="h-7 border-b-2 border-main flex items-center px-2 gap-1 shrink-0">
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <span className="text-main/80 text-[9px]  ml-1">loading.tsx</span>
        </div>

        {/* Screen */}
        <div className="flex-1 bg-main flex flex-col items-center justify-center gap-4">
          {/* Dot spinner */}
          <div className="spinner-container">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className={`sp sp-${i + 1}`} />
            ))}
          </div>

          {/* Loading text */}
          <p className="loading-text">
            loading
            <span className="blink blink-1">.</span>
            <span className="blink blink-2">.</span>
            <span className="blink blink-3">.</span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes jump {
          0%, 100% { transform: translateY(120%); }
          50%       { transform: translateY(-120%); }
        }

        .spinner-container {
          --uib-size: 44px;
          --uib-speed: 1.5s;
          --uib-dot-size: calc(var(--uib-size) * 0.1);
          position: relative;
          height: calc(var(--uib-size) * 0.64);
          width:  calc(var(--uib-size) * 0.64);
        }

        .sp {
          position: absolute;
          height: var(--uib-dot-size);
          width:  var(--uib-dot-size);
          animation: jump var(--uib-speed) ease-in-out infinite;
          will-change: transform;
        }

        .sp::before {
          content: '';
          display: block;
          height: 100%;
          width: 100%;
          background: rgba(255, 255, 255, 0.80);
          border-radius: 50%;
          transform: scale(var(--sc, 1));
        }

        .sp-1  { bottom:24%;   right:-35%;   animation-delay: calc(var(--uib-speed)*-0.48); }
        .sp-2  { bottom:16%;   right:-6%;    animation-delay: calc(var(--uib-speed)*-0.40); }
        .sp-3  { bottom:8%;    right:23%;    animation-delay: calc(var(--uib-speed)*-0.32); --sc:.98; }
        .sp-4  { bottom:-1%;   right:51%;    animation-delay: calc(var(--uib-speed)*-0.24); }
        .sp-5  { bottom:38%;   right:-17.5%; animation-delay: calc(var(--uib-speed)*-0.40); }
        .sp-6  { bottom:30%;   right:10%;    animation-delay: calc(var(--uib-speed)*-0.32); --sc:.92; }
        .sp-7  { bottom:22%;   right:39%;    animation-delay: calc(var(--uib-speed)*-0.24); --sc:.94; }
        .sp-8  { bottom:14%;   right:67%;    animation-delay: calc(var(--uib-speed)*-0.16); --sc:.96; }
        .sp-9  { bottom:53%;   right:-0.8%;  animation-delay: calc(var(--uib-speed)*-0.32); --sc:.86; }
        .sp-10 { bottom:44.5%; right:27%;    animation-delay: calc(var(--uib-speed)*-0.24); --sc:.88; }
        .sp-11 { bottom:36%;   right:55.7%;  animation-delay: calc(var(--uib-speed)*-0.16); --sc:.90; }
        .sp-12 { bottom:28.7%; right:84.3%;  animation-delay: calc(var(--uib-speed)*-0.08); --sc:.92; }
        .sp-13 { bottom:66.8%; right:15%;    animation-delay: calc(var(--uib-speed)*-0.24); --sc:.82; }
        .sp-14 { bottom:58.8%; right:43%;    animation-delay: calc(var(--uib-speed)*-0.16); --sc:.84; }
        .sp-15 { bottom:50%;   right:72%;    animation-delay: calc(var(--uib-speed)*-0.08); --sc:.86; }
        .sp-16 { bottom:42%;   right:100%;   animation-delay: 0s;                           --sc:.88; }

        @keyframes blink {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 1;   }
        }

        .loading-text {
          font-size: 9px;
          font-family: ui-monospace, monospace;
          color: rgba(255, 255, 255, 0.50);
          letter-spacing: 0.12em;
          margin: 0;
          user-select: none;
        }

        .blink { display: inline-block; animation: blink 1.4s ease-in-out infinite; }
        .blink-1 { animation-delay: 0s;   }
        .blink-2 { animation-delay: 0.2s; }
        .blink-3 { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
}

export function DesktopEmpty() {
  return (
    <div className="h-[250px] w-full p-8 mx-auto max-w-lg flex flex-col items-center justify-center relative overflow-hidden">
      <div className="border-2 border-main rounded-md bg-transparent flex flex-col w-[90%] h-[75%]">
        {/* Titlebar */}
        <div className="h-7 border-b-2 border-main flex items-center px-2 gap-1 shrink-0">
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <span className="text-main/80 text-[9px]  ml-1">null.tsx</span>
        </div>

        {/* Screen — empty */}
        <div className="flex-1 bg-main flex flex-col items-center justify-center gap-2">
          {/* Icon: dashed box */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-30 text-primary-50"
          >
            <rect
              x="2"
              y="2"
              width="16"
              height="16"
              rx="2"
              stroke="white"
              strokeWidth="1.5"
              strokeDasharray="3 2"
            />
            <line
              x1="10"
              y1="7"
              x2="10"
              y2="13"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="7"
              y1="10"
              x2="13"
              y2="10"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          <span className="text-primary-50 text-base  tracking-widest">
            nothing here yet
          </span>
        </div>
      </div>
    </div>
  );
}

export function BlogCard({ isHovered }: { isHovered?: boolean }) {
  const controls = useAnimation();
  const { ref, isInView } = useInView();

  const desktopVariants = {
    stacked: { width: '60%', height: '60%' },
    expanded: { width: '90%', height: '75%' },
    highlighted: {
      width: '90%',
      height: '75%',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.8)',
    },
    final: {
      width: '90%',
      height: '75%',
      boxShadow: '0 0 0 1px rgba(255,255,255,0)',
    },
  };

  useEffect(() => {
    if (!isInView) return;
    async function sequence() {
      await controls.start('stacked');
      await controls.start('expanded', { duration: 1.5, ease: 'easeOut' });
      await controls.start('highlighted', { duration: 0.3 });
      await controls.start('final', { duration: 0.5 });
    }
    sequence();
  }, [isInView]);

  const lines = [
    { w: '100%' },
    { w: '95%' },
    { w: '100%' },
    { w: '88%' },
    { w: '100%' },
    { w: '60%' },
  ];

  return (
    <motion.div
      ref={ref}
      className="h-[250px] w-full p-8 mx-auto max-w-lg flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute border-2 border-main rounded-md bg-transparent flex flex-col"
        initial="stacked"
        animate={controls}
        variants={desktopVariants}
      >
        {/* Titlebar */}
        <div className="h-7 border-b-2 border-main flex items-center px-2 gap-1 shrink-0">
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <span className="text-main/80 text-[9px]  ml-1">blog.tsx</span>
        </div>

        {/* Screen */}
        <div className="flex-1 bg-main flex flex-col overflow-hidden">
          {/* Browser bar */}
          <div className="h-5 border-b border-white/10 flex items-center px-2 shrink-0">
            <div className="flex-1 bg-white/10 rounded-md h-3 flex items-center px-2 gap-1">
              <div className="w-1 h-1 rounded-md bg-white/30" />
              <span className="text-white/30 text-[7px]  truncate">
                vietstrix.com/posts/design-systems
              </span>
            </div>
          </div>

          {/* Blog content */}
          <div className="flex-1 flex flex-col gap-1.5 p-2 overflow-hidden">
            {/* Category tag */}
            <motion.div
              className="flex items-center gap-1"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isHovered ? 0.1 : 1.6, duration: 0.25 }}
            >
              <div className="w-2 h-px bg-white/40" />
              <span className="text-white/40 text-[7px]  tracking-widest">
                design · 4 min read
              </span>
            </motion.div>

            {/* Headline */}
            <motion.p
              className="text-white/90 text-[9px]  leading-relaxed"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isHovered ? 0.2 : 1.75, duration: 0.3 }}
            >
              Why design systems fail
              <br />
              before they begin
            </motion.p>

            {/* Meta — author + date */}
            <motion.div
              className="flex items-center gap-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: isHovered ? 0.3 : 1.9, duration: 0.25 }}
            >
              <div className="w-3 h-3 rounded-md bg-white/20 border border-white/20 shrink-0" />
              <span className="text-white text-[7px] ">Vietstrix</span>
              <div className="w-0.5 h-0.5 rounded-md bg-white/20" />
              <span className="text-white text-[7px] ">Apr 23, 2026</span>
            </motion.div>

            {/* Reading progress bar */}
            <motion.div
              className="w-full h-px bg-white/10 rounded-md overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: isHovered ? 0.35 : 2.0, duration: 0.2 }}
            >
              <motion.div
                className="h-full bg-white/60 rounded-md"
                initial={{ width: '0%' }}
                animate={{ width: '68%' }}
                transition={{
                  delay: isHovered ? 0.5 : 2.2,
                  duration: isHovered ? 1.2 : 2.0,
                  ease: 'easeOut',
                }}
              />
            </motion.div>

            {/* Divider */}
            <motion.div
              className="w-full h-px bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: isHovered ? 0.4 : 2.1, duration: 0.2 }}
            />

            {/* Skeleton text lines */}
            <div className="flex flex-col gap-1">
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  className="h-1.5 bg-white/15 rounded-md"
                  style={{ width: line.w }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: isHovered ? 0.45 + i * 0.08 : 2.2 + i * 0.12,
                    duration: 0.2,
                  }}
                />
              ))}

              {/* Active reading line + cursor */}
              <motion.div
                className="flex items-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: isHovered ? 1.0 : 2.95, duration: 0.2 }}
              >
                <div
                  className="h-1.5 bg-white/30 rounded-md"
                  style={{ width: '45%' }}
                />
                <span className="w-0.5 h-3 bg-white/80 animate-pulse" />
              </motion.div>
            </div>

            {/* Related posts */}
            <motion.div
              className="flex gap-1.5 mt-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: isHovered ? 1.1 : 3.1, duration: 0.3 }}
            >
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="flex-1 border border-white/10 rounded bg-white/5 p-1 flex flex-col gap-1"
                >
                  <div className="w-full h-4 bg-white/10 rounded" />
                  <div className="w-full h-1 bg-white/15 rounded-md" />
                  <div className="w-2/3 h-1 bg-white/10 rounded-md" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ServiceCard({ isHovered }: { isHovered?: boolean }) {
  const controls = useAnimation();

  const windowVariants = {
    stacked: { width: '55%', height: '55%', opacity: 0 },
    expanded: { width: '88%', height: '72%', opacity: 1 },
    highlighted: {
      width: '88%',
      height: '72%',
      boxShadow: '0 0 0 1px rgba(59,130,246,0.4)',
    },
    final: {
      width: '88%',
      height: '72%',
      boxShadow: '0 0 0 1px rgba(59,130,246,0)',
    },
  };

  const navItems = ['Landing page', 'UI / UX'];
  const services = ['Landing page', 'Portfolio', 'Business site'];

  useEffect(() => {
    async function sequence() {
      await controls.start('stacked');
      await controls.start('expanded', {
        duration: 1,
        ease: [0.34, 1.1, 0.64, 1],
      });
      await controls.start('highlighted', { duration: 0.3 });
      await controls.start('final', { duration: 0.5 });
    }
    sequence();
  }, []);

  return (
    <motion.div
      className="h-[350px] p-8 mx-auto max-w-lg flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute border border-gray-200 rounded-md overflow-hidden flex flex-col bg-white"
        initial="stacked"
        animate={controls}
        variants={windowVariants}
      >
        {/* Topbar */}
        <div className="h-[22px] bg-gray-50 border-b border-gray-100 flex items-center gap-1 px-2 shrink-0">
          <span className="w-[5px] h-[5px] rounded-md bg-red-300" />
          <span className="w-[5px] h-[5px] rounded-md bg-yellow-300" />
          <span className="w-[5px] h-[5px] rounded-md bg-green-300" />
          <span className="flex-1 mx-1.5 bg-white border border-gray-100 rounded text-[7px]  text-gray-300 px-1.5 py-0.5">
            vietstrix.com/services
          </span>
        </div>

        {/* Body */}
        <div
          className="flex-1 grid overflow-hidden"
          style={{ gridTemplateColumns: '72px 1fr' }}
        >
          {/* Sidebar */}
          <div className="border-r border-gray-100 p-2 flex flex-col gap-1">
            <span className="text-[7px] uppercase tracking-widest text-gray-300 px-1 mb-1">
              Services
            </span>
            <div className="text-[8px] px-1.5 py-1 rounded bg-blue-50 text-blue-800 font-medium">
              Web design
            </div>
            {navItems.map((item, i) => (
              <motion.div
                key={i}
                className="text-[8px] px-1.5 py-1 rounded text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: isHovered ? i * 0.08 : 0.8 + i * 0.1 }}
              >
                {item}
              </motion.div>
            ))}
          </div>

          {/* Content */}
          <div className="p-2.5 overflow-hidden">
            <motion.p
              className="text-[9px] font-semibold text-gray-800 mb-1.5"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isHovered ? 0.1 : 0.65 }}
            >
              Web design
            </motion.p>

            <motion.div
              className="flex gap-1 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: isHovered ? 0.15 : 0.8 }}
            >
              {['Responsive', 'Fast', 'SEO'].map((tag) => (
                <span
                  key={tag}
                  className="text-[7px] px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-100"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            <div className="flex flex-col gap-1">
              {services.map((s, i) => (
                <motion.div
                  key={i}
                  className="text-[8px] text-gray-500 bg-gray-50 border border-gray-100 rounded px-1.5 py-1"
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: isHovered ? i * 0.08 : 1.0 + i * 0.1 }}
                >
                  {s}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Statusbar */}
        <div className="h-[16px] bg-gray-50 border-t border-gray-100 flex items-center px-2 gap-1 shrink-0">
          <span className="w-[5px] h-[5px] rounded-md bg-green-400" />
          <span className="text-[7px]  text-gray-300">
            vietstrix.com · ready
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function MaintenanceCard({ isHovered }: { isHovered?: boolean }) {
  const controls = useAnimation();

  const desktopVariants = {
    stacked: { width: '60%', height: '60%' },
    expanded: { width: '90%', height: '75%' },
    highlighted: {
      width: '90%',
      height: '75%',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.8)',
    },
    final: {
      width: '90%',
      height: '75%',
      boxShadow: '0 0 0 1px rgba(255,255,255,0)',
    },
  };

  useEffect(() => {
    async function sequence() {
      await controls.start('stacked');
      await controls.start('expanded', { duration: 1.5, ease: 'easeOut' });
      await controls.start('highlighted', { duration: 0.3 });
      await controls.start('final', { duration: 0.5 });
    }
    sequence();
  }, []);

  return (
    <motion.div
      className="h-[250px] p-8 mx-auto max-w-lg flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute border-2 border-main rounded-md bg-transparent flex flex-col"
        initial="stacked"
        animate={controls}
        variants={desktopVariants}
      >
        {/* Topbar */}
        <div className="h-7 border-b-2 border-main flex items-center px-2 gap-1 shrink-0">
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <span className="text-main/80 text-[9px]  ml-1">maintenance.tsx</span>
        </div>

        {/* Content */}
        <motion.div
          className="flex-1 bg-main flex flex-col items-center justify-center gap-2.5 overflow-hidden p-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: isHovered ? 0.2 : 1.2, duration: 0.4 }}
        >
          {/* Cog SVG */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: isHovered ? 0.3 : 1.4, duration: 0.4 }}
          >
            <CogAnimation />
          </motion.div>

          {/* Text */}
          <motion.div
            className="flex flex-col items-center gap-1"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isHovered ? 0.5 : 1.8, duration: 0.3 }}
          >
            <span className="text-[10px]  font-medium text-white/85 tracking-widest uppercase">
              Maintenance
            </span>
            <div className="flex items-center gap-1">
              <span className="text-[9px]  text-white/45">
                We&apos;ll be back soon
              </span>
              <BlinkingDots delay={isHovered ? 0.6 : 2.0} />
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            className="border border-white/20 rounded px-2.5 py-0.5"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isHovered ? 0.7 : 2.1, duration: 0.3 }}
          >
            <span className="text-[8px]  text-white/35 tracking-[0.06em]">
              page.updating
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function CogAnimation() {
  return (
    <svg
      width="90"
      height="64"
      viewBox="0 0 90 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible"
    >
      {/* Pulse ring */}
      <circle
        cx="45"
        cy="32"
        r="24"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1"
        fill="none"
        className="animate-[pulse-ring_2.5s_ease-in-out_infinite]"
        style={{
          transformOrigin: '45px 32px',
          animation: 'pulse-ring 2.5s ease-in-out infinite',
        }}
      />

      {/* Main cog */}
      <g
        style={{
          transformOrigin: '45px 32px',
          animation: 'spin 6s linear infinite',
        }}
      >
        <g transform="translate(33,20)">
          <path
            d="M10 0h4v2.8A9 9 0 0 1 17.7 4.8L20 3.5l2 3.46-2.2 1.28A9 9 0 0 1 20.2 11H24v4h-3.8a9 9 0 0 1-.5 2.76L22 19.04 20 22.5l-2.3-1.3A9 9 0 0 1 14 22.8V26h-4v-2.8A9 9 0 0 1 6.3 21.2L4 22.5 2 19.04l2.3-1.28A9 9 0 0 1 3.8 15H0v-4h3.8a9 9 0 0 1 .5-2.76L2 6.96 4 3.5l2.3 1.3A9 9 0 0 1 10 2.8V0z"
            fill="rgba(255,255,255,0.22)"
          />
          <circle
            cx="12"
            cy="13"
            r="5"
            fill="rgba(20,20,20,0.95)"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1.5"
          />
        </g>
      </g>

      {/* Small cog top-right */}
      <g
        style={{
          transformOrigin: '72px 14px',
          animation: 'spin-rev 3.5s linear infinite',
        }}
      >
        <g transform="translate(65,7)">
          <path
            d="M6 0h2v1.6A5 5 0 0 1 10.4 3L12 2.2l1 1.73-1.4.82A5 5 0 0 1 11.8 7H14v2h-2.2A5 5 0 0 1 11 10.5l1.3.75L11.3 13l-1.6-.78A5 5 0 0 1 8 13.4V15H6v-1.6A5 5 0 0 1 3.6 12L2 12.8 1 11.07l1.4-.82A5 5 0 0 1 2.2 9H0V7h2.2A5 5 0 0 1 3 5.5L1.7 4.75 2.7 3l1.6.78A5 5 0 0 1 6 1.6V0z"
            fill="rgba(255,255,255,0.18)"
          />
          <circle
            cx="7"
            cy="7.5"
            r="2.5"
            fill="rgba(20,20,20,0.95)"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.2"
          />
        </g>
      </g>

      {/* Small cog bottom-left */}
      <g
        style={{
          transformOrigin: '18px 52px',
          animation: 'spin 4s linear infinite',
        }}
      >
        <g transform="translate(11,45)">
          <path
            d="M6 0h2v1.6A5 5 0 0 1 10.4 3L12 2.2l1 1.73-1.4.82A5 5 0 0 1 11.8 7H14v2h-2.2A5 5 0 0 1 11 10.5l1.3.75L11.3 13l-1.6-.78A5 5 0 0 1 8 13.4V15H6v-1.6A5 5 0 0 1 3.6 12L2 12.8 1 11.07l1.4-.82A5 5 0 0 1 2.2 9H0V7h2.2A5 5 0 0 1 3 5.5L1.7 4.75 2.7 3l1.6.78A5 5 0 0 1 6 1.6V0z"
            fill="rgba(255,255,255,0.18)"
          />
          <circle
            cx="7"
            cy="7.5"
            r="2.5"
            fill="rgba(20,20,20,0.95)"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.2"
          />
        </g>
      </g>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-rev { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes pulse-ring {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(1.06); }
        }
      `}</style>
    </svg>
  );
}

function BlinkingDots({ delay = 0 }: { delay?: number }) {
  return (
    <>
      {[0, 0.2, 0.4].map((d, i) => (
        <motion.span
          key={i}
          className="text-[9px]  text-white/45"
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            delay: delay + d,
            ease: 'easeInOut',
          }}
        >
          .
        </motion.span>
      ))}
    </>
  );
}

export function IdeationCard({ isHovered }: { isHovered?: boolean }) {
  const ideas = [
    { label: 'landing page', color: '#378ADD' },
    { label: 'hero section', color: '#1D9E75', active: true },
    { label: 'color palette', color: '#D85A30' },
    { label: 'typography', color: '#BA7517' },
    { label: 'interactions', color: '#7F77DD' },
  ];

  const moodChips = ['minimal', 'bold', 'editorial'];

  const controls = useAnimation();
  const { ref, isInView } = useInView();

  const desktopVariants = {
    stacked: { width: '60%', height: '60%' },
    expanded: { width: '90%', height: '75%' },
    highlighted: {
      width: '90%',
      height: '75%',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.8)',
    },
    final: {
      width: '90%',
      height: '75%',
      boxShadow: '0 0 0 1px rgba(255,255,255,0)',
    },
  };

  useEffect(() => {
    if (!isInView) return;

    async function sequence() {
      await controls.start('stacked');
      await controls.start('expanded', { duration: 1.5, ease: 'easeOut' });
      await controls.start('highlighted', { duration: 0.3 });
      await controls.start('final', { duration: 0.5 });
    }
    sequence();
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      className="h-[250px] p-8 mx-auto max-w-lg flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute border-2 border-main rounded-md bg-transparent flex flex-col"
        initial="stacked"
        animate={controls}
        variants={desktopVariants}
      >
        {/* Topbar */}
        <div className="h-7 border-b-2 border-main flex items-center px-2 gap-1 shrink-0">
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <span className="text-main/80 text-[9px]  ml-1">
            notion.so / ideation-board
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 bg-main flex gap-1.5 p-1.5 overflow-hidden">
          {/* Left: idea list */}
          <div className="w-[42%] flex flex-col gap-1 border-r border-white/10 pr-1.5">
            <motion.span
              className="text-[7px]  text-white/30 uppercase tracking-widest mb-0.5"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: isHovered ? 0.2 : 1.5, duration: 0.3 }}
            >
              Ideas
            </motion.span>

            {ideas.map((idea, i) => (
              <motion.div
                key={idea.label}
                className={`flex items-center gap-1 px-1 py-0.5 rounded-sm text-[7px]  border ${
                  idea.active
                    ? 'bg-white/10 border-white/30 text-white/90'
                    : 'bg-transparent border-white/10 text-white/40'
                }`}
                initial={{ opacity: 0, y: 3 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 3 }}
                transition={{
                  delay: isHovered ? 0.2 + i * 0.1 : 1.7 + i * 0.2,
                  duration: 0.3,
                }}
              >
                <div
                  className="w-1 h-1 rounded-md shrink-0"
                  style={{ backgroundColor: idea.color }}
                />
                {idea.label}
              </motion.div>
            ))}

            <motion.div
              className="mt-auto flex items-center gap-1 text-[7px]  text-white/20 border border-dashed border-white/10 rounded-sm px-1 py-0.5"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: isHovered ? 0.8 : 2.7, duration: 0.3 }}
            >
              + add idea
            </motion.div>
          </div>

          {/* Right: note detail */}
          <div className="flex-1 flex flex-col gap-1 overflow-hidden">
            {/* Header */}
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: isHovered ? 0.3 : 2.0, duration: 0.3 }}
            >
              <div className="w-1/2 h-1.5 bg-white/40 rounded-md" />
              <span className="text-[6px]  bg-white/10 text-white/60 px-1 py-0.5 rounded-sm">
                in progress
              </span>
            </motion.div>

            {/* Text lines */}
            <motion.div
              className="flex flex-col gap-1"
              initial={{ opacity: 0, y: 3 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 3 }}
              transition={{ delay: isHovered ? 0.4 : 2.2, duration: 0.3 }}
            >
              <div className="h-1 w-full bg-white/15 rounded-md" />
              <div className="h-1 w-3/4 bg-white/10 rounded-md" />
              <div className="h-1 w-full bg-white/15 rounded-md" />
              <div className="h-1 w-1/2 bg-white/10 rounded-md" />
            </motion.div>

            {/* Reference images */}
            <motion.div
              className="flex gap-1"
              initial={{ opacity: 0, y: 3 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 3 }}
              transition={{ delay: isHovered ? 0.6 : 2.5, duration: 0.3 }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="flex-1 h-6 rounded-sm border border-white/10 bg-white/5 flex items-center justify-center"
                >
                  <div className="w-3/5 h-2/5 bg-white/10 rounded-sm" />
                </div>
              ))}
            </motion.div>

            {/* Mood chips */}
            <motion.div
              className="flex gap-1 mt-auto"
              initial={{ opacity: 0, y: 3 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 3 }}
              transition={{ delay: isHovered ? 0.8 : 2.8, duration: 0.3 }}
            >
              {moodChips.map((chip, i) => (
                <span
                  key={chip}
                  className={`text-[6px]  px-1 py-0.5 rounded-sm border ${
                    i === 0
                      ? 'bg-white/10 border-white/30 text-white/80'
                      : 'bg-transparent border-white/10 text-white/30'
                  }`}
                >
                  {chip}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
export function HandoffCard({ isHovered }: { isHovered?: boolean }) {
  const controls = useAnimation();
  const { ref, isInView } = useInView();

  const desktopVariants = {
    stacked: { width: '60%', height: '60%' },
    expanded: { width: '90%', height: '75%' },
    highlighted: {
      width: '90%',
      height: '75%',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.8)',
    },
    final: {
      width: '90%',
      height: '75%',
      boxShadow: '0 0 0 1px rgba(255,255,255,0)',
    },
  };

  useEffect(() => {
    if (!isInView) return;
    async function sequence() {
      await controls.start('stacked');
      await controls.start('expanded', { duration: 1.5, ease: 'easeOut' });
      await controls.start('highlighted', { duration: 0.3 });
      await controls.start('final', { duration: 0.5 });
    }
    sequence();
  }, [isInView]);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 3 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 3 },
    transition: { delay: isHovered ? delay * 0.4 : delay, duration: 0.3 },
  });

  return (
    <motion.div
      ref={ref}
      className="h-[250px] p-8 mx-auto max-w-lg flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute border-2 border-main rounded-md bg-transparent flex flex-col"
        initial="stacked"
        animate={controls}
        variants={desktopVariants}
      >
        {/* Topbar with URL bar */}
        <div className="h-7 border-b-2 border-main flex items-center px-2 gap-1.5 shrink-0">
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <motion.div
            className="flex-1 h-3.5 border border-white/20 rounded-sm bg-white/5 flex items-center px-1.5 gap-1"
            {...fadeUp(1.6)}
          >
            <span className="text-[6px] text-green-400">🔒</span>
            <span className="text-[7px]  text-white/40">
              <span className="text-white/80 font-medium">vietstrix.com</span>
            </span>
          </motion.div>
        </div>

        {/* Website content */}
        <div className="flex-1 bg-main flex flex-col overflow-hidden relative">
          {/* Live badge */}
          <motion.div
            className="absolute top-1.5 right-1.5 flex items-center gap-1 text-[6px]  px-1.5 py-0.5 rounded-sm bg-green-500/10 border border-green-500/30 text-green-400 z-10"
            {...fadeUp(2.7)}
          >
            <span className="w-1 h-1 rounded-md bg-green-400 animate-pulse" />
            live
          </motion.div>

          {/* Site navbar */}
          <motion.div
            className="flex items-center justify-between px-2 py-1 border-b border-white/10"
            {...fadeUp(1.8)}
          >
            <div className="w-5 h-1.5 bg-white/80 rounded-sm" />
            <div className="flex gap-1.5">
              <div className="w-3 h-1 bg-white/20 rounded-md" />
              <div className="w-3 h-1 bg-white/20 rounded-md" />
              <div className="w-3 h-1 bg-white/20 rounded-md" />
            </div>
            <div className="text-[6px]  bg-white/90 text-black px-1.5 py-0.5 rounded-sm">
              contact
            </div>
          </motion.div>

          {/* Hero section */}
          <motion.div
            className="flex flex-col items-center gap-1.5 px-2 py-2"
            {...fadeUp(2.1)}
          >
            <div className="text-[6px]  text-white/30 border border-white/10 rounded-md px-2 py-0.5">
              ✦ new website
            </div>
            <div className="w-[70%] h-1.5 bg-white/80 rounded-sm" />
            <div className="w-[50%] h-1.5 bg-white/80 rounded-sm" />
            <div className="w-[55%] h-1 bg-white/20 rounded-md mt-0.5" />
            <div className="flex gap-1.5 mt-1">
              <div className="text-[6px]  bg-white/90 text-black px-2 py-1 rounded-sm">
                get started
              </div>
              <div className="text-[6px]  border border-white/20 text-white/50 px-2 py-1 rounded-sm">
                learn more
              </div>
            </div>
          </motion.div>

          {/* Feature cards */}
          <motion.div
            className="flex gap-1.5 px-2 mt-auto pb-2"
            {...fadeUp(2.4)}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex-1 border border-white/10 rounded-sm p-1.5 flex flex-col gap-1 bg-white/5"
              >
                <div className="w-2 h-2 bg-white/20 rounded-sm" />
                <div className="w-4/5 h-1 bg-white/15 rounded-md" />
                <div className="w-3/5 h-1 bg-white/10 rounded-md" />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ForbiddenCard({ isHovered }: { isHovered?: boolean }) {
  const controls = useAnimation();

  const windowVariants = {
    stacked: { width: '55%', height: '55%', opacity: 0 },
    expanded: { width: '88%', height: '72%', opacity: 1 },
    highlighted: {
      width: '88%',
      height: '72%',
      boxShadow: '0 0 0 1px rgba(59,130,246,0.4)',
    },
    final: {
      width: '88%',
      height: '72%',
      boxShadow: '0 0 0 1px rgba(59,130,246,0)',
    },
  };

  useEffect(() => {
    async function sequence() {
      await controls.start('stacked');
      await controls.start('expanded', {
        duration: 1,
        ease: [0.34, 1.1, 0.64, 1],
      });
      await controls.start('highlighted', { duration: 0.3 });
      await controls.start('final', { duration: 0.5 });
    }
    sequence();
  }, []);

  return (
    <motion.div
      className="h-[350px] p-8 mx-auto max-w-lg flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute border border-gray-200 rounded-md overflow-hidden flex flex-col bg-white"
        initial="stacked"
        animate={controls}
        variants={windowVariants}
      >
        {/* Topbar */}
        <div className="h-[22px] bg-gray-50 border-b border-gray-100 flex items-center gap-1 px-2 shrink-0">
          <span className="w-[5px] h-[5px] rounded-md bg-red-300" />
          <span className="w-[5px] h-[5px] rounded-md bg-yellow-300" />
          <span className="w-[5px] h-[5px] rounded-md bg-green-300" />
          <span className="flex-1 mx-1.5 bg-white border border-gray-100 rounded text-[7px] text-gray-300 px-1.5 py-0.5">
            vietstrix.com/admin
          </span>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-5 overflow-hidden">
          {/* Lock icon circle */}
          <motion.div
            className="w-12 h-12 rounded-md bg-red-50 border border-red-100 flex items-center justify-center mb-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: isHovered ? 0.1 : 0.7,
              duration: 0.4,
              ease: [0.34, 1.1, 0.64, 1],
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </motion.div>

          {/* Error code */}
          <motion.p
            className="text-[7px] uppercase tracking-widest text-gray-300 mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: isHovered ? 0.15 : 0.8 }}
          >
            Error 403
          </motion.p>

          {/* Title */}
          <motion.p
            className="text-[9px] font-semibold text-gray-800 mb-1.5 text-center"
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isHovered ? 0.2 : 0.9 }}
          >
            You don&apos;t have permission
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-[7.5px] text-gray-400 text-center leading-relaxed mb-3 px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: isHovered ? 0.25 : 1.0 }}
          >
            This area is restricted. Contact your admin if you think this is a
            mistake.
          </motion.p>

          {/* Request access button */}
          <motion.button
            className="text-[8px] px-3 py-1 rounded bg-red-50 border border-red-100 text-red-400 hover:bg-red-100 transition-colors"
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isHovered ? 0.3 : 1.1 }}
          >
            Request access
          </motion.button>
        </div>

        {/* Statusbar */}
        <div className="h-[16px] bg-gray-50 border-t border-gray-100 flex items-center px-2 gap-1 shrink-0">
          <span className="w-[5px] h-[5px] rounded-md bg-red-300" />
          <span className="text-[7px] text-gray-300">
            vietstrix.com · 403 forbidden
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function AiToCodeCard({ isHovered }: { isHovered?: boolean }) {
  const controls = useAnimation();
  const { ref, isInView } = useInView();

  const desktopVariants = {
    stacked: { width: '60%', height: '60%' },
    expanded: { width: '90%', height: '75%' },
    highlighted: {
      width: '90%',
      height: '75%',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.8)',
    },
    final: {
      width: '90%',
      height: '75%',
      boxShadow: '0 0 0 1px rgba(255,255,255,0)',
    },
  };

  useEffect(() => {
    if (!isInView) return;

    async function sequence() {
      await controls.start('stacked');
      await controls.start('expanded', { duration: 1.5, ease: 'easeOut' });
      await controls.start('highlighted', { duration: 0.3 });
      await controls.start('final', { duration: 0.5 });
    }
    sequence();
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      className="h-[250px] p-8 mx-auto max-w-lg flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute border-2 border-main rounded-md bg-transparent flex flex-col"
        initial="stacked"
        animate={controls}
        variants={desktopVariants}
      >
        {/* Topbar */}
        <div className="h-7 border-b-2 border-main flex items-center px-2 gap-1 shrink-0">
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <div className="w-1.5 h-1.5 bg-main rounded-md" />
          <span className="text-main/80 text-[9px] ml-1">AI_to_Code_Converter.tsx</span>
        </div>

        {/* Content */}
        <div className="flex-1 bg-main flex items-center justify-between p-3 gap-3 overflow-hidden">
          {/* Left panel: AI Prompt & Mockup */}
          <div className="flex-1 h-full bg-white/5 border border-white/10 rounded-lg p-2 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 border-b border-white/5 pb-1">
              <span className="text-[7px] text-white/40 uppercase font-bold">AI Design Input</span>
            </div>
            
            {/* Visual prompt mockup */}
            <div className="flex-1 flex flex-col justify-center gap-1 my-1">
              <motion.div 
                className="text-[6.5px] text-white/70 italic bg-white/5 p-1 rounded border border-white/10 truncate"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: isHovered ? 0.3 : 1.2 }}
              >
                &ldquo;Modern landing page...&rdquo;
              </motion.div>
              <div className="flex gap-1">
                <div className="w-3/5 h-6 bg-white/15 rounded flex items-center justify-center">
                  <span className="text-[6px] text-white/50">Mockup</span>
                </div>
                <div className="w-2/5 h-6 bg-white/10 rounded flex items-center justify-center">
                  <span className="text-[6px] text-white/40">v0.dev</span>
                </div>
              </div>
            </div>

            <div className="h-2 bg-green-500/25 border border-green-500/40 rounded flex items-center justify-center">
              <span className="text-[5.5px] text-green-400 font-bold tracking-wider">DESIGN READY</span>
            </div>
          </div>

          {/* Center Connection Arrow */}
          <div className="flex flex-col items-center justify-center shrink-0">
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>

          {/* Right panel: Live Website & Interactive code */}
          <div className="flex-1 h-full bg-white/5 border border-white/10 rounded-lg p-2 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/5 pb-1">
              <span className="text-[7px] text-white/40 uppercase font-bold">Real Website</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <div className="flex-1 flex flex-col gap-1 my-1 justify-center">
              {/* Lines of code typing */}
              <div className="flex flex-col gap-0.5 font-mono text-[5.5px] text-emerald-400/80 leading-none">
                <span className="text-white/60">const Web = () =&gt; &#123;</span>
                <span className="pl-1.5">return &lt;div&gt;</span>
                <span className="pl-3 text-white/70">&lt;Hero /&gt;</span>
                <span className="pl-1.5">&lt;/div&gt;</span>
                <span className="text-white/60">&#125;</span>
              </div>
            </div>

            <div className="h-2 bg-emerald-500 border border-emerald-400 rounded flex items-center justify-center">
              <span className="text-[5.5px] text-white font-bold tracking-wider">BUILD SUCCESS</span>
            </div>
          </div>
        </div>

        {/* Statusbar */}
        <div className="h-[16px] bg-gray-50 border-t border-gray-100 flex items-center px-2 gap-1 shrink-0">
          <span className="w-[5px] h-[5px] rounded-md bg-emerald-400" />
          <span className="text-[7px] text-gray-300">
            vietstrix.com · AI-to-Web Conversion Active
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
