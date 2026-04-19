import { projects } from '../data/projects';
import { skills } from '../data/skills';
import { experiences } from '../data/experience';
import { certifications } from '../data/certifications';
import { achievements } from '../data/achievements';
import { blogPosts } from '../data/blog';
import { normalizeQuery, translateResponse, type LanguageMode } from './languageProcessor';
import { detectEmotion, type Emotion } from './emotionVoice';
import { applyJarvisPersonality } from './jarvisPersonality';

export type Intent = 'projects' | 'skills' | 'experience' | 'contact' | 'achievements' | 'social' | 'certifications' | 'about' | 'general';

export interface KnowledgeLink {
  label: string;
  url: string;
}

export interface KnowledgeItem {
  id: string;
  category: Intent | 'blog';
  title: string;
  description: string;
  keywords: string[];
  synonyms: string[];
  techStack: string[];
  links: KnowledgeLink[];
  sectionId: string;
}

export interface SearchResult {
  item: KnowledgeItem;
  score: number;
}

export interface ConversationContext {
  lastIntent: Intent;
  lastResults: SearchResult[];
  lastQuery: string;
}

export interface NavigationAction {
  sectionId?: string;
  projectName?: string;
  url?: string;
}

export interface QueryResponse {
  response: string;
  emotion: Emotion;
  suggestions: string[];
  intent: Intent;
  results: SearchResult[];
  action: NavigationAction | null;
  links: KnowledgeLink[];
}

const synonymMap: Record<Intent | 'general', string[]> = {
  projects: ['project', 'projects', 'work', 'build', 'apps', 'systems', 'demo', 'live', 'portfolio'],
  skills: ['skills', 'skill', 'tech', 'stack', 'tools', 'languages', 'frameworks', 'expertise'],
  experience: ['experience', 'intern', 'role', 'work', 'education', 'career', 'job', 'history'],
  contact: ['contact', 'email', 'reach', 'connect', 'message', 'hire', 'talk', 'chat'],
  achievements: ['achievement', 'award', 'certificate', 'certification', 'recognition', 'hackathon', 'research'],
  social: ['github', 'linkedin', 'social', 'profile', 'network'],
  certifications: ['certification', 'certifications', 'course', 'credential', 'badge'],
  about: ['about', 'who', 'story', 'background'],
  general: ['help', 'overview', 'info', 'summary', 'guide'],
};

const sectionMap: Record<Intent, string> = {
  projects: 'projects',
  skills: 'toolbox',
  experience: 'experience',
  contact: 'contact',
  achievements: 'achievements',
  social: 'contact',
  certifications: 'certifications',
  about: 'projects',
  general: 'projects',
};

export function getPortfolioContext() {
  return {
    projects,
    skills,
    experiences,
    certifications,
    achievements,
    blogPosts,
    contact: {
      email: 'ps3297169@gmail.com',
      github: 'https://github.com/Pavan8104',
      linkedin: 'https://www.linkedin.com/in/pavan-sharma-1645ab276/',
      resume: '/resume.pdf',
    },
  };
}

export function buildKnowledgeBase(): KnowledgeItem[] {
  const base: KnowledgeItem[] = [];

  projects.forEach((project) => {
    const keywords = [project.title, ...(project.tags ?? []), project.description ?? '', 'project', 'demo', 'live'];
    const links: KnowledgeLink[] = [];
    if (project.live) links.push({ label: 'Live demo', url: project.live });
    if (project.github) links.push({ label: 'GitHub', url: project.github });

    base.push({
      id: `project-${project.id}`,
      category: 'projects',
      title: project.title,
      description: project.description ?? 'A standout portfolio project with strong execution.',
      keywords,
      synonyms: [project.title.toLowerCase(), ...project.tags.map((tag) => tag.toLowerCase())],
      techStack: project.tags,
      links,
      sectionId: 'projects',
    });
  });

  skills.forEach((skill) => {
    base.push({
      id: `skill-${skill.name}`,
      category: 'skills',
      title: skill.name,
      description: `Strong proficiency in ${skill.name} within modern engineering workflows.`,
      keywords: [skill.name, skill.category, 'skill', 'technology', 'tool'],
      synonyms: [skill.name.toLowerCase(), skill.category.toLowerCase()],
      techStack: [skill.name],
      links: [],
      sectionId: 'toolbox',
    });
  });

  experiences.forEach((experience) => {
    base.push({
      id: `experience-${experience.id}`,
      category: 'experience',
      title: `${experience.role} at ${experience.company}`,
      description: experience.description,
      keywords: [experience.role, experience.company, experience.period, ...experience.tech],
      synonyms: [experience.role.toLowerCase(), experience.company.toLowerCase(), experience.type],
      techStack: experience.tech,
      links: experience.linkedin ? [{ label: 'LinkedIn post', url: experience.linkedin }] : [],
      sectionId: 'experience',
    });
  });

  certifications.forEach((cert) => {
    base.push({
      id: `cert-${cert.id}`,
      category: 'certifications',
      title: cert.title,
      description: `${cert.title} certification in ${cert.category}.`,
      keywords: [cert.title, cert.category, 'certification', 'certificate', 'credential'],
      synonyms: [cert.title.toLowerCase(), cert.category.toLowerCase()],
      techStack: [cert.category],
      links: cert.link ? [{ label: 'Certificate link', url: cert.link }] : [],
      sectionId: 'certifications',
    });
  });

  achievements.forEach((achievement) => {
    base.push({
      id: `achievement-${achievement.id}`,
      category: 'achievements',
      title: achievement.title,
      description: achievement.description ?? achievement.title,
      keywords: [achievement.title, achievement.category, 'achievement', 'award', 'recognition'],
      synonyms: [achievement.title.toLowerCase(), achievement.category.toLowerCase()],
      techStack: [achievement.category],
      links: achievement.link ? [{ label: 'Achievement link', url: achievement.link }] : [],
      sectionId: 'achievements',
    });
  });

  base.push({
    id: 'contact-email',
    category: 'contact',
    title: 'Email contact',
    description: 'Reach out using the portfolio contact form or email.',
    keywords: ['email', 'contact', 'message', 'reach', 'hire'],
    synonyms: ['email', 'contact', 'reach'],
    techStack: [],
    links: [{ label: 'Email me', url: 'mailto:ps3297169@gmail.com' }],
    sectionId: 'contact',
  });

  base.push({
    id: 'contact-github',
    category: 'social',
    title: 'GitHub profile',
    description: "Browse the developer's GitHub repository collection.",
    keywords: ['github', 'code', 'repositories', 'projects'],
    synonyms: ['github', 'repo', 'repository'],
    techStack: ['GitHub'],
    links: [{ label: 'GitHub', url: 'https://github.com/Pavan8104' }],
    sectionId: 'contact',
  });

  base.push({
    id: 'contact-linkedin',
    category: 'social',
    title: 'LinkedIn profile',
    description: 'Connect on LinkedIn for professional collaboration and hiring.',
    keywords: ['linkedin', 'network', 'connect', 'profile'],
    synonyms: ['linkedin', 'profile', 'network'],
    techStack: ['LinkedIn'],
    links: [{ label: 'LinkedIn', url: 'https://www.linkedin.com/in/pavan-sharma-1645ab276/' }],
    sectionId: 'contact',
  });

  return base;
}

const knowledgeBase = buildKnowledgeBase();

function expandQuery(query: string) {
  const segments = query.split(/\s+/).filter(Boolean);
  const extras = new Set<string>(segments);

  Object.entries(synonymMap).forEach(([intent, synonyms]) => {
    synonyms.forEach((syn) => {
      if (segments.includes(syn)) {
        extras.add(intent);
        synonyms.forEach((alias) => extras.add(alias));
      }
    });
  });

  return Array.from(extras);
}

function scoreItem(item: KnowledgeItem, query: string) {
  const normalized = query.toLowerCase();
  let score = 0;

  if (item.title.toLowerCase().includes(normalized)) score += 20;
  if (item.description.toLowerCase().includes(normalized)) score += 10;

  item.keywords.forEach((keyword) => {
    if (normalized.includes(keyword.toLowerCase())) score += 6;
  });

  item.synonyms.forEach((synonym) => {
    if (normalized.includes(synonym.toLowerCase())) score += 4;
  });

  item.techStack.forEach((stack) => {
    if (normalized.includes(stack.toLowerCase())) score += 3;
  });

  const tokens = normalized.split(/\s+/).filter(Boolean);
  tokens.forEach((token) => {
    if (item.title.toLowerCase().includes(token)) score += 2;
    if (item.description.toLowerCase().includes(token)) score += 1;
  });

  if (item.category === 'projects' && /\b(project|demo|build|app|website|live)\b/.test(normalized)) score += 3;
  if (item.category === 'skills' && /\b(skill|tech|stack|language|tool|framework)\b/.test(normalized)) score += 3;

  return score;
}

export function searchKnowledgeBase(query: string) {
  const normalized = normalizeQuery(query);
  const expanded = expandQuery(normalized).join(' ');

  return knowledgeBase
    .map((item) => ({ item, score: scoreItem(item, expanded) }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
}

function inferIntent(query: string): Intent {
  const normalized = normalizeQuery(query);

  const intentScore: Record<Intent, number> = {
    projects: 0,
    skills: 0,
    experience: 0,
    contact: 0,
    achievements: 0,
    social: 0,
    certifications: 0,
    about: 0,
    general: 0,
  };

  const tokens = normalized.split(/\s+/).filter(Boolean);
  tokens.forEach((token) => {
    Object.entries(synonymMap).forEach(([intent, synonyms]) => {
      if (synonyms.includes(token)) {
        intentScore[intent as Intent] += 2;
      }
    });
  });

  if (/\b(github|linkedin|social|profile|network)\b/.test(normalized)) intentScore.social += 5;
  if (/\b(email|mailto|contact|reach|hire)\b/.test(normalized)) intentScore.contact += 5;
  if (/\b(certification|award|achievement|hackathon|research)\b/.test(normalized)) intentScore.achievements += 4;
  if (/\b(certification|course|credential)\b/.test(normalized)) intentScore.certifications += 4;
  if (/\b(about|who|story|background)\b/.test(normalized)) intentScore.about += 3;

  const winner = Object.entries(intentScore).sort((a, b) => b[1] - a[1])[0];
  if (winner[1] === 0) return 'general';
  return winner[0] as Intent;
}

function getContextualItem(query: string, context: ConversationContext): KnowledgeItem | null {
  const normalized = normalizeQuery(query);
  if (!context.lastResults.length) return null;

  if (/\b(first|1st|one)\b/.test(normalized)) return context.lastResults[0]?.item || null;
  if (/\b(second|2nd|two)\b/.test(normalized)) return context.lastResults[1]?.item || null;
  if (/\b(third|3rd|three)\b/.test(normalized)) return context.lastResults[2]?.item || null;
  if (/\b(this project|that project|this one|that one|same project|that app)\b/.test(normalized)) {
    return context.lastResults[0]?.item || null;
  }
  if (/\b(tell more|explain more|details|more about)\b/.test(normalized)) {
    return context.lastResults[0]?.item || null;
  }

  return null;
}

function formatItemDetails(item: KnowledgeItem) {
  const base = `${item.title}: ${item.description}`;
  const stack = item.techStack.length ? ` Tech stack: ${item.techStack.join(', ')}.` : '';
  const links = item.links.length ? ` You can access ${item.links.map((link) => link.label).join(' or ')}.` : '';
  return `${base}${stack}${links}`;
}

function getSuggestedQuestions(intent: Intent, results: SearchResult[]) {
  const common = {
    projects: ['Explain this project', 'What tech stack was used?', 'Show GitHub'],
    skills: ['Which technologies are strongest?', 'Tell me about backend skills', 'What tools do you use?'],
    experience: ['Describe your current role', 'Which internships were most important?', 'What strengths do you bring?'],
    contact: ['How can I email you?', 'Open GitHub profile', 'Connect on LinkedIn'],
    achievements: ['Which awards are top?', 'Tell me about certifications', 'What are you most proud of?'],
    social: ['Show GitHub', 'Open LinkedIn', 'How can I connect?'],
    certifications: ['Which certifications do you have?', 'What courses have you completed?', 'Tell me about credentials'],
    about: ['What is this portfolio about?', 'Who is the developer?', 'How can I explore your work?'],
    general: ['Show projects in this portfolio', 'What skills do you have?', 'How can I contact you?'],
  };

  if (results.length) {
    const top = results[0].item;
    if (top.category === 'projects') {
      const hasLive = top.links.some((l) => l.label === 'Live demo');
      const hasGithub = top.links.some((l) => l.label === 'GitHub');
      const suggestions = [`Tell me more about ${top.title}`];
      if (hasGithub) suggestions.push('Show GitHub repo');
      if (hasLive) suggestions.push('View live demo');
      if (!hasLive && !hasGithub) suggestions.push('What tech stack was used?');
      suggestions.push('Show other projects');
      return suggestions.slice(0, 3);
    }
    if (top.category === 'experience') {
      return [`More about ${top.title}`, 'What skills were used?', 'Show other roles'];
    }
    if (top.category === 'certifications') {
      return [`Details on ${top.title}`, 'Show all certifications', 'What skills relate to this?'];
    }
    if (top.category === 'achievements') {
      return [`Tell me more about ${top.title}`, 'Show all achievements', 'What certifications do you have?'];
    }
  }

  return common[intent] || common.general;
}

function buildResponse(intent: Intent, results: SearchResult[], query: string, context: ConversationContext): { text: string; links: KnowledgeLink[] } {
  const primary = getContextualItem(query, context) || results[0]?.item;
  const links = primary?.links ?? [];
  const safeTitle = primary ? `${primary.title}` : '';

  if (primary && /\b(explain|details|tell me more|describe)\b/.test(normalizeQuery(query))) {
    return { text: `${formatItemDetails(primary)} I can tell you more if you want to explore other portfolio items.`, links };
  }

  switch (intent) {
    case 'projects': {
      if (!results.length) {
        return { text: 'My portfolio features multiple projects with live demos and GitHub links. Ask for a specific project or request the live section to explore everything.', links: [] };
      }
      const featuredProjects = projects.filter((project) => project.featured).slice(0, 3).map((project) => project.title).join(', ');
      if (/\b(top|best|featured|recommend|main|leading|popular)\b/.test(normalizeQuery(query))) {
        return {
          text: `My top featured projects include ${featuredProjects}. ${formatItemDetails(results[0].item)}`,
          links,
        };
      }
      const titles = results.slice(0, 3).map((result) => result.item.title).join(', ');
      return {
        text: `Let me walk you through some of my key projects: ${titles}. ${formatItemDetails(results[0].item)}`,
        links,
      };
    }
    case 'skills': {
      if (!results.length) {
        return { text: 'I maintain broad expertise across AI, data science, backend, and frontend technologies, including Python, C++, Java, and React.', links: [] };
      }
      const skillNames = results.slice(0, 4).map((result) => result.item.title).join(', ');
      return {
        text: `My strongest skills include ${skillNames}. ${results[0].item.description}`,
        links,
      };
    }
    case 'experience': {
      if (!results.length) {
        return { text: 'The portfolio highlights internships and current academic experience in engineering, leadership, and applied development.', links: [] };
      }
      return {
        text: `Here is the experience I bring: ${formatItemDetails(results[0].item)}`,
        links,
      };
    }
    case 'achievements': {
      if (!results.length) {
        return { text: "I've earned awards and certifications in cybersecurity, cloud computing, and hackathon performance.", links: [] };
      }
      const achievementList = results.slice(0, 3).map((result) => result.item.title).join(', ');
      return {
        text: `Top achievements include ${achievementList}. ${results[0].item.description}`,
        links,
      };
    }
    case 'certifications': {
      if (!results.length) {
        return { text: 'Certifications include AWS Solution Architect and database/data science programs, with a strong focus on practical cloud and security.', links: [] };
      }
      return {
        text: `I hold certifications such as ${results.slice(0, 3).map((result) => result.item.title).join(', ')}. ${results[0].item.description}`,
        links,
      };
    }
    case 'contact': {
      return {
        text: "You can reach me via the portfolio contact form, email, GitHub, or LinkedIn. I'll keep the channel open for professional inquiries.",
        links: [
          { label: 'Email', url: 'mailto:ps3297169@gmail.com' },
          { label: 'GitHub', url: 'https://github.com/Pavan8104' },
          { label: 'LinkedIn', url: 'https://www.linkedin.com/in/pavan-sharma-1645ab276/' },
        ],
      };
    }
    case 'social': {
      return {
        text: 'You can explore my work on GitHub or connect professionally on LinkedIn. I keep both up to date with portfolio and project details.',
        links: [
          { label: 'GitHub', url: 'https://github.com/Pavan8104' },
          { label: 'LinkedIn', url: 'https://www.linkedin.com/in/pavan-sharma-1645ab276/' },
        ],
      };
    }
    case 'about': {
      return {
        text: 'This portfolio is designed to present my work as a cyberpunk-themed AI and engineering professional. It includes projects, experience, certifications, and contact options.',
        links: [],
      };
    }
    default: {
      return {
        text: 'I understand this portfolio well. Ask about projects, skills, experience, achievements, or how to contact the developer for a confident walkthrough.',
        links: [],
      };
    }
  }
}

function createNavigationAction(intent: Intent, query: string, results: SearchResult[]) {
  const normalized = normalizeQuery(query);
  const target = results[0]?.item;

  if (/\bgithub\b/.test(normalized)) {
    return { sectionId: 'contact', url: 'https://github.com/Pavan8104' };
  }
  if (/\blinkedin\b/.test(normalized)) {
    return { sectionId: 'contact', url: 'https://www.linkedin.com/in/pavan-sharma-1645ab276/' };
  }
  if (/\bemail\b|\bmailto\b|\bcontact\b/.test(normalized)) {
    return { sectionId: 'contact', url: 'mailto:ps3297169@gmail.com' };
  }

  if (target?.sectionId) {
    return {
      sectionId: target.sectionId,
      projectName: target.category === 'projects' ? target.title : undefined,
    };
  }

  return { sectionId: sectionMap[intent] || 'projects' };
}

export function handleUserQuery(query: string, languageMode: LanguageMode, context: ConversationContext): QueryResponse {
  const normalized = normalizeQuery(query);
  const intent = inferIntent(normalized);
  const results = searchKnowledgeBase(normalized);
  const { text, links } = buildResponse(intent, results, normalized, context);
  const jarvisText = applyJarvisPersonality(text);
  const translated = translateResponse(jarvisText, languageMode);
  const suggestions = getSuggestedQuestions(intent, results);
  const action = createNavigationAction(intent, normalized, results);
  const emotion = detectEmotion(text);

  return {
    response: translated,
    emotion,
    suggestions,
    intent,
    results,
    action,
    links,
  };
}
