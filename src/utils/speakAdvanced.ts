import { applyEmotion, type Emotion } from './emotionVoice';

// Ordered by preference: Google UK / Microsoft first as requested, then macOS fallbacks
const PREFERRED_VOICE_NAMES = [
  'Google UK English Male',
  'Microsoft David Desktop',
  'Microsoft George Desktop',
  'David',
  'Fred',
  'Ralph',
  'Daniel',
  'Mark',
];

let cachedVoice: SpeechSynthesisVoice | null = null;

function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice {
  return (
    voices.find((v) => PREFERRED_VOICE_NAMES.some((name) => v.name === name)) ||
    voices.find((v) => /en[-_]/i.test(v.lang) && v.name.toLowerCase().includes('male')) ||
    voices.find((v) => v.lang.startsWith('en')) ||
    voices[0]
  );
}

function findBestVoice(): SpeechSynthesisVoice | null {
  if (cachedVoice) return cachedVoice;
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    cachedVoice = pickVoice(voices);
    return cachedVoice;
  }
  return null;
}

if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    if (!cachedVoice) {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) cachedVoice = pickVoice(voices);
    }
  };
}

function robotizeText(text: string): string {
  return text
    .replace(/([.!?])\s+/g, '$1... ')
    .replace(/I'm\b/g, 'I am')
    .replace(/I've\b/g, 'I have')
    .replace(/I'll\b/g, 'I will')
    .replace(/I'd\b/g, 'I would')
    .replace(/you're\b/g, 'you are')
    .replace(/you've\b/g, 'you have')
    .replace(/you'll\b/g, 'you will')
    .replace(/it's\b/g, 'it is')
    .replace(/that's\b/g, 'that is')
    .replace(/don't\b/g, 'do not')
    .replace(/can't\b/g, 'can not')
    .replace(/won't\b/g, 'will not');
}

export function speakAdvanced(text: string, emotion: Emotion): void {
  if (!('speechSynthesis' in window)) return;
  const processed = robotizeText(text);
  const utterance = new SpeechSynthesisUtterance(processed);
  applyEmotion(utterance, emotion);
  const voice = findBestVoice();
  if (voice) utterance.voice = voice;
  utterance.lang = 'en-US';
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}
