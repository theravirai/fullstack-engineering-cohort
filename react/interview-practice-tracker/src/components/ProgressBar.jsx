import React from 'react';
import { TrendingUp, CheckCircle, Flame, Layers } from 'lucide-react';

export default function ProgressBar({ questions }) {
  const total = questions.length;
  const completed = questions.filter((q) => q.status === 'Completed').length;
  const inProgress = questions.filter((q) => q.status === 'In Progress').length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Breakdown by category
  const categories = ['DSA', 'Git', 'Technical'];
  const breakdown = categories.map((cat) => {
    const catTotal = questions.filter((q) => q.category === cat).length;
    const catDone = questions.filter(
      (q) => q.category === cat && q.status === 'Completed'
    ).length;
    const catPct = catTotal > 0 ? Math.round((catDone / catTotal) * 100) : 0;
    return { name: cat, total: catTotal, done: catDone, pct: catPct };
  });

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">
              Weekly Preparation Progress
            </h2>
            <p className="text-xs text-slate-500">
              {completed} of {total} total questions marked as completed
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-indigo-600 tracking-tight">
            {percentage}%
          </span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
            {percentage === 100
              ? 'Completed'
              : percentage >= 50
              ? 'On Track'
              : 'In Progress'}
          </span>
        </div>
      </div>

      {/* Main Visual Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden shadow-inner flex">
        <div
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Category Mini Breakdowns */}
      <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        {breakdown.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between p-2 rounded-xl bg-slate-50/80 border border-slate-100"
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">{item.name}</span>
              <span className="text-slate-400">
                ({item.done}/{item.total})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-16 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${item.pct}%` }}
                />
              </div>
              <span className="font-bold text-slate-600 w-8 text-right">
                {item.pct}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
