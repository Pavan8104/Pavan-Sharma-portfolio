import type { Emotion } from './emotionVoice';
import type { LanguageMode } from './languageProcessor';

export interface VoiceConfig {
  pitch: number;
  rate: number;
  volume: number;
  lang: string;
}

const LANG_CODES: Record<LanguageMode, string> = {
  en: 'en-US',
  hi: 'hi-IN',
  sv: 'sv-SE',
  hinglish: 'en-IN',
};

// Ordered by preference per language — Google UK first for English as requested
const VOICE_PREFS: Record<LanguageMode, string[]> = {
  en: [
    'Google UK English Male',
    'Microsoft George Desktop',
    'Microsoft David Desktop',
    'David',
    'Daniel',
    'Fred',
  ],
  hi: [
    'Google \u0939\u093f\u0928\u094d\u0926\u0940',
    'Google Hindi',
    'Microsoft Hemant Desktop',
    'Lekha',
    'Hemant',
  ],
  sv: [
    'Google svenska',
    'Microsoft Bengt Desktop',
    'Alva',
  ],
  hinglish: [
    'Google UK English Male',
    'Microsoft David Desktop',
    'David',
  ],
};

const voiceCache = new Map<LanguageMode, SpeechSynthesisVoice>();

export function getVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  return window.speechSynthesis.getVoices();
}

export function resolveVoice(languageMode: LanguageMode): SpeechSynthesisVoice | null {
  const cached = voiceCache.get(languageMode);
  if (cached) return cached;

  const voices = getVoices();
  if (!voices.length) return null;

  const prefs = VOICE_PREFS[languageMode];
  const langPrefix = LANG_CODES[languageMode].split('-')[0];

  const voice =
    voices.find((v) => prefs.some((name) => v.name === name)) ||
    voices.find((v) => v.lang.startsWith(langPrefix) && !v.name.toLowerCase().includes('female')) ||
    voices.find((v) => v.lang.startsWith(langPrefix)) ||
    voices.find((v) => v.lang.startsWith('en')) ||
    voices[0];

  if (voice) voiceCache.set(languageMode, voice);
  return voice ?? null;
}

export function warmVoiceCache(): void {
  voiceCache.clear();
  (['en', 'hi', 'sv', 'hinglish'] as LanguageMode[]).forEach(resolveVoice);
}

export function buildVoiceConfig(emotion: Emotion, languageMode: LanguageMode): VoiceConfig {
  const lang = LANG_CODES[languageMode] ?? 'en-US';
  if (emotion === 'excited') return { pitch: 0.4, rate: 0.95, volume: 1, lang };
  if (emotion === 'serious') return { pitch: 0.25, rate: 0.85, volume: 1, lang };
  return { pitch: 0.3, rate: 0.9, volume: 1, lang };
}

function cleanForSpeech(text: string): string {
  return text
    // Strip workflow step headers like [Step 1 of 5: Projects]
    .replace(/\[Step \d+ of \d+:[^\]]*\]/g, '')
    // Strip markdown bold
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    // Strip markdown links, keep label
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Strip heading markers
    .replace(/#{1,6}\s/g, '')
    // Collapse double newlines to a pause
    .replace(/\n{2,}/g, '. ')
    // Single newline to space
    .replace(/\n/g, ' ')
    // Expand contractions for robotic feel
    .replace(/\bI'm\b/g, 'I am')
    .replace(/\bI've\b/g, 'I have')
    .replace(/\bI'll\b/g, 'I will')
    .replace(/\bI'd\b/g, 'I would')
    .replace(/\bdon't\b/g, 'do not')
    .replace(/\bcan't\b/g, 'can not')
    .replace(/\bwon't\b/g, 'will not')
    .replace(/\byou're\b/g, 'you are')
    .trim();
}

export function cancelSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function speak(text: string, emotion: Emotion, languageMode: LanguageMode): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  const cleaned = cleanForSpeech(text);
  if (!cleaned) return;

  const config = buildVoiceConfig(emotion, languageMode);
  const utterance = new SpeechSynthesisUtterance(cleaned);
  utterance.pitch = config.pitch;
  utterance.rate = config.rate;
  utterance.volume = config.volume;
  utterance.lang = config.lang;

  const voice = resolveVoice(languageMode);
  if (voice) utterance.voice = voice;

  cancelSpeech();
  window.speechSynthesis.speak(utterance);
}
