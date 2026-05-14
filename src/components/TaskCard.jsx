import React, { useState } from 'react';
import { format, isPast, isToday, parseISO } from 'date-fns';
import { Check, Trash2, Edit2, Calendar, Clock, X, Save } from 'lucide-react';
import { cn } from '../utils';

export default function TaskCard({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description);
  const [editDate, setEditDate] = useState(task.dueDate || '');

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onEdit(task.id, {
      title: editTitle.trim(),
      description: editDesc.trim(),
      dueDate: editDate || null,
    });
    setIsEditing(false);
  };

  const isOverdue = task.dueDate && !task.completed && isPast(parseISO(task.dueDate)) && !isToday(parseISO(task.dueDate));

  if (isEditing) {
    return (
      <div className="card p-5 bg-white dark:bg-slate-900 border-primary-500 shadow-md">
        <div className="space-y-4">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="input font-medium"
            autoFocus
          />
          <textarea
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            className="input min-h-[80px] py-2 resize-y text-sm"
            placeholder="Description..."
          />
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full sm:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Calendar size={16} />
              </div>
              <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                className="input pl-10 text-sm"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button onClick={() => setIsEditing(false)} className="btn btn-secondary flex-1 sm:flex-none py-1.5">
                <X size={16} className="mr-1.5" /> Cancel
              </button>
              <button onClick={handleSave} className="btn btn-primary flex-1 sm:flex-none py-1.5" disabled={!editTitle.trim()}>
                <Save size={16} className="mr-1.5" /> Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "card p-5 group flex flex-col sm:flex-row gap-4 transition-all duration-300 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700",
        task.completed && "opacity-75 bg-slate-50 dark:bg-slate-900/50"
      )}
    >
      <div className="flex-shrink-0 pt-1">
        <button
          onClick={() => onToggle(task.id)}
          className={cn(
            "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
            task.completed
              ? "bg-primary-500 border-primary-500 text-white"
              : "border-slate-300 dark:border-slate-600 hover:border-primary-500 dark:hover:border-primary-400"
          )}
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed && <Check size={14} strokeWidth={3} />}
        </button>
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex justify-between items-start mb-1 gap-2">
          <h3 
            className={cn(
              "text-lg font-medium tracking-tight text-slate-900 dark:text-slate-100 line-clamp-2",
              task.completed && "line-through text-slate-500 dark:text-slate-400"
            )}
          >
            {task.title}
          </h3>
          <div className="flex opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 -mt-1 -mr-2">
            <button onClick={() => setIsEditing(true)} className="btn-icon" title="Edit task">
              <Edit2 size={16} />
            </button>
            <button onClick={() => onDelete(task.id)} className="btn-icon text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20" title="Delete task">
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {task.description && (
          <p className={cn(
            "text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-3 whitespace-pre-wrap",
            task.completed && "text-slate-400 dark:text-slate-500"
          )}>
            {task.description}
          </p>
        )}

        <div className="mt-auto flex items-center gap-4 text-xs font-medium">
          {task.dueDate && (
            <div className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800",
              isOverdue && "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800/50",
              task.completed && "opacity-60 grayscale"
            )}>
              <Calendar size={13} />
              <span>{format(parseISO(task.dueDate), 'MMM d, yyyy')}</span>
              {isOverdue && <span className="uppercase text-[10px] tracking-wider ml-1 font-bold">Overdue</span>}
            </div>
          )}
          
          <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500" title="Created on">
            <Clock size={13} />
            <span>{format(new Date(task.createdAt), 'MMM d')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
