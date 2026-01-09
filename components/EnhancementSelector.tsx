'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { enhancementOptions, EnhancementOption } from '@/lib/promptEnhancer';

interface EnhancementSelectorProps {
  selectedEnhancements: string[];
  onToggle: (id: string) => void;
  className?: string;
}

export default function EnhancementSelector({
  selectedEnhancements,
  onToggle,
  className = '',
}: EnhancementSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <div className="text-left">
            <h3 className="font-medium text-gray-800 dark:text-white">
              Enhance Your Prompt
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {selectedEnhancements.length > 0
                ? `${selectedEnhancements.length} enhancement${selectedEnhancements.length > 1 ? 's' : ''} selected`
                : 'Add optional enhancements'}
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {/* Options */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
              {enhancementOptions.map((option) => (
                <EnhancementButton
                  key={option.id}
                  option={option}
                  isSelected={selectedEnhancements.includes(option.id)}
                  onToggle={() => onToggle(option.id)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface EnhancementButtonProps {
  option: EnhancementOption;
  isSelected: boolean;
  onToggle: () => void;
}

function EnhancementButton({ option, isSelected, onToggle }: EnhancementButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onToggle}
      className={`relative p-3 rounded-xl border text-left transition-all ${
        isSelected
          ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-400 dark:border-purple-600'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
      }`}
    >
      {isSelected && (
        <div className="absolute top-2 right-2">
          <Check className="w-4 h-4 text-purple-500" />
        </div>
      )}
      <h4 className={`text-sm font-medium mb-1 pr-5 ${
        isSelected ? 'text-purple-700 dark:text-purple-300' : 'text-gray-800 dark:text-white'
      }`}>
        {option.name}
      </h4>
      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
        {option.description}
      </p>
    </motion.button>
  );
}
