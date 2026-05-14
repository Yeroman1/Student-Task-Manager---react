import React, { useState } from 'react';
import { PlusCircle, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || null,
    });

    setTitle('');
    setDescription('');
    setDueDate('');
    setIsExpanded(false);
  };

  return (
    <div className="card p-4 sm:p-6 mb-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            className="input flex-1 text-lg py-6 font-medium bg-slate-50 dark:bg-slate-950 border-slate-200 focus:bg-white"
            autoFocus
          />
          {isExpanded && (
            <button
              type="submit"
              disabled={!title.trim()}
              className="btn btn-primary sm:w-auto w-full h-auto py-3 px-6 whitespace-nowrap hidden sm:flex"
            >
              <PlusCircle size={20} className="mr-2" />
              Add Task
            </button>
          )}
        </div>

        {isExpanded && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-4 pt-2">
            <textarea
              placeholder="Add details or notes (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input min-h-[100px] py-3 resize-y bg-slate-50 dark:bg-slate-950 border-slate-200 focus:bg-white"
            />
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-auto">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Calendar size={18} />
                  </div>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="input pl-10 bg-slate-50 dark:bg-slate-950 border-slate-200 focus:bg-white text-slate-600 dark:text-slate-300 w-full"
                    min={format(new Date(), 'yyyy-MM-dd')}
                  />
                </div>
              </div>
              
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="btn btn-secondary flex-1 sm:flex-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!title.trim()}
                  className="btn btn-primary flex-1 sm:hidden flex"
                >
                  <PlusCircle size={20} className="mr-2" />
                  Add Task
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
