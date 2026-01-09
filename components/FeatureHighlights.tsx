'use client';

import { motion } from 'framer-motion';
import {
  Image,
  PenTool,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Lightbulb,
  BarChart3,
  Code,
  Sparkles,
  Zap,
} from 'lucide-react';

const features = [
  {
    icon: Code,
    title: 'Development',
    description: 'Create detailed prompts for web, mobile, and desktop apps',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Image,
    title: 'Image Generation',
    description: 'DALL-E, Midjourney, and Stable Diffusion prompts',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: PenTool,
    title: 'Writing & Content',
    description: 'Blog posts, articles, emails, and social media',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: TrendingUp,
    title: 'Marketing',
    description: 'Campaign strategies and marketing content',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Briefcase,
    title: 'Business',
    description: 'Proposals, reports, and business documents',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'Lesson plans, tutorials, and learning materials',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Lightbulb,
    title: 'Creative',
    description: 'Stories, poetry, scripts, and creative writing',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: BarChart3,
    title: 'Data Analysis',
    description: 'Analytics, visualizations, and insights prompts',
    gradient: 'from-teal-500 to-cyan-500',
  },
];

interface FeatureHighlightsProps {
  className?: string;
}

export default function FeatureHighlights({ className = '' }: FeatureHighlightsProps) {
  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4"
        >
          <Sparkles className="w-4 h-4" />
          8 Prompt Categories
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
        >
          One Tool for All Your AI Prompts
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          From development to data analysis, create professional prompts for any use case.
          Works with ChatGPT, Claude, Midjourney, and more.
        </motion.p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-transparent hover:shadow-lg transition-all cursor-pointer"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Powered By */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-wrap items-center justify-center gap-4 pt-4"
      >
        <span className="text-sm text-gray-500 dark:text-gray-400">Works with:</span>
        {['ChatGPT', 'Claude', 'Midjourney', 'DALL-E', 'Stable Diffusion'].map((tool) => (
          <span
            key={tool}
            className="px-3 py-1.5 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg"
          >
            {tool}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
