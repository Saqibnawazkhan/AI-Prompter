'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Megaphone,
  Target,
  DollarSign,
  TrendingUp,
  ArrowLeft,
  ArrowRight,
  Wand2,
} from 'lucide-react';
import { MarketingFormData } from '@/types';

interface MarketingPromptFormProps {
  onComplete: (data: MarketingFormData) => void;
  onBack: () => void;
  initialData?: Partial<MarketingFormData>;
}

const campaignTypes = [
  'Social Media Campaign',
  'Email Marketing',
  'PPC/Google Ads',
  'Content Marketing',
  'Influencer Marketing',
  'Product Launch',
  'Brand Awareness',
  'Lead Generation',
  'Retargeting',
  'Seasonal Campaign',
  'Event Promotion',
  'Referral Program',
];

const platforms = [
  'Facebook',
  'Instagram',
  'LinkedIn',
  'Twitter/X',
  'TikTok',
  'YouTube',
  'Google Ads',
  'Email',
  'Pinterest',
  'Reddit',
  'Multi-platform',
];

const tones = [
  'Professional',
  'Playful/Fun',
  'Urgent',
  'Inspirational',
  'Educational',
  'Luxurious',
  'Friendly',
  'Bold/Edgy',
  'Trustworthy',
  'Exclusive',
];

const budgets = [
  'Low ($100-500)',
  'Medium ($500-2,000)',
  'High ($2,000-10,000)',
  'Enterprise ($10,000+)',
  'Not specified',
];

export default function MarketingPromptForm({
  onComplete,
  onBack,
  initialData,
}: MarketingPromptFormProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<MarketingFormData>>({
    campaignType: '',
    product: '',
    targetAudience: '',
    platform: '',
    tone: '',
    uniqueSellingPoints: '',
    callToAction: '',
    budget: 'Not specified',
    goals: '',
    competitorInfo: '',
    brandVoice: '',
    timeline: '',
    ...initialData,
  });

  const updateField = (field: keyof MarketingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const steps = [
    { title: 'Campaign Type', icon: Megaphone },
    { title: 'Product & Audience', icon: Target },
    { title: 'Brand & Tone', icon: TrendingUp },
    { title: 'Goals & Budget', icon: DollarSign },
  ];

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete(formData as MarketingFormData);
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
              className={`flex items-center ${i <= step ? 'text-orange-600' : 'text-gray-400'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i <= step
                    ? 'bg-orange-600 text-white'
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
            className="h-full bg-gradient-to-r from-orange-500 to-red-500"
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
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 mb-4">
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
                Campaign Type *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {campaignTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => updateField('campaignType', type)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      formData.campaignType === type
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-orange-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Platform
              </label>
              <div className="grid grid-cols-3 gap-2">
                {platforms.map((platform) => (
                  <button
                    key={platform}
                    onClick={() => updateField('platform', platform)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      formData.platform === platform
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-orange-300'
                    }`}
                  >
                    {platform}
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
                Product/Service *
              </label>
              <textarea
                value={formData.product || ''}
                onChange={(e) => updateField('product', e.target.value)}
                placeholder="Describe your product or service..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Audience *
              </label>
              <textarea
                value={formData.targetAudience || ''}
                onChange={(e) => updateField('targetAudience', e.target.value)}
                placeholder="Demographics, interests, behaviors, pain points..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Unique Selling Points
              </label>
              <textarea
                value={formData.uniqueSellingPoints || ''}
                onChange={(e) => updateField('uniqueSellingPoints', e.target.value)}
                placeholder="What makes your product/service unique?"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                rows={2}
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Brand Tone
              </label>
              <div className="grid grid-cols-2 gap-2">
                {tones.map((tone) => (
                  <button
                    key={tone}
                    onClick={() => updateField('tone', tone)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      formData.tone === tone
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-orange-300'
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Brand Voice Guidelines
              </label>
              <textarea
                value={formData.brandVoice || ''}
                onChange={(e) => updateField('brandVoice', e.target.value)}
                placeholder="Describe your brand's personality and voice..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                rows={2}
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
                placeholder="e.g., Shop Now, Sign Up, Learn More..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Campaign Goals *
              </label>
              <textarea
                value={formData.goals || ''}
                onChange={(e) => updateField('goals', e.target.value)}
                placeholder="What do you want to achieve? (e.g., increase sales by 20%, get 1000 leads...)"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Budget Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                {budgets.map((budget) => (
                  <button
                    key={budget}
                    onClick={() => updateField('budget', budget)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      formData.budget === budget
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-orange-300'
                    }`}
                  >
                    {budget}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Timeline
              </label>
              <input
                type="text"
                value={formData.timeline || ''}
                onChange={(e) => updateField('timeline', e.target.value)}
                placeholder="e.g., 2 weeks, 1 month, Q1 2024..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Competitor Information (Optional)
              </label>
              <textarea
                value={formData.competitorInfo || ''}
                onChange={(e) => updateField('competitorInfo', e.target.value)}
                placeholder="Key competitors and what they're doing..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
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
          disabled={step === 0 && !formData.campaignType}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLastStep ? (
            <>
              <Wand2 className="w-4 h-4" />
              Generate Marketing Prompt
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
