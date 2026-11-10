import React from 'react';
import { motion } from 'framer-motion';
import { WORK_EXPERIENCE } from '../data/portfolioData';
import { RoutePath } from '../components/Navbar';

interface SubPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const ExperiencePage: React.FC<SubPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-screen min-h-screen flex items-center flex-col relative bg-[#0F0E0E] dark:bg-[#ffffff] overflow-x-hidden">
      <div className="block border-y h-5 bg-white/2 dark:bg-black/2 border-[#272727] dark:border-neutral-200 border-dashed w-screen absolute top-28 left-0" />
      <div className="block border-t bg-white/2 dark:bg-black/2 border-[#272727] dark:border-neutral-200 border-dashed w-screen absolute top-60 sm:top-52 left-0" />

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
            className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-white dark:hover:text-black transition-colors font-mono tracking-wider uppercase"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              className="text-sm animate-pulse"
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
            </svg>{' '}
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
              Experience
            </h1>
          </div>
        </motion.div>

        <div className="w-full flex flex-col relative">
          {/* Timeline spine */}
          <div className="absolute left-[4.5px] top-2 bottom-0 border-l border-dashed border-[#272727] dark:border-neutral-200" />

          {WORK_EXPERIENCE.map((job, idx) => (
            <motion.div
              key={`${job.company}-${job.period}`}
              initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, delay: 0.15 + idx * 0.1 }}
              className="relative pl-8 pb-12 last:pb-0"
            >
              {/* Timeline node */}
              <span className="absolute left-0 top-1 h-2.5 w-2.5 rounded-full bg-purple-500 ring-4 ring-[#0F0E0E] dark:ring-[#ffffff]" />

              <p className="font-mono text-xs tracking-wider uppercase text-neutral-500 dark:text-neutral-400">
                {job.period}
              </p>

              <h2 className="font-instrument text-2xl md:text-3xl text-white dark:text-black mt-1.5 tracking-tight">
                {job.role}
              </h2>

              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-inter">
                <span className="text-sm font-semibold text-neutral-300 dark:text-neutral-600">
                  {job.company}
                </span>
                <span className="text-neutral-600">·</span>
                <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                  {job.location}
                </span>
              </div>

              <ul className="mt-4 space-y-2.5 text-xs md:text-sm leading-relaxed text-neutral-400 dark:text-neutral-600 font-inter">
                {job.highlights.map((point, pIdx) => (
                  <li key={pIdx} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
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