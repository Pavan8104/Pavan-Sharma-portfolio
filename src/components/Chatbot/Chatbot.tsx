import { AnimatePresence, motion } from 'framer-motion';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import { useChatContext } from '../../store/ChatContext';
import { type LanguageMode } from '../../utils/languageProcessor';
import { projects } from '../../data/projects';

const languageLabels: Record<LanguageMode, string> = {
  en: 'English',
  hi: 'Hindi',
  sv: 'Swedish',
  hinglish: 'Hinglish',
};

interface FeaturedLink {
  name: string;
  url: string;
  badge: string | null;
}

const FEATURED_LINKS: FeaturedLink[] = [
  { name: 'HireOnix AI', url: 'https://hireonixai.com/', badge: 'PRIMARY' },
  { name: 'HireOnix Presentation', url: 'https://hireonixai.com/student-partner/presentation', badge: null },
  { name: 'Docker Profile', url: 'https://hub.docker.com/u/ps8104', badge: 'DEVOPS' },
];

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
    voicesReady,
    suggestions,
    links,
    workflowStatus,
  } = useChatContext();

  const [draft, setDraft] = useState('');
  const [projectsExpanded, setProjectsExpanded] = useState(false);
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft.trim()) return;
    sendMessage(draft);
    setDraft('');
  };

  const projectCount = projects.length;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-[360px] sm:w-[420px] max-h-[calc(100vh-4rem)] cyber-glass border border-cyber-blue/30 backdrop-blur-xl shadow-neon overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-cyber-blue/20 shrink-0">
              <div>
                <p className="text-[10px] text-cyber-blue-dim uppercase tracking-[0.25em]">JARVIS — Portfolio AI</p>
                <h3 className="text-base font-cyber text-white leading-tight">My boss Pavan's Assistant</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={clearChat}
                  title="Clear chat"
                  className="w-8 h-8 rounded-full border border-cyber-blue/30 flex items-center justify-center text-cyber-blue hover:bg-red-500/10 hover:border-red-400 hover:text-red-400 transition-colors text-sm"
                >
                  ✕
                </button>
                <button
                  type="button"
                  onClick={toggleOpen}
                  className="w-8 h-8 rounded-full border border-cyber-blue/30 flex items-center justify-center text-cyber-blue hover:bg-cyber-blue/10 text-lg"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Controls row */}
            <div className="px-4 py-2 border-b border-cyber-blue/10 shrink-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] text-cyber-blue-dim uppercase tracking-wider px-1">
                    Auto-detected
                  </span>
                  <select
                    value={languageMode}
                    onChange={(e) => setLanguageMode(e.target.value as LanguageMode)}
                    title="Language auto-detected from input — override here"
                    className="bg-black/60 border border-cyber-blue/20 text-cyber-blue text-xs rounded-lg px-2 py-1.5 outline-none"
                  >
                    {Object.entries(languageLabels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={toggleSpeech}
                  title={
                    !voicesReady
                      ? 'Loading voices...'
                      : speechEnabled
                      ? 'Mute voice'
                      : 'Enable voice'
                  }
                  className={`relative w-9 h-9 rounded-xl border text-sm ${speechEnabled ? 'border-neon-pink bg-neon-pink/10 text-white' : 'border-cyber-blue/20 text-cyber-blue'}`}
                >
                  {speechEnabled ? '🔊' : '🔇'}
                  {!voicesReady && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse border border-black" />
                  )}
                </button>
              </div>
            </div>

            {/* Projects panel */}
            <div className="border-b border-cyber-blue/10 shrink-0">
              <button
                type="button"
                onClick={() => setProjectsExpanded((v) => !v)}
                className="w-full flex items-center justify-between px-4 py-2 text-left hover:bg-cyber-blue/5 transition-colors"
              >
                <span className="text-[11px] text-cyber-blue uppercase tracking-[0.2em] font-cyber">
                  {projectCount}+ Projects
                </span>
                <span className="text-cyber-blue-dim text-xs">{projectsExpanded ? '▲' : '▼'}</span>
              </button>

              <AnimatePresence>
                {projectsExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 pb-3 grid gap-1.5">
                      {FEATURED_LINKS.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between py-2 px-3 rounded-xl border border-cyber-blue/20 bg-black/60 text-cyber-blue text-xs hover:border-neon-pink hover:text-white hover:bg-neon-pink/10 transition group"
                        >
                          <span className="truncate">{link.name}</span>
                          <div className="flex items-center gap-1.5 ml-2 shrink-0">
                            {link.badge && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded border border-neon-pink/50 text-neon-pink uppercase tracking-wider">
                                {link.badge}
                              </span>
                            )}
                            <span className="opacity-40 group-hover:opacity-100 transition">↗</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Workflow status bar */}
            {workflowStatus && (
              <div className="px-4 py-2 border-b border-neon-pink/20 bg-neon-pink/5 shrink-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-neon-pink uppercase tracking-[0.2em]">
                    Workflow: Step {workflowStatus.currentStep}/{workflowStatus.totalSteps}
                    {workflowStatus.stepLabel ? ` — ${workflowStatus.stepLabel}` : ''}
                  </span>
                  {workflowStatus.waitingForDone && (
                    <span className="text-[10px] text-cyber-blue-dim animate-pulse">say 'done' to continue</span>
                  )}
                </div>
                <div className="mt-1.5 h-1 bg-cyber-blue/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-neon-pink rounded-full transition-all duration-500"
                    style={{ width: `${(workflowStatus.currentStep / workflowStatus.totalSteps) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex flex-col gap-3 p-4 overflow-y-auto flex-1 min-h-[200px] max-h-[320px]">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  text={message.text}
                  timestamp={message.timestamp}
                />
              ))}
              {isTyping && (
                <div className="self-start bg-white/5 border border-cyber-blue/40 rounded-3xl p-4 text-cyber-blue">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyber-blue animate-pulse" />
                    <span className="h-2 w-2 rounded-full bg-cyber-blue animate-pulse delay-150" />
                    <span className="h-2 w-2 rounded-full bg-cyber-blue animate-pulse delay-300" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick links from response */}
            {links.length > 0 && (
              <div className="px-4 pb-2 pt-1 border-t border-cyber-blue/10 grid gap-1.5 shrink-0">
                {links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 rounded-2xl border border-cyber-blue/30 bg-black/60 text-cyber-blue text-xs hover:border-neon-pink hover:text-white hover:bg-neon-pink/10 transition"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="px-4 pb-2 pt-1 border-t border-cyber-blue/10 shrink-0">
                <p className="text-[10px] text-cyber-blue-dim uppercase tracking-[0.2em] mb-1.5">Suggested</p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => sendMessage(s)}
                      className="rounded-full border border-cyber-blue/20 bg-black/60 px-3 py-1.5 text-[11px] text-cyber-blue hover:border-neon-pink hover:text-white hover:bg-neon-pink/10 transition"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="px-4 pb-4 pt-2 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={supportsSpeechRecognition ? toggleListening : undefined}
                  title={supportsSpeechRecognition ? 'Voice input' : 'Speech recognition unavailable'}
                  className={`w-11 h-11 rounded-3xl border ${listening ? 'border-neon-pink bg-neon-pink/15 text-neon-pink shadow-neon-pink' : 'border-cyber-blue/20 text-cyber-blue'} flex items-center justify-center transition-all shrink-0`}
                >
                  🎙
                </button>
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={workflowStatus?.waitingForDone ? "Say 'done' to continue..." : 'Ask about projects, skills...'}
                  className="flex-1 bg-black/60 border border-cyber-blue/20 rounded-3xl px-4 py-2.5 text-sm text-white placeholder:text-cyber-blue-dim outline-none"
                />
                <button
                  type="submit"
                  className="w-11 h-11 rounded-3xl border border-neon-pink bg-neon-pink/15 text-white hover:bg-neon-pink/25 transition-all shrink-0"
                >
                  ➤
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher button */}
      <button
        type="button"
        onClick={toggleOpen}
        className="relative w-16 h-16 rounded-full bg-cyber-blue text-black flex items-center justify-center shadow-[0_0_30px_rgba(0,255,255,0.35)] border border-cyber-blue/50 hover:scale-105 transition-transform"
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 opacity-20 blur-xl" />
        <span className="relative text-2xl font-cyber">J</span>
        {hasUnread && !isOpen && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-black animate-pulse" />
        )}
      </button>
    </div>
  );
}
