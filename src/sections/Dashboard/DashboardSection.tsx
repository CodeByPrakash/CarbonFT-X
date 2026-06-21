import { useState } from 'react';
import { SectionHeader } from '@/components/SectionHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ProgressRing } from '@/components/ProgressRing';
import { useCarbonData } from '@/contexts/CarbonDataContext';
import { getScoreLabel, getScoreColor } from '@/lib/emissions';
import { achievements } from '@/data/achievements';
import { tips } from '@/data/tips';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, ReferenceLine
} from 'recharts';
import {
  TrendingDown, Award, Lightbulb,
  Footprints, CalendarCheck, Leaf, Bike, Trash
} from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const COLORS = ['#FF6B6B', '#F9A826', '#4ECDC4', '#9B59B6'];

const achievementIcons: Record<string, React.ElementType> = {
  Footprints, CalendarCheck, Leaf, Bike, Trash, Award,
};

const compareData = [
  { name: 'You', value: 45.2, fill: '#2D6A4F' },
  { name: 'Avg User', value: 62.8, fill: '#ADB5BD' },
  { name: 'Eco Hero', value: 28.5, fill: '#52B788' },
];

export function DashboardSection() {
  const { trendData, carbonScore, weeklyTotal, categoryBreakdown, weeklyGoal } = useCarbonData();
  const [timeRange, setTimeRange] = useState('week');
  const { ref: scoreRef, isInView: scoreInView } = useInView(0.3);

  const scoreColor = getScoreColor(carbonScore);
  const scoreLabel = getScoreLabel(carbonScore);
  const goalProgress = Math.min(100, (weeklyTotal / weeklyGoal) * 100);

  const breakdownData = [
    { name: 'Transport', value: categoryBreakdown.transport, color: COLORS[0] },
    { name: 'Food', value: categoryBreakdown.food, color: COLORS[1] },
    { name: 'Energy', value: categoryBreakdown.energy, color: COLORS[2] },
    { name: 'Shopping', value: categoryBreakdown.shopping, color: COLORS[3] },
  ].filter(d => d.value > 0);

  const totalBreakdown = breakdownData.reduce((s, d) => s + d.value, 0) || 1;

  return (
    <section id="dashboard" className="section-padding bg-forest-mint relative">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader
          label="YOUR DASHBOARD"
          headline="Your Progress, Visualized"
          subtext="See how your daily choices add up and track your journey to a lower carbon footprint."
        />

        {/* Time range selector */}
        <ScrollReveal className="flex justify-center gap-2 mb-8">
          {['week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-pill text-[1.3rem] font-medium transition-all capitalize
                ${timeRange === range ? 'bg-forest-deep text-white' : 'bg-white text-gray-600 hover:bg-forest-pale'}`}
            >
              This {range}
            </button>
          ))}
        </ScrollReveal>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Score Card */}
          <ScrollReveal variant="scale" className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
              <h3 className="text-[1.6rem] font-semibold text-forest-deep mb-6">Carbon Score</h3>
              <div ref={scoreRef} className="flex justify-center">
                <div className="relative">
                  <ProgressRing
                    percentage={carbonScore}
                    size={180}
                    strokeWidth={12}
                    color={scoreColor}
                    showPercentage={false}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[3.6rem] font-bold font-mono-data" style={{ color: scoreColor }}>
                      {scoreInView ? carbonScore : 0}
                    </span>
                    <span className="text-[1.2rem] text-gray-400">/ 100</span>
                  </div>
                </div>
              </div>
              <p className="text-center mt-4 text-[1.4rem] font-medium" style={{ color: scoreColor }}>
                {scoreLabel}
              </p>
              <div className="flex items-center justify-center gap-2 mt-3 text-[1.2rem] text-gray-500">
                <TrendingDown className="w-4 h-4 text-forest-sage" />
                <span>On the right track</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Trend Chart */}
          <ScrollReveal variant="fade-up" className="lg:col-span-8">
            <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[1.6rem] font-semibold text-forest-deep">Footprint Trend</h3>
                <span className="text-[1.2rem] text-gray-400 capitalize">This {timeRange}</span>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2D6A4F" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2D6A4F" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#ADB5BD' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#ADB5BD' }} axisLine={false} tickLine={false} unit=" kg" />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', fontSize: 13 }}
                  />
                  <ReferenceLine y={8.5} stroke="#F9A826" strokeDasharray="5 5" label={{ value: 'Avg', position: 'right', fontSize: 11, fill: '#F9A826' }} />
                  <Area type="monotone" dataKey="value" stroke="#2D6A4F" strokeWidth={3} fill="url(#trendGrad)" dot={{ r: 4, fill: '#2D6A4F' }} activeDot={{ r: 6 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ScrollReveal>

          {/* Goal Progress */}
          <ScrollReveal className="lg:col-span-6">
            <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
              <h3 className="text-[1.6rem] font-semibold text-forest-deep mb-4">Weekly Goal</h3>
              <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${goalProgress}%`, background: `linear-gradient(90deg, #52B788, #00C9A7)` }}
                />
              </div>
              <div className="flex justify-between text-[1.3rem] text-gray-500 mb-3">
                <span>Used: <strong className="text-forest-deep">{weeklyTotal.toFixed(1)} kg</strong></span>
                <span>Target: <strong className="text-forest-deep">{weeklyGoal} kg</strong></span>
              </div>
              <p className="text-[1.3rem] text-forest-sage font-medium">
                You&apos;re {Math.round(goalProgress)}% there! Keep it up to hit your weekly target.
              </p>
            </div>
          </ScrollReveal>

          {/* Category Breakdown */}
          <ScrollReveal variant="scale" className="lg:col-span-6">
            <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
              <h3 className="text-[1.6rem] font-semibold text-forest-deep mb-4">Where Your Emissions Come From</h3>
              <div className="flex items-center gap-6">
                <ResponsiveContainer width={160} height={160}>
                  <PieChart>
                    <Pie
                      data={breakdownData.length ? breakdownData : [{ name: 'None', value: 1, color: '#E9ECEF' }]}
                      cx="50%" cy="50%" innerRadius={45} outerRadius={70}
                      dataKey="value" strokeWidth={2} stroke="#fff"
                    >
                      {(breakdownData.length ? breakdownData : [{ color: '#E9ECEF' }]).map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-2">
                  {breakdownData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-[1.3rem]">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-gray-600">{item.name}</span>
                      </div>
                      <span className="font-medium text-forest-deep">
                        {Math.round((item.value / totalBreakdown) * 100)}%
                      </span>
                    </div>
                  ))}
                  {breakdownData.length === 0 && (
                    <p className="text-gray-400 text-[1.3rem]">No data yet. Start tracking!</p>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Achievements */}
          <ScrollReveal className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
              <h3 className="text-[1.6rem] font-semibold text-forest-deep mb-4">Achievements</h3>
              <div className="grid grid-cols-3 gap-3">
                {achievements.map((ach) => {
                  const Icon = achievementIcons[ach.icon] || Award;
                  return (
                    <div
                      key={ach.id}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all
                        ${ach.unlocked ? 'bg-forest-mint' : 'bg-gray-50 opacity-40 grayscale'}`}
                      title={ach.description}
                    >
                      <Icon className={`w-6 h-6 ${ach.unlocked ? 'text-forest' : 'text-gray-400'}`} />
                      <span className="text-[1rem] text-center leading-tight text-gray-600">{ach.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Tips */}
          <ScrollReveal className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow border-l-4 border-forest-sage">
              <h3 className="text-[1.6rem] font-semibold text-forest-deep mb-4">Insights for You</h3>
              <div className="space-y-3">
                {tips.slice(0, 3).map((tip) => (
                  <div key={tip.id} className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-amber flex-shrink-0 mt-0.5" />
                    <p className="text-[1.3rem] text-gray-600 leading-relaxed">{tip.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Weekly Comparison */}
          <ScrollReveal className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
              <h3 className="text-[1.6rem] font-semibold text-forest-deep mb-4">How You Compare</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={compareData} barSize={40}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#ADB5BD' }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12 }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {compareData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-2 mt-3 text-forest-sage">
                <TrendingDown className="w-4 h-4" />
                <span className="text-[1.3rem] font-medium">You&apos;re 15% below average!</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
