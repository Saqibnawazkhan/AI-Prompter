'use client';

import { motion } from 'framer-motion';
import {
  Zap,
  History,
  Settings,
  HelpCircle,
  Moon,
  Sun,
  Keyboard,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface QuickActionsProps {
  onShowHistory?: () => void;
  onShowShortcuts?: () => void;
  onShowHelp?: () => void;
  className?: string;
}

export default function QuickActions({
  onShowHistory,
  onShowShortcuts,
  onShowHelp,
  className = '',
}: QuickActionsProps) {
  const { theme, toggleTheme } = useTheme();

  const actions = [
    {
      id: 'theme',
      icon: theme === 'dark' ? Sun : Moon,
      label: theme === 'dark' ? 'Light Mode' : 'Dark Mode',
      onClick: toggleTheme,
      color: 'text-yellow-500',
    },
    {
      id: 'history',
      icon: History,
      label: 'History',
      onClick: onShowHistory,
      color: 'text-blue-500',
    },
    {
      id: 'shortcuts',
      icon: Keyboard,
      label: 'Shortcuts',
      onClick: onShowShortcuts,
      color: 'text-purple-500',
    },
    {
      id: 'help',
      icon: HelpCircle,
      label: 'Help',
      onClick: onShowHelp,
      color: 'text-green-500',
    },
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {actions.map((action, index) => (
        <motion.button
          key={action.id}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={action.onClick}
          className="group relative p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm hover:shadow transition-all"
          title={action.label}
        >
          <action.icon className={`w-5 h-5 ${action.color}`} />

          {/* Tooltip */}
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-medium text-white bg-gray-900 dark:bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {action.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
