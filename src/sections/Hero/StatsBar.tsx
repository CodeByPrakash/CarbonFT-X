import { ScrollReveal } from '@/components/ScrollReveal';
import { AnimatedCounter } from '@/components/AnimatedCounter';

const stats = [
  { label: 'Global CO2', value: 36.8, suffix: ' GT', sublabel: 'Gigatons emitted annually' },
  { label: 'Avg Footprint', value: 4.5, suffix: 'T', sublabel: 'Tons per person per year' },
  { label: 'Users Tracking', value: 50, suffix: 'K+', sublabel: 'Active climate warriors' },
];

export function StatsBar() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-10">
      <div
        className="px-6 md:px-12 py-6"
        style={{
          background: 'linear-gradient(to top, rgba(13, 40, 24, 0.95) 0%, rgba(13, 40, 24, 0.7) 60%, transparent 100%)',
        }}
      >
        <ScrollReveal className="max-w-[1000px] mx-auto flex flex-col sm:flex-row justify-around gap-6 sm:gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-white/50 text-[1.1rem] uppercase tracking-wider mb-1">{stat.label}</p>
              <AnimatedCounter
                target={stat.value}
                suffix={stat.suffix}
                decimals={stat.value % 1 !== 0 ? 1 : 0}
                className="text-teal text-[2.4rem] md:text-[2.8rem] font-medium"
                duration={2000}
              />
              <p className="text-white/40 text-[1.1rem] mt-0.5">{stat.sublabel}</p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </div>
  );
}
