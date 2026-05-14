import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
        <Search size={18} />
      </div>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="input pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200 focus:bg-white"
      />
    </div>
  );
}
