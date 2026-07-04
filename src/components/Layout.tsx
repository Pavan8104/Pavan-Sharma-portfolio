'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ChatProvider } from '../store/ChatContext';
import { useAppStore } from '../stores/appStore';
import BootScreen from './BootScreen';
import Navbar from './Navbar';
import ScanLines from './effects/ScanLines';
import SectionDivider from './effects/SectionDivider';
import ScrollProgress from './effects/ScrollProgress';
import HeroSection from './Hero/HeroSection';
import AboutSection from './AboutMe/AboutSection';
import ProjectsSection from './Projects/ProjectsSection';
import ExperienceSection from './Experience/ExperienceSection';
import AchievementsSection from './Achievements/AchievementsSection';
import CertificationsSection from './Certifications/CertificationsSection';
import BlogSection from './Blog/BlogSection';
import ToolboxSection from './Toolbox/ToolboxSection';
import ContactSection from './Contact/ContactSection';
import StatsCounter from './effects/StatsCounter';

// Browser-only (Three.js / Web Speech / localStorage) — skipped during static prerender
const StarfieldBackground = dynamic(() => import('./effects/StarfieldBackground'), { ssr: false });
const Chatbot = dynamic(() => import('./Chatbot/Chatbot'), { ssr: false });

export default function Layout() {
  const { booted, showAbout, scrollLocked, setBoot, setShowAbout, setScrollLocked } =
    useAppStore();

  const handleHackClick = () => {
    setShowAbout(true);
    setScrollLocked(true);
  };

  const handleEscape = () => {
    setShowAbout(false);
    setScrollLocked(false);
  };

  // Lock/unlock scroll (also locked while the boot screen covers the page)
  useEffect(() => {
    document.body.style.overflow = scrollLocked || !booted ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [scrollLocked, booted]);

  return (
    <div className="min-h-screen bg-cyber-black text-cyber-blue relative">
      {/* Boot Screen */}
      {!booted && <BootScreen onComplete={() => {
        setBoot(true);
        // User has interacted via boot screen, safe to start audio
        import('../hooks/useAudio').then(({ startAmbientMusic }) => {
          const { audioEnabled } = useAppStore.getState();
          if (audioEnabled) startAmbientMusic();
        });
      }} />}

      {/* Background effects (lazy loaded) */}
      {booted && <StarfieldBackground />}

      {/* Scanlines */}
      <ScanLines />

      {/* Scroll progress */}
      {booted && <ScrollProgress />}

      {/* Navbar */}
      {booted && <Navbar />}

      {/* Main content — always rendered so crawlers get the full page in static
          HTML; the opaque BootScreen overlay covers it until boot completes.
          Remounting on boot replays the entrance animations exactly as before. */}
      {
        <main key={booted ? 'booted' : 'booting'}>
          <HeroSection onHackClick={handleHackClick} />
          {!showAbout && (
            <>
              <StatsCounter />
              <SectionDivider />

              {/* Projects Grid */}
              <ProjectsSection />

              {/* Sections after verse — always rendered */}
              <SectionDivider />
              <ExperienceSection />
              <SectionDivider />
              <AchievementsSection />
              <SectionDivider />
              <CertificationsSection />
              <SectionDivider />
              <ToolboxSection />
              <SectionDivider />
              <BlogSection />
              <SectionDivider />
              <ContactSection />
            </>
          )}
        </main>
      }

      {/* About overlay */}
      <AboutSection isVisible={showAbout} onEscape={handleEscape} />

      {/* Chatbot assistant */}
      {booted && (
        <ChatProvider>
          <Chatbot />
        </ChatProvider>
      )}

      {/* Scroll-to-top */}
      {booted && !showAbout && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-24 z-30 w-10 h-10 cyber-glass rounded-full flex items-center justify-center text-cyber-blue hover:text-neon-pink hover:shadow-neon transition-all"
        >
          ↑
        </button>
      )}
    </div>
  );
}