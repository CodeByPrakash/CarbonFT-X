import { ScrollReveal } from './ScrollReveal';

interface SectionHeaderProps {
  label: string;
  headline: string;
  subtext: string;
  labelColor?: string;
  dark?: boolean;
  className?: string;
}

export function SectionHeader({ label, headline, subtext, labelColor = '#52B788', dark = false, className = '' }: SectionHeaderProps) {
  return (
    <ScrollReveal className={`text-center mb-12 md:mb-16 ${className}`}>
      <span
        className="inline-block text-[1.2rem] font-semibold tracking-[0.08em] uppercase mb-4"
        style={{ color: labelColor }}
      >
        {label}
      </span>
      <h2
        className="text-[3.2rem] md:text-[4rem] lg:text-[4.8rem] font-bold leading-[1.15] tracking-tight mb-4"
        style={{ color: dark ? '#FFFFFF' : '#1B4332' }}
      >
        {headline}
      </h2>
      <p
        className="text-[1.6rem] md:text-[1.8rem] leading-relaxed max-w-[560px] mx-auto"
        style={{ color: dark ? 'rgba(255,255,255,0.7)' : '#495057' }}
      >
        {subtext}
      </p>
    </ScrollReveal>
  );
}
