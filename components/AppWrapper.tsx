'use client';

import { useState, useEffect } from 'react';
import { useHistory, HistoryItem } from '@/hooks/useHistory';
import { useConfetti } from '@/hooks/useConfetti';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HistoryPanel from '@/components/HistoryPanel';
import LoadingSpinner from '@/components/LoadingSpinner';
import ScrollToTop from '@/components/ScrollToTop';
import { FormData } from '@/types';

interface AppWrapperProps {
  children: React.ReactNode;
}

// Context to share app-level state
import { createContext, useContext } from 'react';

interface AppContextType {
  addToHistory: (formData: FormData, prompt: string) => void;
  showLoading: () => void;
  hideLoading: () => void;
  fireConfetti: () => void;
  viewHistoryItem: (item: HistoryItem) => void;
  selectedHistoryItem: HistoryItem | null;
  clearSelectedHistoryItem: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppWrapper');
  }
  return context;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<HistoryItem | null>(null);
  const { history, addToHistory, removeFromHistory, clearHistory } = useHistory();
  const { fireConfetti } = useConfetti();

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  const viewHistoryItem = (item: HistoryItem) => {
    setSelectedHistoryItem(item);
    setIsHistoryOpen(false);
  };

  const clearSelectedHistoryItem = () => {
    setSelectedHistoryItem(null);
  };

  const contextValue: AppContextType = {
    addToHistory,
    showLoading,
    hideLoading,
    fireConfetti,
    viewHistoryItem,
    selectedHistoryItem,
    clearSelectedHistoryItem,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar
          onHistoryClick={() => setIsHistoryOpen(true)}
          historyCount={history.length}
        />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </div>

      {/* History Panel */}
      <HistoryPanel
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelect={viewHistoryItem}
        onDelete={removeFromHistory}
        onClear={clearHistory}
      />

      {/* Loading Spinner */}
      {isLoading && <LoadingSpinner />}

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </AppContext.Provider>
  );
}
