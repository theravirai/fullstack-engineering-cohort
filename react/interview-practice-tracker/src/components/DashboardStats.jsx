import React from 'react';
import { BookOpen, Code2, MessageSquareCode, CheckCircle2, TrendingUp } from 'lucide-react';
import MachineCodingWidget from './MachineCodingWidget';

export default function DashboardStats({ questions, machineCodingStatus, onChangeMachineCodingStatus }) {
  const totalQuestions = questions.length;
  
  const dsaTotal = questions.filter((q) => q.category === 'DSA').length;
  const dsaCompleted = questions.filter(
    (q) => q.category === 'DSA' && q.status === 'Completed'
  ).length;

  const interviewTotal = questions.filter((q) => q.category !== 'DSA').length;
  const interviewCompleted = questions.filter(
    (q) => q.category !== 'DSA' && q.status === 'Completed'
  ).length;

  const completedTotal = questions.filter((q) => q.status === 'Completed').length;
  const inProgressTotal = questions.filter((q) => q.status === 'In Progress').length;
  const pendingTotal = questions.filter((q) => q.status === 'Pending').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Questions Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Total Questions
          </span>
          <div className="p-2 bg-slate-100 rounded-xl text-slate-700">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {totalQuestions}
            </span>
            <span className="text-xs font-medium text-slate-500">tracked items</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 font-medium text-emerald-600">
              <CheckCircle2 className="w-3.5 h-3.5" /> {completedTotal} done
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-blue-600 font-medium">{inProgressTotal} active</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-medium">{pendingTotal} pending</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-between">
          <span>Overall Pool</span>
          <span className="font-semibold text-slate-700">DSA & Tech Prep</span>
        </div>
      </div>

      {/* 2. Completed DSA Problems Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Completed DSA
          </span>
          <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
            <Code2 className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-indigo-600 tracking-tight">
              {dsaCompleted}
            </span>
            <span className="text-sm font-semibold text-slate-400">/ {dsaTotal}</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            {dsaTotal > 0 ? (
              <span className="font-medium text-indigo-700">
                {Math.round((dsaCompleted / dsaTotal) * 100)}% problems solved
              </span>
            ) : (
              'No DSA problems logged'
            )}
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-between">
          <span>Category Focus</span>
          <span className="font-semibold text-indigo-600">Algorithms & DS</span>
        </div>
      </div>

      {/* 3. Completed Interview Questions (Git + Technical) Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Completed Interview
          </span>
          <div className="p-2 bg-purple-50 rounded-xl text-purple-600">
            <MessageSquareCode className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-purple-600 tracking-tight">
              {interviewCompleted}
            </span>
            <span className="text-sm font-semibold text-slate-400">/ {interviewTotal}</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            {interviewTotal > 0 ? (
              <span className="font-medium text-purple-700">
                {Math.round((interviewCompleted / interviewTotal) * 100)}% Git & Technical mastered
              </span>
            ) : (
              'No technical questions yet'
            )}
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-between">
          <span>Git & Technical</span>
          <span className="font-semibold text-purple-600">Theory & System</span>
        </div>
      </div>

      {/* 4. Machine-Coding Status Widget */}
      <MachineCodingWidget
        status={machineCodingStatus}
        onChangeStatus={onChangeMachineCodingStatus}
      />
    </div>
  );
}
