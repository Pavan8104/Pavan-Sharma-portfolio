import { useCallback, useEffect, useRef, useState } from 'react';
import { speak as speakCore, cancelSpeech, warmVoiceCache, getVoices } from '../utils/voice';
import type { Emotion } from '../utils/emotionVoice';
import type { LanguageMode } from '../utils/languageProcessor';

export function useVoice() {
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [voicesReady, setVoicesReady] = useState(false);
  const enabledRef = useRef(true);

  useEffect(() => {
    enabledRef.current = speechEnabled;
  }, [speechEnabled]);

  // Load and warm voice cache
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;

    const tryLoad = () => {
      if (getVoices().length > 0) {
        warmVoiceCache();
        setVoicesReady(true);
        return true;
      }
      return false;
    };

    if (tryLoad()) return;

    // Voices load asynchronously on most browsers
    const prev = window.speechSynthesis.onvoiceschanged;
    window.speechSynthesis.onvoiceschanged = () => {
      warmVoiceCache();
      setVoicesReady(true);
    };

    // Cleanup: restore previous handler if any
    return () => {
      window.speechSynthesis.onvoiceschanged = prev;
    };
  }, []);

  // Retry voice load after a short delay (Safari sometimes needs this)
  useEffect(() => {
    if (voicesReady) return;
    const timer = setTimeout(() => {
      if (getVoices().length > 0) {
        warmVoiceCache();
        setVoicesReady(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [voicesReady]);

  const speak = useCallback(
    (text: string, emotion: Emotion, languageMode: LanguageMode) => {
      if (!enabledRef.current) return;
      speakCore(text, emotion, languageMode);
    },
    []
  );

  const cancel = useCallback(() => {
    cancelSpeech();
  }, []);

  const toggleSpeech = useCallback(() => {
    setSpeechEnabled((prev) => {
      const next = !prev;
      enabledRef.current = next;
      if (!next) cancelSpeech();
      return next;
    });
  }, []);

  return { speak, cancel, speechEnabled, toggleSpeech, voicesReady };
}
