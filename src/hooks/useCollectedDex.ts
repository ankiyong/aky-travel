import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'collected_destinations';

function readStoredIds(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

export function useCollectedDex() {
  const [collectedIds, setCollectedIds] = useState<string[]>(() => readStoredIds());
  const [lastStampedId, setLastStampedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedIds));
    } catch {
      // Ignore storage quota / privacy mode errors
    }
  }, [collectedIds]);

  const isCollected = useCallback(
    (id: string) => collectedIds.includes(id),
    [collectedIds]
  );

  const toggleCollect = useCallback((id: string) => {
    setCollectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      setLastStampedId(id);
      return [...prev, id];
    });
  }, []);

  const clearLastStamped = useCallback(() => {
    setLastStampedId(null);
  }, []);

  return {
    collectedIds,
    isCollected,
    toggleCollect,
    lastStampedId,
    clearLastStamped,
  };
}
