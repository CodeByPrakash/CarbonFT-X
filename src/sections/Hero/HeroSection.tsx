import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe } from './Globe';
import { StatsBar } from './StatsBar';
import { useScrollPosition } from '@/hooks/useScrollPosition';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollY = useScrollPosition();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from('.hero-badge', { opacity: 0, scale: 0.9, duration: 0.6, ease: 'power2.out' })
        .from('.hero-headline', { opacity: 0, y: 40, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .from('.hero-subtext', { opacity: 0, y: 30, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .from('.hero-cta', { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' }, '-=0.2')
        .from('.hero-scroll', { opacity: 0, duration: 0.4 }, '-=0.1');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 600);
  const scale = Math.max(0.6, 1 - scrollY / 1500);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-[100dvh] overflow-hidden bg-hero flex items-center justify-center"
    >
      {/* Radial gradient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 45%, rgba(45, 106, 79, 0.25) 0%, transparent 60%)',
        }}
      />

      {/* Globe canvas */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity, transform: `scale(${scale})` }}
      >
        <Globe />
      </div>

      {/* Content overlay */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-6 pt-[15vh] flex flex-col items-center"
        style={{ opacity }}
      >
        <div className="hero-badge glass-card inline-flex items-center px-5 py-2 mb-6">
          <span className="text-forest-sage text-[1.1rem] font-semibold tracking-[0.1em] uppercase">
            Climate Action Starts With You
          </span>
        </div>

        <h1 className="hero-headline text-white font-extrabold tracking-tight" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
          <span className="block text-[3.6rem] md:text-[4.8rem] lg:text-[6.4rem] leading-[1.1]">Understand Your</span>
          <span className="block text-[3.6rem] md:text-[4.8rem] lg:text-[6.4rem] leading-[1.1]">Impact.</span>
          <span className="block text-[2.4rem] md:text-[3.2rem] lg:text-[4rem] leading-[1.15] mt-2">
            Change the <span className="text-forest-sage">Planet.</span>
          </span>
        </h1>

        <p className="hero-subtext text-white/70 text-[1.6rem] md:text-[1.8rem] max-w-[520px] mt-5 leading-relaxed">
          Track your carbon footprint, discover personalized insights, and take meaningful steps toward a sustainable future — one action at a time.
        </p>

        <div className="hero-cta flex flex-col sm:flex-row gap-4 mt-8">
          <a href="#track" className="btn-primary">
            Start Tracking
          </a>
          <a href="#learn" className="btn-ghost">
            Learn More
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className="hero-scroll absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: Math.max(0, 1 - scrollY / 200) }}
        >
          <ChevronDown className="w-6 h-6 text-white/50 animate-bounce-slow" />
          <span className="text-white/40 text-[1.1rem]">Scroll to explore</span>
        </div>
      </div>

      {/* Stats bar */}
      <StatsBar />
    </section>
  );
}
