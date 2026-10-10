import React from 'react';
import { SearchX, Inbox, Plus, RotateCcw } from 'lucide-react';

export default function EmptyState({ mode, onAddClick, onClearFilters, onLoadDemo }) {
  if (mode === 'no-results') {
    return (
      <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-xs flex flex-col items-center justify-center my-6">
        <div className="p-3 bg-amber-50 rounded-2xl text-amber-600 mb-3 border border-amber-100">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-base font-bold text-slate-800">
          No matching questions found
        </h3>
        <p className="text-sm text-slate-500 max-w-sm mt-1 mb-5">
          We couldn't find any questions matching your current search query or filter selection.
        </p>
        <button
          onClick={onClearFilters}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl border border-indigo-200 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Search & Filters
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-xs flex flex-col items-center justify-center my-6">
      <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 mb-3 border border-indigo-100">
        <Inbox className="w-8 h-8" />
      </div>
      <h3 className="text-base font-bold text-slate-800">
        No questions tracked yet
      </h3>
      <p className="text-sm text-slate-500 max-w-sm mt-1 mb-5">
        Your preparation tracker is empty. Add your first DSA problem or interview concept to start measuring your progress.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onAddClick}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add First Question
        </button>
        <button
          onClick={onLoadDemo}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-200 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Load Demo Questions
        </button>
      </div>
    </div>
  );
}
