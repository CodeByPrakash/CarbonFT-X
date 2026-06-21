export interface ActivityLog {
  id: string;
  category: 'transport' | 'food' | 'energy' | 'shopping';
  activity: string;
  value: number;
  unit: string;
  co2e: number;
  date: string;
}

export interface TransportData {
  carDistance: number;
  carUnit: 'km' | 'miles';
  carFuel: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  publicTransitDistance: number;
  publicTransitUnit: 'km' | 'miles';
  flightDistance: number;
  flightUnit: 'km' | 'miles';
  flightRoundTrip: boolean;
  activeDistance: number;
  activeUnit: 'km' | 'miles';
}

export interface FoodData {
  meatMeals: number;
  vegetarianMeals: number;
  veganMeals: number;
  foodWaste: 'none' | 'minimal' | 'moderate' | 'high';
  takeoutMeals: number;
}

export interface EnergyData {
  electricityUsage: number;
  heatingType: 'electric' | 'gas' | 'oil' | 'renewable';
  renewablePercent: number;
  deviceHours: number;
}

export interface ShoppingData {
  clothingItems: number;
  electronicsPurchase: boolean;
  packaging: 'minimal' | 'standard' | 'excessive';
  secondhandItems: number;
}

export interface CategoryBreakdown {
  transport: number;
  food: number;
  energy: number;
  shopping: number;
}

export interface TrendPoint {
  date: string;
  value: number;
  average?: number;
}

export interface CountryEmission {
  code: string;
  name: string;
  totalEmissions: number;
  perCapita: number;
  percentage: number;
  intensity: 'low' | 'medium-low' | 'medium' | 'high' | 'very-high';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  category: 'transport' | 'food' | 'energy' | 'shopping';
  impact: 'high' | 'medium' | 'low';
  impactValue: string;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
}

export interface MythCard {
  id: number;
  myth: string;
  fact: string;
  explanation: string;
  color: 'green' | 'amber';
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface Tip {
  id: string;
  text: string;
  category: string;
}

export interface SimulatorActivity {
  id: string;
  time: string;
  label: string;
  options: { label: string; co2: number; icon: string }[];
}
