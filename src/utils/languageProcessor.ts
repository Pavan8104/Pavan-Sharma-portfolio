export type LanguageMode = 'en' | 'hi' | 'sv' | 'hinglish';

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
