import { createContext, useContext, type ReactNode } from 'react';
import { useChatbot } from '../hooks/useChatbot';

type ChatbotContextValue = ReturnType<typeof useChatbot>;

const ChatContext = createContext<ChatbotContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const chatbot = useChatbot();
  return <ChatContext.Provider value={chatbot}>{children}</ChatContext.Provider>;
}

export function useChatContext(): ChatbotContextValue {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChatContext must be used within ChatProvider');
  return ctx;
}
