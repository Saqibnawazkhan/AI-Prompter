'use client';

import { useEffect, useCallback } from 'react';

interface KeyboardShortcuts {
  onEscape?: () => void;
  onEnter?: () => void;
  onCtrlN?: () => void;
  onCtrlS?: () => void;
  onCtrlH?: () => void;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcuts) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Escape key
      if (event.key === 'Escape' && shortcuts.onEscape) {
        event.preventDefault();
        shortcuts.onEscape();
        return;
      }

      // Ctrl/Cmd + N (New)
      if ((event.ctrlKey || event.metaKey) && event.key === 'n' && shortcuts.onCtrlN) {
        event.preventDefault();
        shortcuts.onCtrlN();
        return;
      }

      // Ctrl/Cmd + S (Save/Generate)
      if ((event.ctrlKey || event.metaKey) && event.key === 's' && shortcuts.onCtrlS) {
        event.preventDefault();
        shortcuts.onCtrlS();
        return;
      }

      // Ctrl/Cmd + H (History)
      if ((event.ctrlKey || event.metaKey) && event.key === 'h' && shortcuts.onCtrlH) {
        event.preventDefault();
        shortcuts.onCtrlH();
        return;
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}
