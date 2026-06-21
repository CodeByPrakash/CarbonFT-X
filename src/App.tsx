import { useState, useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CarbonDataProvider } from '@/contexts/CarbonDataContext';
import { UserProvider } from '@/contexts/UserContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Footer } from '@/components/Footer';

import { HeroSection } from '@/sections/Hero/HeroSection';
import { TrackSection } from '@/sections/Track/TrackSection';
import { DashboardSection } from '@/sections/Dashboard/DashboardSection';
import { VisualizeSection } from '@/sections/Visualize/VisualizeSection';
import { LearnSection } from '@/sections/Learn/LearnSection';
import { ActionSection } from '@/sections/Action/ActionSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const mainRef = useRef<HTMLElement>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as any);
    };
  }, []);

  // Section observer for active nav
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavigate = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -80 });
    }
    setMobileMenuOpen(false);
  }, []);

  return (
    <CarbonDataProvider>
      <UserProvider>
        <div className="min-h-screen bg-white">
          {/* Desktop Sidebar */}
          <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />

          {/* Top Bar */}
          <TopBar onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />

          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-[150] lg:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
              <div className="absolute top-16 left-0 right-0 bg-white shadow-lg p-4">
                {['hero', 'track', 'dashboard', 'visualize', 'learn', 'action'].map((id) => (
                  <button
                    key={id}
                    onClick={() => handleNavigate(id)}
                    className="block w-full text-left px-4 py-3 text-[1.5rem] capitalize text-forest-deep hover:bg-forest-mint rounded-xl transition-colors"
                  >
                    {id === 'hero' ? 'Home' : id}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Main Content */}
          <main
            ref={mainRef}
            className="lg:ml-[240px] pb-16 lg:pb-0"
          >
            <HeroSection />
            <TrackSection />
            <DashboardSection />
            <VisualizeSection />
            <LearnSection />
            <ActionSection />
            <Footer />
          </main>

          {/* Mobile Bottom Nav */}
          <BottomNav activeSection={activeSection} onNavigate={handleNavigate} />
        </div>
      </UserProvider>
    </CarbonDataProvider>
  );
}

export default App;
