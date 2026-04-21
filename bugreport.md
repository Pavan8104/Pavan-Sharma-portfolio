# Bug Report — Portfolio Chatbot (JARVIS)

**Project:** Pavan Sharma — Cyberpunk Portfolio  
**Stack:** React 18 + Vite + TypeScript + Tailwind + Framer Motion  
**Period:** April 2026  

---

## BUG-001 — Build Failure: Unicode Smart Quotes as String Delimiters

**Severity:** Critical — Blocked all builds  
**File(s):** `src/hooks/useChatbot.ts`, `src/utils/chatEngine.ts`

### Symptom
```
error: Expected string but found ''
src/hooks/useChatbot.ts:1:66
```
Vite/esbuild refused to compile. `tsc` silently accepted the same file.

### Root Cause
Files contained Unicode curly/smart quote characters — U+2018 (`'`) and U+2019 (`'`) — used as JavaScript string delimiters. These are valid UTF-8 text characters but are **not** valid JS string delimiters. esbuild enforces this strictly; TypeScript's compiler does not, which masked the error during type-checking passes.

Affected strings included contractions and possessives: `I've`, `developer's`, `I'll`, `You can reach me... I'll keep`.

### Resolution
- Ran a Python byte-level replacement to swap `\xe2\x80\x98` and `\xe2\x80\x99` (UTF-8 encoding of curly quotes) with ASCII `'` across all affected files.
- Strings containing apostrophes (e.g. `"developer's"`, `"I've earned"`) were converted to double-quoted strings to avoid further collisions.
- Established a rule: all new files written with ASCII quotes only.

---

## BUG-002 — `applyEmotion` Imported but Never Called

**Severity:** Medium — Voice pitch/rate always used hardcoded defaults  
**File(s):** `src/utils/speakAdvanced.ts`

### Symptom
All TTS speech played at identical pitch and rate regardless of response emotion (excited, serious, calm). The emotion detection pipeline was running but its output was discarded.

### Root Cause
`applyEmotion()` was imported at the top of `speakAdvanced.ts` but the `speak()` function constructed its `SpeechSynthesisUtterance` with hardcoded values (`pitch: 0.5`, `rate: 1.0`) instead of calling `applyEmotion(emotion)` to get the correct config.

### Resolution
Replaced the hardcoded utterance config with a call to `applyEmotion(emotion)`:
```typescript
const config = applyEmotion(emotion); // was: { pitch: 0.5, rate: 1.0 }
utterance.pitch = config.pitch;
utterance.rate  = config.rate;
```

---

## BUG-003 — Stale Closure in Speech Recognition Callback

**Severity:** High — Voice input sent messages using an outdated `sendMessage` reference  
**File(s):** `src/hooks/useChatbot.ts`

### Symptom
When a user spoke into the microphone, the chatbot either did nothing or used an old snapshot of `sendMessage` — ignoring the latest conversation state (workflow index, language mode, etc.).

### Root Cause
`SpeechRecognition.onresult` was set up in a `useEffect` that ran once on mount. The callback captured `sendMessage` from that first render via closure. Because `sendMessage` is recreated on every render (it depends on `workflowIndex`, `waitingForDone`, etc.), the recognition handler held a stale reference for the lifetime of the component.

### Resolution
Introduced a stable ref that always points to the current `sendMessage`:
```typescript
const sendMessageRef = useRef<(text: string) => void>(() => {});
useEffect(() => { sendMessageRef.current = sendMessage; }, [sendMessage]);

// Inside recognition.onresult:
recognition.onresult = (event) => {
  const transcript = event.results?.[0]?.[0]?.transcript ?? '';
  if (transcript) sendMessageRef.current(transcript); // always current
};
```

---

## BUG-004 — Workflow Step Note Contained Wrong Text

**Severity:** Low — Incorrect UX copy in tour workflow  
**File(s):** `src/hooks/useChatbot.ts`

### Symptom
After each tour step, JARVIS displayed:
> "My boss Pavan's [Label] briefing is complete. Please say 'done' to proceed."

This was confusing — "briefing is complete" before the user had even read the content.

### Root Cause
The step note template was written from the perspective of a completed action rather than a pending prompt.

### Resolution
Changed step note to a forward-looking, actionable message:
```typescript
const stepNote = isLast
  ? "\n\nMy boss Pavan's complete portfolio tour is finished."
  : `\n\nSay 'done' to proceed to ${TOUR_STEPS[index + 1].label}.`;
```

---

## BUG-005 — Dead Branch in `workflowStatus` Ternary

**Severity:** Low — Silent logic error, `currentStep: 0` on impossible state  
**File(s):** `src/hooks/useChatbot.ts`

### Symptom
No visible UI bug, but code review revealed a ternary with an unreachable branch that would compute `currentStep: 0` — breaking the progress bar if ever reached.

### Root Cause
The original ternary had three branches:
1. `workflowIndex >= 0` → active workflow
2. `waitingForDone && workflowIndex === -1` → impossible: `waitingForDone` is always `false` when `workflowIndex === -1`
3. fallback → `null`

Branch 2 could never be true because `waitingForDone` is only set to `true` inside `executeWorkflowStep`, which always sets `workflowIndex >= 0` first.

### Resolution
Removed the dead branch. Simplified to a single conditional:
```typescript
const workflowStatus = workflowIndex >= 0
  ? { active: true, currentStep: workflowIndex + 1, totalSteps: TOUR_STEPS.length, ... }
  : null;
```

---

## BUG-006 — Jarvis Personality Regex Left Trailing Fragment " well."

**Severity:** Low — Grammatically broken sentence in fallback response  
**File(s):** `src/utils/jarvisPersonality.ts`

### Symptom
The general/fallback response rendered as:
> "My boss Pavan's assistant is fully briefed. well. Ask about projects..."

The word " well." appeared as a dangling fragment after the period.

### Root Cause
The regex matched only the beginning of the sentence:
```typescript
.replace(/^I understand this portfolio\b/i, "My boss Pavan's assistant is fully briefed.")
```
This left the remainder of the original sentence — ` well.` — attached to the replacement text.

### Resolution
Extended the regex to match the full original sentence:
```typescript
.replace(/^I understand this portfolio well\./i, "My boss Pavan's assistant is fully briefed.")
```

---

## BUG-007 — JARVIS Voice Completely Silent (Three Root Causes)

**Severity:** Critical — Core voice feature non-functional  
**File(s):** `src/utils/voice.ts`

### Symptom
JARVIS produced no audio output on any response. The TTS pipeline appeared to run (no errors thrown) but the browser never spoke.

### Root Cause — Part A: Chrome cancel+speak Race Condition
`cancelSpeech()` was called synchronously before `window.speechSynthesis.speak(utterance)`. In Chrome, calling `speak()` in the same synchronous tick as `cancel()` causes the new utterance to be silently dropped — Chrome processes the cancel asynchronously and discards the queued speak.

**Fix:** Build the utterance _before_ calling `cancel()`, then defer `speak()` by 50ms:
```typescript
const utterance = new SpeechSynthesisUtterance(prepared); // build first
cancelSpeech();                                            // then cancel
setTimeout(() => {
  window.speechSynthesis.speak(utterance);                // speak after yield
}, 50);
```

### Root Cause — Part B: Text Too Long (Hire CTA Appended)
Every JARVIS response had the hire CTA appended (`"Would you like to know more about my owner Pavan?..."`), making responses 400–600 characters. Chrome's Web Speech API silently drops utterances that exceed its reliable processing window.

**Fix:** Added `prepareForSpeech()` which strips the CTA and hard-caps text at 300 characters before passing to TTS:
```typescript
function prepareForSpeech(text: string): string {
  return text
    .replace(/Would you like to know more about my owner Pavan\?[\s\S]*/i, '')
    .replace(/\[Step \d+ of \d+:[^\]]*\]/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    // ... contraction expansion, whitespace cleanup ...
    .trim()
    .slice(0, 300);
}
```

### Root Cause — Part C: Chrome 15-Second Pause Bug
Chrome's `speechSynthesis` engine silently pauses after approximately 15 seconds of continuous speech and never resumes unless explicitly told to. Long workflow step responses were hitting this limit.

**Fix:** Added a keepalive interval that calls `pause()` + `resume()` every 10 seconds while speech is active, with proper cleanup on `onend`/`onerror`:
```typescript
resumeTimer = setInterval(() => {
  if (!window.speechSynthesis.speaking) { clearResumeTimer(); return; }
  window.speechSynthesis.pause();
  window.speechSynthesis.resume();
}, 10000);
utterance.onend  = () => clearResumeTimer();
utterance.onerror = () => clearResumeTimer();
```

---

## BUG-008 — Swedish Language Detection Never Triggered

**Severity:** High — Swedish mode completely unreachable via natural input  
**File(s):** `src/utils/languageProcessor.ts`

### Symptom
Typing Swedish sentences like `"Visa mig dina projekt"` or `"Hej, vilka kompetenser har du?"` always resolved to English mode. Swedish responses were never generated.

### Root Cause
`detectLanguage()` identified Swedish by checking how many words in the input matched a closed-class function word list:
```
och|det|att|är|inte|har|med|för|på|av|kan|men|om|ett|som|vi|han|hon|ska|var|en|de|sig|sin|vad|hur
```
The threshold was `> 30%` of words with a minimum of 3 words.

A typical tech query in Swedish (`"Visa mig dina projekt"`) contains zero words from this list. Even common phrases with `har` (`"Vilka projekt har du?"` — 1/4 = 25%) fell below the threshold. The word list was purely grammatical function words and missed all content words a user would actually type.

### Resolution
Expanded the word list to include common Swedish content words and greetings used in portfolio/tech contexts, and lowered the threshold:
```typescript
/^(och|det|att|är|...|hej|jag|du|dig|din|dina|min|mina|vill|visa|
   projekt|kompetens|erfarenhet|kontakt|vilka|vilken|vilket|berätta|
   arbete|koda|kunskaper|certifikat|prestationer|färdigheter)$/i
// Threshold: words.length >= 2 && hits / words.length > 0.15
```

---

## BUG-009 — Hinglish Detection Too Narrow

**Severity:** Medium — Common Hinglish phrases not detected  
**File(s):** `src/utils/languageProcessor.ts`

### Symptom
Inputs like `"Bhai kya projects hain"`, `"Yaar batao skills kya hain"`, `"Abhi contact karo"` were classified as English instead of Hinglish.

### Root Cause
The Hinglish detection regex covered only ~22 high-frequency words and missed entire categories: casual address terms (`bhai`, `yaar`), question words (`kaisa`, `kyun`, `kab`, `kahan`), verbs (`suno`, `dekh`, `kar`), time adverbs (`abhi`, `jaldi`), and common verb forms (`ho`, `tha`, `thi`, `the`).

### Resolution
Expanded the Hinglish pattern with 30+ additional trigger words covering all missed categories:
```typescript
/\b(kya|hai|hain|...|bhai|yaar|matlab|samjha|bolna|chahiye|lagta|
    kitna|kaisa|kaun|kahan|kab|kyun|zyada|thoda|abhi|jaldi|
    suno|dekh|bata|kar|ho|tha|thi|the)\b/i
```

---

## BUG-010 — `translateResponse` Was a Near No-Op for All Non-English Modes

**Severity:** High — Multilingual responses looked and felt broken  
**File(s):** `src/utils/languageProcessor.ts`

### Symptom
Users typing in Hindi, Hinglish, or Swedish received responses that were entirely in English with only a greeting prefix added:
- Hindi: `"Namaste! My boss Pavan's key projects are..."`
- Swedish: `"Hej! My boss Pavan's key projects are..."`
- Hinglish: `"Yeh suno — My boss Pavan's key projects are..."`

### Root Cause
`translateResponse()` prepended a single greeting word and then applied 3–4 trivial word substitutions (e.g. replacing the English word `"projects"` with `"projects"` — literally a no-op for Hindi). The function never translated the Jarvis personality prefix patterns, the hire CTA, or any sentence connectors. The effective translation coverage was under 5% of the response text.

### Resolution
Rewrote `translateResponse()` with three comprehensive phrase-mapping tables — `HI_PHRASES`, `SV_PHRASES`, `HL_PHRASES` — covering all 16 Jarvis output patterns, the hire CTA, and common connectors. Applied via an ordered `applyPhrases()` loop (order matters — longer, more specific patterns run first):

**Example — Swedish mapping (excerpt):**
```typescript
[/^My boss Pavan's key projects are/i,           'Min chef Pavans viktigaste projekt är'],
[/^My boss Pavan's strongest skills include/i,   'Min chef Pavans starkaste kompetenser inkluderar'],
[/Would you like to know more about my owner Pavan\?/i, 'Vill du veta mer om min ägare Pavan?'],
[/You can hire him — he is very sharp-minded.../i, 'Du kan anlita honom — han är mycket skarpsinnad...'],
```

**Example — Hinglish mapping (excerpt):**
```typescript
[/^My boss Pavan's key projects are/i,  'Mere boss Pavan ke key projects hain'],
[/Would you like to know more.../i,     'Kya aap Pavan ke baare mein aur jaanna chahte ho?'],
[/You can hire him.../i,                'Aap unhe hire kar sakte ho — woh bahut smart hain...'],
```

---

## Summary Table

| ID      | Severity | Area               | Status   |
|---------|----------|--------------------|----------|
| BUG-001 | Critical | Build / Toolchain  | Fixed    |
| BUG-002 | Medium   | TTS / Voice        | Fixed    |
| BUG-003 | High     | Speech Recognition | Fixed    |
| BUG-004 | Low      | Chatbot UX Copy    | Fixed    |
| BUG-005 | Low      | Logic / State      | Fixed    |
| BUG-006 | Low      | Jarvis Personality | Fixed    |
| BUG-007 | Critical | TTS / Voice        | Fixed    |
| BUG-008 | High     | Language Detection | Fixed    |
| BUG-009 | Medium   | Language Detection | Fixed    |
| BUG-010 | High     | Multilingual I18n  | Fixed    |

All 10 bugs resolved. Build passing (`✓ built in ~2.3s`). No regressions introduced.
