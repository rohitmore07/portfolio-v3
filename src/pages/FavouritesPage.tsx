import React from 'react';
import { motion } from 'framer-motion';
import { RoutePath } from '../components/Navbar';

interface SubPageProps {
  onNavigate: (path: RoutePath) => void;
}

const MOVIES = [
  {
    title: 'Interstellar',
    creator: 'Dir. Christopher Nolan',
    desc: 'A journey through space and time to save humanity.',
  },
  {
    title: 'Fight Club',
    creator: 'Dir. David Fincher',
    desc: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club.',
  },
  {
    title: 'The Social Network',
    creator: 'Dir. David Fincher',
    desc: 'The story of the founding of Facebook and the subsequent lawsuits.',
  },
  {
    title: 'The Martian',
    creator: 'Dir. Ridley Scott',
    desc: 'An astronaut becomes stranded on Mars and must rely on his ingenuity to survive.',
  },
  {
    title: 'The Backrooms',
    creator: 'Dir. Kane Parsons',
    desc: 'A young cameraman accidentally falls into a surreal, infinite maze of empty office rooms.',
  },
  {
    title: 'Shutter Island',
    creator: 'Dir. Martin Scorsese',
    desc: 'A U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital.',
  },
];

const ANIME = [
  {
    title: 'One Piece',
    creator: 'Creator: Eiichiro Oda',
    desc: 'Follows the adventures of Monkey D. Luffy and his pirate crew in search of the ultimate treasure.',
  },
  {
    title: 'Naruto',
    creator: 'Creator: Masashi Kishimoto',
    desc: 'A young ninja seeks recognition from his peers and dreams of becoming the Hokage.',
  },
  {
    title: 'Attack on Titan',
    creator: 'Creator: Hajime Isayama',
    desc: 'After his hometown is destroyed, Eren Jaeger vows to cleanse the earth of the giant humanoid Titans.',
  },
  {
    title: 'Death Note',
    creator: 'Creators: Tsugumi Ohba & Takeshi Obata',
    desc: 'A high school student discovers a supernatural notebook that grants him the ability to kill anyone.',
  },
  {
    title: 'Vinland Saga',
    creator: 'Creator: Makoto Yukimura',
    desc: 'An epic Viking saga detailing vengeance, honor, and the search for a land without war.',
  },
  {
    title: 'Blue Lock',
    creator: 'Creator: Muneyuki Kaneshiro',
    desc: 'A group of Japan’s most ambitious young strikers compete in an intense program to become the world’s greatest footballer.git add .',
  },
];

export const FavouritesPage: React.FC<SubPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-screen min-h-screen flex items-center flex-col relative bg-[#0F0E0E] dark:bg-[#ffffff] overflow-x-hidden">
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
          className="w-full flex flex-col font-inter mb-8 mt-4"
        >
          <div className="gap-1 flex flex-col">
            <h1 className="font-instrument text-4xl md:text-5xl text-white dark:text-black tracking-tight">
              Favourites
            </h1>
            <p className="text-neutral-500 text-sm">
              A curated archive of my personal sketches, favorite movies, television series, and
              anime.
            </p>
          </div>
        </motion.div>

        {[
          { heading: 'Movies', items: MOVIES },
          { heading: 'Anime', items: ANIME },
        ].map((section) => (
          <div key={section.heading} className="mb-10">
            <h2 className="font-instrument text-2xl md:text-3xl text-white dark:text-black pb-2 mb-4 border-b border-dashed border-[#272727] dark:border-neutral-200">
              {section.heading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {section.items.map((item) => (
                <div
                  key={item.title}
                  className="p-4 rounded-lg border border-dashed border-[#272727] dark:border-neutral-200 bg-white/[0.02] dark:bg-black/[0.02] flex flex-col gap-1"
                >
                  <p className="font-inter font-semibold text-base text-white dark:text-black">
                    {item.title}
                  </p>
                  <p className="font-mono text-[11px] text-neutral-500">{item.creator}</p>
                  <p className="font-inter text-xs text-neutral-400 dark:text-neutral-600 mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="w-full h-30 mt-6 flex items-center justify-center flex-col font-inter gap-2 -mb-3">
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
