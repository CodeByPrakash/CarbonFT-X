import type { MythCard } from '@/types';

export const mythCards: MythCard[] = [
  {
    id: 1,
    myth: "Electric cars are worse for the environment than gas cars.",
    fact: "False! EVs produce 50-70% fewer emissions over their lifetime, even accounting for battery production.",
    explanation: "While battery production has a carbon cost, the lifetime emissions of EVs are significantly lower due to zero tailpipe emissions and increasingly clean electricity grids.",
    color: 'green',
  },
  {
    id: 2,
    myth: "Recycling is the best way to reduce your carbon footprint.",
    fact: "Recycling helps, but reducing consumption and switching to renewable energy have far greater impact.",
    explanation: "The waste hierarchy is: Refuse, Reduce, Reuse, Recycle. Recycling is important but reducing what we consume has a much bigger impact on emissions.",
    color: 'amber',
  },
  {
    id: 3,
    myth: "Planting trees can solve climate change.",
    fact: "Trees help absorb CO2, but we can't plant our way out — we must also cut emissions dramatically.",
    explanation: "We'd need to plant billions of trees annually just to offset current emissions. Reforestation is vital but cannot replace emission reductions.",
    color: 'amber',
  },
  {
    id: 4,
    myth: "Your individual actions don't matter.",
    fact: "Individual choices add up! If everyone reduced their footprint by 20%, it would equal removing billions of cars from the road.",
    explanation: "Personal actions create ripple effects — they influence others, shift markets, and demonstrate demand for sustainable alternatives.",
    color: 'green',
  },
  {
    id: 5,
    myth: "Flying is fine if you buy carbon offsets.",
    fact: "Offsets can help, but they're not a perfect solution. Reducing flights is still the most effective approach.",
    explanation: "Many offset programs have questionable effectiveness. The best approach is to fly less, choose direct flights, and offset as a supplement, not a substitute.",
    color: 'amber',
  },
  {
    id: 6,
    myth: "Going vegan is the only way to reduce food emissions.",
    fact: "Reducing meat (especially beef) helps a lot, but you don't need to go fully vegan — even meatless Mondays make a difference.",
    explanation: "A 50% reduction in meat consumption achieves about 70% of the emissions savings of full veganism. Every reduction counts!",
    color: 'green',
  },
];
