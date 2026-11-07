import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { playShutterSound } from '../utils/sound';

export type RoutePath =
  | '/'
  | '/projects'
  | '/experience'
  | '/contact'
  | '/blogs'
  | '/books'
  | '/favourites';

interface NavbarProps {
  currentPath: RoutePath;
  onNavigate: (path: RoutePath) => void;
}

const NAV_ITEMS: { id: string; label: string; href: RoutePath | '#' }[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'projects', label: 'Projects', href: '/projects' },
  { id: 'experience', label: 'Experience', href: '/experience' },
  { id: 'more', label: 'More', href: '#' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const themeBtnDesktopRef = useRef<HTMLButtonElement | null>(null);
  const themeBtnMobileRef = useRef<HTMLButtonElement | null>(null);
  const mobileWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const syncTheme = () => {
      setIsLightTheme(document.documentElement.classList.contains('dark'));
    };
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (mobileWrapRef.current && !mobileWrapRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [mobileMenuOpen]);

  const handleThemeToggle = (btnEl: HTMLButtonElement | null) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    playShutterSound();

    const nextIsLight = !isLightTheme;
    const applyTheme = () => {
      if (nextIsLight) {
        document.documentElement.classList.add('dark');
        try {
          localStorage.setItem('theme', 'dark');
        } catch {}
      } else {
        document.documentElement.classList.remove('dark');
        try {
          localStorage.setItem('theme', 'light');
        } catch {}
      }
      setIsLightTheme(nextIsLight);
    };

    const viewportW = window.visualViewport?.width ?? window.innerWidth;
    const viewportH = window.visualViewport?.height ?? window.innerHeight;
    let cx = viewportW / 2;
    let cy = viewportH / 2;
    if (btnEl) {
      const rect = btnEl.getBoundingClientRect();
      cx = rect.left + rect.width / 2;
      cy = rect.top + rect.height / 2;
    }

    const endRadius = Math.hypot(
      Math.max(cx, viewportW - cx),
      Math.max(cy, viewportH - cy)
    );

    const docWithVT = document as Document & {
      startViewTransition?: (cb: () => void) => { ready?: Promise<void>; finished?: Promise<void> };
    };

    if (typeof docWithVT.startViewTransition === 'function') {
      const transition = docWithVT.startViewTransition(() => {
        applyTheme();
      });
      transition?.ready
        ?.then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${cx}px ${cy}px)`,
                `circle(${endRadius}px at ${cx}px ${cy}px)`,
              ],
            },
            {
              duration: 400,
              easing: 'ease-in-out',
              fill: 'forwards',
              pseudoElement: '::view-transition-new(root)',
            }
          );
        })
        .catch(() => {});
      setTimeout(() => setIsTransitioning(false), 450);
    } else {
      applyTheme();
      setTimeout(() => setIsTransitioning(false), 200);
    }
  };

  const activeId =
    currentPath === '/projects'
      ? 'projects'
      : currentPath === '/experience'
      ? 'experience'
      : currentPath === '/'
      ? 'home'
      : 'more';

  const currentIndicatorId = hoveredNav || activeId;

  const handleLinkClick = (e: React.MouseEvent, path: RoutePath) => {
    e.preventDefault();
    setMoreOpen(false);
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <div className="w-full flex justify-center items-center fixed top-0 left-0 right-0 z-50 bg-[#0F0E0E] dark:bg-white backdrop-blur-md border-b border-dashed border-[#272727] dark:border-neutral-200">
      <div className="h-12 items-center flex px-3 justify-between w-full max-w-200 pt-1 border-x border-dashed border-[#272727] dark:border-neutral-200 pb-1 relative">
        <div>
          <a href="/" onClick={(e) => handleLinkClick(e, '/')}>
            <p className="font-instrument cursor-pointer text-3xl text-white dark:text-black">
              RO
            </p>
          </a>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-5 items-center">
          <div className="flex gap-5 items-center font-inter text-neutral-400 text-sm">
            {NAV_ITEMS.map((item) => {
              const isIndicator = currentIndicatorId === item.id;
              const isActive = activeId === item.id;

              if (item.id === 'more') {
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => {
                      setHoveredNav(item.id);
                      setMoreOpen(true);
                    }}
                    onMouseLeave={() => {
                      setHoveredNav(null);
                      setMoreOpen(false);
                    }}
                    className="relative flex items-center gap-1.5 py-1 cursor-pointer"
                  >
                    <span
                      className={`relative transition-colors duration-200 select-none ${
                        isActive || moreOpen
                          ? 'text-white dark:text-black'
                          : 'text-neutral-400 dark:text-neutral-500 hover:text-white dark:hover:text-black'
                      }`}
                    >
                      {item.label}
                      {isIndicator && (
                        <motion.span
                          layoutId="nav-dot"
                          className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 size-1 rounded-full bg-white dark:bg-black"
                          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                        />
                      )}
                    </span>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      className={`text-neutral-500 transition-transform duration-200 ${
                        moreOpen ? 'rotate-180 text-white dark:text-black' : 'rotate-0'
                      }`}
                      height="1em"
                      width="1em"
                    >
                      <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z" />
                    </svg>

                    {moreOpen && (
                      <div className="absolute top-[80%] -right-10 pt-3 z-50">
                        <div className="w-32 bg-[#121212] dark:bg-neutral-50 border border-[#272727] dark:border-neutral-200 rounded-lg p-1.5 flex flex-col gap-0.5 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)] dark:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)]">
                          <a
                            href="/blogs"
                            onClick={(e) => handleLinkClick(e, '/blogs')}
                            className="font-inter text-[13px] font-mono tracking-tight text-neutral-400 dark:text-neutral-500 hover:text-white dark:hover:text-black py-1.5 px-2.5 rounded-md hover:bg-white/5 dark:hover:bg-neutral-200 transition-all duration-150"
                          >
                            Blogs
                          </a>
                          <a
                            href="/books"
                            onClick={(e) => handleLinkClick(e, '/books')}
                            className="font-inter text-[13px] font-mono tracking-tight text-neutral-400 dark:text-neutral-500 hover:text-white dark:hover:text-black py-1.5 px-2.5 rounded-md hover:bg-white/5 dark:hover:bg-neutral-200 transition-all duration-150"
                          >
                            Books
                          </a>
                          <a
                            href="/favourites"
                            onClick={(e) => handleLinkClick(e, '/favourites')}
                            className="font-inter text-[13px] font-mono tracking-tight text-neutral-400 dark:text-neutral-500 hover:text-white dark:hover:text-black py-1.5 px-2.5 rounded-md hover:bg-white/5 dark:hover:bg-neutral-200 transition-all duration-150"
                          >
                            Favourites
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href as RoutePath)}
                  onMouseEnter={() => setHoveredNav(item.id)}
                  onMouseLeave={() => setHoveredNav(null)}
                  className={`relative py-1 cursor-pointer transition-colors duration-200 select-none ${
                    isActive
                      ? 'text-white dark:text-black font-semibold'
                      : 'text-neutral-400 dark:text-neutral-500 hover:text-white dark:hover:text-black'
                  }`}
                >
                  <span>{item.label}</span>
                  {isIndicator && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 size-1 rounded-full bg-white dark:bg-black"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          <div className="text-white dark:text-neutral-500 flex cursor-pointer hover:bg-neutral-900 active:scale-98 dark:hover:bg-neutral-100 rounded-md justify-center items-center transition-all duration-200">
            <button
              ref={themeBtnDesktopRef}
              type="button"
              onClick={() => handleThemeToggle(themeBtnDesktopRef.current)}
              aria-label="Toggle color theme"
              className="cursor-pointer h-9 w-9 flex justify-center items-center rounded-md"
            >
              {isLightTheme ? <Moon className="w-4.5" /> : <Sun className="w-4.5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div ref={mobileWrapRef} className="flex md:hidden items-center gap-1.5 relative">
          <div className="text-white dark:text-neutral-500 flex cursor-pointer hover:bg-neutral-900 active:scale-98 dark:hover:bg-neutral-100 rounded-md justify-center items-center transition-all duration-200">
            <button
              ref={themeBtnMobileRef}
              type="button"
              onClick={() => handleThemeToggle(themeBtnMobileRef.current)}
              aria-label="Toggle color theme"
              className="cursor-pointer h-9 w-9 flex justify-center items-center rounded-md"
            >
              {isLightTheme ? <Moon className="w-4.5" /> : <Sun className="w-4.5" />}
            </button>
          </div>
          <div className="h-5 w-[1px] bg-neutral-800 dark:bg-neutral-300 mx-1" />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="text-white dark:text-black focus:outline-none p-1 rounded-md hover:bg-white/5 dark:hover:bg-black/5 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="text-2xl"
                height="1em"
                width="1em"
              >
                <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z" />
              </svg>
            ) : (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="text-2xl"
                height="1em"
                width="1em"
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="48"
                  d="M88 152h336M88 256h336M88 360h336"
                />
              </svg>
            )}
          </button>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                transition={{ duration: 0.12, ease: 'easeOut' }}
                className="absolute top-11 right-0 z-50 w-32 bg-[#121212] dark:bg-neutral-50 border border-[#272727] dark:border-neutral-200 rounded-lg p-1.5 flex flex-col gap-0.5 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)] dark:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)]"
              >
                {(
                  [
                    { label: 'Home', path: '/' },
                    { label: 'Projects', path: '/projects' },
                    { label: 'Experience', path: '/experience' },
                    { label: 'Blogs', path: '/blogs' },
                    { label: 'Books', path: '/books' },
                    { label: 'Favourites', path: '/favourites' },
                  ] as { label: string; path: RoutePath }[]
                ).map((item) => (
                  <a
                    key={item.path}
                    href={item.path}
                    onClick={(e) => handleLinkClick(e, item.path)}
                    className="font-inter text-[14px] font-mono tracking-tight text-neutral-400 dark:text-neutral-500 hover:text-white dark:hover:text-black py-1.5 px-2.5 rounded-md hover:bg-white/5 dark:hover:bg-neutral-200 transition-all duration-150"
                  >
                    {item.label}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
