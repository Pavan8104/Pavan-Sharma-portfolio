export const HIRE_CTA =
  "Would you like to know more about my owner Pavan? You can hire him — he is very sharp-minded and has strong technical skills.";

export function transformToJarvisPrefix(text: string): string {
  return text
    .replace(/^My portfolio\b/i, "My boss Pavan's portfolio")
    .replace(/^My top\b/i, "My boss Pavan's top")
    .replace(/^My strongest\b/i, "My boss Pavan's strongest")
    .replace(/^Let me walk you through some of my key projects/i, "My boss Pavan's key projects are")
    .replace(/^I maintain\b/i, "My boss Pavan maintains")
    .replace(/^I hold certifications\b/i, "My boss Pavan holds certifications")
    .replace(/^I've earned\b/i, "My boss Pavan has earned")
    .replace(/^Here is the experience I bring/i, "My boss Pavan's experience")
    .replace(/^Top achievements include\b/i, "My boss Pavan's top achievements include")
    .replace(/^You can reach me\b/i, "My boss Pavan can be reached")
    .replace(/^You can explore my work\b/i, "My boss Pavan's work can be explored")
    .replace(/^This portfolio\b/i, "My boss Pavan's portfolio")
    .replace(/^The portfolio highlights\b/i, "My boss Pavan's portfolio highlights")
    .replace(/^Certifications include\b/i, "My boss Pavan's certifications include")
    .replace(/^I understand this portfolio\b/i, "My boss Pavan's assistant is ready to guide you")
    .replace(
      /\. I can tell you more if you want to explore other portfolio items\./i,
      ". Further details are available across all portfolio sections."
    );
}

export function applyJarvisPersonality(text: string): string {
  const transformed = transformToJarvisPrefix(text);
  const body = /^My boss Pavan/i.test(transformed)
    ? transformed
    : "My boss Pavan's assistant reports: " + transformed;
  return body + "\n\n" + HIRE_CTA;
}
