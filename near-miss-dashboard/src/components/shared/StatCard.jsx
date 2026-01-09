import React from 'react';
import { TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, colorClass, darkMode }) => (
  <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'} p-6 rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1`}>
    <div className="flex justify-between items-start">
      <div>
        <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{title}</p>
        <h3 className={`text-3xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-800'}`}>{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${colorClass.replace('bg-', 'text-')}`} />
      </div>
    </div>
    <div className="mt-4 flex items-center text-xs font-medium">
      <span className={`${trend.startsWith('+') ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'} px-2 py-1 rounded-full flex items-center`}>
        <TrendingUp className="w-3 h-3 mr-1" /> {trend}
      </span>
      <span className={`ml-2 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>vs last month</span>
    </div>
  </div>
);

export default StatCard;