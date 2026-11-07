import React from 'react';
import { motion } from 'framer-motion';
import { FAVOURITE_BOOKS } from '../data/portfolioData';
import { RoutePath } from '../components/Navbar';

interface SubPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const BooksPage: React.FC<SubPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-screen min-h-screen flex items-center flex-col relative bg-[#0F0E0E] dark:bg-[#ffffff]">
      <div className="block border-y h-5 bg-white/2 dark:bg-black/2 border-[#272727] dark:border-neutral-200 border-dashed w-screen absolute top-28 left-0" />
      <div className="block border-t bg-white/2 dark:bg-black/2 border-[#272727] dark:border-neutral-200 border-dashed w-screen absolute top-62 sm:top-58 left-0" />

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
              Favourite Books
            </h1>
            <p className="text-neutral-500 text-sm">
              A showcase of books that left an impact on my thinking. Click a cover to search.
            </p>
          </div>
        </motion.div>

        <div className="relative w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 -mx-1 mt-1 gap-5">
            {FAVOURITE_BOOKS.map((book) => (
              <a
                key={book.title}
                href={`https://www.google.com/search?q=${encodeURIComponent(
                  `${book.title} ${book.author} book`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex flex-col items-center justify-center border-dashed border-[#272727] dark:border-neutral-200 pb-5 border-b md:border-r md:pr-5"
              >
                <div className="relative w-36 h-56 md:w-48 md:h-72 cursor-pointer select-none [perspective:1000px] group">
                  <div className="relative w-full h-full [transform-style:preserve-3d] group-hover:[transform:rotateY(-12deg)] transition-transform duration-500 ease-out">
                    {/* Fanned pages */}
                    <div className="absolute inset-y-1.5 right-1 w-[90%] bg-neutral-200 border-y border-r border-neutral-300 rounded-r-xs shadow-sm pointer-events-none origin-left [transform:translateZ(2px)] group-hover:[transform:rotateY(-6deg)_translateZ(2px)_translateX(4px)] transition-transform duration-500 ease-out" />
                    <div className="absolute inset-y-1.5 right-1.5 w-[89%] bg-neutral-100 border-y border-r border-neutral-300 rounded-r-xs shadow-sm pointer-events-none origin-left [transform:translateZ(4px)] group-hover:[transform:rotateY(-12deg)_translateZ(4px)_translateX(8px)] transition-transform duration-500 ease-out" />
                    <div className="absolute inset-y-1.5 right-2 w-[88%] bg-[#F5F5F5] border-y border-r border-neutral-300 rounded-r-xs shadow-md pointer-events-none origin-left [transform:translateZ(6px)] group-hover:[transform:rotateY(-18deg)_translateZ(6px)_translateX(12px)] transition-transform duration-500 ease-out" />

                    {/* Book Cover */}
                    <div
                      className={`absolute inset-0 w-full h-full rounded-sm overflow-hidden origin-left [transform:translateZ(8px)] group-hover:[transform:rotateY(-30deg)_translateZ(8px)] transition-transform duration-500 ease-out shadow-[0_8px_24px_rgba(0,0,0,0.35)] ${book.bgClass} ${book.textClass} flex flex-col justify-between items-center p-6 border border-white/10`}
                    >
                      <div className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/35 via-black/5 to-transparent pointer-events-none z-15" />
                      <p className="font-instrument text-xs font-semibold uppercase tracking-wider text-center opacity-80">
                        {book.author}
                      </p>
                      <div className="w-8 h-[1px] bg-current opacity-20" />
                      <p className="font-instrument text-base md:text-lg font-bold leading-tight text-center">
                        {book.title}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
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
