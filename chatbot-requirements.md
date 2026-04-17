# Chatbot Requirements for Portfolio Website

## 1. Purpose
Add an interactive chatbot widget to the portfolio website to:
- let visitors ask questions about the resume, projects, skills, experience, contact, and technologies
- guide visitors through the site with a friendly cyberpunk theme
- increase engagement and make the portfolio feel modern and conversational

## 2. Recommended Architecture

### Option A: Static Q&A chatbot (recommended for portfolio)
- Use a React UI widget that matches the site theme
- Use a small in-browser knowledge base with predefined questions and answers
- No backend needed for basic portfolio Q&A
- Fast, secure, and deployable to any static host

### Option B: LLM-powered chatbot (advanced)
- Use OpenAI / Azure OpenAI / other LLM service
- Add a serverless API endpoint to keep the API key private
- Use a React frontend chat widget to send user prompts and show responses
- Better conversation flow and fallback answers, but requires backend and cost management

## 3. Required Files and Components
- `src/components/Chatbot/ChatbotWidget.tsx` — main chat UI
- `src/components/Chatbot/ChatbotLauncher.tsx` — floating button or icon launcher
- `src/data/chatbotFaq.ts` — predefined question/answer list
- `src/api/chatbot.ts` or platform serverless function — only if using LLM backend
- `src/components/Layout.tsx` — add the chat widget container near the root
- optional CSS / Tailwind classes matching the cyberpunk theme

## 4. Dependencies
### For static Q&A UI
- No new backend dependency required
- Use existing `react`, `react-dom`, `tailwindcss`

### For LLM integration
- `openai` or `@azure/openai` (if using server-side code)
- `axios` or `fetch` for API calls (browser or server)
- `react-markdown` already installed if you want formatted answer rendering

## 5. Environment Variables
### If using LLM backend
- `OPENAI_API_KEY` for serverless function
- `PUBLIC_CHATBOT_NAME` or equivalent if you want dynamic branding

> Do not expose the OpenAI API key in the browser.

## 6. Chat UI Requirements
- Floating chat button in bottom-right corner
- Neon/cyberpunk accent colors aligned with existing theme
- Smooth open/close animation
- Dark translucent modal/panel with bright highlight borders
- Input box with placeholder like: `Ask me about my work, skills, or projects...`
- Recent question suggestions or quick prompts
- Optional “Ask me anything about my portfolio” welcome message
- Mobile-friendly layout with responsive width

## 7. Deployment Requirements
### For static site deployment
- Build with `npm run build`
- Deploy to Vercel / Netlify / GitHub Pages / Cloudflare Pages
- If using static Q&A, no backend configuration required

### For LLM-backed deployment
- Deploy frontend to static host
- Deploy serverless backend to the same host or another endpoint
- Set environment variables in Vercel/Netlify/Azure
- Ensure CORS is allowed from your site if your backend is separate

## 8. Good UI Combination / Visual Style
- Keep current cyber-black and cyber-blue palette
- Use bright accent tones: neon pink, violet, electric cyan
- Use glassmorphism background with subtle blur
- Use a rounded chat bubble and soft shadow glow
- Place a small animated “pulse” button on the page corner
- Use a typed welcome line: “Hi, I’m Pavan’s AI guide — ask me about this portfolio!”

## 9. Suggested Chatbot Behavior
- Show greeting and quick topic buttons
- Accept free text queries
- Match user intent to known portfolio content
- If outside scope, answer politely: “I’m built to answer questions about this portfolio — ask me about my projects, skills, or experience.”
- Provide direct links to sections when applicable
- Offer to share contact details and GitHub links

## 10. Probable Questions and Answer Topics
### Personal / About
- Who are you?
- What do you do?
- What is your current role or focus?
- What are your strengths?
- What is your education?

### Skills and Technologies
- What technologies do you use?
- Which programming languages do you know?
- Do you work with AI or data science?
- What frontend frameworks do you use?
- What backend tools do you use?

### Projects
- What are your most important projects?
- Tell me about the Web Traffic Analyzer.
- What is your LLM red teaming framework?
- Can you explain your AI-based applications?
- Which project best shows your backend skills?

### Experience
- What experience do you have?
- Where have you worked or contributed?
- What industries have you built for?
- Do you have internship or freelance experience?
- What is your problem-solving approach?

### Achievements and Certifications
- What awards or recognitions do you have?
- Which certifications do you hold?
- Have you completed any notable courses?
- What achievement are you most proud of?
- Do you have certifications in AI or backend development?

### Contact and Hiring
- How can I contact you?
- Are you open to work?
- Can I hire you for a project?
- Where can I find your GitHub or LinkedIn?
- What is the best way to reach you?

### Website-specific Questions
- How do I use this portfolio?
- What sections are in this portfolio?
- Does this website have a contact form?
- Can I see your live demo links?
- Is this site built with React and Tailwind?

## 11. Example Questions With Recommended Answer Logic
- Q: “What can you tell me about your skills?”
  A: “I work with AI, data science, backend engineering, and frontend development. The portfolio highlights Python, JavaScript, React, FastAPI, SQL/NoSQL, and Docker.”
- Q: “What project shows your AI skills?”
  A: “The AI-based applications project is designed to show how I combine machine learning, data processing, and real-world features.”
- Q: “How can I contact you?”
  A: “You can use the contact form on the site or reach out via the email details listed in the Contact section.”
- Q: “Is this portfolio deployed?”
  A: “Yes — this portfolio is built with React and Tailwind, and it’s ready to deploy as a static site on Vercel, Netlify, or GitHub Pages.”

## 12. Implementation Checklist
- [ ] Add chat UI component to `src/components/Chatbot`
- [ ] Add chat launcher button to `src/components/Layout.tsx`
- [ ] Create knowledge-base file `src/data/chatbotFaq.ts`
- [ ] Add chat state management and local answer matching
- [ ] Optionally create `/api/chatbot` or serverless function for LLM
- [ ] Add environment configuration for deployment
- [ ] Test the chat widget on desktop and mobile
- [ ] Deploy site and verify the chatbot works

## 13. Recommended Next Step
### Minimal first version (best for portfolio)
1. Build a local React chatbot widget
2. Use hardcoded FAQ + simple keyword matching
3. Add UI that matches your existing cyberpunk style
4. Deploy as static site without any backend

### Advanced version
1. Add a serverless chat API
2. Use OpenAI / Azure OpenAI for conversational responses
3. Keep the frontend and backend on a secure hosting platform
4. Use the same visual style with quick topic buttons and dynamic replies
