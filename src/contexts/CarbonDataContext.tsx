import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { ActivityLog, CategoryBreakdown, TrendPoint } from '@/types';
import { getCarbonScore, generateTrendData } from '@/lib/emissions';
import { loadData, saveData } from '@/lib/storage';

interface CarbonDataContextType {
  activities: ActivityLog[];
  dailyTotal: number;
  weeklyTotal: number;
  categoryBreakdown: CategoryBreakdown;
  trendData: TrendPoint[];
  carbonScore: number;
  weeklyGoal: number;
  addActivity: (activity: ActivityLog) => void;
  clearActivities: () => void;
  setGoal: (goal: number) => void;
}

const CarbonDataContext = createContext<CarbonDataContextType | null>(null);

export function CarbonDataProvider({ children }: { children: React.ReactNode }) {
  const saved = loadData();
  const [activities, setActivities] = useState<ActivityLog[]>(saved.activities);
  const [weeklyGoal, setWeeklyGoal] = useState(saved.weeklyGoal);

  const dailyTotal = useMemo(() => {
    const today = new Date().toDateString();
    return activities
      .filter(a => new Date(a.date).toDateString() === today)
      .reduce((sum, a) => sum + a.co2e, 0);
  }, [activities]);

  const weeklyTotal = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return activities
      .filter(a => new Date(a.date) >= weekAgo)
      .reduce((sum, a) => sum + a.co2e, 0);
  }, [activities]);

  const categoryBreakdown = useMemo((): CategoryBreakdown => {
    const bd: CategoryBreakdown = { transport: 0, food: 0, energy: 0, shopping: 0 };
    activities.forEach(a => {
      bd[a.category] = (bd[a.category] || 0) + a.co2e;
    });
    return bd;
  }, [activities]);

  const trendData = useMemo(() => generateTrendData(7), [activities]);

  const carbonScore = useMemo(() => getCarbonScore(weeklyTotal), [weeklyTotal]);

  const addActivity = useCallback((activity: ActivityLog) => {
    setActivities(prev => {
      const next = [...prev, activity];
      saveData({ activities: next });
      return next;
    });
  }, []);

  const clearActivities = useCallback(() => {
    setActivities([]);
    saveData({ activities: [] });
  }, []);

  const setGoal = useCallback((goal: number) => {
    setWeeklyGoal(goal);
    saveData({ weeklyGoal: goal });
  }, []);

  const value = useMemo(() => ({
    activities,
    dailyTotal,
    weeklyTotal,
    categoryBreakdown,
    trendData,
    carbonScore,
    weeklyGoal,
    addActivity,
    clearActivities,
    setGoal,
  }), [activities, dailyTotal, weeklyTotal, categoryBreakdown, trendData, carbonScore, weeklyGoal, addActivity, clearActivities, setGoal]);

  return (
    <CarbonDataContext.Provider value={value}>
      {children}
    </CarbonDataContext.Provider>
  );
}

export function useCarbonData() {
  const ctx = useContext(CarbonDataContext);
  if (!ctx) throw new Error('useCarbonData must be used within CarbonDataProvider');
  return ctx;
}
