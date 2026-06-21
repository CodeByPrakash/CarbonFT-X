export const COLORS = {
  forest: {
    deep: '#1B4332',
    DEFAULT: '#2D6A4F',
    sage: '#52B788',
    pale: '#D8F3DC',
    mint: '#F0FDF4',
  },
  accent: {
    teal: '#00C9A7',
    amber: '#F9A826',
    coral: '#FF6B6B',
    sky: '#4ECDC4',
  },
  hero: '#0D2818',
} as const;

export const EMISSION_FACTORS = {
  transport: {
    carGasoline: 0.21,
    carDiesel: 0.17,
    carElectric: 0.05,
    carHybrid: 0.12,
    publicTransit: 0.04,
    flight: 0.15,
  },
  food: {
    meatMeal: 3.3,
    chickenMeal: 0.8,
    vegetarianMeal: 0.4,
    veganMeal: 0.2,
    foodWaste: { none: 0, minimal: 0.5, moderate: 1.5, high: 3.0 },
    takeout: 0.3,
  },
  energy: {
    electricityLow: 2.0,
    electricityMedium: 5.0,
    electricityHigh: 10.0,
    heatingMultiplier: { electric: 1.0, gas: 1.5, oil: 2.0, renewable: 0.1 },
  },
  shopping: {
    clothingItem: 5.0,
    electronics: 50.0,
    packaging: { minimal: 0.1, standard: 0.5, excessive: 1.5 },
    secondhandOffset: 2.0,
  },
} as const;

export const CATEGORY_COLORS = {
  transport: '#FF6B6B',
  food: '#F9A826',
  energy: '#4ECDC4',
  shopping: '#9B59B6',
} as const;

export const MAP_COLORS = {
  low: '#D8F3DC',
  mediumLow: '#52B788',
  medium: '#2D6A4F',
  high: '#1B4332',
  veryHigh: '#FF6B6B',
} as const;

export const WEEKLY_GOAL_DEFAULT = 70;

export const NAV_ITEMS = [
  { id: 'hero', label: 'Home', icon: 'Home' },
  { id: 'track', label: 'Track', icon: 'ClipboardCheck' },
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutGrid' },
  { id: 'visualize', label: 'Visualize', icon: 'Globe' },
  { id: 'learn', label: 'Learn', icon: 'BookOpen' },
  { id: 'action', label: 'Action', icon: 'Zap' },
] as const;
