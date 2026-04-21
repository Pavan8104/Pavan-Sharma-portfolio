export type LanguageMode = 'en' | 'hi' | 'sv' | 'hinglish';

export function detectLanguage(text: string): LanguageMode {
  const trimmed = text.trim();
  if (!trimmed) return 'en';

  // Devanagari script characters = definite Hindi
  const devanagari = (trimmed.match(/[\u0900-\u097F]/g) ?? []).length;
  const chars = trimmed.replace(/\s/g, '').length;
  if (devanagari > 0 && chars > 0 && devanagari / chars > 0.2) return 'hi';

  // Swedish: function words + common content words used in tech/greeting context
  const words = trimmed.split(/\s+/).filter(Boolean);
  const svHits = words.filter((w) =>
    /^(och|det|att|är|inte|har|med|för|på|av|kan|men|om|ett|som|vi|han|hon|ska|var|en|de|sig|sin|vad|hur|hej|jag|du|dig|din|dina|min|mina|vill|visa|projekt|kompetens|erfarenhet|kontakt|vilka|vilken|vilket|berätta|arbete|koda|kunskaper|certifikat|prestationer|färdigheter)$/i.test(w)
  ).length;
  if (words.length >= 2 && svHits / words.length > 0.15) return 'sv';

  // Hinglish: common Hindi words in Roman script mixed with English
  const hinglishPattern =
    /\b(kya|hai|hain|mera|tera|aur|nahi|nhi|haan|bilkul|bahut|accha|theek|karo|bolo|batao|dekho|bata|yeh|woh|main|hum|aap|tumhara|apna|isko|usko|bhai|yaar|matlab|samjha|bolna|chahiye|lagta|kitna|kaisa|kaun|kahan|kab|kyun|zyada|thoda|abhi|jaldi|suno|dekh|bata|kar|ho|tha|thi|the)\b/i;
  if (hinglishPattern.test(trimmed)) return 'hinglish';

  return 'en';
}

const hindiPhrases: Record<string, string> = {
  '\btumne kya banaya hai\b': 'projects built',
  '\bkya banaya\b': 'projects built',
  '\bkaun ho tum\b': 'about',
  '\bcontact\b': 'contact',
  '\bemail\b': 'contact',
  '\bgithub\b': 'github',
  '\blinkedin\b': 'linkedin',
  '\bskills\b': 'skills',
  '\bexperience\b': 'experience',
  '\bcertifications\b': 'certifications',
  '\bachievements\b': 'achievements',
};

const swedishPhrases: Record<string, string> = {
  '\bvilka projekt\b': 'projects',
  '\bprojekt\b': 'projects',
  '\bkompetenser\b': 'skills',
  '\berfarenhet\b': 'experience',
  '\bkontakt\b': 'contact',
  '\bgithub\b': 'github',
  '\blinkedin\b': 'linkedin',
  '\bcertifieringar\b': 'certifications',
  '\bprestationer\b': 'achievements',
};

const hinglishPhrases: Record<string, string> = {
  '\btumne kya banaya hai\b': 'projects built',
  '\bkaun ho tum\b': 'about',
  '\bcontact\b': 'contact',
  '\bgithub\b': 'github',
  '\blinkedin\b': 'linkedin',
  '\bskills\b': 'skills',
  '\bexperience\b': 'experience',
  '\bcertifications\b': 'certifications',
  '\bachievements\b': 'achievements',
};

export function normalizeQuery(query: string) {
  let normalized = query.trim().toLowerCase();
  normalized = normalized.replace(/[?!.]/g, '');
  normalized = normalized.replace(/\s+/g, ' ');

  Object.entries(hindiPhrases).forEach(([pattern, replacement]) => {
    normalized = normalized.replace(new RegExp(pattern, 'gi'), replacement);
  });

  Object.entries(swedishPhrases).forEach(([pattern, replacement]) => {
    normalized = normalized.replace(new RegExp(pattern, 'gi'), replacement);
  });

  Object.entries(hinglishPhrases).forEach(([pattern, replacement]) => {
    normalized = normalized.replace(new RegExp(pattern, 'gi'), replacement);
  });

  normalized = normalized
    .replace(/\btum(ne)?\b/g, '')
    .replace(/\baap\b/g, '')
    .replace(/\bkya\b/g, '')
    .replace(/\bhai\b/g, '')
    .replace(/\bmera\b/g, 'my')
    .replace(/\bke baare mein\b/g, 'about')
    .replace(/\bkaun\b/g, 'who')
    .replace(/\bkar rahe ho\b/g, 'doing')
    .replace(/\bkaam\b/g, 'work')
    .replace(/\bbanaya\b/g, 'built');

  return normalized.trim();
}

const HI_PHRASES: [RegExp, string][] = [
  [/^My boss Pavan's key projects are/i, 'Mere boss Pavan ke key projects hain'],
  [/^My boss Pavan's top featured projects include/i, 'Mere boss Pavan ke top featured projects hain'],
  [/^My boss Pavan's top/i, 'Mere boss Pavan ke top'],
  [/^My boss Pavan's strongest skills include/i, 'Mere boss Pavan ki strongest skills hain'],
  [/^My boss Pavan maintains/i, 'Mere boss Pavan ke paas expertise hai'],
  [/^My boss Pavan holds certifications/i, 'Mere boss Pavan ke paas certifications hain'],
  [/^My boss Pavan has earned/i, 'Mere boss Pavan ne haasil kiya hai'],
  [/^My boss Pavan's experience/i, 'Mere boss Pavan ka experience'],
  [/^My boss Pavan's top achievements include/i, 'Mere boss Pavan ki top achievements hain'],
  [/^My boss Pavan can be reached/i, 'Mere boss Pavan se contact karo'],
  [/^My boss Pavan's work can be explored/i, 'Mere boss Pavan ka kaam dekho'],
  [/^My boss Pavan's portfolio highlights/i, 'Mere boss Pavan ka portfolio dikhata hai'],
  [/^My boss Pavan's portfolio/i, 'Mere boss Pavan ka portfolio'],
  [/^My boss Pavan's certifications include/i, 'Mere boss Pavan ke certifications hain'],
  [/^My boss Pavan's assistant is fully briefed\./i, 'Mere boss Pavan ka assistant ready hai.'],
  [/^My boss Pavan's assistant reports:/i, 'Mere boss Pavan ka assistant bata raha hai:'],
  [/Would you like to know more about my owner Pavan\?/i, 'Kya aap mere boss Pavan ke baare mein aur jaanna chahte hain?'],
  [/You can hire him — he is very sharp-minded and has strong technical skills\./i, 'Aap unhe hire kar sakte hain — woh bahut sharp-minded hain aur strong technical skills rakhte hain.'],
  [/\bTech stack:/gi, 'Tech stack:'],
  [/\bYou can access\b/gi, 'Aap access kar sakte hain'],
  [/\bFurther details are available across all portfolio sections\./gi, 'Aur details saare portfolio sections mein available hain.'],
  [/\band\b/gi, 'aur'],
  [/\bor\b/gi, 'ya'],
  [/\bvery\b/gi, 'bahut'],
];

const SV_PHRASES: [RegExp, string][] = [
  [/^My boss Pavan's key projects are/i, 'Min chef Pavans viktigaste projekt är'],
  [/^My boss Pavan's top featured projects include/i, 'Min chef Pavans topprojekt inkluderar'],
  [/^My boss Pavan's top/i, 'Min chef Pavans topp'],
  [/^My boss Pavan's strongest skills include/i, 'Min chef Pavans starkaste kompetenser inkluderar'],
  [/^My boss Pavan maintains/i, 'Min chef Pavan har bred expertis inom'],
  [/^My boss Pavan holds certifications/i, 'Min chef Pavan har certifieringar'],
  [/^My boss Pavan has earned/i, 'Min chef Pavan har erhållit'],
  [/^My boss Pavan's experience/i, 'Min chef Pavans erfarenhet'],
  [/^My boss Pavan's top achievements include/i, 'Min chef Pavans främsta prestationer inkluderar'],
  [/^My boss Pavan can be reached/i, 'Min chef Pavan kan nås'],
  [/^My boss Pavan's work can be explored/i, 'Min chef Pavans arbete kan utforskas'],
  [/^My boss Pavan's portfolio highlights/i, 'Min chef Pavans portfolio belyser'],
  [/^My boss Pavan's portfolio/i, 'Min chef Pavans portfolio'],
  [/^My boss Pavan's certifications include/i, 'Min chef Pavans certifieringar inkluderar'],
  [/^My boss Pavan's assistant is fully briefed\./i, 'Min chef Pavans assistent är fullt informerad.'],
  [/^My boss Pavan's assistant reports:/i, 'Min chef Pavans assistent rapporterar:'],
  [/Would you like to know more about my owner Pavan\?/i, 'Vill du veta mer om min ägare Pavan?'],
  [/You can hire him — he is very sharp-minded and has strong technical skills\./i, 'Du kan anlita honom — han är mycket skarpsinnad och har starka tekniska färdigheter.'],
  [/\bTech stack:/gi, 'Teknikstack:'],
  [/\bYou can access\b/gi, 'Du kan komma åt'],
  [/\bFurther details are available across all portfolio sections\./gi, 'Ytterligare detaljer finns i alla portfoliosektioner.'],
  [/\bprojects\b/gi, 'projekt'],
  [/\bskills\b/gi, 'kompetenser'],
  [/\bexperience\b/gi, 'erfarenhet'],
  [/\bcontact\b/gi, 'kontakt'],
  [/\bcertifications\b/gi, 'certifieringar'],
  [/\bachievements\b/gi, 'prestationer'],
  [/\band\b/gi, 'och'],
  [/\bor\b/gi, 'eller'],
];

const HL_PHRASES: [RegExp, string][] = [
  [/^My boss Pavan's key projects are/i, 'Mere boss Pavan ke key projects hain'],
  [/^My boss Pavan's top featured projects include/i, 'Mere boss Pavan ke top projects mein'],
  [/^My boss Pavan's top/i, 'Mere boss Pavan ke top'],
  [/^My boss Pavan's strongest skills include/i, 'Mere boss Pavan ki strongest skills hain'],
  [/^My boss Pavan maintains/i, 'Mere boss Pavan ke paas'],
  [/^My boss Pavan holds certifications/i, 'Mere boss Pavan ke paas certifications hain'],
  [/^My boss Pavan has earned/i, 'Mere boss Pavan ne earn kiya hai'],
  [/^My boss Pavan's experience/i, 'Mere boss Pavan ka experience'],
  [/^My boss Pavan's top achievements include/i, 'Mere boss Pavan ki top achievements mein'],
  [/^My boss Pavan can be reached/i, 'Mere boss Pavan ko contact karo'],
  [/^My boss Pavan's work can be explored/i, 'Mere boss Pavan ka kaam dekho'],
  [/^My boss Pavan's portfolio/i, 'Mere boss Pavan ka portfolio'],
  [/^My boss Pavan's assistant is fully briefed\./i, 'Mere boss Pavan ka assistant bilkul ready hai.'],
  [/^My boss Pavan's assistant reports:/i, 'Mere boss Pavan ka assistant bolta hai:'],
  [/Would you like to know more about my owner Pavan\?/i, 'Kya aap Pavan ke baare mein aur jaanna chahte ho?'],
  [/You can hire him — he is very sharp-minded and has strong technical skills\./i, 'Aap unhe hire kar sakte ho — woh bahut smart hain aur technically bahut strong hain.'],
  [/\bvery\b/gi, 'bahut'],
  [/\band\b/gi, 'aur'],
  [/\bor\b/gi, 'ya'],
];

function applyPhrases(text: string, phrases: [RegExp, string][]): string {
  let result = text;
  for (const [pattern, replacement] of phrases) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

export function translateResponse(text: string, mode: LanguageMode): string {
  if (mode === 'en') return text;
  if (mode === 'hi') return applyPhrases(text, HI_PHRASES);
  if (mode === 'sv') return applyPhrases(text, SV_PHRASES);
  if (mode === 'hinglish') return applyPhrases(text, HL_PHRASES);
  return text;
}
