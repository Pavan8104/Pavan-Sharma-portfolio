export type Emotion = 'calm' | 'excited' | 'serious';

export function detectEmotion(text: string): Emotion {
  if (text.includes('!')) return 'excited';
  if (/\b(experience|important|impact|strong|recognition|achievement)\b/i.test(text)) return 'serious';
  return 'calm';
}

export function applyEmotion(utterance: SpeechSynthesisUtterance, emotion: Emotion) {
  utterance.pitch = 0;
  utterance.volume = 1;
  if (emotion === 'excited') {
    utterance.rate = 0.95;
  } else if (emotion === 'serious') {
    utterance.rate = 0.7;
  } else {
    utterance.rate = 0.82;
  }
}
