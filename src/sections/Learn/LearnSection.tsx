import { useState } from 'react';
import { SectionHeader } from '@/components/SectionHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { quizQuestions } from '@/data/quizQuestions';
import { mythCards } from '@/data/mythCards';
import { Check, X, RotateCcw, Share2, ChevronRight } from 'lucide-react';
import type { SimulatorActivity } from '@/types';

const simulatorActivities: SimulatorActivity[] = [
  {
    id: 'morning-commute',
    time: '7:00 AM',
    label: 'Morning Commute',
    options: [
      { label: 'Drive car', co2: 4.2, icon: 'Car' },
      { label: 'Public transit', co2: 0.8, icon: 'Bus' },
      { label: 'Bike/Walk', co2: 0, icon: 'Bike' },
      { label: 'Work from home', co2: 0, icon: 'Footprints' },
    ],
  },
  {
    id: 'breakfast',
    time: '8:00 AM',
    label: 'Breakfast',
    options: [
      { label: 'Meat-based', co2: 3.3, icon: 'Factory' },
      { label: 'Vegetarian', co2: 0.4, icon: 'TreePine' },
      { label: 'Vegan', co2: 0.2, icon: 'TreePine' },
      { label: 'Skip / Coffee only', co2: 0.1, icon: 'Cloud' },
    ],
  },
  {
    id: 'lunch',
    time: '12:00 PM',
    label: 'Lunch',
    options: [
      { label: 'Restaurant meat', co2: 3.5, icon: 'Factory' },
      { label: 'Home-cooked meat', co2: 2.8, icon: 'Factory' },
      { label: 'Home-cooked veg', co2: 0.5, icon: 'TreePine' },
      { label: 'Takeout', co2: 2.0, icon: 'Car' },
    ],
  },
  {
    id: 'afternoon-energy',
    time: '3:00 PM',
    label: 'Work Energy',
    options: [
      { label: 'High device usage', co2: 1.5, icon: 'Factory' },
      { label: 'Moderate usage', co2: 0.8, icon: 'Cloud' },
      { label: 'Low usage', co2: 0.3, icon: 'TreePine' },
      { label: 'Renewable powered', co2: 0.1, icon: 'Sun' },
    ],
  },
  {
    id: 'evening-commute',
    time: '6:00 PM',
    label: 'Evening Commute',
    options: [
      { label: 'Drive car', co2: 4.2, icon: 'Car' },
      { label: 'Public transit', co2: 0.8, icon: 'Bus' },
      { label: 'Bike/Walk', co2: 0, icon: 'Bike' },
      { label: 'Already home', co2: 0, icon: 'Footprints' },
    ],
  },
  {
    id: 'dinner',
    time: '7:30 PM',
    label: 'Dinner',
    options: [
      { label: 'Beef meal', co2: 3.3, icon: 'Factory' },
      { label: 'Chicken meal', co2: 0.8, icon: 'Cloud' },
      { label: 'Vegetarian', co2: 0.4, icon: 'TreePine' },
      { label: 'Vegan', co2: 0.2, icon: 'TreePine' },
    ],
  },
  {
    id: 'entertainment',
    time: '9:00 PM',
    label: 'Evening Activity',
    options: [
      { label: 'Streaming 4hrs', co2: 0.8, icon: 'Factory' },
      { label: 'Streaming 1hr', co2: 0.2, icon: 'Cloud' },
      { label: 'Reading', co2: 0.05, icon: 'TreePine' },
      { label: 'Outdoor walk', co2: 0, icon: 'Bike' },
    ],
  },
];

export function LearnSection() {
  return (
    <section id="learn" className="section-padding bg-forest-deep relative overflow-hidden">
      {/* Decorative waves */}
      <div className="absolute top-0 left-0 right-0 h-32 opacity-15">
        <svg viewBox="0 0 1200 120" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,0 L0,0 Z" fill="#2D6A4F" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-15 rotate-180">
        <svg viewBox="0 0 1200 120" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,0 L0,0 Z" fill="#2D6A4F" />
        </svg>
      </div>

      <div className="max-w-[1000px] mx-auto relative z-10">
        <SectionHeader
          label="LEARN & DISCOVER"
          headline="Knowledge Is Power"
          subtext="Understand the science behind your footprint and discover how everyday choices shape our planet's future."
          labelColor="#00C9A7"
          dark
        />

        <QuizModule />
        <DaySimulator />
        <MythBuster />
      </div>
    </section>
  );
}

/* ─── Quiz Module ─── */
function QuizModule() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const question = quizQuestions[currentQ];
  const progress = ((currentQ) / quizQuestions.length) * 100;

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === question.correctIndex) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
  };

  const getRating = () => {
    if (score >= 4) return { label: 'Carbon Expert', color: '#00C9A7' };
    if (score >= 3) return { label: 'Eco Aware', color: '#52B788' };
    return { label: 'Climate Novice', color: '#F9A826' };
  };

  return (
    <ScrollReveal variant="scale" className="mt-14">
      <div className="glass-card-dark p-6 md:p-10">
        {!showResult ? (
          <>
            {/* Progress */}
            <div className="w-full h-1 bg-white/10 rounded-full mb-6">
              <div className="h-full bg-teal rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>

            <p className="text-teal text-[1.2rem] font-medium mb-4">
              Question {currentQ + 1} of {quizQuestions.length}
            </p>

            <h3 className="text-white text-[2rem] md:text-[2.4rem] font-semibold mb-6">
              {question.question}
            </h3>

            <div className="space-y-3">
              {question.options.map((opt, idx) => {
                let borderColor = 'rgba(255,255,255,0.1)';
                let bgColor = 'rgba(255,255,255,0.05)';

                if (answered) {
                  if (idx === question.correctIndex) {
                    borderColor = '#52B788';
                    bgColor = 'rgba(82, 183, 136, 0.15)';
                  } else if (idx === selected && idx !== question.correctIndex) {
                    borderColor = '#FF6B6B';
                    bgColor = 'rgba(255, 107, 107, 0.15)';
                  }
                } else if (idx === selected) {
                  borderColor = '#00C9A7';
                  bgColor = 'rgba(0, 201, 167, 0.15)';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className="w-full text-left px-5 py-4 rounded-xl text-white text-[1.5rem] transition-all duration-200 flex items-center gap-3"
                    style={{ backgroundColor: bgColor, border: `1px solid ${borderColor}`, borderLeft: `3px solid ${borderColor}` }}
                  >
                    {answered && idx === question.correctIndex && <Check className="w-5 h-5 text-forest-sage flex-shrink-0" />}
                    {answered && idx === selected && idx !== question.correctIndex && <X className="w-5 h-5 text-coral flex-shrink-0" />}
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {answered && (
              <div className="mt-4 p-4 bg-white/5 rounded-xl">
                <p className="text-white/70 text-[1.3rem]">{question.explanation}</p>
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                onClick={handleNext}
                disabled={!answered}
                className="flex items-center gap-2 px-6 py-3 bg-teal text-forest-deep rounded-pill font-semibold text-[1.4rem] disabled:opacity-40 transition-opacity"
              >
                {currentQ < quizQuestions.length - 1 ? 'Next' : 'See Results'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="text-teal text-[4.8rem] font-bold font-mono-data mb-2">
              {score}/{quizQuestions.length}
            </div>
            <p className="text-[2rem] font-semibold mb-2" style={{ color: getRating().color }}>
              {getRating().label}
            </p>
            <p className="text-white/60 text-[1.5rem] mb-8 max-w-[400px] mx-auto">
              {score >= 4
                ? 'Amazing! You really know your stuff. Keep leading by example!'
                : score >= 3
                  ? 'Good effort! There\'s always more to learn about our planet.'
                  : 'Every expert started as a beginner. Keep exploring!'}
            </p>
            <div className="flex justify-center gap-4">
              <button onClick={handleRestart} className="flex items-center gap-2 btn-ghost">
                <RotateCcw className="w-4 h-4" /> Retake Quiz
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-teal text-forest-deep rounded-pill font-semibold text-[1.4rem]">
                <Share2 className="w-4 h-4" /> Share Result
              </button>
            </div>
          </div>
        )}
      </div>
    </ScrollReveal>
  );
}

/* ─── Day Simulator ─── */
function DaySimulator() {
  const [selections, setSelections] = useState<Record<string, number>>({});

  const totalCO2 = simulatorActivities.reduce((sum, act) => {
    const sel = selections[act.id];
    if (sel === undefined) return sum;
    return sum + act.options[sel].co2;
  }, 0);

  const handleSelect = (activityId: string, optionIdx: number) => {
    setSelections(prev => ({ ...prev, [activityId]: optionIdx }));
  };

  const getMessage = () => {
    if (totalCO2 === 0) return 'Select your activities to see your footprint';
    if (totalCO2 < 5) return 'Outstanding! Your day is very low impact.';
    if (totalCO2 < 12) return 'Good job! You\'re below average.';
    if (totalCO2 < 20) return 'Average day. Room for improvement!';
    return 'High impact day. Small changes can help!';
  };


  return (
    <ScrollReveal variant="scale" className="mt-10">
      <div className="glass-card-dark p-6 md:p-10">
        <h2 className="text-white text-[2.4rem] font-semibold mb-2">A Day in Your Life</h2>
        <p className="text-white/60 text-[1.5rem] mb-8">Build your typical day and see how the carbon adds up.</p>

        <div className="space-y-4">
          {simulatorActivities.map((activity) => {
            const selectedIdx = selections[activity.id];
            return (
              <div key={activity.id} className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-teal text-[1.2rem] font-medium">{activity.time}</span>
                  <span className="text-white font-medium text-[1.4rem]">{activity.label}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {activity.options.map((opt, idx) => {
                    const isSelected = selectedIdx === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelect(activity.id, idx)}
                        className={`p-3 rounded-lg text-[1.2rem] text-center transition-all border
                          ${isSelected
                            ? 'bg-teal/20 border-teal text-white'
                            : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                          }`}
                      >
                        <span className="block font-medium">{opt.label}</span>
                        <span className="text-[1rem] opacity-60">{opt.co2} kg</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Running total */}
        <div className="mt-6 p-4 bg-forest-deep/50 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white/60 text-[1.3rem]">Your day&apos;s footprint</p>
            <p className={`text-[2.8rem] font-bold font-mono-data ${totalCO2 < 12 ? 'text-teal' : totalCO2 < 20 ? 'text-amber' : 'text-coral'}`}>
              {totalCO2.toFixed(1)} <span className="text-[1.4rem] font-normal">kg CO2</span>
            </p>
          </div>
          <p className="text-white/70 text-[1.4rem]">{getMessage()}</p>
        </div>
      </div>
    </ScrollReveal>
  );
}

/* ─── Myth Buster ─── */
function MythBuster() {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  const handleFlip = (id: number) => {
    setFlipped(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="mt-10">
      <ScrollReveal>
        <h2 className="text-white text-[2.4rem] font-semibold mb-2">Climate Myths vs. Facts</h2>
        <p className="text-white/60 text-[1.5rem] mb-8">Test your knowledge. Click a card to reveal the truth.</p>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mythCards.map((card) => {
          const isFlipped = flipped[card.id];
          return (
            <ScrollReveal key={card.id} variant="scale">
              <div
                className="cursor-pointer h-[200px] perspective-[1000px]"
                onClick={() => handleFlip(card.id)}
              >
                <div
                  className="relative w-full h-full transition-transform duration-500 preserve-3d"
                  style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                >
                  {/* Front - Myth */}
                  <div className="absolute inset-0 backface-hidden bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:bg-white/8 transition-colors">
                    <span className="text-white/20 text-[3rem] mb-2">?</span>
                    <p className="text-white text-[1.5rem] font-medium leading-relaxed">{card.myth}</p>
                    <span className="text-white/30 text-[1.1rem] mt-3">Tap to reveal</span>
                  </div>

                  {/* Back - Fact */}
                  <div
                    className="absolute inset-0 backface-hidden rounded-2xl p-5 flex flex-col items-center justify-center text-center"
                    style={{
                      transform: 'rotateY(180deg)',
                      backgroundColor: card.color === 'green' ? '#52B788' : '#F9A826',
                    }}
                  >
                    <Check className="w-6 h-6 text-white mb-2" />
                    <span className="text-white/80 text-[1.1rem] font-semibold uppercase tracking-wider mb-1">Fact</span>
                    <p className="text-white text-[1.4rem] font-medium leading-relaxed">{card.fact}</p>
                    <p className="text-white/80 text-[1.2rem] mt-2 leading-relaxed">{card.explanation}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
