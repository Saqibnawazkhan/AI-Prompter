'use client';

import { motion } from 'framer-motion';
import {
  Code,
  Image,
  FileText,
  Megaphone,
  Briefcase,
  GraduationCap,
  Sparkles,
  BarChart3,
  ArrowRight,
} from 'lucide-react';
import { categories } from '@/data/categories';
import { PromptCategory } from '@/types';

interface CategorySelectorProps {
  onSelectCategory: (category: PromptCategory) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  Image,
  FileText,
  Megaphone,
  Briefcase,
  GraduationCap,
  Sparkles,
  BarChart3,
};

export default function CategorySelector({ onSelectCategory }: CategorySelectorProps) {
  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          What type of prompt do you need?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Choose a category to get started. Each category is optimized to generate
          the perfect prompt for your specific use case.
        </p>
      </motion.div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => {
          const IconComponent = iconMap[category.icon];

          return (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectCategory(category.id)}
              className="group glass p-6 rounded-2xl text-left card-hover relative overflow-hidden"
            >
              {/* Background Gradient on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {IconComponent && (
                  <IconComponent className="w-7 h-7 text-white" />
                )}
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {category.description}
              </p>

              {/* Arrow */}
              <div className="flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Get Started
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Popular Categories Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center"
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
            <Sparkles className="w-4 h-4" />
            Most popular: Development & Image Generation
          </span>
        </p>
      </motion.div>
    </div>
  );
}
