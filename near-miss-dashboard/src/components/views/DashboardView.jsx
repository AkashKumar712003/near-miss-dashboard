import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, Legend
} from 'recharts';
import { FileText, AlertTriangle, MapPin, ShieldAlert } from 'lucide-react';
import StatCard from '../shared/StatCard';
import CustomTooltip from '../shared/CustomToolTip';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const DashboardView = ({ chartData, darkMode }) => {
  const cardBg = darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100';
  const gridColor = darkMode ? '#334155' : '#f1f5f9';
  const textColor = darkMode ? '#94a3b8' : '#64748b';

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard darkMode={darkMode} title="Total Incidents" value={chartData?.totalRecords || 0} icon={FileText} colorClass="bg-indigo-500" trend="+5.4%" />
        <StatCard darkMode={darkMode} title="Avg Severity" value="1.9" icon={AlertTriangle} colorClass="bg-amber-500" trend="-0.2%" />
        <StatCard darkMode={darkMode} title="High Risk Area" value={chartData?.locationData[0]?.name || "N/A"} icon={MapPin} colorClass="bg-emerald-500" trend="Active" />
        <StatCard darkMode={darkMode} title="Critical Risks" value={chartData?.severityData.find(d => d.name.includes('3'))?.value || 0} icon={ShieldAlert} colorClass="bg-red-500" trend="+1" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Chart */}
        <div className={`lg:col-span-2 rounded-2xl p-6 border shadow-sm ${cardBg}`}>
          <h3 className="text-lg font-bold mb-6">1. Incident Trends (Monthly)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData?.trendData}>
                <defs>
                  <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: textColor, fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: textColor, fontSize: 12}} />
                <Tooltip content={<CustomTooltip darkMode={darkMode} />} cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area type="monotone" dataKey="incidents" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorIncidents)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Vertical Bar Chart */}
        <div className={`rounded-2xl p-6 border shadow-sm ${cardBg}`}>
          <h3 className="text-lg font-bold mb-6">2. Top Categories</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData?.categoryData} layout="vertical" barSize={20}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={gridColor} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} tick={{fill: textColor, fontSize: 11}} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip darkMode={darkMode} />} cursor={{fill: 'transparent'}} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {chartData?.categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Donut Chart */}
        <div className={`rounded-2xl p-6 border shadow-sm ${cardBg}`}>
          <h3 className="text-lg font-bold mb-4 text-center">3. Severity Levels</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData?.severityData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                  {chartData?.severityData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Pie Chart */}
        <div className={`rounded-2xl p-6 border shadow-sm ${cardBg}`}>
          <h3 className="text-lg font-bold mb-4 text-center">4. Act vs. Condition</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData?.typeData} cx="50%" cy="50%" outerRadius={80} dataKey="value" stroke={darkMode ? '#1e293b' : '#fff'} strokeWidth={2}>
                  {chartData?.typeData.map((entry, index) => <Cell key={`cell-${index}`} fill={index === 0 ? '#ef4444' : '#f59e0b'} />)}
                </Pie>
                <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Horizontal Bar Chart */}
        <div className={`rounded-2xl p-6 border shadow-sm ${cardBg}`}>
          <h3 className="text-lg font-bold mb-4 text-center">5. Top Locations</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData?.locationData} layout="vertical" barSize={15}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={gridColor} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={80} tick={{fill: textColor, fontSize: 11}} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip darkMode={darkMode} />} cursor={{fill: 'transparent'}} />
                <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;