'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Users,
  Mic,
  Target,
  ArrowLeft,
  ArrowRight,
  Wand2,
} from 'lucide-react';
import { WritingFormData } from '@/types';

interface WritingPromptFormProps {
  onComplete: (data: WritingFormData) => void;
  onBack: () => void;
  initialData?: Partial<WritingFormData>;
}

const contentTypes = [
  'Blog Post',
  'Article',
  'Social Media Post',
  'Email',
  'Newsletter',
  'Product Description',
  'Landing Page Copy',
  'Press Release',
  'Case Study',
  'White Paper',
  'Ebook Chapter',
  'Video Script',
];

const tones = [
  'Professional',
  'Casual/Friendly',
  'Formal',
  'Humorous',
  'Inspirational',
  'Educational',
  'Persuasive',
  'Empathetic',
  'Authoritative',
  'Conversational',
];

const lengths = [
  'Short (100-300 words)',
  'Medium (300-700 words)',
  'Long (700-1500 words)',
  'In-depth (1500+ words)',
];

const formats = [
  'Listicle',
  'How-to Guide',
  'Q&A Format',
  'Narrative',
  'Comparison',
  'Problem-Solution',
  'Interview Style',
  'Step-by-Step',
];

export default function WritingPromptForm({
  onComplete,
  onBack,
  initialData,
}: WritingPromptFormProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<WritingFormData>>({
    contentType: '',
    topic: '',
    tone: '',
    targetAudience: '',
    length: 'Medium (300-700 words)',
    purpose: '',
    keyPoints: '',
    style: '',
    format: '',
    keywords: '',
    callToAction: '',
    additionalNotes: '',
    ...initialData,
  });

  const updateField = (field: keyof WritingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const steps = [
    { title: 'Content Type', icon: FileText },
    { title: 'Topic & Audience', icon: Users },
    { title: 'Tone & Style', icon: Mic },
    { title: 'Details & Keywords', icon: Target },
  ];

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete(formData as WritingFormData);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step === 0) {
      onBack();
    } else {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`flex items-center ${i <= step ? 'text-green-600' : 'text-gray-400'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i <= step
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                {i + 1}
              </div>
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
          />
        </div>
      </div>

      {/* Step Header */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 mb-4">
          <currentStep.icon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {currentStep.title}
        </h2>
      </motion.div>

      {/* Form Fields */}
      <motion.div
        key={`fields-${step}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {step === 0 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content Type *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {contentTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => updateField('contentType', type)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      formData.contentType === type
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-green-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content Length
              </label>
              <div className="grid grid-cols-2 gap-2">
                {lengths.map((length) => (
                  <button
                    key={length}
                    onClick={() => updateField('length', length)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      formData.length === length
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-green-300'
                    }`}
                  >
                    {length}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Topic/Subject *
              </label>
              <textarea
                value={formData.topic || ''}
                onChange={(e) => updateField('topic', e.target.value)}
                placeholder="What should the content be about?"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Audience
              </label>
              <input
                type="text"
                value={formData.targetAudience || ''}
                onChange={(e) => updateField('targetAudience', e.target.value)}
                placeholder="e.g., Marketing professionals, small business owners, students..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Purpose/Goal
              </label>
              <input
                type="text"
                value={formData.purpose || ''}
                onChange={(e) => updateField('purpose', e.target.value)}
                placeholder="e.g., Educate, persuade, inform, entertain..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tone of Voice
              </label>
              <div className="grid grid-cols-2 gap-2">
                {tones.map((tone) => (
                  <button
                    key={tone}
                    onClick={() => updateField('tone', tone)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      formData.tone === tone
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-green-300'
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                {formats.map((format) => (
                  <button
                    key={format}
                    onClick={() => updateField('format', format)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      formData.format === format
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-green-300'
                    }`}
                  >
                    {format}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Writing Style (Optional)
              </label>
              <input
                type="text"
                value={formData.style || ''}
                onChange={(e) => updateField('style', e.target.value)}
                placeholder="e.g., Storytelling, data-driven, minimalist..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Key Points to Cover
              </label>
              <textarea
                value={formData.keyPoints || ''}
                onChange={(e) => updateField('keyPoints', e.target.value)}
                placeholder="List the main points or sections to include..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                SEO Keywords (Optional)
              </label>
              <input
                type="text"
                value={formData.keywords || ''}
                onChange={(e) => updateField('keywords', e.target.value)}
                placeholder="e.g., digital marketing, SEO tips, content strategy..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Call to Action
              </label>
              <input
                type="text"
                value={formData.callToAction || ''}
                onChange={(e) => updateField('callToAction', e.target.value)}
                placeholder="What should readers do after reading?"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Additional Notes
              </label>
              <textarea
                value={formData.additionalNotes || ''}
                onChange={(e) => updateField('additionalNotes', e.target.value)}
                placeholder="Any other requirements or preferences..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                rows={2}
              />
            </div>
          </>
        )}
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleBack}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          disabled={step === 0 && !formData.contentType}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLastStep ? (
            <>
              <Wand2 className="w-4 h-4" />
              Generate Writing Prompt
            </>
          ) : (
            <>
              Next
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
