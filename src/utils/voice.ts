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
  sv: ['Google svenska', 'Microsoft Bengt Desktop', 'Alva'],
  hinglish: ['Google UK English Male', 'Microsoft David Desktop', 'David'],
};

const voiceCache = new Map<LanguageMode, SpeechSynthesisVoice>();

// Active resume interval to work around Chrome's pause bug
let resumeTimer: ReturnType<typeof setInterval> | null = null;

function clearResumeTimer(): void {
  if (resumeTimer !== null) {
    clearInterval(resumeTimer);
    resumeTimer = null;
  }
}

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

function prepareForSpeech(text: string): string {
  return (
    text
      // Strip the hire CTA — too long and repetitive for TTS
      .replace(/Would you like to know more about my owner Pavan\?[\s\S]*/i, '')
      // Strip workflow step headers [Step X of Y: Label]
      .replace(/\[Step \d+ of \d+:[^\]]*\]/g, '')
      // Strip markdown bold
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      // Strip markdown links, keep label text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Strip heading markers
      .replace(/#{1,6}\s/g, '')
      // Double newline → sentence pause
      .replace(/\n{2,}/g, '. ')
      // Single newline → space
      .replace(/\n/g, ' ')
      // Expand contractions for robotic delivery
      .replace(/\bI'm\b/g, 'I am')
      .replace(/\bI've\b/g, 'I have')
      .replace(/\bI'll\b/g, 'I will')
      .replace(/\bI'd\b/g, 'I would')
      .replace(/\bdon't\b/g, 'do not')
      .replace(/\bcan't\b/g, 'can not')
      .replace(/\bwon't\b/g, 'will not')
      .replace(/\byou're\b/g, 'you are')
      // Collapse extra spaces
      .replace(/\s{2,}/g, ' ')
      .trim()
      // Hard cap at 300 characters to stay within Chrome's reliable TTS window
      .slice(0, 300)
  );
}

export function cancelSpeech(): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  clearResumeTimer();
  window.speechSynthesis.cancel();
}

export function speak(text: string, emotion: Emotion, languageMode: LanguageMode): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  const prepared = prepareForSpeech(text);
  if (!prepared) return;

  const config = buildVoiceConfig(emotion, languageMode);

  // Build utterance BEFORE cancel so Chrome doesn't lose the reference
  const utterance = new SpeechSynthesisUtterance(prepared);
  utterance.pitch = config.pitch;
  utterance.rate = config.rate;
  utterance.volume = config.volume;
  utterance.lang = config.lang;

  const voice = resolveVoice(languageMode);
  if (voice) utterance.voice = voice;

  // Chrome workaround: cancel existing speech, then yield one tick before speaking
  // Calling speak() synchronously after cancel() is dropped silently in Chrome
  cancelSpeech();

  utterance.onend = () => clearResumeTimer();
  utterance.onerror = () => clearResumeTimer();

  setTimeout(() => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.speak(utterance);

    // Chrome pause bug: speechSynthesis silently pauses after ~15s
    // Keep it alive by resuming every 10 seconds while speaking
    resumeTimer = setInterval(() => {
      if (!window.speechSynthesis.speaking) {
        clearResumeTimer();
        return;
      }
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }, 10000);
  }, 50);
}
