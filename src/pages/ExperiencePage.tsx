import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { OPEN_SOURCE_CONTRIBUTIONS } from '../data/portfolioData';
import { RoutePath } from '../components/Navbar';

interface SubPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const ExperiencePage: React.FC<SubPageProps> = ({ onNavigate }) => {
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  return (
    <div className="w-screen min-h-screen flex items-center flex-col relative bg-[#0F0E0E] dark:bg-[#ffffff] overflow-x-hidden">
      <div className="block border-y h-5 bg-white/2 dark:bg-black/2 border-[#272727] dark:border-neutral-200 border-dashed w-screen absolute top-28 left-0" />
      <div className="block border-t bg-white/2 dark:bg-black/2 border-[#272727] dark:border-neutral-200 border-dashed w-screen absolute top-72 sm:top-64 left-0" />

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
            <p className="text-neutral-500 text-sm leading-relaxed max-w-180">
              A chronicle of my journey in engineering, designing interactive systems, and
              contributing to open-source codebases.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full flex items-center gap-2 text-xs font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 py-2.5 border-y border-dashed border-[#272727] dark:border-neutral-200 mt-6 mb-6 font-inter"
        >
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-sm"
            height="1em"
            width="1em"
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>{' '}
          Open Source Contributions
        </motion.div>

        <div className="w-full flex flex-col gap-8">
          {OPEN_SOURCE_CONTRIBUTIONS.map((group) => (
            <motion.div
              key={group.org}
              initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="w-full flex flex-col"
            >
              <h2 className="font-instrument text-2xl md:text-3xl text-white dark:text-black mt-2 mb-4 flex items-center gap-2 pb-2 border-b border-dashed border-[#272727] dark:border-neutral-200">
                {group.org}
              </h2>

              <div className="flex flex-col w-full">
                {group.prs.map((pr, idx) => {
                  const key = `${group.org}-${pr.prNumber}`;
                  const isOpen = expandedKey === key;
                  const isLast = idx === group.prs.length - 1;

                  return (
                    <div
                      key={key}
                      className={`w-full py-5 flex flex-col justify-start transition-all duration-300 border-dashed border-[#272727] dark:border-neutral-200 ${
                        isLast ? '' : 'border-b'
                      }`}
                    >
                      <div className="flex items-start justify-between w-full gap-4">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div className="mt-1 shrink-0">
                            {pr.status === 'merged' ? (
                              <svg
                                stroke="currentColor"
                                fill="none"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-purple-500 text-lg md:text-xl"
                                height="1em"
                                width="1em"
                              >
                                <title>Merged Pull Request</title>
                                <circle cx="18" cy="18" r="3" />
                                <circle cx="6" cy="6" r="3" />
                                <path d="M6 21V9a9 9 0 0 0 9 9" />
                              </svg>
                            ) : (
                              <svg
                                stroke="currentColor"
                                fill="none"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-emerald-500 dark:text-green-500 text-lg md:text-xl"
                                height="1em"
                                width="1em"
                              >
                                <title>Open Pull Request</title>
                                <circle cx="18" cy="18" r="3" />
                                <circle cx="6" cy="6" r="3" />
                                <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                                <line x1="6" x2="6" y1="9" y2="21" />
                              </svg>
                            )}
                          </div>

                          <div className="flex flex-col flex-1 min-w-0">
                            <a
                              href={pr.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group inline-flex items-center gap-1.5 text-white dark:text-black font-semibold text-sm md:text-base leading-snug hover:text-neutral-300 dark:hover:text-neutral-600 transition-colors"
                            >
                              <span className="font-inter tracking-tight break-words">
                                {pr.title}{' '}
                                <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 ml-1.5 font-normal">
                                  {pr.prNumber}
                                </span>
                              </span>
                              <svg
                                stroke="currentColor"
                                fill="none"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-neutral-500 shrink-0 text-xs md:text-sm mt-0.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                height="1em"
                                width="1em"
                              >
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                              </svg>
                            </a>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setExpandedKey(isOpen ? null : key)}
                          className="text-neutral-500 hover:text-white dark:hover:text-black transition-colors p-1 cursor-pointer"
                          aria-label="Toggle details"
                        >
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 512 512"
                            className={`text-base md:text-lg transition-transform duration-200 ${
                              isOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                            height="1em"
                            width="1em"
                          >
                            <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z" />
                          </svg>
                        </button>
                      </div>

                      {isOpen && (
                        <ul className="mt-3 pl-8 space-y-1.5 text-xs md:text-sm text-neutral-400 dark:text-neutral-600 font-inter list-disc">
                          {pr.details.map((detail, dIdx) => (
                            <li key={dIdx}>{detail}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
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
