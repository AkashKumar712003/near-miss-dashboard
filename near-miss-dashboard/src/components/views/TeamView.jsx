import React from 'react';

const TeamView = ({ darkMode }) => (
  <div className="animate-in fade-in duration-500">
     <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
        <h3 className="text-lg font-bold mb-4">Safety Team Members</h3>
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">U{i}</div>
                <div><p className="font-semibold">Safety Officer {i}</p><p className="text-xs text-slate-500">safety.officer{i}@company.com</p></div>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full">Active</span>
            </div>
          ))}
        </div>
     </div>
  </div>
);

export default TeamView;