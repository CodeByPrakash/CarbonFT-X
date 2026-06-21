import { useState } from 'react';
import { SectionHeader } from '@/components/SectionHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { countryEmissions } from '@/data/countryEmissions';
import { MAP_COLORS } from '@/lib/constants';
import type { CountryEmission } from '@/types';
import { Plane, UtensilsCrossed, Home, X } from 'lucide-react';

function getColorForIntensity(intensity: string) {
  switch (intensity) {
    case 'low': return MAP_COLORS.low;
    case 'medium-low': return MAP_COLORS.mediumLow;
    case 'medium': return MAP_COLORS.medium;
    case 'high': return MAP_COLORS.high;
    case 'very-high': return MAP_COLORS.veryHigh;
    default: return MAP_COLORS.low;
  }
}

const stats = [
  { label: 'Global Emissions', value: 36.8, suffix: ' GT', sub: 'CO2 in 2023', color: '#FF6B6B' },
  { label: 'Per Capita Average', value: 4.8, suffix: 'T', sub: 'Per person annually', color: '#F9A826' },
  { label: 'Top Emitter', value: 0, suffix: '', sub: 'China — 30% of global', color: '#4ECDC4', isText: true, textValue: 'China' },
  { label: 'Temperature Rise', value: 1.1, suffix: '°C', sub: 'Above pre-industrial', color: '#FF6B6B' },
];

// Simplified world map regions as positioned circles
const worldRegions = [
  { code: 'US', name: 'United States', x: 22, y: 35, r: 18, intensity: 'very-high' as const },
  { code: 'CA', name: 'Canada', x: 22, y: 22, r: 16, intensity: 'very-high' as const },
  { code: 'BR', name: 'Brazil', x: 32, y: 62, r: 14, intensity: 'medium' as const },
  { code: 'AR', name: 'Argentina', x: 30, y: 75, r: 10, intensity: 'medium' as const },
  { code: 'GB', name: 'United Kingdom', x: 46, y: 28, r: 6, intensity: 'medium' as const },
  { code: 'FR', name: 'France', x: 48, y: 32, r: 7, intensity: 'medium-low' as const },
  { code: 'DE', name: 'Germany', x: 50, y: 30, r: 7, intensity: 'high' as const },
  { code: 'IT', name: 'Italy', x: 51, y: 35, r: 6, intensity: 'medium' as const },
  { code: 'ES', name: 'Spain', x: 47, y: 37, r: 7, intensity: 'medium' as const },
  { code: 'NL', name: 'Netherlands', x: 49, y: 28, r: 5, intensity: 'high' as const },
  { code: 'NO', name: 'Norway', x: 50, y: 20, r: 8, intensity: 'low' as const },
  { code: 'SE', name: 'Sweden', x: 52, y: 18, r: 8, intensity: 'low' as const },
  { code: 'FI', name: 'Finland', x: 54, y: 17, r: 7, intensity: 'low' as const },
  { code: 'RU', name: 'Russia', x: 65, y: 22, r: 25, intensity: 'very-high' as const },
  { code: 'CN', name: 'China', x: 75, y: 38, r: 16, intensity: 'very-high' as const },
  { code: 'IN', name: 'India', x: 68, y: 48, r: 13, intensity: 'high' as const },
  { code: 'JP', name: 'Japan', x: 85, y: 36, r: 8, intensity: 'high' as const },
  { code: 'KR', name: 'South Korea', x: 82, y: 38, r: 6, intensity: 'very-high' as const },
  { code: 'ID', name: 'Indonesia', x: 78, y: 58, r: 12, intensity: 'medium' as const },
  { code: 'AU', name: 'Australia', x: 82, y: 72, r: 14, intensity: 'very-high' as const },
  { code: 'SA', name: 'Saudi Arabia', x: 58, y: 44, r: 9, intensity: 'very-high' as const },
  { code: 'ZA', name: 'South Africa', x: 53, y: 72, r: 10, intensity: 'high' as const },
  { code: 'NG', name: 'Nigeria', x: 49, y: 55, r: 9, intensity: 'low' as const },
  { code: 'EG', name: 'Egypt', x: 55, y: 42, r: 7, intensity: 'medium' as const },
  { code: 'TR', name: 'Turkey', x: 56, y: 36, r: 7, intensity: 'medium' as const },
  { code: 'PL', name: 'Poland', x: 52, y: 28, r: 6, intensity: 'high' as const },
];

export function VisualizeSection() {
  const [selectedCountry, setSelectedCountry] = useState<CountryEmission | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const selectedData = selectedCountry
    ? countryEmissions.find(c => c.code === selectedCountry.code)
    : null;

  return (
    <section id="visualize" className="section-padding bg-white relative">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader
          label="VISUALIZE THE DATA"
          headline="The Bigger Picture"
          subtext="Explore how carbon emissions flow around the world and see where you fit in the global story."
          labelColor="#4ECDC4"
        />

        {/* Global Stats Row */}
        <ScrollReveal className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white border-l-4 rounded-xl p-5 shadow-card"
              style={{ borderLeftColor: stat.color }}
            >
              <p className="text-[1.1rem] text-gray-400 uppercase tracking-wider mb-1">{stat.label}</p>
              {'isText' in stat && stat.isText ? (
                <p className="text-[2.4rem] font-semibold font-mono-data" style={{ color: stat.color }}>
                  {stat.textValue}
                </p>
              ) : (
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.value % 1 !== 0 ? 1 : 0}
                  className="text-[2.4rem] font-semibold"
                  style={{ color: stat.color }}
                />
              )}
              <p className="text-[1.2rem] text-gray-500 mt-1">{stat.sub}</p>
            </div>
          ))}
        </ScrollReveal>

        {/* Interactive World Map */}
        <ScrollReveal variant="scale">
          <div className="relative bg-hero rounded-2xl overflow-hidden p-4 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <p className="text-white/80 text-[1.3rem] font-medium">CO2 Emissions by Country (2023)</p>
              <div className="flex items-center gap-3 text-[1rem]">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: MAP_COLORS.low }} /> Low</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: MAP_COLORS.mediumLow }} /> Med-Low</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: MAP_COLORS.medium }} /> Med</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: MAP_COLORS.high }} /> High</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: MAP_COLORS.veryHigh }} /> Very High</span>
              </div>
            </div>

            <div className="relative w-full" style={{ paddingBottom: '50%' }}>
              <svg
                viewBox="0 0 100 85"
                className="absolute inset-0 w-full h-full"
                style={{ filter: 'drop-shadow(0 0 8px rgba(82, 183, 136, 0.2))' }}
              >
                {/* Ocean background */}
                <rect width="100" height="85" fill="#0D2818" rx="4" />

                {/* Simplified continent shapes (ellipses) */}
                {worldRegions.map((region) => {
                  const countryData = countryEmissions.find(c => c.code === region.code);
                  const intensity = countryData?.intensity || region.intensity;
                  const isHovered = hoveredRegion === region.code;
                  return (
                    <g key={region.code}>
                      <ellipse
                        cx={region.x}
                        cy={region.y}
                        rx={region.r * 0.6}
                        ry={region.r * 0.5}
                        fill={getColorForIntensity(intensity)}
                        stroke={isHovered ? '#fff' : 'transparent'}
                        strokeWidth={isHovered ? 0.5 : 0}
                        className="transition-all duration-200 cursor-pointer"
                        style={{
                          filter: isHovered ? 'brightness(1.2)' : 'none',
                          transformOrigin: `${region.x}% ${region.y}%`,
                        }}
                        onMouseEnter={() => setHoveredRegion(region.code)}
                        onMouseLeave={() => setHoveredRegion(null)}
                        onClick={() => {
                          const data = countryEmissions.find(c => c.code === region.code);
                          if (data) setSelectedCountry(data);
                        }}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Hover tooltip */}
              {hoveredRegion && (
                <div className="absolute z-10 pointer-events-none">
                  {(() => {
                    const data = countryEmissions.find(c => c.code === hoveredRegion);
                    if (!data) return null;
                    return (
                      <div className="glass-card px-3 py-2 text-white text-[1.1rem]">
                        <p className="font-semibold">{data.name}</p>
                        <p>{data.totalEmissions} MT CO2 ({data.percentage}%)</p>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* Country Detail Panel */}
            {selectedData && (
              <div className="mt-6 glass-card p-5 relative">
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="absolute top-3 right-3 text-white/60 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="text-white text-[2rem] font-semibold mb-3">{selectedData.name}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-white/50 text-[1.1rem]">Total Emissions</p>
                    <p className="text-teal text-[1.8rem] font-semibold font-mono-data">{selectedData.totalEmissions} MT</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-[1.1rem]">Per Capita</p>
                    <p className="text-amber text-[1.8rem] font-semibold font-mono-data">{selectedData.perCapita}T</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-[1.1rem]">Global Share</p>
                    <p className="text-coral text-[1.8rem] font-semibold font-mono-data">{selectedData.percentage}%</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-[1.1rem]">Intensity</p>
                    <p className="text-forest-sage text-[1.6rem] font-semibold capitalize">{selectedData.intensity.replace('-', ' ')}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Comparison Cards */}
        <div className="mt-16">
          <ScrollReveal>
            <h2 className="text-[3.2rem] font-bold text-forest-deep mb-8 text-center">Putting It in Perspective</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ComparisonCard
              icon={<Plane className="w-8 h-8 text-coral" />}
              title="Your Flight vs. Daily Life"
              text="One round-trip flight NYC to London = 1.2 tons CO2"
              equivalent="That's 3 months of average commuting!"
              bars={[{ label: 'Flight', value: 85, color: '#FF6B6B' }, { label: '3mo commute', value: 45, color: '#52B788' }]}
            />
            <ComparisonCard
              icon={<UtensilsCrossed className="w-8 h-8 text-amber" />}
              title="Food Choices Matter"
              text="A beef meal vs. a vegetarian meal"
              equivalent="Beef: 3.3 kg | Chicken: 0.8 kg | Veg: 0.4 kg | Vegan: 0.2 kg"
              bars={[{ label: 'Beef', value: 95, color: '#FF6B6B' }, { label: 'Vegan', value: 8, color: '#52B788' }]}
            />
            <ComparisonCard
              icon={<Home className="w-8 h-8 text-sky" />}
              title="Energy at Home"
              text="1 kWh of electricity by source"
              equivalent="Coal: 0.9 kg | Gas: 0.4 kg | Solar: 0.02 kg"
              bars={[{ label: 'Coal', value: 90, color: '#FF6B6B' }, { label: 'Solar', value: 3, color: '#52B788' }]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonCard({
  icon, title, text, equivalent, bars,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  equivalent: string;
  bars: { label: string; value: number; color: string }[];
}) {
  return (
    <ScrollReveal variant="scale">
      <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1">
        <div className="mb-4">{icon}</div>
        <h3 className="text-[1.8rem] font-semibold text-forest-deep mb-2">{title}</h3>
        <p className="text-gray-600 text-[1.4rem] mb-2">{text}</p>
        <p className="text-forest-sage text-[1.3rem] font-medium mb-4">{equivalent}</p>
        <div className="space-y-2">
          {bars.map((bar) => (
            <div key={bar.label}>
              <div className="flex justify-between text-[1.1rem] text-gray-500 mb-1">
                <span>{bar.label}</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${bar.value}%`, backgroundColor: bar.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
