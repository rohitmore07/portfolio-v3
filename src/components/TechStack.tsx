
import React, { useEffect, useState } from "react";
import {
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiJsonwebtokens,
  SiGit,
  SiVercel,
  SiFigma,
  SiPostman,
  SiAxios,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
} from "react-icons/si";
import { FiGithub } from "react-icons/fi";
import { playNote, setupAudioUnlock } from "../utils/sound";

interface TechItem {
  name: string;
  href: string;
  categories: string[];
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const techItems: TechItem[] = [
  {
    name: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    categories: ["frontend"],
    icon: SiJavascript,
    color: "group-hover:text-[#F7DF1E]",
  },
  {
    name: "TypeScript",
    href: "https://www.typescriptlang.org",
    categories: ["frontend", "backend"],
    icon: SiTypescript,
    color: "group-hover:text-[#3178C6]",
  },
  {
    name: "React",
    href: "https://react.dev",
    categories: ["frontend"],
    icon: SiReact,
    color: "group-hover:text-[#61DAFB]",
  },
  {
    name: "Next.js",
    href: "https://nextjs.org",
    categories: ["frontend", "backend"],
    icon: SiNextdotjs,
    color: "group-hover:text-white dark:group-hover:text-black",
  },
  {
    name: "Tailwind CSS",
    href: "https://tailwindcss.com",
    categories: ["frontend"],
    icon: SiTailwindcss,
    color: "group-hover:text-[#38BDF8]",
  },
  {
    name: "Framer Motion",
    href: "https://motion.dev",
    categories: ["frontend"],
    icon: SiFramer,
    color: "group-hover:text-[#F024B6]",
  },
  {
    name: "Node.js",
    href: "https://nodejs.org",
    categories: ["backend"],
    icon: SiNodedotjs,
    color: "group-hover:text-[#339933]",
  },
  {
    name: "Express.js",
    href: "https://expressjs.com",
    categories: ["backend"],
    icon: SiExpress,
    color: "group-hover:text-white dark:group-hover:text-neutral-800",
  },
  {
    name: "MongoDB",
    href: "https://www.mongodb.com",
    categories: ["backend"],
    icon: SiMongodb,
    color: "group-hover:text-[#47A248]",
  },
  {
    name: "PostgreSQL",
    href: "https://www.postgresql.org",
    categories: ["backend"],
    icon: SiPostgresql,
    color: "group-hover:text-[#4169E1]",
  },
  {
    name: "Prisma",
    href: "https://www.prisma.io",
    categories: ["backend"],
    icon: SiPrisma,
    color: "group-hover:text-[#5A67D8] dark:group-hover:text-white",
  },
  {
    name: "OAuth",
    href: "https://oauth.net",
    categories: ["backend"],
    icon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-3.5 h-3.5"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12.5 6a1.5 1.5 0 0 1 1.5 1l2.8 7.8a1.6 1.6 0 0 1-1 2.1 1.6 1.6 0 0 1-2-.8l-.5-1.1h-2.7l-.4.9a1.6 1.6 0 0 1-2 1l-.2-.1a1.6 1.6 0 0 1-1-2l2.8-7.8a1.6 1.6 0 0 1 1.4-1.1l1.3.1z" />
      </svg>
    ),
    color: "group-hover:text-[#4285F4]",
  },
  {
    name: "JWT",
    href: "https://jwt.io",
    categories: ["backend"],
    icon: SiJsonwebtokens,
    color: "group-hover:text-[#fb015b]",
  },
  {
    name: "Git",
    href: "https://git-scm.com",
    categories: ["tools"],
    icon: SiGit,
    color: "group-hover:text-[#F05032]",
  },
  {
    name: "GitHub",
    href: "https://github.com",
    categories: ["tools"],
    icon: FiGithub,
    color: "group-hover:text-white dark:group-hover:text-black",
  },
  {
    name: "Vercel",
    href: "https://vercel.com",
    categories: ["tools"],
    icon: SiVercel,
    color: "group-hover:text-white dark:group-hover:text-black",
  },
  {
    name: "Figma",
    href: "https://figma.com",
    categories: ["design"],
    icon: SiFigma,
    color: "group-hover:text-[#F24E1E]",
  },
  {
    name: "Postman",
    href: "https://www.postman.com",
    categories: ["tools"],
    icon: SiPostman,
    color: "group-hover:text-[#FF6C37]",
  },
  {
    name: "Axios",
    href: "https://axios-http.com",
    categories: ["frontend", "backend"],
    icon: SiAxios,
    color: "group-hover:text-[#5A29E4]",
  },
];

const noteFrequencies = [
  261.63, 293.66, 329.63, 392, 440, 523.25, 587.33, 659.25,
  783.99, 880, 1046.5, 1174.66, 1318.51, 1567.98, 1760, 2093,
];

const filterCategories = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "design", label: "Design" },
  { id: "tools", label: "Tools" },
];

export const TechStack: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Register global audio unlock listeners.
  useEffect(() => {
    return setupAudioUnlock();
  }, []);

  const filteredItems = techItems.filter(
    (item) =>
      selectedCategory === "all" ||
      item.categories.includes(selectedCategory)
  );

  return (
    <div className="w-full min-h-[18rem] lg:min-h-60 md:min-h-48 mt-9 md:mt-9 lg:mt-5 px-3">
      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 h-auto sm:h-12 pb-2 md:pb-0">
        <div className="flex flex-row items-baseline gap-2">
          <p className="font-instrument text-3xl text-white dark:text-black">
            Tech Stack
          </p>

          <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 select-none">
            <span className="hidden lg:inline">( hover to play )</span>
            <span className="inline lg:hidden">( click to play )</span>
          </span>
        </div>

        {/* Filters */}
        <div className="sm:flex flex-wrap gap-1 hidden">
          {filterCategories.map((cat) => {
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  playNote(523.25, 0.04);
                  setSelectedCategory(cat.id);
                }}
                className={`px-2.5 py-1 text-xs font-sans font-semibold rounded-sm transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? "bg-white/10 text-white dark:bg-black/10 dark:text-black shadow-xs font-bold scale-102 border-neutral-700 dark:border-neutral-300"
                    : "text-neutral-400 dark:text-neutral-500 hover:bg-white/5 dark:hover:bg-black/5 border-transparent"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tech Badges Grid */}
      <div className="flex flex-wrap gap-2 mt-4 w-full items-start pb-6 min-h-[12rem] md:min-h-30 lg:min-h-44">
        <div className="flex flex-wrap gap-1 sm:gap-2 w-full items-start min-h-auto">
          {filteredItems.map((item, idx) => {
            const Icon = item.icon;
            const freq = noteFrequencies[idx % noteFrequencies.length];

            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                onClick={() => {
                  if (window.matchMedia("(hover: none)").matches) {
                    playNote(freq, 0.08);
                  }
                }}
                onMouseEnter={() => {
                  if (window.matchMedia("(hover: hover)").matches) {
                    playNote(freq, 0.08);
                  }
                }}
              >
                <div className="hover:text-white text-neutral-400 dark:text-neutral-600 hover:dark:text-black border border-[#272727] dark:border-neutral-300 rounded-sm bg-white/2 dark:hover:bg-black/8 dark:bg-black/5 flex w-auto h-7 items-center gap-1.5 pl-2 pr-3 cursor-pointer hover:bg-white/4 transition-all duration-100 border-dotted select-none">
                  <Icon
                    className={`text-[14px] transition-colors duration-200 ${item.color}`}
                  />

                  <p className="font-sans text-[11px] sm:text-sm">
                    {item.name}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
