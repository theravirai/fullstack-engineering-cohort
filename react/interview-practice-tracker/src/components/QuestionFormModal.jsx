import React, { useState, useEffect } from 'react';
import { X, AlertCircle, Plus, Check } from 'lucide-react';
import { CATEGORIES, DIFFICULTIES, STATUSES } from '../constants/options';

export default function QuestionFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData
}) {
  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState({
    title: '',
    category: 'DSA',
    difficulty: 'Medium',
    status: 'Pending',
    link: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        category: initialData.category || 'DSA',
        difficulty: initialData.difficulty || 'Medium',
        status: initialData.status || 'Pending',
        link: initialData.link || '',
        notes: initialData.notes || '',
      });
    } else {
      setFormData({
        title: '',
        category: 'DSA',
        difficulty: 'Medium',
        status: 'Pending',
        link: '',
        notes: '',
      });
    }
    setErrors({});
    setTouched({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = (data) => {
    const errs = {};
    const trimmedTitle = (data.title || '').trim();

    if (!trimmedTitle) {
      errs.title = 'Question title is required.';
    } else if (trimmedTitle.length < 3) {
      errs.title = 'Question title must be at least 3 characters.';
    } else if (trimmedTitle.length > 150) {
      errs.title = 'Question title cannot exceed 150 characters.';
    }

    if (!data.category || !CATEGORIES.includes(data.category)) {
      errs.category = 'Please select a valid category.';
    }

    if (!data.difficulty || !DIFFICULTIES.includes(data.difficulty)) {
      errs.difficulty = 'Please select a valid difficulty.';
    }

    if (!data.status || !STATUSES.includes(data.status)) {
      errs.status = 'Please select a valid status.';
    }

    if (data.link && data.link.trim()) {
      try {
        new URL(data.link.trim());
      } catch {
        errs.link = 'Please enter a valid URL (e.g. https://leetcode.com/...).';
      }
    }

    return errs;
  };

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);

    if (touched[field]) {
      const validationErrors = validate(updated);
      setErrors(validationErrors);
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validationErrors = validate(formData);
    setErrors(validationErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = {
      title: true,
      category: true,
      difficulty: true,
      status: true,
      link: true,
      notes: true,
    };
    setTouched(allTouched);

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit({
        ...formData,
        title: formData.title.trim(),
        link: formData.link.trim(),
        notes: formData.notes.trim(),
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {isEditing ? 'Edit Question' : 'Add New Question'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEditing
                ? 'Update problem details, status, or notes'
                : 'Log a new DSA or technical question to your tracker'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Question Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              onBlur={() => handleBlur('title')}
              placeholder="e.g. Invert a Binary Tree / Explain React Fiber"
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.title && touched.title
                  ? 'border-rose-300 ring-rose-500/20 text-rose-900 focus:ring-rose-500'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500'
              }`}
            />
            {errors.title && touched.title && (
              <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Category & Difficulty Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                onBlur={() => handleBlur('category')}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Difficulty <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => handleChange('difficulty', e.target.value)}
                onBlur={() => handleBlur('difficulty')}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                {DIFFICULTIES.map((diff) => (
                  <option key={diff} value={diff}>
                    {diff}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Status <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {STATUSES.map((st) => (
                <button
                  type="button"
                  key={st}
                  onClick={() => handleChange('status', st)}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                    formData.status === st
                      ? st === 'Completed'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : st === 'In Progress'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-700 text-white border-slate-700 shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Problem URL */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Problem / Reference URL <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={formData.link}
              onChange={(e) => handleChange('link', e.target.value)}
              onBlur={() => handleBlur('link')}
              placeholder="https://leetcode.com/problems/..."
              className={`w-full px-3.5 py-2 text-sm rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.link && touched.link
                  ? 'border-rose-300 ring-rose-500/20 text-rose-900 focus:ring-rose-500'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500'
              }`}
            />
            {errors.link && touched.link && (
              <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.link}
              </p>
            )}
          </div>

          {/* Optional Notes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Key Notes / Approach <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="E.g. Time complexity O(N), used two-pointer technique..."
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {isEditing ? (
                <>
                  <Check className="w-4 h-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add Question
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
