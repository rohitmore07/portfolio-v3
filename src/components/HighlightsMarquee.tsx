import React, { useEffect, useRef } from 'react';
import { HIGHLIGHTS } from '../data/portfolioData';

export const HighlightsMarquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollStartRef = useRef(0);
  const draggedDistanceRef = useRef(0);

  const items = [...HIGHLIGHTS, ...HIGHLIGHTS, ...HIGHLIGHTS];
  const baseCount = HIGHLIGHTS.length;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId = 0;
    let isVisible = true;

    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.01 }
    );
    io.observe(el);

    const children = el.children;
    const singleSetWidth =
      children.length >= 3 * baseCount
        ? (children[baseCount] as HTMLElement).offsetLeft
        : el.scrollWidth / 3;

    el.scrollLeft = singleSetWidth;

    const tick = () => {
      if (isVisible && !isHoveredRef.current && !isDraggingRef.current && el) {
        el.scrollLeft += 0.6;
        if (singleSetWidth > 0 && el.scrollLeft >= 2 * singleSetWidth) {
          el.scrollLeft -= singleSetWidth;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
    };
  }, [baseCount]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollStartRef.current = el.scrollLeft;
    draggedDistanceRef.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = x - startXRef.current;
    draggedDistanceRef.current = Math.abs(walk);
    containerRef.current.scrollLeft = scrollStartRef.current - walk;
  };

  const stopDragging = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="w-full flex flex-col gap-4 mt-2">
      <div className="w-full h-10 px-3 flex items-center">
        <p className="font-instrument text-3xl text-white dark:text-black">Highlights</p>
      </div>

      <div
        className="w-full relative overflow-hidden py-4"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={() => {
            isHoveredRef.current = true;
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
            stopDragging();
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          className="flex gap-4 w-full overflow-x-auto scrollbar-hide px-4 cursor-grab active:cursor-grabbing select-none [will-change:scroll-position] [transform:translateZ(0)]"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {items.map((tweet, idx) => (
            <a
              key={`${tweet.handle}-${idx}`}
              target="_blank"
              rel="noopener noreferrer"
              href={tweet.link}
              onClick={(e) => {
                if (draggedDistanceRef.current > 6) {
                  e.preventDefault();
                }
              }}
              className="w-[280px] flex-shrink-0 flex flex-col p-3.5 bg-neutral-900/40 dark:bg-neutral-50/40 border border-[#272727] dark:border-neutral-200 rounded-md hover:border-neutral-800 dark:hover:border-neutral-300 hover:bg-neutral-900/60 dark:hover:bg-neutral-50/60 transition-all duration-300 ease-out group cursor-pointer"
            >
              <div className="flex justify-between items-start w-full">
                <div className="flex gap-2 items-center min-w-0 flex-1">
                  <div className="relative size-8 overflow-hidden rounded-full border border-neutral-800 dark:border-neutral-200 flex-shrink-0">
                    <img
                      src={tweet.avatar}
                      alt={tweet.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col leading-tight min-w-0">
                    <div className="flex items-center gap-0.5 min-w-0">
                      <span className="font-inter text-xs font-semibold text-white dark:text-black truncate">
                        {tweet.name}
                      </span>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        className="text-[#1d9bf0] text-[11px] flex-shrink-0"
                        height="1em"
                        width="1em"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="m23 12-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69zm-12.91 4.72-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48z" />
                      </svg>
                    </div>
                    <span className="font-inter text-[10px] text-neutral-500 truncate">
                      @{tweet.handle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                  {tweet.pinned && (
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 16 16"
                      className="text-neutral-500 dark:text-neutral-400 text-[10px]"
                      height="12"
                      width="12"
                    >
                      <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-.512.195-.707 0a.5.5 0 0 1 0-.707l3.182-3.182L3.313 7.07a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z" />
                    </svg>
                  )}
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="text-neutral-600 dark:text-neutral-400 text-xs"
                    height="1em"
                    width="1em"
                  >
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                  </svg>
                </div>
              </div>

              <p className="font-inter text-xs mt-2.5 text-neutral-300 dark:text-neutral-700 leading-normal font-normal select-text">
                “{tweet.text}”
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
