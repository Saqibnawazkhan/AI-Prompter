'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  BookOpen,
  Palette,
  Feather,
  ArrowLeft,
  ArrowRight,
  Wand2,
} from 'lucide-react';
import { CreativeFormData } from '@/types';

interface CreativePromptFormProps {
  onComplete: (data: CreativeFormData) => void;
  onBack: () => void;
  initialData?: Partial<CreativeFormData>;
}

const genres = [
  'Fantasy',
  'Science Fiction',
  'Romance',
  'Mystery/Thriller',
  'Horror',
  'Historical Fiction',
  'Literary Fiction',
  'Comedy/Humor',
  'Drama',
  'Adventure',
  'Young Adult',
  'Children\'s',
];

const formats = [
  'Short Story',
  'Novel Chapter',
  'Flash Fiction',
  'Poem',
  'Script/Screenplay',
  'Song Lyrics',
  'Monologue',
  'Dialogue Scene',
  'Blog Story',
  'Fan Fiction',
];

const tones = [
  'Light & Playful',
  'Dark & Moody',
  'Romantic',
  'Suspenseful',
  'Humorous',
  'Melancholic',
  'Inspiring',
  'Mysterious',
  'Action-packed',
  'Contemplative',
];

const perspectives = [
  'First Person (I)',
  'Second Person (You)',
  'Third Person Limited',
  'Third Person Omniscient',
  'Multiple POV',
  'Unreliable Narrator',
];

const lengths = [
  'Micro (< 500 words)',
  'Short (500-1500 words)',
  'Medium (1500-5000 words)',
  'Long (5000+ words)',
  'Chapter Length',
];

export default function CreativePromptForm({
  onComplete,
  onBack,
  initialData,
}: CreativePromptFormProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<CreativeFormData>>({
    genre: '',
    format: '',
    theme: '',
    setting: '',
    characters: '',
    plotElements: '',
    tone: '',
    perspective: '',
    length: 'Short (500-1500 words)',
    style: '',
    inspiration: '',
    constraints: '',
    ...initialData,
  });

  const updateField = (field: keyof CreativeFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const steps = [
    { title: 'Genre & Format', icon: BookOpen },
    { title: 'Setting & Characters', icon: Sparkles },
    { title: 'Tone & Style', icon: Palette },
    { title: 'Story Elements', icon: Feather },
  ];

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete(formData as CreativeFormData);
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
              className={`flex items-center ${i <= step ? 'text-pink-600' : 'text-gray-400'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i <= step
                    ? 'bg-pink-600 text-white'
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
            className="h-full bg-gradient-to-r from-pink-500 to-rose-500"
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
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 mb-4">
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
                Genre *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => updateField('genre', genre)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      formData.genre === genre
                        ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-pink-300'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Format *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {formats.map((format) => (
                  <button
                    key={format}
                    onClick={() => updateField('format', format)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      formData.format === format
                        ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-pink-300'
                    }`}
                  >
                    {format}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Length
              </label>
              <div className="grid grid-cols-2 gap-2">
                {lengths.map((length) => (
                  <button
                    key={length}
                    onClick={() => updateField('length', length)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      formData.length === length
                        ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-pink-300'
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
                Setting/World
              </label>
              <textarea
                value={formData.setting || ''}
                onChange={(e) => updateField('setting', e.target.value)}
                placeholder="Describe the time, place, and world of your story..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Characters
              </label>
              <textarea
                value={formData.characters || ''}
                onChange={(e) => updateField('characters', e.target.value)}
                placeholder="Describe the main characters (name, traits, motivations)..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Theme
              </label>
              <input
                type="text"
                value={formData.theme || ''}
                onChange={(e) => updateField('theme', e.target.value)}
                placeholder="e.g., Love conquers all, Coming of age, Redemption..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tone/Mood
              </label>
              <div className="grid grid-cols-2 gap-2">
                {tones.map((tone) => (
                  <button
                    key={tone}
                    onClick={() => updateField('tone', tone)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      formData.tone === tone
                        ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-pink-300'
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Point of View
              </label>
              <div className="grid grid-cols-2 gap-2">
                {perspectives.map((pov) => (
                  <button
                    key={pov}
                    onClick={() => updateField('perspective', pov)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      formData.perspective === pov
                        ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-pink-300'
                    }`}
                  >
                    {pov}
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
                placeholder="e.g., Minimalist, Flowery, Fast-paced, Atmospheric..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Plot Elements/Key Events
              </label>
              <textarea
                value={formData.plotElements || ''}
                onChange={(e) => updateField('plotElements', e.target.value)}
                placeholder="Describe key plot points, conflicts, or events to include..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Inspiration/Reference (Optional)
              </label>
              <textarea
                value={formData.inspiration || ''}
                onChange={(e) => updateField('inspiration', e.target.value)}
                placeholder="e.g., Similar to Harry Potter but darker, Inspired by Greek mythology..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Constraints/Specific Requirements
              </label>
              <textarea
                value={formData.constraints || ''}
                onChange={(e) => updateField('constraints', e.target.value)}
                placeholder="e.g., Must include a twist ending, No violence, Must start with dialogue..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
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
          disabled={step === 0 && (!formData.genre || !formData.format)}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLastStep ? (
            <>
              <Wand2 className="w-4 h-4" />
              Generate Creative Prompt
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
