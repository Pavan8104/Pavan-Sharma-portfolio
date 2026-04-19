import { AnimatePresence, motion } from 'framer-motion';
import { type FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import { useChatbot } from '../../hooks/useChatbot';
import { type LanguageMode } from '../../utils/languageProcessor';

function formatTime(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const languageLabels: Record<LanguageMode, string> = {
  en: 'English',
  hi: 'Hindi',
  sv: 'Swedish',
  hinglish: 'Hinglish',
};

export default function Chatbot() {
  const {
    messages,
    sendMessage,
    clearChat,
    languageMode,
    setLanguageMode,
    isOpen,
    toggleOpen,
    isTyping,
    hasUnread,
    supportsSpeechRecognition,
    listening,
    toggleListening,
    speechEnabled,
    toggleSpeech,
    suggestions,
    links,
  } = useChatbot();

  const [draft, setDraft] = useState('');
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) toggleOpen();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, toggleOpen]);

  const welcome = useMemo(() => {
    return `Ask me about projects, skills, experience, achievements, or contact information.`;
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft.trim()) return;
    sendMessage(draft);
    setDraft('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-[360px] sm:w-[420px] max-h-[calc(100vh-4rem)] cyber-glass border border-cyber-blue/30 backdrop-blur-xl shadow-neon overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-cyber-blue/20">
              <div>
                <p className="text-xs text-cyber-blue-dim uppercase tracking-[0.25em]">JARVIS Assist</p>
                <h3 className="text-lg font-cyber text-white">Portfolio AI Companion</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={clearChat}
                  title="Clear chat"
                  className="w-9 h-9 rounded-full border border-cyber-blue/30 flex items-center justify-center text-cyber-blue hover:bg-red-500/10 hover:border-red-400 hover:text-red-400 transition-colors"
                >
                  🗑
                </button>
                <button
                  type="button"
                  onClick={toggleOpen}
                  className="w-9 h-9 rounded-full border border-cyber-blue/30 flex items-center justify-center text-cyber-blue hover:bg-cyber-blue/10"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="px-4 py-3 border-b border-cyber-blue/10">
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col text-[11px] text-cyber-blue-dim">
                  <span className="uppercase tracking-[0.16em]">Language</span>
                  <span className="text-white text-sm">{languageLabels[languageMode]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={languageMode}
                    onChange={(event) => setLanguageMode(event.target.value as LanguageMode)}
                    className="bg-black/60 border border-cyber-blue/20 text-cyber-blue text-sm rounded-lg px-3 py-2 outline-none"
                  >
                    {Object.entries(languageLabels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={toggleSpeech}
                    className={`w-11 h-11 rounded-xl border ${speechEnabled ? 'border-neon-pink bg-neon-pink/10 text-white shadow-neon-pink' : 'border-cyber-blue/20 text-cyber-blue'}`}
                  >
                    {speechEnabled ? '🔊' : '🔇'}
                  </button>
                </div>
              </div>
              <p className="mt-3 text-[12px] text-cyber-blue-dim leading-5">{welcome}</p>
            </div>

            <div className="flex flex-col gap-3 p-4 overflow-y-auto h-[380px]">
              {messages.map((message) => (
                <ChatMessage key={message.id} role={message.role} text={message.text} timestamp={message.timestamp} />
              ))}
              {isTyping && (
                <div className="self-start bg-white/5 border border-cyber-blue/40 rounded-3xl p-4 text-cyber-blue">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-cyber-blue animate-pulse" />
                    <span className="h-2.5 w-2.5 rounded-full bg-cyber-blue animate-pulse delay-150" />
                    <span className="h-2.5 w-2.5 rounded-full bg-cyber-blue animate-pulse delay-300" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {links.length > 0 && (
              <div className="px-4 pb-2 pt-1 border-t border-cyber-blue/10 grid gap-2">
                {links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 rounded-2xl border border-cyber-blue/30 bg-black/60 text-cyber-blue text-sm hover:border-neon-pink hover:text-white hover:bg-neon-pink/10 transition"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            {suggestions.length > 0 && (
              <div className="px-4 pb-2 pt-1 border-t border-cyber-blue/10">
                <p className="text-[11px] text-cyber-blue-dim uppercase tracking-[0.2em] mb-2">Suggested questions</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => sendMessage(suggestion)}
                      className="rounded-full border border-cyber-blue/20 bg-black/60 px-3 py-2 text-[11px] text-cyber-blue hover:border-neon-pink hover:text-white hover:bg-neon-pink/10 transition"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="px-4 pb-4 pt-2">
              <div className="relative flex items-center gap-3">
                <button
                  type="button"
                  onClick={supportsSpeechRecognition ? toggleListening : undefined}
                  className={`w-12 h-12 rounded-3xl border ${listening ? 'border-neon-pink bg-neon-pink/15 text-neon-pink shadow-neon-pink' : 'border-cyber-blue/20 text-cyber-blue'} flex items-center justify-center transition-all`}
                  title={supportsSpeechRecognition ? 'Voice input' : 'Speech recognition unavailable'}
                >
                  🎙
                </button>
                <input
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Ask about projects, skills, or experience..."
                  className="flex-1 bg-black/60 border border-cyber-blue/20 rounded-3xl px-4 py-3 text-sm text-white placeholder:text-cyber-blue-dim outline-none"
                />
                <button
                  type="submit"
                  className="w-12 h-12 rounded-3xl border border-neon-pink bg-neon-pink/15 text-white hover:bg-neon-pink/25 transition-all"
                >
                  ➤
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={toggleOpen}
        className="relative w-16 h-16 rounded-full bg-cyber-blue text-black flex items-center justify-center shadow-[0_0_30px_rgba(0,255,255,0.35)] border border-cyber-blue/50 hover:scale-105 transition-transform"
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 opacity-20 blur-xl" />
        <span className="relative text-2xl">J</span>
        {hasUnread && !isOpen && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-black animate-pulse" />
        )}
      </button>
    </div>
  );
}
