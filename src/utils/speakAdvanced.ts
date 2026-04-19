import { applyEmotion, type Emotion } from './emotionVoice';

// Voices ordered by how robotic they sound
const preferredVoiceNames = [
  'Fred',           // macOS — most robotic built-in voice
  'Ralph',          // macOS alternative
  'Google UK English Male',
  'Microsoft David Desktop',
  'David',
  'Mark',
  'Daniel',
];

let cachedVoice: SpeechSynthesisVoice | null = null;

function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice {
  return (
    voices.find((v) => preferredVoiceNames.some((name) => v.name === name)) ||
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

// Pre-warm voice cache once voices are loaded
if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    if (!cachedVoice) {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) cachedVoice = pickVoice(voices);
    }
  };
}

function robotizeText(text: string): string {
  // Insert a short pause after each sentence and strip contractions for a flat robotic tone
  return text
    .replace(/([.!?])\s+/g, '$1... ')
    .replace(/I'm/g, 'I am')
    .replace(/I've/g, 'I have')
    .replace(/I'll/g, 'I will')
    .replace(/I'd/g, 'I would')
    .replace(/you're/g, 'you are')
    .replace(/you've/g, 'you have')
    .replace(/you'll/g, 'you will')
    .replace(/it's/g, 'it is')
    .replace(/that's/g, 'that is')
    .replace(/don't/g, 'do not')
    .replace(/can't/g, 'can not')
    .replace(/won't/g, 'will not');
}

export function speakAdvanced(text: string, emotion: Emotion) {
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
