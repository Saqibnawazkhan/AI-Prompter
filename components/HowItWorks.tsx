'use client';

import { motion } from 'framer-motion';
import { MousePointerClick, Settings, Sparkles, Copy } from 'lucide-react';

const steps = [
  {
    icon: MousePointerClick,
    step: '1',
    title: 'Choose Template',
    description: 'Select from 8+ pre-built templates or start from scratch',
  },
  {
    icon: Settings,
    step: '2',
    title: 'Fill Details',
    description: 'Enter your app name, features, and preferences',
  },
  {
    icon: Sparkles,
    step: '3',
    title: 'Generate',
    description: 'Click generate and watch the magic happen',
  },
  {
    icon: Copy,
    step: '4',
    title: 'Use It',
    description: 'Copy the prompt and paste it into any AI assistant',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-gray-50/50 dark:bg-gray-800/30">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Generate professional AI prompts in 4 simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative text-center"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 opacity-30" />
              )}

              {/* Step Number */}
              <div className="relative inline-flex mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-white dark:bg-gray-900 border-2 border-purple-500 rounded-full flex items-center justify-center text-sm font-bold text-purple-500">
                  {step.step}
                </span>
              </div>

              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
