'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  FileText,
  Target,
  Clock,
  ArrowLeft,
  ArrowRight,
  Wand2,
} from 'lucide-react';
import { BusinessFormData } from '@/types';

interface BusinessPromptFormProps {
  onComplete: (data: BusinessFormData) => void;
  onBack: () => void;
  initialData?: Partial<BusinessFormData>;
}

const documentTypes = [
  'Business Plan',
  'Proposal',
  'Executive Summary',
  'SWOT Analysis',
  'Business Report',
  'Meeting Agenda',
  'Meeting Minutes',
  'Project Brief',
  'Strategy Document',
  'SOP Document',
  'Business Case',
  'Pitch Deck Content',
];

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'E-commerce',
  'Education',
  'Manufacturing',
  'Real Estate',
  'Consulting',
  'Marketing',
  'Non-profit',
  'Retail',
  'Other',
];

const tones = [
  'Formal/Corporate',
  'Professional',
  'Persuasive',
  'Analytical',
  'Executive',
  'Informative',
  'Collaborative',
  'Action-oriented',
];

export default function BusinessPromptForm({
  onComplete,
  onBack,
  initialData,
}: BusinessPromptFormProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<BusinessFormData>>({
    documentType: '',
    businessName: '',
    industry: '',
    purpose: '',
    targetAudience: '',
    keyObjectives: '',
    context: '',
    tone: 'Professional',
    constraints: '',
    deliverables: '',
    timeline: '',
    additionalInfo: '',
    ...initialData,
  });

  const updateField = (field: keyof BusinessFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const steps = [
    { title: 'Document Type', icon: FileText },
    { title: 'Business Details', icon: Briefcase },
    { title: 'Objectives', icon: Target },
    { title: 'Requirements', icon: Clock },
  ];

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete(formData as BusinessFormData);
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
              className={`flex items-center ${i <= step ? 'text-slate-600' : 'text-gray-400'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i <= step
                    ? 'bg-slate-600 text-white'
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
            className="h-full bg-gradient-to-r from-slate-500 to-gray-600"
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
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-500 to-gray-600 mb-4">
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
                Document Type *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {documentTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => updateField('documentType', type)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      formData.documentType === type
                        ? 'border-slate-500 bg-slate-50 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-slate-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tone
              </label>
              <div className="grid grid-cols-2 gap-2">
                {tones.map((tone) => (
                  <button
                    key={tone}
                    onClick={() => updateField('tone', tone)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      formData.tone === tone
                        ? 'border-slate-500 bg-slate-50 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-slate-300'
                    }`}
                  >
                    {tone}
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
                Business/Company Name
              </label>
              <input
                type="text"
                value={formData.businessName || ''}
                onChange={(e) => updateField('businessName', e.target.value)}
                placeholder="Enter your business name"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Industry
              </label>
              <div className="grid grid-cols-3 gap-2">
                {industries.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => updateField('industry', industry)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      formData.industry === industry
                        ? 'border-slate-500 bg-slate-50 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-slate-300'
                    }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Audience
              </label>
              <input
                type="text"
                value={formData.targetAudience || ''}
                onChange={(e) => updateField('targetAudience', e.target.value)}
                placeholder="Who will read this document?"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Purpose *
              </label>
              <textarea
                value={formData.purpose || ''}
                onChange={(e) => updateField('purpose', e.target.value)}
                placeholder="What is the main purpose of this document?"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Key Objectives
              </label>
              <textarea
                value={formData.keyObjectives || ''}
                onChange={(e) => updateField('keyObjectives', e.target.value)}
                placeholder="List the main objectives or goals..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Context/Background
              </label>
              <textarea
                value={formData.context || ''}
                onChange={(e) => updateField('context', e.target.value)}
                placeholder="Provide relevant background information..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none"
                rows={2}
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Expected Deliverables
              </label>
              <textarea
                value={formData.deliverables || ''}
                onChange={(e) => updateField('deliverables', e.target.value)}
                placeholder="What should the final document include?"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Constraints/Requirements
              </label>
              <textarea
                value={formData.constraints || ''}
                onChange={(e) => updateField('constraints', e.target.value)}
                placeholder="Any specific requirements or limitations..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Timeline
              </label>
              <input
                type="text"
                value={formData.timeline || ''}
                onChange={(e) => updateField('timeline', e.target.value)}
                placeholder="e.g., Q1 2024, Next month, ASAP..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Additional Information
              </label>
              <textarea
                value={formData.additionalInfo || ''}
                onChange={(e) => updateField('additionalInfo', e.target.value)}
                placeholder="Any other relevant information..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none"
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
          disabled={step === 0 && !formData.documentType}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-slate-600 to-gray-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLastStep ? (
            <>
              <Wand2 className="w-4 h-4" />
              Generate Business Prompt
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
