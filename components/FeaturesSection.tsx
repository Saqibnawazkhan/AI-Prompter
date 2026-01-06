'use client';

import { motion } from 'framer-motion';
import {
  Zap,
  Palette,
  History,
  Download,
  Share2,
  Sparkles,
  Moon,
  Code2,
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Instant Generation',
    description: 'Create comprehensive AI prompts in seconds',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Palette,
    title: '8+ Templates',
    description: 'Pre-built templates for common app types',
    color: 'from-pink-500 to-purple-500',
  },
  {
    icon: History,
    title: 'History Tracking',
    description: 'Access your previous prompts anytime',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Download,
    title: 'Export Options',
    description: 'Download as Markdown or copy to clipboard',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Share2,
    title: 'Easy Sharing',
    description: 'Share prompts with your team instantly',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    icon: Sparkles,
    title: 'Smart Defaults',
    description: 'Intelligent suggestions for missing fields',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Moon,
    title: 'Dark Mode',
    description: 'Beautiful dark theme for night coding',
    color: 'from-gray-500 to-gray-700',
  },
  {
    icon: Code2,
    title: 'Developer Focused',
    description: 'Optimized for AI coding assistants',
    color: 'from-cyan-500 to-blue-500',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to create professional AI development prompts
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-4`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
