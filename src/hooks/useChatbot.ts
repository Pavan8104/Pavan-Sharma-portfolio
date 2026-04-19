import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { handleUserQuery, type ConversationContext, type NavigationAction, type QueryResponse } from '../utils/chatEngine';
import { speakAdvanced } from '../utils/speakAdvanced';
import { type LanguageMode } from '../utils/languageProcessor';

export interface ChatMessageType {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: number;
}

const STORAGE_KEY = 'portfolio_chat_messages';

const welcomeMessage: ChatMessageType = {
  id: 'welcome',
  role: 'assistant',
  text: "Hello, I'm your portfolio AI assistant. Ask me about projects, skills, experience, achievements, or how to contact the developer.",
  timestamp: Date.now(),
};

function loadMessages(): ChatMessageType[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return [welcomeMessage];
}

function getSpeechRecognitionLang(languageMode: LanguageMode) {
  if (languageMode === 'hi') return 'hi-IN';
  if (languageMode === 'sv') return 'sv-SE';
  return 'en-US';
}

export function useChatbot() {
  const [messages, setMessages] = useState<ChatMessageType[]>(loadMessages);
  const [languageMode, setLanguageMode] = useState<LanguageMode>('en');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [hasUnread, setHasUnread] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([
    'Show me your projects',
    'What skills do you have?',
    'How can I contact you?',
    'Tell me about your experience',
  ]);
  const [links, setLinks] = useState<{ label: string; url: string }[]>([]);
  const [conversationContext, setConversationContext] = useState<ConversationContext>({
    lastIntent: 'general',
    lastResults: [],
    lastQuery: '',
  });

  const recognitionRef = useRef<any>(null);
  const sendMessageRef = useRef<(text: string) => void>(() => {});

  const supportsSpeechRecognition = useMemo(() => {
    return Boolean((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
  }, []);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = getSpeechRecognitionLang(languageMode);

    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript;
      if (transcript) {
        sendMessageRef.current(transcript);
      }
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = getSpeechRecognitionLang(languageMode);
    }
  }, [languageMode]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {}
  }, [messages]);

  useEffect(() => {
    if (isOpen) setHasUnread(false);
  }, [isOpen]);

  const navigateToSection = (action: NavigationAction | null) => {
    if (!action?.sectionId) return;
    const target = document.getElementById(action.sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.classList.add('ring-2', 'ring-neon-pink');
      setTimeout(() => target.classList.remove('ring-2', 'ring-neon-pink'), 1400);
    }
  };

  const sendMessage = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: ChatMessageType = { id: `${Date.now()}-user`, role: 'user', text: trimmed, timestamp: Date.now() };
    setMessages((current) => [...current, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      setConversationContext((ctx) => {
        const result: QueryResponse = handleUserQuery(trimmed, languageMode, ctx);
        const assistantMessage: ChatMessageType = { id: `${Date.now()}-assistant`, role: 'assistant', text: result.response, timestamp: Date.now() };
        setMessages((current) => [...current, assistantMessage]);
        setIsTyping(false);
        setSuggestions(result.suggestions);
        setLinks(result.links);
        setHasUnread((open) => {
          if (!open) return true;
          return open;
        });

        if (speechEnabled) {
          speakAdvanced(result.response, result.emotion);
        }

        if (result.action) {
          navigateToSection(result.action);
        }

        return {
          lastIntent: result.intent,
          lastResults: result.results,
          lastQuery: trimmed,
        };
      });
    }, 700);
  }, [languageMode, speechEnabled]);

  useEffect(() => {
    sendMessageRef.current = sendMessage;
  }, [sendMessage]);

  const clearChat = useCallback(() => {
    const fresh = { ...welcomeMessage, timestamp: Date.now() };
    setMessages([fresh]);
    setSuggestions(['Show me your projects', 'What skills do you have?', 'How can I contact you?', 'Tell me about your experience']);
    setLinks([]);
    setConversationContext({ lastIntent: 'general', lastResults: [], lastQuery: '' });
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
      return;
    }
    try {
      recognitionRef.current.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  };

  const toggleOpen = () => {
    setIsOpen((value) => !value);
  };

  const toggleSpeech = () => {
    setSpeechEnabled((value) => !value);
  };

  return {
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
  };
}
