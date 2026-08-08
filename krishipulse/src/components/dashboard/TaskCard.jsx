import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Badge } from '../common/Badge.jsx';

export function TaskCard({ task, onToggle }) {
  const isCompleted = task.status === 'Completed';

  return (
    <div
      onClick={() => onToggle(task.id)}
      className={`p-4 rounded-xl border transition-all duration-150 cursor-pointer flex items-center justify-between hover:-translate-y-0.5 ${
        isCompleted
          ? 'bg-black/5 dark:bg-slate-950 border-[var(--border-subtle)] text-black opacity-60'
          : 'bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-emerald-500/40 text-black dark:text-white'
      }`}
    >
      <div className="flex items-center gap-3">
        <button className={`h-5 w-5 rounded-lg border-2 flex items-center justify-center transition-colors ${
          isCompleted ? 'bg-emerald-600 text-white border-emerald-600' : 'border-black'
        }`}>
          {isCompleted && <CheckCircle2 className="h-3.5 w-3.5" />}
        </button>
        <div>
          <div className={`text-sm font-black ${isCompleted ? 'line-through text-black/60' : 'text-black dark:text-white'}`}>
            {task.title}
          </div>
          <div className="text-xs text-black/70 dark:text-slate-300 font-extrabold mt-0.5">Category: {task.category} • Due: {task.dueDate}</div>
        </div>
      </div>

      <Badge variant={task.priority === 'High' ? 'rose' : 'slate'}>
        {task.priority} Priority
      </Badge>
    </div>
  );
}
