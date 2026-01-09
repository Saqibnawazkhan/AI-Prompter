'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ChevronDown, FileText, Code, FileJson } from 'lucide-react';
import toast from 'react-hot-toast';

interface CopyOptionsProps {
  prompt: string;
  className?: string;
}

type CopyFormat = 'plain' | 'markdown' | 'json';

export default function CopyOptions({ prompt, className = '' }: CopyOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState<CopyFormat | null>(null);

  const formats: { id: CopyFormat; label: string; icon: typeof FileText; description: string }[] = [
    { id: 'plain', label: 'Plain Text', icon: FileText, description: 'Simple text format' },
    { id: 'markdown', label: 'Markdown', icon: Code, description: 'With formatting preserved' },
    { id: 'json', label: 'JSON', icon: FileJson, description: 'Structured data format' },
  ];

  const formatPrompt = (format: CopyFormat): string => {
    switch (format) {
      case 'plain':
        // Remove markdown formatting
        return prompt
          .replace(/#+\s/g, '')
          .replace(/\*\*/g, '')
          .replace(/\*/g, '')
          .replace(/`/g, '')
          .replace(/---/g, '');
      case 'markdown':
        return prompt;
      case 'json':
        return JSON.stringify({ prompt, timestamp: new Date().toISOString() }, null, 2);
      default:
        return prompt;
    }
  };

  const handleCopy = async (format: CopyFormat) => {
    try {
      const formattedPrompt = formatPrompt(format);
      await navigator.clipboard.writeText(formattedPrompt);
      setCopied(format);
      toast.success(`Copied as ${formats.find(f => f.id === format)?.label}!`);
      setTimeout(() => setCopied(null), 2000);
      setIsOpen(false);
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main Copy Button */}
      <div className="flex items-center gap-1">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleCopy('markdown')}
          className={`flex items-center gap-2 px-4 py-2 rounded-l-xl font-medium transition-all ${
            copied === 'markdown'
              ? 'bg-green-500 text-white'
              : 'bg-purple-500 text-white hover:bg-purple-600'
          }`}
        >
          {copied === 'markdown' ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          {copied === 'markdown' ? 'Copied!' : 'Copy'}
        </motion.button>

        {/* Dropdown Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center px-2 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-r-xl border-l border-purple-400 transition-colors"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
            >
              <div className="p-2">
                <p className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Copy as...
                </p>
                {formats.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => handleCopy(format.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      copied === format.id
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <format.icon className="w-4 h-4" />
                    <div className="text-left">
                      <div className="text-sm font-medium">{format.label}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {format.description}
                      </div>
                    </div>
                    {copied === format.id && (
                      <Check className="w-4 h-4 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
