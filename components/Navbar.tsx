'use client';

import { Sparkles, Github, Moon, Sun, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

interface NavbarProps {
  onHistoryClick?: () => void;
  historyCount?: number;
}

export default function Navbar({ onHistoryClick, historyCount = 0 }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => window.location.reload()}
          >
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">
              AI Prompter
            </span>
          </motion.div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* History Button */}
            {onHistoryClick && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onHistoryClick}
                className="relative p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="View history"
              >
                <Clock className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                {historyCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {historyCount > 9 ? '9+' : historyCount}
                  </span>
                )}
              </motion.button>
            )}

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </motion.button>

            {/* GitHub Link */}
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://github.com/Saqibnawazkhan/AI-Prompter"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="View on GitHub"
            >
              <Github className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
