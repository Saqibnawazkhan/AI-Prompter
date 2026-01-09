'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { PromptCategory, FormData } from '@/types';
import { getTemplatesForCategory, BaseTemplate } from '@/data/templates';

interface UniversalTemplateSelectorProps {
  category: PromptCategory;
  onSelectTemplate: (data: Partial<FormData>) => void;
  onSkip: () => void;
  onBack: () => void;
}

const categoryConfig: Record<string, { title: string; gradient: string }> = {
  image: { title: 'Image Generation', gradient: 'from-purple-500 to-pink-500' },
  writing: { title: 'Writing & Content', gradient: 'from-orange-500 to-red-500' },
  marketing: { title: 'Marketing', gradient: 'from-green-500 to-emerald-500' },
  data: { title: 'Data Analysis', gradient: 'from-teal-500 to-cyan-500' },
};

export default function UniversalTemplateSelector({
  category,
  onSelectTemplate,
  onSkip,
  onBack,
}: UniversalTemplateSelectorProps) {
  const templates = getTemplatesForCategory(category);
  const config = categoryConfig[category] || { title: 'Templates', gradient: 'from-purple-500 to-blue-500' };

  const handleSelectTemplate = (template: BaseTemplate) => {
    onSelectTemplate(template.data);
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${config.gradient} mb-4`}>
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          {config.title} Templates
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
          Select a pre-configured template to get started quickly, or skip to create from scratch.
        </p>
      </motion.div>

      {/* Templates Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8"
      >
        {templates.map((template, index) => (
          <motion.button
            key={template.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelectTemplate(template)}
            className="group p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 shadow-sm hover:shadow-lg transition-all text-left"
          >
            <div className="text-4xl mb-3">{template.preview}</div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-1 text-sm">
              {template.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {template.description}
            </p>
          </motion.button>
        ))}
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-between items-center"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Categories
        </button>
        <button
          onClick={onSkip}
          className="px-6 py-3 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
        >
          Start from Scratch →
        </button>
      </motion.div>
    </div>
  );
}
