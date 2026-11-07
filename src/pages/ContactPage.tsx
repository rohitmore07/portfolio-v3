import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RoutePath } from '../components/Navbar';
import { playPopSound } from '../utils/sound';

interface SubPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const ContactPage: React.FC<SubPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playPopSound(880, 0.08);
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
    }, 400);
  };

  return (
    <div className="w-full max-w-200 px-4 md:px-6 pt-24 pb-16 min-h-screen flex flex-col justify-start relative z-20 mx-auto">
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

        <div className="flex items-center gap-1.5 select-none border border-dotted rounded-sm border-[#272727] dark:border-neutral-300 px-2 py-1">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] tracking-widest text-neutral-400 dark:text-neutral-600 font-inter">
            Available for freelance &amp; remote
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.5, delay: 0.06 }}
        className="w-full flex-grow flex flex-col font-inter"
      >
        <div className="mb-10 gap-1 flex flex-col">
          <h1 className="font-instrument text-4xl md:text-5xl text-white dark:text-black tracking-tight">
            Let&apos;s Connect
          </h1>
          <p className="font-inter text-neutral-500">Let’s talk about your next project</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[10px] tracking-widest text-neutral-500 dark:text-neutral-400 uppercase font-mono">
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What should I call you?"
              className="bg-transparent border-b border-[#272727] dark:border-neutral-200 focus:border-white dark:focus:border-black outline-none w-full py-2 px-1 text-sm text-white dark:text-black transition-colors duration-200 placeholder:text-neutral-700 dark:placeholder:text-neutral-400 font-sans"
            />
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[10px] tracking-widest text-neutral-500 dark:text-neutral-400 uppercase font-mono">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="How can I contact you?"
              className="bg-transparent border-b border-[#272727] dark:border-neutral-200 focus:border-white dark:focus:border-black outline-none w-full py-2 px-1 text-sm text-white dark:text-black transition-colors duration-200 placeholder:text-neutral-700 dark:placeholder:text-neutral-400 font-sans"
            />
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[10px] tracking-widest text-neutral-500 dark:text-neutral-400 uppercase font-mono">
              Message
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about your project..."
              className="bg-transparent border-b border-[#272727] dark:border-neutral-200 focus:border-white dark:focus:border-black outline-none w-full py-2 px-1 text-sm text-white dark:text-black transition-colors duration-200 placeholder:text-neutral-700 dark:placeholder:text-neutral-400 font-sans resize-none"
            />
          </div>

          <div className="flex flex-col items-start gap-2">
            <button
              type="submit"
              className="group relative overflow-hidden flex items-center justify-center gap-2 cursor-pointer w-full md:w-48 h-11 bg-white dark:bg-black text-[#0F0E0E] dark:text-white border border-transparent rounded-full shadow-[0_4px_14px_rgba(255,255,255,0.06)] dark:shadow-[0_4px_14px_rgba(0,0,0,0.08)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 mt-4 self-start"
            >
              <div className="absolute inset-0 w-[60%] h-full bg-gradient-to-r from-transparent via-black/10 dark:via-white/20 to-transparent -skew-x-[25deg] -translate-x-[180%] group-hover:translate-x-[280%] transition-transform duration-[700ms] ease-out pointer-events-none" />
              <span className="text-base tracking-tight font-semibold relative z-10 font-sans">
                {submitted ? 'Message Sent ✓' : 'Send Message'}
              </span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="text-lg transition-transform duration-200 group-hover:translate-x-1 relative z-10"
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
            </button>
            {submitted && (
              <p className="text-xs font-mono text-emerald-400 dark:text-emerald-600 mt-2">
                Thanks for reaching out! Rohit will get back to you soon.
              </p>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};
