import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { getChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hey! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [recommendedButtons, setRecommendedButtons] = useState<Array<{ label: string; path: string }>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setError('');
    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // compute recommended buttons immediately based on user's intent
    const recs = getRecommendedButtons(userMessage.text);
    setRecommendedButtons(recs);

    try {
      const responseText = await getChatResponse(userMessage.text);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (err) {
      setError('Failed to get response. Please try again.');
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Return list of recommended buttons (exact labels as required)
  const getRecommendedButtons = (text: string) => {
    const msg = text.toLowerCase();
    // call request -> show Contact + WhatsApp
    if (msg.includes('call') || msg.includes('can i call') || msg.includes('phone call') || msg.includes('can we talk on call') || msg.includes('can you call me') || msg.includes('talk on phone')) {
      return [
        { label: '[ Visit Contact Me Page ]', path: '/contact' },
        { label: '[ WhatsApp Me ]', path: '/contact' }
      ];
    }

    if (msg.includes('hire') || msg.includes('work with') || msg.includes('hire you') || msg.includes('want website') || msg.includes('video edit') || msg.includes('price') || msg.includes('pricing') || msg.includes('collaborat') || msg.includes('start project')) {
      return [
        { label: '[ Visit Contact Me Page ]', path: '/contact' },
        { label: '[ Hire Me ]', path: '/contact' }
      ];
    }

    if (msg.includes('show') && (msg.includes('work') || msg.includes('projects') || msg.includes('portfolio') || msg.includes('samples'))) {
      return [ { label: '[ View My Projects ]', path: '/projects' } ];
    }

    if (msg.includes('services') || msg.includes('what do you do') || msg.includes('your services')) {
      return [ { label: '[ See My Services ]', path: '/services' }, { label: '[ Visit Contact Me Page ]', path: '/contact' } ];
    }

    if (msg.includes('skills') || msg.includes('resume') || msg.includes('cv') || msg.includes('background') || msg.includes('about')) {
      return [ { label: '[ Open About Me ]', path: '/about' } ];
    }

    if (msg.includes('whatsapp') || msg.includes('whatsapp number') || msg.includes('talk on whatsapp') || msg.includes('text on whatsapp')) {
      return [ { label: '[ WhatsApp Me ]', path: '/contact' } ];
    }

    // small talk -> suggest services/projects
    if (msg.includes('how are you') || msg.includes("what's up") || msg.includes('who made you')) {
      return [ { label: '[ See My Services ]', path: '/services' }, { label: '[ View My Projects ]', path: '/projects' } ];
    }

    // default: show projects so visitor can explore
    return [ { label: '[ View My Projects ]', path: '/projects' } ];
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center
          ${isOpen ? 'bg-card text-slate-400 hover:text-white border border-white/10' : 'bg-primary text-white hover:bg-blue-600 hover:scale-110'}
        `}
        aria-label="Toggle AI Chat"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-24 right-6 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] bg-card border border-white/10 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 z-40 origin-bottom-right overflow-hidden
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none'}
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-gradient-to-r from-blue-600/20 to-blue-500/10 rounded-t-2xl flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600/30 rounded-full flex items-center justify-center text-blue-400 animate-pulse">
            <Bot size={18} />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">Ansh's AI Assistant</h3>
            <div className="flex items-center gap-1.5">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               <span className="text-xs text-slate-400">Online & Ready</span>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`} style={{ animationDelay: `${idx * 50}ms` }}>
              {msg.role === 'model' && (
                <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center shrink-0 mt-1">
                  <Bot size={14} className="text-blue-400" />
                </div>
              )}
              
              <div 
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed transform transition-all
                  ${msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none hover:shadow-lg hover:shadow-blue-500/20' 
                    : 'bg-white/5 text-slate-300 rounded-bl-none border border-white/5 hover:bg-white/10 hover:border-white/10'
                  }
                `}
              >
                {msg.text}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-1">
                  <User size={14} className="text-slate-400" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 animate-fade-in-up">
              <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center shrink-0 mt-1">
                <Bot size={14} className="text-blue-400" />
              </div>
              <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-bl-none border border-white/5 flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-slate-400" />
                <span className="text-xs text-slate-400">Thinking...</span>
              </div>
            </div>
          )}
          {error && (
            <div className="bg-red-600/20 border border-red-500/30 px-4 py-2 rounded-xl text-xs text-red-300">
              {error}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10 bg-darker/50 rounded-b-2xl">
          <form onSubmit={handleSubmit} className="relative flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-white/5 border border-white/10 rounded-full pl-4 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all hover:bg-white/[7%]"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="w-12 h-12 flex items-center justify-center rounded-full disabled:opacity-40 disabled:cursor-not-allowed transition-transform transform-gpu hover:-translate-y-0.5 active:scale-95 shadow-lg bg-gradient-to-br from-blue-700 to-indigo-600 border border-white/10"
              title="Send message"
            >
              <Send size={16} className="text-sky-100" />
            </button>
          </form>

          {recommendedButtons.length > 0 && (
            <div className="p-3 flex flex-wrap gap-2 justify-center">
              {recommendedButtons.map((b, i) => (
                <button
                  key={i}
                  onClick={() => { window.location.href = b.path }}
                  className="px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm hover:opacity-95 shadow-md"
                  title={b.label}
                >
                  {b.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AIChat;
