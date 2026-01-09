import React, { useState } from 'react';
import { Download, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import Badge from '../shared/Badge';

const IncidentsView = ({ data, darkMode, filterLocation, setFilterLocation, filterSeverity, setFilterSeverity }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const cardBg = darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100';

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className={`p-4 rounded-xl border flex flex-wrap gap-4 items-center justify-between ${cardBg}`}>
        <div className="flex gap-3">
          <select className={`px-4 py-2 rounded-lg text-sm border outline-none cursor-pointer ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`} value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)}>
            <option value="All">All Locations</option>
            <option value="Area 42">Area 42</option>
            <option value="Zone A">Zone A</option>
            <option value="Zone B">Zone B</option>
            <option value="Zone C">Zone C</option>
          </select>
          <select className={`px-4 py-2 rounded-lg text-sm border outline-none cursor-pointer ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`} value={filterSeverity} onChange={(e) => setFilterSeverity(e.target.value)}>
            <option value="All">All Severities</option>
            <option value="1">Level 1 (Low)</option>
            <option value="2">Level 2 (Med)</option>
            <option value="3">Level 3 (High)</option>
          </select>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"><Download size={16} /> Export CSV</button>
      </div>

      <div className={`rounded-2xl border shadow-sm overflow-hidden ${cardBg}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className={`uppercase text-xs font-semibold ${darkMode ? 'bg-slate-900/50 text-slate-400' : 'bg-slate-50 text-slate-500'}`}>
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Severity</th>
                <th className="px-6 py-4">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {paginatedData.map((item, index) => (
                <tr key={index} className={`hover:bg-indigo-50/50 dark:hover:bg-slate-800/50 transition-colors`}>
                  <td className="px-6 py-4 font-mono text-xs opacity-70">#{item._id?.$oid?.substring(0,6) || 'UNK'}</td>
                  <td className="px-6 py-4">{new Date(item.incident_date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-medium">{item.primary_category}</td>
                  <td className="px-6 py-4 flex items-center gap-2"><MapPin size={14} className="text-slate-400" /> {item.location}</td>
                  <td className="px-6 py-4"><Badge type={item.severity_level >= 3 ? 'high' : item.severity_level === 2 ? 'medium' : 'low'}>Level {item.severity_level}</Badge></td>
                  <td className="px-6 py-4 text-slate-500">{item.unsafe_condition_or_behavior}</td>
                </tr>
              ))}
              {paginatedData.length === 0 && <tr><td colSpan="6" className="px-6 py-8 text-center opacity-50">No records found.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50"><ChevronLeft size={18} /></button>
          <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50"><ChevronRight size={18} /></button>
        </div>
      </div>
    </div>
  );
};

export default IncidentsView;