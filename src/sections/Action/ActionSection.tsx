import { useState, useMemo } from 'react';
import { SectionHeader } from '@/components/SectionHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { actionItems } from '@/data/actionItems';
import { useUser } from '@/contexts/UserContext';
import { useCarbonData } from '@/contexts/CarbonDataContext';
import { getHighestCategory } from '@/lib/emissions';
import {
  Bus, Salad, Lightbulb, Trash2, ShoppingBag, Plug, Droplets, Package, Users,
  Star, Car, Zap, Check, TreePine, Leaf, Filter
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Bus, Salad, Lightbulb, Trash2, ShoppingBag, Plug, Droplets, Package, Users,
};

const filterTabs = [
  { id: 'all', label: 'All', icon: Filter },
  { id: 'transport', label: 'Transport', icon: Car },
  { id: 'food', label: 'Food', icon: Salad },
  { id: 'energy', label: 'Energy', icon: Zap },
  { id: 'shopping', label: 'Shopping', icon: ShoppingBag },
  { id: 'quick-wins', label: 'Quick Wins', icon: Star },
];

const greetings: Record<string, string> = {
  transport: 'Your biggest opportunity is reducing transport emissions. Here are targeted actions:',
  food: 'Your food choices have room for improvement. Try these:',
  energy: 'You\'re doing well on energy! Here are ways to do even better:',
  shopping: 'Mindful consumption can significantly lower your footprint:',
};

export function ActionSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);
  const { commitments, addCommitment, removeCommitment, hasCommitment } = useUser();
  const { categoryBreakdown } = useCarbonData();

  const highestCategory = getHighestCategory(categoryBreakdown);

  const filteredActions = useMemo(() => {
    if (activeFilter === 'all') return actionItems;
    if (activeFilter === 'quick-wins') return actionItems.filter(a => a.difficulty === 'easy');
    return actionItems.filter(a => a.category === activeFilter);
  }, [activeFilter]);

  const visibleActions = filteredActions.slice(0, visibleCount);

  const totalSavings = commitments.reduce((sum, id) => {
    const item = actionItems.find(a => a.id === id);
    if (!item) return sum;
    const match = item.impactValue.match(/[\d.]+/);
    return sum + (match ? parseFloat(match[0]) : 0);
  }, 0);

  return (
    <section id="action" className="section-padding bg-forest-mint relative">
      {/* Decorative leaf */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] opacity-[0.03] pointer-events-none">
        <Leaf className="w-full h-full text-forest-sage" />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        <SectionHeader
          label="TAKE ACTION"
          headline="Small Changes, Big Impact"
          subtext="Based on your footprint, here are personalized actions you can take today. Every commitment counts."
          labelColor="#F9A826"
        />

        {/* Personalized Greeting */}
        <ScrollReveal className="mb-8">
          <div className="bg-white rounded-2xl p-5 border-l-4 border-amber shadow-card flex items-start gap-4">
            <Lightbulb className="w-6 h-6 text-amber flex-shrink-0 mt-1" />
            <p className="text-[1.5rem] text-forest-deep">
              <strong>Hi Eco Warrior!</strong> {greetings[highestCategory] || greetings.transport}
            </p>
          </div>
        </ScrollReveal>

        {/* Filter Bar */}
        <ScrollReveal className="flex flex-wrap justify-center gap-2 mb-8">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveFilter(tab.id); setVisibleCount(6); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-pill text-[1.3rem] font-medium transition-all
                  ${activeFilter === tab.id
                    ? 'bg-amber text-white'
                    : 'bg-white text-gray-600 hover:bg-forest-pale'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </ScrollReveal>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleActions.map((action) => {
            const Icon = iconMap[action.icon] || Leaf;
            const isCommitted = hasCommitment(action.id);
            const categoryColor = {
              transport: '#FF6B6B',
              food: '#F9A826',
              energy: '#4ECDC4',
              shopping: '#9B59B6',
            }[action.category];

            return (
              <ScrollReveal key={action.id} variant="scale">
                <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 overflow-hidden"
                  style={{ borderTop: `3px solid ${categoryColor}` }}
                >
                  {/* Top row */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="px-3 py-1 rounded-pill text-[1rem] font-medium text-white"
                      style={{ backgroundColor: categoryColor }}
                    >
                      {action.category}
                    </span>
                    <span className={`px-3 py-1 rounded-pill text-[1rem] font-medium
                      ${action.impact === 'high' ? 'bg-coral/10 text-coral' :
                        action.impact === 'medium' ? 'bg-amber/10 text-amber' :
                          'bg-forest-sage/10 text-forest-sage'}`}>
                      {action.impact} Impact
                    </span>
                  </div>

                  <div className="flex justify-center my-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: `${categoryColor}15` }}>
                      <Icon className="w-7 h-7" style={{ color: categoryColor }} />
                    </div>
                  </div>

                  <h3 className="text-[1.8rem] font-semibold text-forest-deep text-center mb-2">
                    {action.title}
                  </h3>
                  <p className="text-gray-500 text-[1.3rem] text-center mb-3 leading-relaxed">
                    {action.description}
                  </p>

                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Leaf className="w-4 h-4 text-forest-sage" />
                    <span className="text-forest text-[1.3rem] font-mono-data font-medium">
                      Saves {action.impactValue}
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-pill text-[1.1rem] font-medium
                      ${action.difficulty === 'easy' ? 'bg-forest-sage/10 text-forest-sage' :
                        action.difficulty === 'medium' ? 'bg-amber/10 text-amber' :
                          'bg-coral/10 text-coral'}`}>
                      {action.difficulty}
                    </span>
                  </div>

                  <button
                    onClick={() => isCommitted ? removeCommitment(action.id) : addCommitment(action.id)}
                    className={`w-full py-3 rounded-pill font-semibold text-[1.4rem] transition-all duration-300 flex items-center justify-center gap-2
                      ${isCommitted
                        ? 'bg-forest-sage text-white'
                        : 'border-2 border-forest text-forest hover:bg-forest hover:text-white'
                      }`}
                  >
                    {isCommitted ? (
                      <><Check className="w-4 h-4" /> Committed!</>
                    ) : (
                      'Commit'
                    )}
                  </button>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Load More */}
        {visibleCount < filteredActions.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setVisibleCount(c => c + 6)}
              className="btn-secondary"
            >
              Show More Actions
            </button>
          </div>
        )}

        {/* My Commitments Panel */}
        {commitments.length > 0 && (
          <ScrollReveal className="mt-12">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-card">
              <h2 className="text-[2.4rem] font-bold text-forest-deep mb-2">Your Commitments</h2>
              <p className="text-forest-sage text-[1.5rem] mb-6">You&apos;re on your way to a lower footprint!</p>

              <div className="space-y-3 mb-6">
                {commitments.map((id) => {
                  const action = actionItems.find(a => a.id === id);
                  if (!action) return null;
                  return (
                    <div key={id} className="flex items-center gap-3 p-3 bg-forest-mint rounded-xl">
                      <div className="w-6 h-6 rounded-full bg-forest-sage flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="flex-1 text-[1.4rem] text-forest-deep">{action.title}</span>
                      <button
                        onClick={() => removeCommitment(id)}
                        className="text-gray-400 hover:text-coral text-[1.2rem] transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="bg-forest-mint rounded-xl p-5">
                <p className="text-gray-500 text-[1.3rem] mb-1">If you stick to these commitments:</p>
                <p className="text-[2.4rem] font-bold font-mono-data text-forest">
                  {Math.round(totalSavings)} <span className="text-[1.4rem] font-normal">kg CO2/year saved</span>
                </p>
                <p className="text-forest-sage text-[1.4rem] mt-2 flex items-center gap-2">
                  <TreePine className="w-5 h-5" />
                  That&apos;s equivalent to planting {Math.round(totalSavings / 20)} trees!
                </p>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Community Impact Counter */}
        <ScrollReveal className="mt-14">
          <div
            className="rounded-2xl p-8 md:p-12 text-center text-white"
            style={{ background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 50%, #52B788 100%)' }}
          >
            <h2 className="text-[2.4rem] md:text-[3.2rem] font-bold mb-4">
              Together, We&apos;re Making a Difference
            </h2>

            <AnimatedCounter
              target={2847392}
              suffix=""
              className="text-[4rem] md:text-[5.6rem] font-bold text-white"
              duration={2500}
            />
            <p className="text-white/70 text-[1.6rem] md:text-[1.8rem] mb-8">
              kg of CO2 saved by CarbonWise users
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { value: 12450, label: 'Active users this week' },
                { value: 45200, label: 'Commitments made' },
                { value: 89100, label: 'Trees equivalent planted' },
              ].map((stat) => (
                <div key={stat.label}>
                  <AnimatedCounter
                    target={stat.value}
                    className="text-[2.4rem] font-bold text-white"
                    duration={2000}
                  />
                  <p className="text-white/60 text-[1.3rem] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <a href="#track" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-forest-deep rounded-pill font-semibold text-[1.6rem] hover:bg-white/90 transition-colors shadow-lg">
              Join the Movement — Start Tracking
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
