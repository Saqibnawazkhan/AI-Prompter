'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = 'Generating your prompt...' }: LoadingSpinnerProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl p-8 text-center max-w-sm mx-4"
      >
        {/* Animated Icon */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
            scale: { duration: 1, repeat: Infinity },
          }}
          className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center"
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>

        {/* Loading Text */}
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          {message}
        </h3>

        {/* Animated Dots */}
        <div className="flex justify-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [-2, 2, -2],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 rounded-full bg-purple-500"
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
          />
        </div>
      </motion.div>
    </div>
  );
}
