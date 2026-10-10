import React from 'react';
import { Laptop, ChevronDown, CheckCircle2, Clock, AlertCircle, Award } from 'lucide-react';
import { MACHINE_CODING_STATUSES } from '../constants/options';

export default function MachineCodingWidget({ status, onChangeStatus }) {
  const getStatusColor = (val) => {
    switch (val) {
      case 'Cleared & Ready':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'In Progress':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'Under Review':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      default:
        return 'text-slate-600 bg-slate-100 border-slate-200';
    }
  };

  const getStatusIcon = (val) => {
    switch (val) {
      case 'Cleared & Ready':
        return <Award className="w-4 h-4 text-emerald-600" />;
      case 'In Progress':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'Under Review':
        return <AlertCircle className="w-4 h-4 text-amber-600" />;
      default:
        return <Laptop className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Machine Coding Status
        </span>
        <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
          <Laptop className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3">
        <div className="flex items-center gap-2 mb-2">
          {getStatusIcon(status)}
          <span className="text-xl font-bold text-slate-900 tracking-tight">
            {status}
          </span>
        </div>

        <div className="relative mt-2">
          <select
            value={status}
            onChange={(e) => onChangeStatus(e.target.value)}
            className={`w-full appearance-none px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-8 ${getStatusColor(
              status
            )}`}
          >
            {MACHINE_CODING_STATUSES.map((s) => (
              <option key={s} value={s}>
                Status: {s}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500" />
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-between">
        <span>Round Assessment</span>
        <span className="font-medium text-slate-600">Frontend Round 4</span>
      </div>
    </div>
  );
}
