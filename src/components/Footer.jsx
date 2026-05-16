import React from 'react';
import { Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full mt-auto py-8 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm transition-colors duration-200">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex flex-col items-center md:items-start text-sm text-slate-600 dark:text-slate-400">
            <p className="flex items-center gap-1.5 font-medium text-slate-900 dark:text-white">
              © {new Date().getFullYear()} Task Manager.
            </p>
            <p className="mt-1">
              Designed & Developed by <span className="font-semibold text-primary-600 dark:text-primary-400">Yeroman Diriba</span>
            </p>
          </div>

          <div className="flex items-center group">
            <a
              href="mailto:yeritti2017@gmail.com"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-full hover:bg-primary-50 hover:text-primary-600 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 transition-all duration-300 shadow-sm hover:shadow"
            >
              <Mail size={16} className="group-hover:scale-110 transition-transform duration-300" />
              <span>yeritti2017@gmail.com</span>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
