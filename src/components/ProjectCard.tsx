import React from 'react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectCardProps {
  project: ProjectItem;
  borderClassName?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  borderClassName = 'border-b border-dashed border-[#272727] dark:border-neutral-200',
}) => {
  return (
    <div
      className={`w-full h-auto min-h-110 ${borderClassName} flex p-3 flex-col justify-start transition-all duration-300`}
    >
      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
        <div
          className={`w-full -mr-3 h-58 rounded-md bg-neutral-900 dark:bg-neutral-200 cursor-pointer overflow-hidden relative group ${project.gradientClass} transition-colors duration-900`}
        >
          {/* Custom Interactive Hover Overlay per Project */}
          {project.overlayType === 'orgwise' && (
            <div className="absolute -right-20 top-8 rotate-45 overflow-hidden h-10 z-10">
            </div>
          )}

          {project.overlayType === 'prsnclink' && (
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
              <div className="absolute inset-0 border border-orange-500 ring-1 ring-orange-500/20" />
              <div className="absolute -top-0.5 -left-0.5 size-1.5 bg-white dark:bg-black border border-orange-500" />
              <div className="absolute -top-0.5 -right-0.5 size-1.5 bg-white dark:bg-black border border-orange-500" />
              <div className="absolute -bottom-0.5 -left-0.5 size-1.5 bg-white dark:bg-black border border-orange-500" />
              <div className="absolute -bottom-0.5 -right-0.5 size-1.5 bg-white dark:bg-black border border-orange-500" />
              <div className="absolute top-0 left-0 bg-orange-500 text-white font-mono text-[9px] px-2 py-0.5 rounded-br-xs font-semibold tracking-wide select-none flex items-center gap-1.5">
                <span>saas</span>
                <span className="text-white/60">·</span>
                <span className="text-white/90">100% client side</span>
              </div>
            </div>
          )}

          {project.overlayType === 'cvdecode' && (
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 font-mono text-[9px] text-white">
              <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-white/60" />
              <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-white/60" />
              <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-white/60" />
              <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-white/60" />
              <div className="absolute top-4 left-9 flex items-center gap-1 text-[8px] font-semibold text-white/70">
                <span className="size-1.5 rounded-full bg-rose-500 animate-pulse" />
                REC
              </div>
              <div className="absolute top-4 right-9 text-[8px] text-white/70 font-semibold">
                ISO 400
              </div>
              <div className="absolute inset-0 m-auto w-4 h-4 flex items-center justify-center opacity-40">
                <div className="w-4 h-[1px] bg-white absolute" />
                <div className="h-4 w-[1px] bg-white absolute" />
              </div>
            </div>
          )}

          {project.overlayType === 'insightiq' && (
            <div className="absolute -left-10 -top-10 opacity-0 group-hover:left-[45%] group-hover:top-[35%] group-hover:opacity-100 transition-all duration-700 ease-out pointer-events-none z-10 flex flex-col items-start gap-0.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-sky-400 drop-shadow-md rotate-[-15deg]"
              >
                <path
                  d="M3.5 2V12L6.7 8.8H11.5L3.5 2Z"
                  fill="currentColor"
                  stroke="white"
                  strokeWidth="1.2"
                />
              </svg>
              <span className="bg-sky-500 text-white font-mono text-[8px] px-1 py-0.5 rounded-sm shadow-md font-bold tracking-wide select-none translate-x-2">
                design
              </span>
            </div>
          )}

          {/* Screenshot Card */}
          <div
            className={`border-5 ${
              project.overlayType === 'orgwise' ? 'border-white/30' : 'border-white/20'
            } absolute rounded-xl -right-13 ${
              project.overlayType === 'insightiq'
                ? '-bottom-10 group-hover:-right-10 group-hover:-bottom-7'
                : '-bottom-5 group-hover:-right-10 group-hover:-bottom-3'
            } transition-all duration-200 overflow-hidden shadow-xl`}
          >
            <img
              alt={project.title}
              loading="lazy"
              width={360}
              height={400}
              className="rounded-lg object-cover"
              src={project.image}
            />
          </div>
        </div>
      </a>

      <div className="flex flex-col w-full mt-3">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="font-inter text-white dark:text-black font-semibold text-xl">
              {project.title}
            </p>
            <p className="font-inter text-neutral-400 text-xs dark:text-neutral-500">
              {project.tagline}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <p className="font-inter text-neutral-500 text-sm font-semibold text-center flex justify-center items-center gap-1">
              <span className="text-green-500 text-xl">•</span> Live
            </p>
          </div>
        </div>

        <div>
          <p className="font-inter text-neutral-400 dark:text-neutral-500 text-xs sm:text-sm mt-3 mb-2">
            {project.description}
          </p>
        </div>

        <div className="min-h-13 h-auto py-2 w-full grid grid-cols-[1fr_auto] items-center">
          <div className="flex flex-wrap gap-1.5 items-center py-1">
            {project.tags.map((tag) => (
              <p
                key={tag}
                className="font-inter text-[11px] sm:text-xs px-2 py-1 border-dotted bg-white/2 dark:bg-black/2 border-[#272727] dark:border-neutral-200 border rounded-sm"
              >
                {tag}
              </p>
            ))}
          </div>

          <div className="flex justify-end items-center gap-1">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live website`}>
              <div className="rounded-md size-10 flex cursor-pointer justify-center items-center hover:bg-white/4 dark:hover:bg-black/4 transition-all duration-100 text-neutral-500 hover:text-white dark:hover:text-black">
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
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
            </a>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub repository`}
              >
                <div className="rounded-md size-10 flex cursor-pointer justify-center items-center hover:bg-white/4 dark:hover:bg-black/4 transition-all duration-100 text-neutral-500 hover:text-white dark:hover:text-black">
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
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
