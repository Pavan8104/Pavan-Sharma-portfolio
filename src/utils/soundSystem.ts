export function playNotificationBeep(): void {
  try {
    const AudioCtxCtor =
      (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtxCtor) return;

    const ctx: AudioContext = new AudioCtxCtor();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
    osc.onended = () => { void ctx.close(); };
  } catch {
    // Audio API unavailable — fail silently
  }
}
