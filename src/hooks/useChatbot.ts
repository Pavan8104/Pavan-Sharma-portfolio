import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { handleUserQuery, type ConversationContext, type NavigationAction, type QueryResponse } from '../utils/chatEngine';
import { speakAdvanced } from '../utils/speakAdvanced';
import { type LanguageMode } from '../utils/languageProcessor';
import { playNotificationBeep } from '../utils/soundSystem';
import { HIRE_CTA } from '../utils/jarvisPersonality';

export interface ChatMessageType {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: number;
}

export interface WorkflowStatus {
  active: boolean;
  currentStep: number;
  totalSteps: number;
  stepLabel: string;
  waitingForDone: boolean;
}

interface WorkflowStep {
  query: string;
  label: string;
}

const TOUR_STEPS: WorkflowStep[] = [
  { query: 'show projects', label: 'Projects' },
  { query: 'what skills do you have', label: 'Skills' },
  { query: 'tell me about experience', label: 'Experience' },
  { query: 'show achievements', label: 'Achievements' },
  { query: 'contact information', label: 'Contact' },
];

const STORAGE_KEY = 'portfolio_chat_messages';

const WELCOME_TEXT =
  "My boss Pavan's AI assistant is online. I am JARVIS — built to guide you through this portfolio. Ask me about projects, skills, experience, achievements, or how to reach my boss.\n\n" +
  HIRE_CTA;

const welcomeMessage: ChatMessageType = {
  id: 'welcome',
  role: 'assistant',
  text: WELCOME_TEXT,
  timestamp: Date.now(),
};

function loadMessages(): ChatMessageType[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as ChatMessageType[];
  } catch {
    // storage unavailable
  }
  return [welcomeMessage];
}

function isTourTrigger(text: string): boolean {
  return /\b(full tour|show everything|walk me through|give me a tour|start tour|portfolio tour|overview)\b/i.test(text);
}

function isDoneTrigger(text: string): boolean {
  return /^\s*(done|ok|continue|yes|next|proceed|go on)\s*$/i.test(text);
}

function getSpeechRecognitionLang(languageMode: LanguageMode): string {
  if (languageMode === 'hi') return 'hi-IN';
  if (languageMode === 'sv') return 'sv-SE';
  return 'en-US';
}

function makeId(role: string): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}-${role}`;
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
    'Give me a full tour',
  ]);
  const [links, setLinks] = useState<{ label: string; url: string }[]>([]);
  const [workflowIndex, setWorkflowIndex] = useState(-1);
  const [waitingForDone, setWaitingForDone] = useState(false);

  const conversationContextRef = useRef<ConversationContext>({
    lastIntent: 'general',
    lastResults: [],
    lastQuery: '',
  });
  const recognitionRef = useRef<any>(null);
  const sendMessageRef = useRef<(text: string) => void>(() => {});
  const speechEnabledRef = useRef(speechEnabled);
  const languageModeRef = useRef(languageMode);

  useEffect(() => { speechEnabledRef.current = speechEnabled; }, [speechEnabled]);
  useEffect(() => { languageModeRef.current = languageMode; }, [languageMode]);

  const supportsSpeechRecognition = useMemo(() => {
    return Boolean((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
  }, []);

  // Persist messages
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages)); } catch { /* noop */ }
  }, [messages]);

  // Clear unread when opened
  useEffect(() => {
    if (isOpen) setHasUnread(false);
  }, [isOpen]);

  // Speech recognition setup
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = getSpeechRecognitionLang(languageMode);

    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript;
      if (transcript) sendMessageRef.current(transcript);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
  }, []);

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = getSpeechRecognitionLang(languageMode);
    }
  }, [languageMode]);

  const navigateToSection = useCallback((action: NavigationAction | null) => {
    if (!action?.sectionId) return;
    const target = document.getElementById(action.sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.classList.add('ring-2', 'ring-neon-pink');
      setTimeout(() => target.classList.remove('ring-2', 'ring-neon-pink'), 1400);
    }
  }, []);

  const pushAssistantMessage = useCallback((text: string) => {
    const msg: ChatMessageType = {
      id: makeId('assistant'),
      role: 'assistant',
      text,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, msg]);
    setHasUnread(true);
  }, []);

  const executeWorkflowStep = useCallback((index: number) => {
    const step = TOUR_STEPS[index];
    setWorkflowIndex(index);
    setIsTyping(true);

    setTimeout(() => {
      const ctx = conversationContextRef.current;
      const result: QueryResponse = handleUserQuery(step.query, languageModeRef.current, ctx);

      const isLast = index === TOUR_STEPS.length - 1;
      const stepHeader = `[Step ${index + 1} of ${TOUR_STEPS.length}: ${step.label}]\n\n`;
      const stepNote = isLast
        ? "\n\nMy boss Pavan's complete portfolio tour is finished. All sections have been briefed."
        : `\n\nMy boss Pavan's ${step.label} briefing is complete. Please say 'done' to proceed to ${TOUR_STEPS[index + 1].label}.`;

      const fullText = stepHeader + result.response + stepNote;

      pushAssistantMessage(fullText);
      setIsTyping(false);
      setSuggestions(isLast ? ['Show me your projects', 'What skills do you have?', 'How can I contact you?'] : ['done', 'Tell me more', 'Show details']);
      setLinks(result.links);
      setWaitingForDone(!isLast);
      if (isLast) setWorkflowIndex(-1);

      playNotificationBeep();

      if (speechEnabledRef.current) {
        speakAdvanced(result.response + stepNote, result.emotion);
      }

      conversationContextRef.current = {
        lastIntent: result.intent,
        lastResults: result.results,
        lastQuery: step.query,
      };

      if (result.action) navigateToSection(result.action);
    }, 800);
  }, [pushAssistantMessage, navigateToSection]);

  const sendMessage = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: ChatMessageType = {
      id: makeId('user'),
      role: 'user',
      text: trimmed,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);

    // Workflow: "done" trigger
    if (waitingForDone && isDoneTrigger(trimmed)) {
      setWaitingForDone(false);
      const nextIndex = workflowIndex + 1;

      if (nextIndex >= TOUR_STEPS.length) {
        const doneText = "My boss Pavan's complete portfolio tour is finished. All sections have been briefed.\n\n" + HIRE_CTA;
        pushAssistantMessage(doneText);
        setWorkflowIndex(-1);
        if (speechEnabledRef.current) speakAdvanced(doneText, 'calm');
      } else {
        const continueText = "My boss Pavan's workflow is continuing as instructed.\n\n" + HIRE_CTA;
        pushAssistantMessage(continueText);
        if (speechEnabledRef.current) speakAdvanced(continueText, 'calm');
        setTimeout(() => executeWorkflowStep(nextIndex), 900);
      }
      return;
    }

    // Tour trigger
    if (isTourTrigger(trimmed)) {
      const intro =
        "My boss Pavan's portfolio tour is beginning. I will walk you through " +
        TOUR_STEPS.length +
        " key sections. Say 'done' after each one to proceed.\n\n" +
        HIRE_CTA;
      pushAssistantMessage(intro);
      if (speechEnabledRef.current) speakAdvanced(intro, 'calm');
      setTimeout(() => executeWorkflowStep(0), 1000);
      return;
    }

    // Normal query
    setIsTyping(true);
    setTimeout(() => {
      const ctx = conversationContextRef.current;
      const result: QueryResponse = handleUserQuery(trimmed, languageModeRef.current, ctx);

      pushAssistantMessage(result.response);
      setIsTyping(false);
      setSuggestions(result.suggestions);
      setLinks(result.links);

      if (speechEnabledRef.current) {
        speakAdvanced(result.response, result.emotion);
      }

      if (result.action) navigateToSection(result.action);

      conversationContextRef.current = {
        lastIntent: result.intent,
        lastResults: result.results,
        lastQuery: trimmed,
      };
    }, 700);
  }, [waitingForDone, workflowIndex, pushAssistantMessage, executeWorkflowStep, navigateToSection]);

  useEffect(() => { sendMessageRef.current = sendMessage; }, [sendMessage]);

  const clearChat = useCallback(() => {
    setMessages([{ ...welcomeMessage, id: makeId('welcome'), timestamp: Date.now() }]);
    setSuggestions(['Show me your projects', 'What skills do you have?', 'How can I contact you?', 'Give me a full tour']);
    setLinks([]);
    setWorkflowIndex(-1);
    setWaitingForDone(false);
    conversationContextRef.current = { lastIntent: 'general', lastResults: [], lastQuery: '' };
  }, []);

  const toggleListening = useCallback(() => {
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
  }, [listening]);

  const toggleOpen = useCallback(() => setIsOpen((v) => !v), []);
  const toggleSpeech = useCallback(() => setSpeechEnabled((v) => !v), []);

  const workflowStatus: WorkflowStatus | null =
    workflowIndex >= 0
      ? {
          active: true,
          currentStep: workflowIndex + 1,
          totalSteps: TOUR_STEPS.length,
          stepLabel: TOUR_STEPS[workflowIndex]?.label ?? '',
          waitingForDone,
        }
      : waitingForDone
      ? {
          active: true,
          currentStep: workflowIndex + 1,
          totalSteps: TOUR_STEPS.length,
          stepLabel: '',
          waitingForDone: true,
        }
      : null;

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
    workflowStatus,
  };
}
