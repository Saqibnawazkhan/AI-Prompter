'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface AIBadgeProps {
  model?: string;
  className?: string;
}

export default function AIBadge({ model = 'Groq AI', className = '' }: AIBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 ${className}`}
    >
      <Sparkles className="w-3 h-3 text-purple-500" />
      <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
        Enhanced by {model}
      </span>
    </motion.div>
  );
}
