import React from 'react';

export default function ProgressBar({ total, completed }) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="card p-6 mb-8 bg-gradient-to-br from-primary-600 to-primary-800 text-white dark:from-primary-900 dark:to-slate-900 border-none relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        <h2 className="text-lg font-semibold mb-1 opacity-90">Daily Progress</h2>
        <div className="flex items-end gap-2 mb-4">
          <span className="text-4xl font-bold tracking-tight">{completed}</span>
          <span className="text-sm opacity-80 mb-1">/ {total} tasks</span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span className="opacity-90">Completion Rate</span>
            <span>{percentage}%</span>
          </div>
          <div className="h-2.5 w-full bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
