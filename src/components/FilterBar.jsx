import React from 'react';
import { cn } from '../utils';

export default function FilterBar({ filter, setFilter }) {
  const filters = ['All', 'Active', 'Completed'];

  return (
    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg w-full sm:w-auto">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={cn(
            'flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200',
            filter === f
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
          )}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
