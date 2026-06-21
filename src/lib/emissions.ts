import { EMISSION_FACTORS } from './constants';
import type { TransportData, FoodData, EnergyData, ShoppingData, CategoryBreakdown } from '@/types';

export function calculateTransportEmissions(data: TransportData): number {
  const factorKey = `car${data.carFuel.charAt(0).toUpperCase() + data.carFuel.slice(1)}` as keyof typeof EMISSION_FACTORS.transport;
  const carFactor = EMISSION_FACTORS.transport[factorKey] || EMISSION_FACTORS.transport.carGasoline;
  const carEmissions = data.carDistance * carFactor;
  
  const publicEmissions = data.publicTransitDistance * EMISSION_FACTORS.transport.publicTransit;
  
  const flightMultiplier = data.flightRoundTrip ? 2 : 1;
  const flightEmissions = data.flightDistance * EMISSION_FACTORS.transport.flight * flightMultiplier;
  
  return carEmissions + publicEmissions + flightEmissions;
}

export function calculateFoodEmissions(data: FoodData): number {
  const meatEmissions = data.meatMeals * EMISSION_FACTORS.food.meatMeal;
  const vegEmissions = data.vegetarianMeals * EMISSION_FACTORS.food.vegetarianMeal;
  const veganEmissions = data.veganMeals * EMISSION_FACTORS.food.veganMeal;
  const wasteEmissions = EMISSION_FACTORS.food.foodWaste[data.foodWaste];
  const takeoutEmissions = data.takeoutMeals * EMISSION_FACTORS.food.takeout;
  
  return meatEmissions + vegEmissions + veganEmissions + wasteEmissions + takeoutEmissions;
}

export function calculateEnergyEmissions(data: EnergyData): number {
  let baseEmissions: number;
  if (data.electricityUsage <= 33) {
    baseEmissions = EMISSION_FACTORS.energy.electricityLow;
  } else if (data.electricityUsage <= 66) {
    baseEmissions = EMISSION_FACTORS.energy.electricityMedium;
  } else {
    baseEmissions = EMISSION_FACTORS.energy.electricityHigh;
  }
  
  const heatingMultiplier = EMISSION_FACTORS.energy.heatingMultiplier[data.heatingType];
  const renewableReduction = data.renewablePercent / 100;
  
  return baseEmissions * heatingMultiplier * (1 - renewableReduction * 0.8);
}

export function calculateShoppingEmissions(data: ShoppingData): number {
  const clothingEmissions = data.clothingItems * EMISSION_FACTORS.shopping.clothingItem;
  const electronicsEmissions = data.electronicsPurchase ? EMISSION_FACTORS.shopping.electronics : 0;
  const packagingEmissions = EMISSION_FACTORS.shopping.packaging[data.packaging];
  const secondhandOffset = data.secondhandItems * EMISSION_FACTORS.shopping.secondhandOffset;
  
  return clothingEmissions + electronicsEmissions + packagingEmissions - secondhandOffset;
}

export function getCarbonScore(weeklyTotal: number): number {
  const maxEmissions = 200;
  const score = Math.max(0, Math.min(100, 100 - (weeklyTotal / maxEmissions) * 100));
  return Math.round(score);
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent!';
  if (score >= 60) return 'Good job!';
  if (score >= 40) return 'Getting there!';
  return 'Room for improvement';
}

export function getScoreColor(score: number): string {
  if (score >= 80) return '#52B788';
  if (score >= 60) return '#00C9A7';
  if (score >= 40) return '#F9A826';
  return '#FF6B6B';
}

export function getCategoryBreakdown(transport: number, food: number, energy: number, shopping: number): CategoryBreakdown {
  return { transport, food, energy, shopping };
}

export function generateTrendData(days: number = 7): { date: string; value: number; average: number }[] {
  const data = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en', { weekday: 'short' }),
      value: Math.round((3 + Math.random() * 12) * 10) / 10,
      average: 8.5,
    });
  }
  return data;
}

export function getHighestCategory(breakdown: CategoryBreakdown): keyof CategoryBreakdown {
  return (Object.entries(breakdown) as [keyof CategoryBreakdown, number][])
    .sort((a, b) => b[1] - a[1])[0][0];
}
