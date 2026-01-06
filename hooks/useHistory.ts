'use client';

import { useState, useEffect } from 'react';
import { FormData } from '@/types';

export interface HistoryItem {
  id: string;
  timestamp: number;
  formData: FormData;
  prompt: string;
}

const STORAGE_KEY = 'ai-prompter-history';
const MAX_HISTORY = 10;

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load history:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      } catch (error) {
        console.error('Failed to save history:', error);
      }
    }
  }, [history, isLoaded]);

  const addToHistory = (formData: FormData, prompt: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      formData,
      prompt,
    };

    setHistory((prev) => {
      const updated = [newItem, ...prev];
      // Keep only the last MAX_HISTORY items
      return updated.slice(0, MAX_HISTORY);
    });
  };

  const removeFromHistory = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const getHistoryItem = (id: string): HistoryItem | undefined => {
    return history.find((item) => item.id === id);
  };

  return {
    history,
    isLoaded,
    addToHistory,
    removeFromHistory,
    clearHistory,
    getHistoryItem,
  };
}
