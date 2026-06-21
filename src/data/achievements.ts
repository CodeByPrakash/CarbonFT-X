import type { Achievement } from '@/types';

export const achievements: Achievement[] = [
  { id: 'first-step', name: 'First Step', description: 'Logged your first activity', icon: 'Footprints', unlocked: true },
  { id: 'week-warrior', name: 'Week Warrior', description: 'Logged activities for 7 days', icon: 'CalendarCheck', unlocked: true },
  { id: 'vegan-day', name: 'Vegan Day', description: 'Had a meat-free day', icon: 'Leaf', unlocked: true },
  { id: 'green-commute', name: 'Green Commute', description: 'Walked or biked 5 days', icon: 'Bike', unlocked: false },
  { id: 'zero-waste', name: 'Zero Waste', description: 'No food waste for 3 days', icon: 'Trash', unlocked: false },
  { id: 'carbon-neutral', name: 'Carbon Neutral', description: 'Achieved net zero for a day', icon: 'Award', unlocked: false },
];
