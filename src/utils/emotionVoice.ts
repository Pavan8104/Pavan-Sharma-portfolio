export type Emotion = 'calm' | 'excited' | 'serious';

export function detectEmotion(text: string): Emotion {
  if (text.includes('!')) return 'excited';
  if (/\b(experience|important|impact|strong|recognition|achievement)\b/i.test(text)) return 'serious';
  return 'calm';
}

export function applyEmotion(utterance: SpeechSynthesisUtterance, emotion: Emotion): void {
  utterance.volume = 1;
  if (emotion === 'excited') {
    utterance.pitch = 0.4;
    utterance.rate = 0.95;
  } else if (emotion === 'serious') {
    utterance.pitch = 0.25;
    utterance.rate = 0.85;
  } else {
    utterance.pitch = 0.3;
    utterance.rate = 0.9;
  }
}
