import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send } from 'lucide-react';
import { analyzeQuery } from '../../utils/aiLogic';

const AIChatView = ({ data, darkMode }) => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello! I'm your Safety Data Assistant. You can ask me about incident counts, high-risk locations, or specific categories. Try asking: 'How many incidents in Area 42?'" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = analyzeQuery(userMsg.text, data);
      setMessages(prev => [...prev, { role: 'ai', text: responseText }]);
      setIsTyping(false);
    }, 1000);
  };

  const suggestions = ["How many incidents in Zone A?", "What are the critical risks?", "Give me a summary", "Most common category?"];

  return (
    <div className={`flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto rounded-2xl border shadow-xl overflow-hidden animate-in zoom-in-95 duration-300 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
      
      <div className={`p-4 border-b flex items-center gap-3 ${darkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
        <div className="w-10 h-10 rounded-full from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold">Data Assistant</h3>
          <p className="text-xs opacity-60">Powered by Local Logic Engine</p>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto p-6 space-y-6 ${darkMode ? 'bg-slate-900/30' : 'bg-slate-50/50'}`}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-br-none' 
                : `${darkMode ? 'bg-slate-700 text-slate-100' : 'bg-white text-slate-800 border border-slate-100'} rounded-bl-none`
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-line">
                {msg.text.split('**').map((part, i) => i % 2 === 1 ? <span key={i} className="font-bold">{part}</span> : part)}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
             <div className={`px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-2 ${darkMode ? 'bg-slate-700' : 'bg-white border'}`}>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={`p-4 border-t ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 no-scrollbar">
          {suggestions.map(s => (
            <button key={s} onClick={() => { setInput(s); }} className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${darkMode ? 'border-slate-600 hover:bg-slate-700' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}>
              {s}
            </button>
          ))}
        </div>
        
        <form onSubmit={handleSend} className="flex gap-3 relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about incidents, locations, or trends..."
            className={`flex-1 p-3.5 pl-5 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm ${darkMode ? 'bg-slate-900 border-slate-600 placeholder-slate-500' : 'bg-white border-slate-200 text-slate-800'}`}
          />
          <button type="submit" disabled={!input.trim() || isTyping} className="p-3.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95 shadow-lg shadow-indigo-500/20">
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIChatView;