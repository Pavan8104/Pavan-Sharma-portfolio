import { motion } from 'framer-motion';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  text: string;
  timestamp?: number;
}

export default function ChatMessage({ role, text, timestamp }: ChatMessageProps) {
  const isAssistant = role === 'assistant';
  const time = timestamp ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`max-w-[92%] ${isAssistant ? 'self-start bg-white/5 border-cyber-blue/40 text-cyber-blue' : 'self-end bg-neon-pink/10 border-neon-pink/40 text-white'} border rounded-3xl p-4 shadow-[0_0_40px_rgba(0,255,255,0.08)]`}
    >
      <p className="whitespace-pre-wrap break-words font-code text-sm leading-6">
        {text}
      </p>
      {time && (
        <p className="mt-1 text-[10px] opacity-40 text-right">{time}</p>
      )}
    </motion.div>
  );
}
