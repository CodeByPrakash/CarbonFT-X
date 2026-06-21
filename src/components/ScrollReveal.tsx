import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'fade-up' | 'fade' | 'scale' | 'slide-left' | 'slide-right';
  delay?: number;
  duration?: number;
  stagger?: number;
}

export function ScrollReveal({
  children,
  className = '',
  variant = 'fade-up',
  delay = 0,
  duration = 0.6,
  stagger = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fromVars: gsap.TweenVars = { opacity: 0 };
    const toVars: gsap.TweenVars = {
      opacity: 1,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    };

    switch (variant) {
      case 'fade-up':
        fromVars.y = 40;
        toVars.y = 0;
        break;
      case 'scale':
        fromVars.scale = 0.9;
        toVars.scale = 1;
        toVars.ease = 'back.out(1.2)';
        break;
      case 'slide-left':
        fromVars.x = -60;
        toVars.x = 0;
        break;
      case 'slide-right':
        fromVars.x = 60;
        toVars.x = 0;
        break;
    }

    if (stagger > 0 && el.children.length > 0) {
      gsap.from(el.children, { ...fromVars, stagger, duration, delay, ease: toVars.ease,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true }
      });
    } else {
      gsap.from(el, { ...fromVars, ...toVars });
    }

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, [variant, delay, duration, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
