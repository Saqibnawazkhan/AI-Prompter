'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export default function ProgressBar({ currentStep, totalSteps, labels }: ProgressBarProps) {
  const percentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {/* Progress Track */}
      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
        />
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between mt-4">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{
                scale: index <= currentStep ? 1 : 0.8,
                backgroundColor: index <= currentStep ? '#8B5CF6' : '#E5E7EB',
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors"
            >
              {index < currentStep ? (
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              ) : (
                <span className={index <= currentStep ? 'text-white' : 'text-gray-500 dark:text-gray-400'}>
                  {index + 1}
                </span>
              )}
            </motion.div>
            {labels && labels[index] && (
              <span
                className={`text-xs mt-2 hidden sm:block ${
                  index <= currentStep
                    ? 'text-purple-600 dark:text-purple-400 font-medium'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                {labels[index]}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Progress Text */}
      <div className="text-center mt-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Step {currentStep + 1} of {totalSteps}
        </span>
      </div>
    </div>
  );
}
