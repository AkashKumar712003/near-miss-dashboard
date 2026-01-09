import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, FileText, Settings, Search, Menu, 
  ShieldAlert, Moon, Sun, Users, Bot
} from 'lucide-react';

// Utilities
import { processData } from './utils/dataProcessor';

// View Components
import DashboardView from './components/views/DashboardView';
import IncidentsView from './components/views/IncidentsView';
import AIChatView from './components/views/AIChatView';
import TeamView from './components/views/TeamView';
import SettingsView from './components/views/SettingsView';

// Data
import jsonData from './near_miss_data.json'; 
const RAW_DATA = jsonData;

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [activeTab, setActiveTab] = useState('Dashboard'); 
  const [filterLocation, setFilterLocation] = useState('All');
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!RAW_DATA) return [];
    return RAW_DATA.filter(item => {
      const itemLoc = item.location || 'Unknown';
      const itemSev = item.severity_level || 0;
      const itemCat = item.primary_category || '';
      const matchesLoc = filterLocation === 'All' || itemLoc === filterLocation;
      const matchesSev = filterSeverity === 'All' || itemSev.toString() === filterSeverity;
      const matchesSearch = itemCat.toLowerCase().includes(searchQuery.toLowerCase()) || itemLoc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesLoc && matchesSev && matchesSearch;
    });
  }, [filterLocation, filterSeverity, searchQuery]);

  const chartData = useMemo(() => processData(filteredData), [filteredData]);

  useEffect(() => { setTimeout(() => setLoading(false), 500); }, []);

  if (loading) return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const baseBg = darkMode ? 'bg-slate-900' : 'bg-slate-50';
  const textPrimary = darkMode ? 'text-white' : 'text-slate-900';
  
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Incidents', icon: FileText },
    { name: 'AI Assistant', icon: Bot }, 
    { name: 'Team', icon: Users },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <div className={`flex min-h-screen font-sans transition-colors duration-300 ${baseBg} ${textPrimary}`}>
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 ${darkMode ? 'bg-slate-950 border-r border-slate-800' : 'bg-white border-r border-slate-200'} transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30"><ShieldAlert className="w-5 h-5 text-white" /></div>
            <span className="text-xl font-bold tracking-tight">SafeGuard</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden"><Menu size={20} /></button>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <button key={item.name} onClick={() => { setActiveTab(item.name); setSidebarOpen(false); }} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === item.name ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : `text-slate-400 hover:${darkMode ? 'bg-slate-800' : 'bg-slate-50'} hover:text-indigo-500`}`}>
              <item.icon size={18} />
              <span className="font-medium text-sm">{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen custom-scrollbar flex flex-col">
        {/* Header */}
        <header className={`sticky top-0 z-40 px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b backdrop-blur-md bg-opacity-80 ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
          <div className="flex items-center">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden mr-4"><Menu size={24} /></button>
            <div><h1 className="text-xl font-bold">{activeTab}</h1><p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Safety Overview Portal</p></div>
          </div>
          <div className="flex items-center gap-4">
            <div className={`hidden md:flex items-center px-4 py-2 rounded-lg border w-64 transition-all focus-within:ring-2 focus-within:ring-indigo-500 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none w-full text-sm placeholder-slate-400" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-full border transition-colors ${darkMode ? 'bg-slate-800 border-slate-700 text-yellow-400' : 'bg-white border-slate-200 text-slate-600'}`}>{darkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
            <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm border-2 border-white shadow-sm cursor-pointer hover:scale-105 transition-transform">AK</div>
          </div>
        </header>

        {/* View Router */}
        <div className="p-8 max-w-7xl mx-auto w-full flex-1">
          {activeTab === 'Dashboard' && <DashboardView chartData={chartData} darkMode={darkMode} />}
          {activeTab === 'Incidents' && <IncidentsView data={filteredData} darkMode={darkMode} filterLocation={filterLocation} setFilterLocation={setFilterLocation} filterSeverity={filterSeverity} setFilterSeverity={setFilterSeverity} />}
          {activeTab === 'AI Assistant' && <AIChatView data={filteredData} darkMode={darkMode} />} 
          {activeTab === 'Team' && <TeamView darkMode={darkMode} />}
          {activeTab === 'Settings' && <SettingsView darkMode={darkMode} />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;