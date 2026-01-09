import React from 'react';

const Badge = ({ children, type }) => {
  const styles = {
    high: "bg-red-100 text-red-700 border-red-200",
    medium: "bg-amber-100 text-amber-700 border-amber-200",
    low: "bg-emerald-100 text-emerald-700 border-emerald-200",
    open: "bg-blue-50 text-blue-600 border-blue-100",
    closed: "bg-slate-100 text-slate-600 border-slate-200"
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[type] || styles.closed}`}>
      {children}
    </span>
  );
};

export default Badge;