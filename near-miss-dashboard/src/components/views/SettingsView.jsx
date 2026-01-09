import React from 'react';
import { Mail, Save } from 'lucide-react';

const SettingsView = ({ darkMode }) => (
  <div className="animate-in fade-in duration-500 max-w-2xl">
    <div className={`p-8 rounded-2xl border space-y-6 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
      <h3 className="text-xl font-bold">Application Settings</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 opacity-70">Company Name</label>
          <input type="text" defaultValue="Construction Safety Corp" className={`w-full p-3 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} />
        </div>
        <div className="flex items-center justify-between p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-600">
           <div className="flex items-center gap-3"><Mail className="text-slate-400" /><div><p className="font-medium">Email Notifications</p><p className="text-xs text-slate-500">Receive daily safety digests</p></div></div>
           <div className="w-10 h-6 bg-indigo-600 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
        </div>
      </div>
      <button className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors"><Save size={18} /> Save Changes</button>
    </div>
  </div>
);

export default SettingsView;