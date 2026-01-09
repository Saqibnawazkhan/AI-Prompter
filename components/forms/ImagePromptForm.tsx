'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Image,
  Palette,
  Sun,
  Camera,
  Layers,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Wand2,
} from 'lucide-react';
import { ImageFormData } from '@/types';

interface ImagePromptFormProps {
  onComplete: (data: ImageFormData) => void;
  onBack: () => void;
  initialData?: Partial<ImageFormData>;
}

const styles = [
  'Photorealistic',
  'Digital Art',
  'Oil Painting',
  'Watercolor',
  'Anime/Manga',
  '3D Render',
  'Pencil Sketch',
  'Pop Art',
  'Minimalist',
  'Surrealism',
  'Fantasy Art',
  'Cyberpunk',
  'Steampunk',
  'Art Nouveau',
  'Abstract',
];

const moods = [
  'Happy/Joyful',
  'Mysterious',
  'Dramatic',
  'Peaceful/Serene',
  'Dark/Moody',
  'Energetic',
  'Romantic',
  'Nostalgic',
  'Futuristic',
  'Whimsical',
];

const lightingOptions = [
  'Natural daylight',
  'Golden hour',
  'Blue hour',
  'Studio lighting',
  'Dramatic shadows',
  'Soft diffused',
  'Neon/Cyberpunk',
  'Candlelight',
  'Moonlight',
  'Rim lighting',
];

const aspectRatios = [
  '1:1 (Square)',
  '16:9 (Widescreen)',
  '9:16 (Portrait)',
  '4:3 (Standard)',
  '3:2 (Photo)',
  '21:9 (Cinematic)',
];

const qualityOptions = [
  '4K, Ultra HD',
  '8K, Extremely detailed',
  'High resolution',
  'Masterpiece quality',
  'Professional photography',
  'Award-winning',
];

export default function ImagePromptForm({
  onComplete,
  onBack,
  initialData,
}: ImagePromptFormProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<ImageFormData>>({
    subject: '',
    style: '',
    mood: '',
    colorPalette: '',
    composition: '',
    lighting: '',
    perspective: '',
    details: '',
    background: '',
    artisticReference: '',
    quality: '4K, Ultra HD',
    aspectRatio: '1:1 (Square)',
    negativePrompts: '',
    ...initialData,
  });

  const updateField = (field: keyof ImageFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const steps = [
    {
      title: 'Subject & Style',
      icon: Image,
      fields: ['subject', 'style'],
    },
    {
      title: 'Mood & Colors',
      icon: Palette,
      fields: ['mood', 'colorPalette'],
    },
    {
      title: 'Lighting & Composition',
      icon: Sun,
      fields: ['lighting', 'composition', 'perspective'],
    },
    {
      title: 'Details & Background',
      icon: Layers,
      fields: ['details', 'background', 'artisticReference'],
    },
    {
      title: 'Quality & Settings',
      icon: Camera,
      fields: ['quality', 'aspectRatio', 'negativePrompts'],
    },
  ];

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete(formData as ImageFormData);
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
              className={`flex items-center ${i <= step ? 'text-purple-600' : 'text-gray-400'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i <= step
                    ? 'bg-purple-600 text-white'
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
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
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
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-4">
          <currentStep.icon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {currentStep.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Step {step + 1} of {steps.length}
        </p>
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
                What do you want to create? *
              </label>
              <textarea
                value={formData.subject || ''}
                onChange={(e) => updateField('subject', e.target.value)}
                placeholder="e.g., A majestic dragon flying over a medieval castle at sunset..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Art Style *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {styles.map((style) => (
                  <button
                    key={style}
                    onClick={() => updateField('style', style)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      formData.style === style
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-purple-300'
                    }`}
                  >
                    {style}
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
                Mood/Atmosphere
              </label>
              <div className="grid grid-cols-2 gap-2">
                {moods.map((mood) => (
                  <button
                    key={mood}
                    onClick={() => updateField('mood', mood)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      formData.mood === mood
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-purple-300'
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Color Palette
              </label>
              <input
                type="text"
                value={formData.colorPalette || ''}
                onChange={(e) => updateField('colorPalette', e.target.value)}
                placeholder="e.g., Warm sunset colors, blue and gold, monochrome..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Lighting
              </label>
              <div className="grid grid-cols-2 gap-2">
                {lightingOptions.map((lighting) => (
                  <button
                    key={lighting}
                    onClick={() => updateField('lighting', lighting)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      formData.lighting === lighting
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-purple-300'
                    }`}
                  >
                    {lighting}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Composition
              </label>
              <input
                type="text"
                value={formData.composition || ''}
                onChange={(e) => updateField('composition', e.target.value)}
                placeholder="e.g., Rule of thirds, centered, close-up, wide shot..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Camera Perspective
              </label>
              <input
                type="text"
                value={formData.perspective || ''}
                onChange={(e) => updateField('perspective', e.target.value)}
                placeholder="e.g., Bird's eye view, low angle, eye level, Dutch angle..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Additional Details
              </label>
              <textarea
                value={formData.details || ''}
                onChange={(e) => updateField('details', e.target.value)}
                placeholder="e.g., Intricate patterns, glowing eyes, flowing cape, sparkles..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Background
              </label>
              <input
                type="text"
                value={formData.background || ''}
                onChange={(e) => updateField('background', e.target.value)}
                placeholder="e.g., Starry night sky, gradient background, forest..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Artistic Reference (Optional)
              </label>
              <input
                type="text"
                value={formData.artisticReference || ''}
                onChange={(e) => updateField('artisticReference', e.target.value)}
                placeholder="e.g., In the style of Studio Ghibli, like Van Gogh..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quality Level
              </label>
              <div className="grid grid-cols-2 gap-2">
                {qualityOptions.map((quality) => (
                  <button
                    key={quality}
                    onClick={() => updateField('quality', quality)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      formData.quality === quality
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-purple-300'
                    }`}
                  >
                    {quality}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-3 gap-2">
                {aspectRatios.map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => updateField('aspectRatio', ratio)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      formData.aspectRatio === ratio
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-purple-300'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Negative Prompts (What to avoid)
              </label>
              <input
                type="text"
                value={formData.negativePrompts || ''}
                onChange={(e) => updateField('negativePrompts', e.target.value)}
                placeholder="e.g., blurry, low quality, text, watermark..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </>
        )}
      </motion.div>

      {/* Navigation Buttons */}
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
          disabled={step === 0 && !formData.subject}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLastStep ? (
            <>
              <Wand2 className="w-4 h-4" />
              Generate Image Prompt
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
