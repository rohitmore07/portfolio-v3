import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RoutePath } from '../components/Navbar';

interface SubPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const BlogsPage: React.FC<SubPageProps> = ({ onNavigate }) => {
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-screen min-h-screen flex items-center flex-col relative bg-[#0F0E0E] dark:bg-[#ffffff] overflow-x-hidden">
      <div className="block border-y h-5 bg-white/2 dark:bg-black/2 border-[#272727] dark:border-neutral-200 border-dashed w-screen absolute top-28 left-0" />
      <div className="block border-t bg-white/2 dark:bg-black/2 border-[#272727] dark:border-neutral-200 border-dashed w-screen absolute top-62 sm:top-58 left-0" />

      {/* Floating Preview Card on Hover */}
      {cursorPos && (
        <div
          className="fixed top-0 left-0 pointer-events-none select-none z-50 hidden sm:block will-change-transform transition-opacity duration-150"
          style={{
            transform: `translate3d(${cursorPos.x + 20}px, ${cursorPos.y - 90}px, 0)`,
          }}
        >
          <div className="w-[270px] rounded-xl p-2 bg-[#141414]/90 dark:bg-white/95 backdrop-blur-xl border border-white/10 dark:border-neutral-200/90 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7)] ring-1 ring-white/5">
            <div className="relative w-full aspect-16/10 rounded-lg overflow-hidden bg-neutral-950 border border-white/5 dark:border-neutral-200/90">
              <img
                alt="All About Threejs"
                src="/blogs/redis.png"
                className="object-cover w-full h-full"
              />
              <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-mono text-white flex items-center gap-1.5 border border-white/10 shadow-sm">
                <span className="size-1.5 rounded-full bg-red-500" /> Redis
              </div>
            </div>
            <div className="flex items-center justify-between mt-2 px-1 text-[11px] font-mono text-neutral-400 dark:text-neutral-600">
              <span className="text-neutral-300 dark:text-neutral-900 font-medium">Medium</span>
              <span className="text-emerald-400 dark:text-emerald-600 font-semibold">Read ↗</span>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-200 px-4 md:px-6 pt-18 pb-18 min-h-screen flex flex-col justify-start z-20">
        <motion.div
          initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.45 }}
          className="flex items-center justify-between w-full mb-8"
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="group/back flex items-center gap-1.5 text-xs text-neutral-500 hover:text-white dark:hover:text-black transition-colors font-mono tracking-wider uppercase"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              className="text-sm transition-transform duration-300 group-hover/back:-translate-x-1"
              height="1em"
              width="1em"
            >
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="48"
                d="M244 400 100 256l144-144M120 256h292"
              />
            </svg>
            Home
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="w-full flex flex-col font-inter mb-8 mt-7"
        >
          <div className="gap-1 flex flex-col">
            <h1 className="font-instrument text-4xl md:text-5xl text-white dark:text-black tracking-tight">
              Blogs
            </h1>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-180">
              Writing about UI, software engineering, and building things.
            </p>
          </div>
        </motion.div>

        <div className="w-full flex items-center justify-between text-xs font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 mt-2 mb-5 font-inter">
          <div className="flex items-center gap-2">Articles</div>
          <span className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
            1 Post
          </span>
        </div>

        <div className="w-full flex flex-col gap-6">
          <article
            onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
            onMouseLeave={() => setCursorPos(null)}
            className="w-full border border-dashed border-[#272727] dark:border-neutral-200 hover:border-[#3a3a3a] dark:hover:border-neutral-300 rounded-xl bg-white/[0.02] dark:bg-black/[0.02] transition-colors duration-300 p-5 sm:p-6 group relative overflow-hidden"
          >
            <div className="relative flex items-center justify-between gap-3 text-xs font-mono pb-3 border-b border-dashed border-[#272727] dark:border-neutral-200">
              <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                <span>Oct 2026</span>
                <span className="opacity-40">•</span>
                <span>25 min read</span>
              </div>
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                className="p-1 text-neutral-500 hover:text-white dark:hover:text-black cursor-pointer text-xs font-mono"
              >
                {expanded ? 'Hide details ▲' : 'Details ▼'}
              </button>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <a
                href="https://rohitmore07.hashnode.dev/all-about-threejs"
                target="_blank"
                rel="noopener noreferrer"
                className="font-instrument text-2xl sm:text-3xl font-semibold text-white dark:text-black hover:underline"
              >
                All About Three.js
              </a>
              <a
                href="https://rohitmore07.hashnode.dev/all-about-threejs"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-xs font-mono px-3 py-1.5 rounded-md border border-dashed border-[#272727] dark:border-neutral-300 text-neutral-300 dark:text-neutral-700 hover:text-white dark:hover:text-black"
              >
                Read on Hashnode ↗
              </a>
            </div>

            {expanded && (
              <p className="mt-3 text-xs sm:text-sm text-neutral-400 dark:text-neutral-600 font-inter leading-relaxed">
                A deep-dive guide into in-memory data structures, single-threaded event loops,
                persistence strategies (RDB vs AOF), eviction policies, and production caching
                patterns.
              </p>
            )}
          </article>
        </div>

        <div className="w-full h-30 mt-10 flex items-center justify-center flex-col font-inter gap-2 -mb-3">
          <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm">
            Designed &amp; Developed by{' '}
            <span className="font-semibold text-neutral-300 dark:text-neutral-600">RO</span>
          </p>
          <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm">
            © 2026 All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
