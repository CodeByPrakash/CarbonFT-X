import type { ActivityLog } from '@/types';

const STORAGE_KEY = 'carbonwise-data';

interface PersistedData {
  activities: ActivityLog[];
  commitments: string[];
  achievements: string[];
  weeklyGoal: number;
  lastVisit: string;
  userName: string;
}

const DEFAULT_DATA: PersistedData = {
  activities: [],
  commitments: [],
  achievements: ['first-step'],
  weeklyGoal: 70,
  lastVisit: new Date().toISOString(),
  userName: 'Eco Warrior',
};

export function loadData(): PersistedData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_DATA };
    return { ...DEFAULT_DATA, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_DATA };
  }
}

export function saveData(data: Partial<PersistedData>) {
  try {
    const existing = loadData();
    const updated = { ...existing, ...data, lastVisit: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Silently fail
  }
}

export function clearData() {
  localStorage.removeItem(STORAGE_KEY);
}
