'use client';

import { motion } from 'framer-motion';
import { templates, Template } from '@/data/templates';
import { FormData } from '@/types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface TemplateSelectorProps {
  onSelectTemplate: (data: Partial<FormData>) => void;
  onSkip: () => void;
}

export default function TemplateSelector({ onSelectTemplate, onSkip }: TemplateSelectorProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4"
        >
          <Sparkles className="w-4 h-4" />
          Quick Start
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-gray-800 dark:text-white mb-3"
        >
          Start with a Template
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto"
        >
          Choose a pre-configured template to get started quickly, or create from scratch
        </motion.p>
      </div>

      {/* Templates Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {templates.map((template, index) => (
          <TemplateCard
            key={template.id}
            template={template}
            index={index}
            onClick={() => onSelectTemplate(template.data)}
          />
        ))}
      </motion.div>

      {/* Skip Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <button
          onClick={onSkip}
          className="inline-flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors"
        >
          Start from scratch
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}

interface TemplateCardProps {
  template: Template;
  index: number;
  onClick: () => void;
}

function TemplateCard({ template, index, onClick }: TemplateCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glass rounded-2xl p-5 text-left group transition-all hover:shadow-xl"
    >
      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform`}>
        {template.icon}
      </div>

      {/* Content */}
      <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
        {template.name}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
        {template.description}
      </p>

      {/* Platform Badge */}
      <div className="mt-3">
        <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-400">
          {template.data.platform}
        </span>
      </div>
    </motion.button>
  );
}
