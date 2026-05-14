import React from 'react';
import { CheckCircle2, Moon, Sun } from 'lucide-react';

export default function Navbar({ isDarkMode, toggleDarkMode }) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white shadow-lg shadow-primary-600/20 dark:bg-primary-500">
              <CheckCircle2 size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                YD
              </h1>
              <p className="text-[10px] font-medium uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Student Task Manager
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="btn-icon"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
