import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { OPEN_SOURCE_CONTRIBUTIONS } from '../data/portfolioData';

export const Contribution: React.FC = () => {
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Main Heading */}
      <h1 className="font-instrument text-2xl md:text-3xl text-white dark:text-black flex items-center gap-3">
        <FaGithub className="text-2xl md:text-3xl" />
        Open Source Contribution
      </h1>

      {OPEN_SOURCE_CONTRIBUTIONS.map((group) => (
        <motion.div
          key={group.org}
          initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="w-full flex flex-col"
        >
          <h2 className="font-instrument text-1xl md:text-2xl text-white dark:text-black mt-2 mb-4 flex items-center gap-2 pb-2 border-b border-dashed border-[#272727] dark:border-neutral-200">
            <span className="text-neutral-500">•</span>{group.org}
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
                      aria-expanded={isOpen}
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
  );
};

export default Contribution;