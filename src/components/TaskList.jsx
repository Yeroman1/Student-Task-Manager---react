import React from 'react';
import TaskCard from './TaskCard';
import { ClipboardList } from 'lucide-react';

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-in fade-in duration-500">
        <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full mb-6">
          <ClipboardList size={48} className="text-slate-400 dark:text-slate-500" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
          No tasks found
        </h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          You're all caught up! Add a new task above to get started or adjust your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
