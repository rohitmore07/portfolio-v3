import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { PROJECTS, TECH_STACK, TechCategory } from '../data/portfolioData';
import { ProjectCard } from '../components/ProjectCard';
import { GitHubActivity } from '../components/GitHubActivity';
import { HighlightsMarquee } from '../components/HighlightsMarquee';
import { TechStack } from "../components/TechStack";
import { playPopSound, TECH_PIANO_FREQUENCIES } from '../utils/sound';
import { RoutePath } from '../components/Navbar';

const ROTATING_ROLES = [
  'Full Stack Engineer',
  'Applied AI',
  'Indie Hacker',
];

const TECH_CATEGORIES: { id: TechCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'design', label: 'Design' },
  { id: 'tools', label: 'Tools' },
];

const pageVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

const riseVariants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function MorphingRoleText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_ROLES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const chars = useMemo(() => Array.from(ROTATING_ROLES[index] ?? ''), [index]);

  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={index}
        className="flex gap-0.25 overflow-hidden text-xs sm:text-lg font-semibold text-neutral-500 w-auto"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.4 }}
      >
        {chars.map((char, idx) => (
          <motion.span
            key={idx}
            className="inline-block"
            initial={{ opacity: 0, y: 5, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -5, filter: 'blur(5px)' }}
            transition={{ delay: 0.03 * idx, duration: 0.3 }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
    </AnimatePresence>
  );
}

function AnimatedNumber({ to }: { to: number }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let rafId = 0;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / 1000, 1);
      setVal(Math.floor(progress * (2 - progress) * to));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [to]);

  return <>{val}</>;
}

interface HomePageProps {
  onNavigate: (path: RoutePath) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const prefersReducedMotion = useReducedMotion();
  const [primaryAvatar, setPrimaryAvatar] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<TechCategory>('all');
  const [viewCount, setViewCount] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem('samworks_view_count');
        const hasVisited = sessionStorage.getItem('has-visited-portfolio');
        let count = stored ? parseInt(stored, 10) : 1023;
        if (Number.isNaN(count) || count < 1023) count = 1023;
        if (!hasVisited) {
          count += 1;
          localStorage.setItem('samworks_view_count', String(count));
          sessionStorage.setItem('has-visited-portfolio', 'true');
        }
        setViewCount(count);
      } catch {
        setViewCount(1024);
      }
    }, 280);
    return () => clearTimeout(timer);
  }, []);

  const filteredTech = useMemo(() => {
    if (selectedCategory === 'all') return TECH_STACK;
    return TECH_STACK.filter((item) => item.categories.includes(selectedCategory));
  }, [selectedCategory]);

  return (
    <div className="bg-[#0F0E0E] dark:bg-[#ffffff] w-full min-h-screen flex justify-center relative">
      {/* Full-viewport horizontal dashed architectural guide lines */}
<div className="absolute border-t w-screen border-[#272727] dark:border-neutral-200 border-dashed left-0 top-46 sm:top-66 pointer-events-none" />
<div className="absolute border-y h-5 bg-white/2 dark:bg-black/2 w-screen border-[#272727] dark:border-neutral-200 border-dashed left-0 top-84 sm:top-106 pointer-events-none" />
<div className="absolute border-t w-screen border-[#272727] dark:border-neutral-200 border-dashed left-0 top-101 sm:top-123 pointer-events-none" />
<div className="absolute border-y h-5 bg-white/2 dark:bg-black/2 w-screen border-[#272727] dark:border-neutral-200 border-dashed left-0 top-180 sm:top-173 pointer-events-none" />
<div className="absolute border-t w-screen border-[#272727] dark:border-neutral-200 border-dashed left-0 top-196 sm:top-190 pointer-events-none" />
<div className="absolute border-t w-screen border-[#272727] dark:border-neutral-200 border-dashed left-0 top-211 sm:top-205 pointer-events-none" />
<div className="absolute border-y h-5 bg-white/2 dark:bg-black/2 w-screen border-[#272727] dark:border-neutral-200 border-dashed left-0 top-211 sm:top-205 pointer-events-none" />
<div className="absolute border-t w-screen border-[#272727] dark:border-neutral-200 border-dashed left-0 top-228 sm:top-222 pointer-events-none" />
<div className="absolute border-y h-5 bg-white/2 dark:bg-black/2 w-screen border-[#272727] dark:border-neutral-200 border-dashed left-0 top-688 md:top-457 lg:top-490 pointer-events-none" />
<div className="absolute border-t w-screen border-[#272727] dark:border-neutral-200 border-dashed left-0 top-703.5 md:top-475 lg:top-508 pointer-events-none" />
<div className="absolute border-y h-5 bg-white/2 dark:bg-black/2 w-screen border-[#272727] dark:border-neutral-200 border-dashed left-0 top-765 md:top-507 lg:top-553 pointer-events-none" />
<div className="absolute border-t w-screen border-[#272727] dark:border-neutral-200 border-dashed left-0 top-781 md:top-525 lg:top-570 pointer-events-none" />
<div className="absolute border-y h-5 bg-white/2 dark:bg-black/2 w-screen border-[#272727] dark:border-neutral-200 border-dashed left-0 lg:top-575 md:top-567 top-824.5 pointer-events-none" />
<div className="absolute border-t w-screen border-[#272727] dark:border-neutral-200 border-dashed left-0 top-841.5 md:top-586 lg:top-593 pointer-events-none" />
<div className="absolute border-y h-5 bg-white/2 dark:bg-black/2 w-screen border-[#272727] dark:border-neutral-200 border-dashed left-0 lg:top-637 md:top-629 top-886 pointer-events-none" />
<div className="absolute border-t w-screen border-[#272727] dark:border-neutral-200 border-dashed left-0 lg:top-654 md:top-647 top-904 pointer-events-none" />
<div className="absolute border-y h-5 bg-white/2 dark:bg-black/2 w-screen border-[#272727] dark:border-neutral-200 border-dashed left-0 top-956 sm:top-710 pointer-events-none" />
<div className="hidden md:block absolute border-y h-5 bg-white/2 dark:bg-black/2 w-screen border-[#272727] dark:border-neutral-200 border-dashed left-0 top-775 pointer-events-none" />
<div className="hidden md:block absolute border-t w-screen border-[#272727] dark:border-neutral-200 border-dashed left-0 top-807 pointer-events-none" />

      {/* Center Column (max-w-200 = 800px) */}
      <motion.div
        variants={pageVariants}
        initial={prefersReducedMotion ? 'show' : 'hidden'}
        animate="show"
        className="w-full max-w-200 border-x border-[#272727] dark:border-neutral-200 border-dashed px-4 sm:px-6 md:px-2 py-3 min-h-screen flex flex-col gap-2 mt-10 z-15 mb-5 mx-auto"
      >
        {/* Banner GIF */}
        <motion.div
          variants={riseVariants}
          className="w-full h-32 sm:h-52 overflow-hidden relative z-0 rounded-xs"
        >
          <img
            alt="profile img"
            width={800}
            height={200}
            className="w-full h-full object-cover rounded-xs"
            src="/banner.gif"
          />
        </motion.div>

        {/* Profile Row */}
        <motion.div
          variants={riseVariants}
          className="flex flex-row gap-3 sm:gap-7 items-center w-full h-auto sm:h-38 py-3 sm:py-0"
        >
          <div className="relative ml-3 sm:ml-4 bg-neutral-700 dark:bg-neutral-200 overflow-hidden shrink-0 rounded-[12px] w-27 h-27 sm:w-30 sm:h-30">
            <div className="rounded-[12px] size-25 sm:size-28">
              <img
                alt="Profile"
                width={105}
                height={105}
                className="absolute inset-0 m-auto w-25 h-25 sm:w-28 sm:h-28 rounded-lg shadow-sm object-cover transition-opacity duration-200"
                src={primaryAvatar ? '/pfp.jpg' : '/pfp.jpg'}
              />
            </div>
          </div>

          <div className="flex flex-row justify-between w-full items-center gap-3 pr-3 sm:pr-0 min-w-0 flex-1">
            <div className="flex flex-col items-start text-left min-w-0 flex-1">
              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  setPrimaryAvatar((prev) => !prev);
                }}
                title="Switch avatar"
                className="cursor-pointer mb-2 text-white dark:text-neutral-600 hover:scale-110 transition-transform"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  version="1.1"
                  viewBox="0 0 30 30"
                  className={`transition-transform duration-300 ${
                    primaryAvatar ? 'rotate-180' : 'rotate-0'
                  }`}
                  height="1em"
                  width="1em"
                >
                  <path d="M3.74,14.44c0-1.52,0.3-2.98,0.89-4.37s1.4-2.58,2.4-3.59s2.2-1.81,3.59-2.4s2.84-0.89,4.37-0.89s2.98,0.3,4.37,0.89s2.59,1.4,3.6,2.4s1.81,2.2,2.4,3.59s0.89,2.84,0.89,4.37s-0.3,2.98-0.89,4.37s-1.4,2.59-2.4,3.6s-2.2,1.81-3.6,2.4s-2.85,0.89-4.37,0.89s-2.98-0.3-4.37-0.89s-2.58-1.4-3.59-2.4s-1.81-2.2-2.4-3.6S3.74,15.97,3.74,14.44z M4.94,14.44c0,1.37,0.27,2.67,0.8,3.91s1.25,2.31,2.15,3.21s1.97,1.61,3.21,2.15s2.54,0.8,3.9,0.8h0.21V4.39h-0.21c-1.36,0-2.66,0.27-3.9,0.8S8.79,6.44,7.89,7.34s-1.61,1.97-2.15,3.21S4.94,13.09,4.94,14.44z" />
                </svg>
              </button>

              <p className="font-instrument text-[23px] sm:text-4xl text-white dark:text-black leading-none truncate max-w-full">
                Roheet More
              </p>

              <div className="font-inter mt-1">
                <MorphingRoleText />
              </div>

              <p className="font-inter text-[9px] sm:text-xs text-neutral-500 font-semibold mt-0.5 truncate max-w-full">
                Maharashtra, India
              </p>
            </div>

            {/* Live Visitor Counter */}
            <div className="flex shrink-0">
              <div className="h-30 w-auto pr-7 pt-2">
                <div className="flex gap-1 items-center text-neutral-600 dark:text-neutral-500 cursor-default overflow-hidden">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-sm sm:text-base shrink-0"
                    height="1em"
                    width="1em"
                  >
                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <div className="relative h-4 sm:h-5 flex items-center justify-start min-w-[30px]">
                    <AnimatePresence mode="wait">
                      {viewCount === null ? (
                        <motion.span
                          key="loading"
                          initial={{ opacity: 1, y: 0 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 1, y: -5 }}
                          transition={{ duration: 0.2 }}
                          className="font-mono text-xs sm:text-[13px] animate-pulse"
                        >
                          0
                        </motion.span>
                      ) : (
                        <motion.span
                          key="loaded"
                          initial={{ opacity: 0, y: 5, filter: 'blur(2px)' }}
                          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.35, ease: 'easeOut' }}
                          className="font-mono text-xs sm:text-[13px]"
                        >
                          <AnimatedNumber to={viewCount} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div variants={riseVariants} className="w-full flex flex-col">
          <div className="w-full h-10 mt-5 flex items-center px-3">
            <p className="font-instrument text-3xl text-white dark:text-black">About</p>
          </div>
          <div className="w-full h-76 sm:h-48 py-2 px-3 flex flex-col justify-center text-white dark:text-black font-inter gap-3 text-sm sm:text-[16px]">
            <div className="flex gap-2">
              <p className="text-neutral-500">• </p>
              <p>
                I&apos;m a <span className="font-bold underline">Full Stack Engineer</span> passionate about building meaningful digital products that combine thoughtful design, clean code and scalable architecture.
              </p>
            </div>
            <div className="flex gap-2">
              <p className="text-neutral-500">• </p>
              <p>
                 Actively exploring AI engineering, working with AI Agents, Agentic Workflows, RAG, MCP, LLM Integrations, Multi-Agent Systems.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Grid Section */}
        <motion.div variants={riseVariants} className="w-full h-25 mt-8 gap-1 flex flex-col">
          <div className="w-full h-10 px-3">
            <p className="font-instrument text-3xl text-white dark:text-black">Contact</p>
          </div>
          <div className="w-full h-full grid grid-cols-5 gap-1">
            {/* GitHub */}
            <a
              className="w-full h-full"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/rohitmore07"
            >
              <div className="w-full h-full flex items-center justify-center md:justify-start md:px-3 gap-2 border-x border-[#272727] dark:border-neutral-200 border-dashed cursor-pointer hover:bg-white/2 dark:hover:bg-black/2 transition-all duration-200 group">
                <div className="size-10 rounded-lg border-2 border-[#272727] dark:border-neutral-200 flex justify-center items-center bg-white/2 dark:bg-black/2 hover:bg-white/3 shrink-0">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-xl"
                    height="1em"
                    width="1em"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <p className="font-inter text-md">GitHub</p>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="text-neutral-500 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                    height="1em"
                    width="1em"
                  >
                    <path
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="48"
                      d="m268 112 144 144-144 144m124-144H100"
                    />
                  </svg>
                </div>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              className="w-full h-full"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/rohitmore07/"
            >
              <div className="w-full h-full flex items-center justify-center md:justify-start md:px-3 gap-2 border-x border-[#272727] dark:border-neutral-200 border-dashed cursor-pointer hover:bg-white/2 dark:hover:bg-black/2 transition-all duration-200 group">
                <div className="size-10 rounded-lg border-2 border-[#272727] dark:border-neutral-200 flex justify-center items-center bg-white/2 dark:bg-black/2 hover:bg-white/3 shrink-0">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-xl"
                    height="1em"
                    width="1em"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <p className="font-inter text-md">LinkedIn</p>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="text-neutral-500 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                    height="1em"
                    width="1em"
                  >
                    <path
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="48"
                      d="m268 112 144 144-144 144m124-144H100"
                    />
                  </svg>
                </div>
              </div>
            </a>

            {/* Twitter / X */}
            <a
              className="w-full h-full"
              target="_blank"
              rel="noopener noreferrer"
              href="https://x.com/rohittmore"
            >
              <div className="w-full h-full flex items-center justify-center md:justify-start md:px-3 gap-2 border-x border-[#272727] dark:border-neutral-200 border-dashed cursor-pointer hover:bg-white/2 dark:hover:bg-black/2 transition-all duration-200 group">
                <div className="size-10 rounded-lg border-2 border-[#272727] dark:border-neutral-200 flex justify-center items-center bg-white/2 dark:bg-black/2 hover:bg-white/3 shrink-0">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="text-xl"
                    height="1em"
                    width="1em"
                  >
                    <path d="M10.4883 14.651L15.25 21H22.25L14.3917 10.5223L20.9308 3H18.2808L13.1643 8.88578L8.75 3H1.75L9.26086 13.0145L2.31915 21H4.96917L10.4883 14.651ZM16.25 19L5.75 5H7.75L18.25 19H16.25Z" />
                  </svg>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <p className="font-inter text-md">Twitter</p>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="text-neutral-500 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                    height="1em"
                    width="1em"
                  >
                    <path
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="48"
                      d="m268 112 144 144-144 144m124-144H100"
                    />
                  </svg>
                </div>
              </div>
            </a>

            {/* Mail */}
            <a className="w-full h-full" href="mailto:cserohitmore@gmail.com">
              <div className="w-full h-full flex items-center justify-center md:justify-start md:px-3 gap-2 border-x border-[#272727] dark:border-neutral-200 border-dashed cursor-pointer hover:bg-white/2 dark:hover:bg-black/2 transition-all duration-200 group">
                <div className="size-10 rounded-lg border-2 border-[#272727] dark:border-neutral-200 flex justify-center items-center bg-white/2 dark:bg-black/2 hover:bg-white/3 shrink-0">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="text-xl"
                    height="1em"
                    width="1em"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 14H4V8l8 5 8-5zm-8-7L4 6h16z" />
                  </svg>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <p className="font-inter text-md">Mail</p>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="text-neutral-500 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                    height="1em"
                    width="1em"
                  >
                    <path
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="48"
                      d="m268 112 144 144-144 144m124-144H100"
                    />
                  </svg>
                </div>
              </div>
            </a>

            {/* Resume */}
            <a
              className="w-full h-full"
              target="_blank"
              rel="noopener noreferrer"
              href="https://drive.google.com/file/d/1ueF1LWEdPcHVELMbzAlcOz5l6L1sCL73/view?usp=drive_link"
            >
              <div className="w-full h-full flex items-center justify-center md:justify-start md:px-3 gap-2 border-x cursor-pointer hover:bg-white/2 dark:hover:bg-black/2 transition-all duration-200 group border-dashed border-[#272727] dark:border-neutral-200">
                <div className="size-10 rounded-lg border-2 border-[#272727] dark:border-neutral-200 flex justify-center items-center bg-white/2 dark:bg-black/2 hover:bg-white/3 shrink-0">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-xl"
                    height="1em"
                    width="1em"
                  >
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <p className="font-inter text-md">Resume</p>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="text-neutral-500 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                    height="1em"
                    width="1em"
                  >
                    <path
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="48"
                      d="m268 112 144 144-144 144m124-144H100"
                    />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Projects Section */}
        <motion.div variants={riseVariants} className="w-full min-h-130 mt-4">
          <div className="flex px-3 items-center w-full h-10 justify-between">
            <p className="font-instrument text-3xl text-white dark:text-black">Projects</p>
            <a
              href="/projects"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/projects');
              }}
            >
              <div className="flex gap-1 items-center group cursor-pointer px-2 py-1">
                <p className="font-inter text-sm text-neutral-500 dark:text-black group-hover:text-white transition-all duration-200 dark:group-hover:text-black">
                  View all
                </p>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  className="text-neutral-500 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white transition-all duration-200 dark:group-hover:text-black"
                  height="1em"
                  width="1em"
                >
                  <path
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="48"
                    d="m268 112 144 144-144 144m124-144H100"
                  />
                </svg>
              </div>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 -mx-1 mt-1 gap-5">
            {PROJECTS.map((project, idx) => {
              const gridBorders = [
                'border-b border-dashed md:border-r border-[#272727] dark:border-neutral-200',
                'border-b border-dashed md:border-l border-[#272727] dark:border-neutral-200',
                'border-b border-dashed md:border-b-0 md:border-t md:border-r border-[#272727] dark:border-neutral-200',
                'md:border-t md:border-l border-[#272727] dark:border-neutral-200 border-dashed',
              ];
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  borderClassName={gridBorders[idx]}
                />
              );
            })}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <TechStack />

        {/* GitHub Activity Section */}
        <motion.div variants={riseVariants} className="w-full h-57 px-3">
          <div className="w-full h-12 flex items-center">
            <p className="font-instrument text-3xl text-white dark:text-black">GitHub Activity</p>
          </div>
          <div className="mt-2">
            <GitHubActivity />
          </div>
        </motion.div>

        {/* Highlights Section */}
        <motion.div variants={riseVariants}>
          <HighlightsMarquee />
        </motion.div>

        {/* Scrolled Too Far CTA Section */}
        <motion.div
          variants={riseVariants}
          className="w-full h-69 px-3 mt-6 flex flex-col gap-2"
        >
          <div className="w-full h-11 flex items-center">
            <p className="font-instrument text-3xl text-white dark:text-black">Scrolled Too Far</p>
          </div>
          <div className="flex w-full h-53 lg:h-60 lg:mt-0 -mt-1 items-center justify-center gap-4 flex-col">
            <p className="font-inter text-[21px] text-center tracking-tight text-neutral-400 dark:text-neutral-600">
              If you&apos;ve read this far, you might be interested in what I do.
            </p>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/contact');
              }}
              className="group relative overflow-hidden flex items-center justify-center gap-2 cursor-pointer w-48 h-11 bg-white dark:bg-black text-[#0F0E0E] dark:text-white border border-transparent rounded-full shadow-[0_4px_14px_rgba(255,255,255,0.06)] dark:shadow-[0_4px_14px_rgba(0,0,0,0.08)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
            >
              <div className="absolute inset-0 w-[60%] h-full bg-gradient-to-r from-transparent via-black/10 dark:via-white/20 to-transparent -skew-x-[25deg] -translate-x-[180%] group-hover:translate-x-[280%] transition-transform duration-[700ms] ease-out pointer-events-none" />
              <span className="font-inter text-base tracking-tight font-semibold relative z-10">
                Let’s Talk
              </span>
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-lg transition-transform duration-200 group-hover:translate-x-1 relative z-10"
                height="1em"
                width="1em"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Monkey D. Luffy Quote Section */}
        <motion.div
          variants={riseVariants}
          className="w-full min-h-55 px-3 -mt-2 lg:mt-4 md:mt-10 flex justify-center"
        >
          <div className="w-full rounded-lg px-6 flex flex-col items-center justify-center gap-3 relative">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 448 512"
              className="text-3xl text-neutral-600 dark:text-neutral-400 rotate-180"
              height="1em"
              width="1em"
            >
              <path d="M0 216C0 149.7 53.7 96 120 96l8 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-8 0c-30.9 0-56 25.1-56 56l0 8 64 0c35.3 0 64 28.7 64 64l0 64c0 35.3-28.7 64-64 64l-64 0c-35.3 0-64-28.7-64-64l0-32 0-32 0-72zm256 0c0-66.3 53.7-120 120-120l8 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-8 0c-30.9 0-56 25.1-56 56l0 8 64 0c35.3 0 64 28.7 64 64l0 64c0 35.3-28.7 64-64 64l-64 0c-35.3 0-64-28.7-64-64l0-32 0-32 0-72z" />
            </svg>
            <p className="font-inter text-[20px] md:text-[30px] text-center italic font-normal tracking-wide leading-relaxed text-neutral-300 dark:text-neutral-700 max-w-xl px-2">
              “As long as I’m alive, there are infinite chances!”
            </p>
            <div className="flex items-center gap-3 w-full justify-center mt-2">
              <div className="h-[1px] w-8 bg-neutral-800 dark:bg-neutral-300" />
              <span className="font-mono text-[10px] tracking-[0.25em] font-bold text-neutral-500 dark:text-neutral-400 uppercase">
                Monkey D. Luffy
              </span>
              <div className="h-[1px] w-8 bg-neutral-800 dark:bg-neutral-300" />
            </div>
          </div>
        </motion.div>

        <div className="w-full" />
        <div className="w-screen -mx-4 opacity-100 sm:opacity-0 h-5 bg-white/2 dark:bg-black/2 border-y border-dashed border-[#272727] dark:border-neutral-200" />

        {/* Footer */}
        <motion.div
          variants={riseVariants}
          className="w-full h-30 -mt-4 flex items-center justify-center flex-col font-inter gap-2 -mb-3"
        >
          <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm">
            Designed &amp; Developed by{' '}
            <span className="font-semibold text-neutral-300 dark:text-neutral-600">RO</span>
          </p>
          <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm">
            © 2026 All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
