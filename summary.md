# Portfolio Project Summary

## Project Name
Cyberpunk Portfolio Website

## Overview
This project is a personal portfolio website built with React, TypeScript, and Tailwind CSS. It showcases the developer's skills, projects, experience, certifications, blog posts, and contact methods in a polished cyberpunk-themed interface.

## Key Technologies
- React 19
- TypeScript
- Tailwind CSS
- Vite
- Three.js
- Framer Motion
- Zustand
- React Markdown

## Core Features
- Animated landing experience with boot screen and starfield background
- Responsive portfolio sections for hero, projects, experience, achievements, certifications, toolbox, blog, and contact
- Scroll progress indicator and smooth scroll-to-top control
- Interactive UI effects like glitch text, matrix rain, scanlines, and holographic shaders
- Contact form integrated with EmailJS
- Clean component structure with lazy-loaded background effects

## UI and Design
- Dark cyberpunk aesthetic with neon blue, pink, and glassmorphism elements
- Floating navigation and full-screen overlay functionality
- Modular section components for easy maintenance and extension
- Mobile-friendly layout with adaptive sections and interactive controls

## Data and Content
- Projects, skills, experience, achievements, certifications, and blog content are stored in structured TypeScript data files
- Live project links and GitHub repository links are integrated via project data
- Site content is driven from reusable components and theme-aware styling

## Notable Project Files
- `src/App.tsx` — main app entry rendering `Layout`
- `src/main.tsx` — app bootstrap and root rendering
- `src/components/Layout.tsx` — central layout and app state handling
- `src/components/BootScreen.tsx` — initial animated load screen
- `src/components/Navbar.tsx` — navigation and top controls
- `src/components/Hero/HeroSection.tsx` — hero section with main introduction and actions
- `src/components/Projects/ProjectsSection.tsx` — project cards and live links
- `src/components/Contact/ContactSection.tsx` — contact form and details
- `src/data/projects.ts` — portfolio projects data
- `src/stores/appStore.ts` — Zustand state management for app behavior

## Deployment
- The project is built for static deployment using Vite
- Recommended hosts: Vercel, Netlify, GitHub Pages, Cloudflare Pages
- Build commands:
  - `npm install`
  - `npm run build`
  - `npm run preview`

## Additional Notes
- The website is configured as a modern personal portfolio suitable for AI, data science, backend, and frontend developer branding.
- The design emphasizes interactivity, visual storytelling, and engaging project presentation.
- New features like a chatbot widget or LLM integration can be added cleanly by extending the existing component structure.
