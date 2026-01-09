'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  BookOpen,
  Users,
  ClipboardList,
  ArrowLeft,
  ArrowRight,
  Wand2,
} from 'lucide-react';
import { EducationFormData } from '@/types';

interface EducationPromptFormProps {
  onComplete: (data: EducationFormData) => void;
  onBack: () => void;
  initialData?: Partial<EducationFormData>;
}

const contentTypes = [
  'Lesson Plan',
  'Course Outline',
  'Quiz/Test',
  'Study Guide',
  'Tutorial',
  'Worksheet',
  'Presentation',
  'Assignment',
  'Rubric',
  'Flashcards',
  'Case Study',
  'Discussion Questions',
];

const gradeLevels = [
  'Elementary (K-5)',
  'Middle School (6-8)',
  'High School (9-12)',
  'Undergraduate',
  'Graduate',
  'Professional/Adult',
  'All Ages',
];

const teachingStyles = [
  'Lecture-based',
  'Interactive/Hands-on',
  'Discussion-based',
  'Project-based',
  'Flipped Classroom',
  'Inquiry-based',
  'Gamified',
  'Blended Learning',
];

const assessmentTypes = [
  'Multiple Choice',
  'Essay/Written',
  'Project-based',
  'Practical/Lab',
  'Oral Presentation',
  'Portfolio',
  'Peer Assessment',
  'Self-Assessment',
];

export default function EducationPromptForm({
  onComplete,
  onBack,
  initialData,
}: EducationPromptFormProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<EducationFormData>>({
    contentType: '',
    subject: '',
    gradeLevel: '',
    learningObjectives: '',
    duration: '',
    teachingStyle: '',
    assessmentType: '',
    resources: '',
    prerequisites: '',
    accommodations: '',
    activities: '',
    additionalNotes: '',
    ...initialData,
  });

  const updateField = (field: keyof EducationFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const steps = [
    { title: 'Content Type', icon: BookOpen },
    { title: 'Subject & Level', icon: GraduationCap },
    { title: 'Teaching Style', icon: Users },
    { title: 'Assessment & Resources', icon: ClipboardList },
  ];

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete(formData as EducationFormData);
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
              className={`flex items-center ${i <= step ? 'text-indigo-600' : 'text-gray-400'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i <= step
                    ? 'bg-indigo-600 text-white'
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
            className="h-full bg-gradient-to-r from-indigo-500 to-blue-500"
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
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 mb-4">
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
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-indigo-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duration/Time
              </label>
              <input
                type="text"
                value={formData.duration || ''}
                onChange={(e) => updateField('duration', e.target.value)}
                placeholder="e.g., 45 minutes, 1 hour, 2 weeks..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject/Topic *
              </label>
              <textarea
                value={formData.subject || ''}
                onChange={(e) => updateField('subject', e.target.value)}
                placeholder="What subject or topic is this for?"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Grade Level
              </label>
              <div className="grid grid-cols-2 gap-2">
                {gradeLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => updateField('gradeLevel', level)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      formData.gradeLevel === level
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-indigo-300'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Learning Objectives
              </label>
              <textarea
                value={formData.learningObjectives || ''}
                onChange={(e) => updateField('learningObjectives', e.target.value)}
                placeholder="What should students learn or be able to do?"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Prerequisites
              </label>
              <input
                type="text"
                value={formData.prerequisites || ''}
                onChange={(e) => updateField('prerequisites', e.target.value)}
                placeholder="What should students already know?"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Teaching Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {teachingStyles.map((style) => (
                  <button
                    key={style}
                    onClick={() => updateField('teachingStyle', style)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      formData.teachingStyle === style
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-indigo-300'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Activities/Exercises
              </label>
              <textarea
                value={formData.activities || ''}
                onChange={(e) => updateField('activities', e.target.value)}
                placeholder="Describe any specific activities or exercises..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Accommodations (Optional)
              </label>
              <textarea
                value={formData.accommodations || ''}
                onChange={(e) => updateField('accommodations', e.target.value)}
                placeholder="Any special accommodations or differentiation needed?"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                rows={2}
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Assessment Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {assessmentTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => updateField('assessmentType', type)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      formData.assessmentType === type
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-indigo-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Resources Needed
              </label>
              <textarea
                value={formData.resources || ''}
                onChange={(e) => updateField('resources', e.target.value)}
                placeholder="Materials, technology, or resources needed..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Additional Notes
              </label>
              <textarea
                value={formData.additionalNotes || ''}
                onChange={(e) => updateField('additionalNotes', e.target.value)}
                placeholder="Any other requirements or notes..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
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
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLastStep ? (
            <>
              <Wand2 className="w-4 h-4" />
              Generate Education Prompt
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
