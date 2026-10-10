import React from 'react';
import {
  CheckCircle2,
  Clock,
  Circle,
  ExternalLink,
  Edit2,
  Trash2,
  FileText,
  ChevronDown
} from 'lucide-react';
import {
  STATUSES,
  DIFFICULTY_STYLES,
  CATEGORY_BADGES
} from '../constants/options';

export default function QuestionCard({
  question,
  onStatusChange,
  onEdit,
  onDelete
}) {
  const { id, title, category, difficulty, status, notes, link, createdAt } = question;

  const categoryStyle = CATEGORY_BADGES[category] || {
    badge: 'bg-slate-100 text-slate-700 border-slate-200',
    dot: 'bg-slate-400',
  };

  const difficultyStyle = DIFFICULTY_STYLES[difficulty] || 'bg-slate-100 text-slate-700 border-slate-200';

  const getStatusIcon = (st) => {
    switch (st) {
      case 'Completed':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
      case 'In Progress':
        return <Clock className="w-3.5 h-3.5 text-blue-600" />;
      default:
        return <Circle className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        {/* Top Badges & Actions */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Category Badge */}
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${categoryStyle.badge}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${categoryStyle.dot}`} />
              {category}
            </span>

            {/* Difficulty Badge */}
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${difficultyStyle}`}
            >
              {difficulty}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(question)}
              title="Edit Question"
              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(id)}
              title="Delete Question"
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Question Title */}
        <h3 className="mt-3 text-sm sm:text-base font-bold text-slate-800 group-hover:text-indigo-900 transition-colors leading-snug">
          {title}
        </h3>

        {/* Notes (if present) */}
        {notes && (
          <div className="mt-2 text-xs text-slate-500 bg-slate-50 rounded-xl p-2.5 border border-slate-100 flex items-start gap-1.5">
            <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <p className="line-clamp-2 leading-relaxed">{notes}</p>
          </div>
        )}
      </div>

      {/* Bottom Bar: Status Switcher & External Link */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        {/* Quick Status Dropdown */}
        <div className="relative">
          <select
            value={status}
            onChange={(e) => onStatusChange(id, e.target.value)}
            className={`appearance-none pl-6 pr-6 py-1 text-xs font-semibold rounded-lg border transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              status === 'Completed'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                : status === 'In Progress'
                ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            {STATUSES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
          <div className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none">
            {getStatusIcon(status)}
          </div>
          <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
        </div>

        {/* Link / Timestamp */}
        <div className="flex items-center gap-2">
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              title="Open problem link"
              className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
            >
              <span>Problem</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {createdAt && (
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              {new Date(createdAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric'
              })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
