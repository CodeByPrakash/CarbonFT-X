import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { loadData, saveData } from '@/lib/storage';

interface UserContextType {
  name: string;
  commitments: string[];
  achievements: string[];
  addCommitment: (id: string) => void;
  removeCommitment: (id: string) => void;
  hasCommitment: (id: string) => boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const saved = loadData();
  const [commitments, setCommitments] = useState<string[]>(saved.commitments);
  const [achievements] = useState<string[]>(saved.achievements);

  const addCommitment = useCallback((id: string) => {
    setCommitments(prev => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      saveData({ commitments: next });
      return next;
    });
  }, []);

  const removeCommitment = useCallback((id: string) => {
    setCommitments(prev => {
      const next = prev.filter(c => c !== id);
      saveData({ commitments: next });
      return next;
    });
  }, []);

  const hasCommitment = useCallback((id: string) => commitments.includes(id), [commitments]);

  const value = useMemo(() => ({
    name: saved.userName,
    commitments,
    achievements,
    addCommitment,
    removeCommitment,
    hasCommitment,
  }), [commitments, achievements, addCommitment, removeCommitment, hasCommitment]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}
