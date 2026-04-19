export type LanguageMode = 'en' | 'hi' | 'sv' | 'hinglish';

export function detectLanguage(text: string): LanguageMode {
  const trimmed = text.trim();
  if (!trimmed) return 'en';

  // Devanagari script characters = definite Hindi
  const devanagari = (trimmed.match(/[\u0900-\u097F]/g) ?? []).length;
  const chars = trimmed.replace(/\s/g, '').length;
  if (devanagari > 0 && chars > 0 && devanagari / chars > 0.2) return 'hi';

  // Swedish high-frequency closed-class words
  const words = trimmed.split(/\s+/).filter(Boolean);
  const svHits = words.filter((w) =>
    /^(och|det|att|är|inte|har|med|för|på|av|kan|men|om|ett|som|vi|han|hon|ska|var|en|de|sig|sin|vad|hur)$/i.test(w)
  ).length;
  if (words.length >= 3 && svHits / words.length > 0.3) return 'sv';

  // Hinglish: common Hindi words in Roman script mixed with English
  const hinglishPattern =
    /\b(kya|hai|mera|tera|aur|nahi|haan|bilkul|bahut|accha|theek|karo|bolo|batao|dekho|bata|yeh|woh|main|hum|aap|tumhara|apna|isko|usko)\b/i;
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

export function translateResponse(text: string, mode: LanguageMode) {
  if (mode === 'en') return text;

  if (mode === 'hi') {
    let response = `Namaste! ${text}`;
    response = response.replace(/\bprojects\b/gi, 'projects');
    response = response.replace(/\bskills\b/gi, 'skills');
    response = response.replace(/\bexperience\b/gi, 'experience');
    response = response.replace(/\bcontact\b/gi, 'contact');
    response = response.replace(/\bagain\b/gi, 'phir se');
    return response;
  }

  if (mode === 'sv') {
    let response = `Hej! ${text}`;
    response = response.replace(/\bprojects\b/gi, 'projekt');
    response = response.replace(/\bskills\b/gi, 'kompetenser');
    response = response.replace(/\bexperience\b/gi, 'erfarenhet');
    response = response.replace(/\bcontact\b/gi, 'kontakt');
    return response;
  }

  if (mode === 'hinglish') {
    let response = `Yeh suno — ${text}`;
    response = response.replace(/\bprojects\b/gi, 'projects');
    response = response.replace(/\bskills\b/gi, 'skills');
    response = response.replace(/\bexperience\b/gi, 'experience');
    response = response.replace(/\bcontact\b/gi, 'contact');
    response = response.replace(/\band\b/gi, 'aur');
    response = response.replace(/\bvery\b/gi, 'bahut');
    return response;
  }

  return text;
}
