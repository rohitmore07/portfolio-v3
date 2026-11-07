import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../data/portfolioData';
import { ProjectCard } from '../components/ProjectCard';
import { RoutePath } from '../components/Navbar';

interface SubPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const ProjectsPage: React.FC<SubPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-screen min-h-screen flex items-center flex-col relative bg-[#0F0E0E] dark:bg-[#ffffff] overflow-x-hidden">
      <div className="w-full max-w-200 px-4 md:px-6 pt-18 pb-16 min-h-screen flex flex-col justify-start z-20">
        <motion.div
          initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.45 }}
          className="flex items-center justify-between w-full mb-6"
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

        <div className="w-screen relative left-1/2 -translate-x-1/2 border-y h-5 bg-white/2 dark:bg-black/2 border-[#272727] dark:border-neutral-200 border-dashed" />

        <motion.div
          initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="w-full flex flex-col font-inter py-7"
        >
          <div className="gap-1 flex flex-col">
            <h1 className="font-instrument text-4xl md:text-5xl text-white dark:text-black tracking-tight">
              Projects
            </h1>
            <p className="text-neutral-500 text-sm">
              A curated showcase of my projects and designs.
            </p>
          </div>
        </motion.div>

        <div className="w-screen relative left-1/2 -translate-x-1/2 border-t bg-white/2 dark:bg-black/2 border-[#272727] dark:border-neutral-200 border-dashed mb-6" />

        <motion.div
          initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 -mx-1 gap-5"
        >
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              borderClassName="border border-dashed border-[#272727] dark:border-neutral-200"
            />
          ))}
        </motion.div>

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
