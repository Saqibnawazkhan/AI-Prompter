'use client';

import { motion } from 'framer-motion';
import { FileText, Hash, Clock, BarChart3 } from 'lucide-react';

interface PromptStatsProps {
  prompt: string;
  className?: string;
}

export default function PromptStats({ prompt, className = '' }: PromptStatsProps) {
  const wordCount = prompt.trim().split(/\s+/).filter(word => word.length > 0).length;
  const charCount = prompt.length;
  const lineCount = prompt.split('\n').length;
  const estimatedReadTime = Math.ceil(wordCount / 200); // Average reading speed

  const stats = [
    { label: 'Words', value: wordCount.toLocaleString(), icon: FileText, color: 'text-blue-500' },
    { label: 'Characters', value: charCount.toLocaleString(), icon: Hash, color: 'text-purple-500' },
    { label: 'Lines', value: lineCount.toLocaleString(), icon: BarChart3, color: 'text-green-500' },
    { label: 'Read Time', value: `${estimatedReadTime} min`, icon: Clock, color: 'text-orange-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`grid grid-cols-4 gap-4 ${className}`}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
        >
          <stat.icon className={`w-5 h-5 ${stat.color} mb-1`} />
          <span className="text-lg font-bold text-gray-800 dark:text-white">
            {stat.value}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
