import React from 'react';

const CustomTooltip = ({ active, payload, label, darkMode }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} p-3 rounded-lg shadow-xl border text-sm`}>
        <p className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-slate-800'}`}>{label}</p>
        <p className="text-indigo-500 font-medium">
          {payload[0].name}: <span className={darkMode ? 'text-slate-200' : 'text-slate-900'}>{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;