'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Database,
  Target,
  FileSpreadsheet,
  ArrowLeft,
  ArrowRight,
  Wand2,
} from 'lucide-react';
import { DataFormData } from '@/types';

interface DataPromptFormProps {
  onComplete: (data: DataFormData) => void;
  onBack: () => void;
  initialData?: Partial<DataFormData>;
}

const analysisTypes = [
  'Exploratory Analysis',
  'Statistical Analysis',
  'Predictive Modeling',
  'Data Visualization',
  'Dashboard Creation',
  'Trend Analysis',
  'Segmentation',
  'A/B Test Analysis',
  'Cohort Analysis',
  'Sentiment Analysis',
  'Time Series Analysis',
  'Correlation Analysis',
];

const tools = [
  'Python (Pandas, NumPy)',
  'R',
  'SQL',
  'Excel/Google Sheets',
  'Tableau',
  'Power BI',
  'Jupyter Notebook',
  'Apache Spark',
  'Any/Flexible',
];

const visualizations = [
  'Charts & Graphs',
  'Interactive Dashboard',
  'Heatmaps',
  'Scatter Plots',
  'Time Series Charts',
  'Bar/Column Charts',
  'Pie Charts',
  'Box Plots',
  'Geographic Maps',
  'Funnel Charts',
];

const formats = [
  'Report with Insights',
  'Executive Summary',
  'Technical Analysis',
  'Presentation Slides',
  'Interactive Notebook',
  'Dashboard',
];

export default function DataPromptForm({
  onComplete,
  onBack,
  initialData,
}: DataPromptFormProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<DataFormData>>({
    analysisType: '',
    dataDescription: '',
    dataSource: '',
    objectives: '',
    metrics: '',
    visualization: '',
    tools: '',
    format: 'Report with Insights',
    audience: '',
    timeframe: '',
    constraints: '',
    deliverables: '',
    ...initialData,
  });

  const updateField = (field: keyof DataFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const steps = [
    { title: 'Analysis Type', icon: BarChart3 },
    { title: 'Data & Objectives', icon: Database },
    { title: 'Tools & Visualization', icon: FileSpreadsheet },
    { title: 'Output & Deliverables', icon: Target },
  ];

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete(formData as DataFormData);
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
              className={`flex items-center ${i <= step ? 'text-teal-600' : 'text-gray-400'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i <= step
                    ? 'bg-teal-600 text-white'
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
            className="h-full bg-gradient-to-r from-teal-500 to-cyan-500"
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
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 mb-4">
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
                Analysis Type *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {analysisTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => updateField('analysisType', type)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      formData.analysisType === type
                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-teal-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Timeframe
              </label>
              <input
                type="text"
                value={formData.timeframe || ''}
                onChange={(e) => updateField('timeframe', e.target.value)}
                placeholder="e.g., Last 12 months, Q1 2024, Year-over-year..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Data Description *
              </label>
              <textarea
                value={formData.dataDescription || ''}
                onChange={(e) => updateField('dataDescription', e.target.value)}
                placeholder="Describe your data: type, structure, size, key fields..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Data Source
              </label>
              <input
                type="text"
                value={formData.dataSource || ''}
                onChange={(e) => updateField('dataSource', e.target.value)}
                placeholder="e.g., CSV files, Database, API, Google Analytics..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Analysis Objectives *
              </label>
              <textarea
                value={formData.objectives || ''}
                onChange={(e) => updateField('objectives', e.target.value)}
                placeholder="What questions do you want to answer? What insights are you seeking?"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Key Metrics
              </label>
              <input
                type="text"
                value={formData.metrics || ''}
                onChange={(e) => updateField('metrics', e.target.value)}
                placeholder="e.g., Conversion rate, Revenue, Churn rate, CAC..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preferred Tools
              </label>
              <div className="grid grid-cols-3 gap-2">
                {tools.map((tool) => (
                  <button
                    key={tool}
                    onClick={() => updateField('tools', tool)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      formData.tools === tool
                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-teal-300'
                    }`}
                  >
                    {tool}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Visualization Preferences
              </label>
              <div className="grid grid-cols-2 gap-2">
                {visualizations.map((viz) => (
                  <button
                    key={viz}
                    onClick={() => updateField('visualization', viz)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      formData.visualization === viz
                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-teal-300'
                    }`}
                  >
                    {viz}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Output Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                {formats.map((format) => (
                  <button
                    key={format}
                    onClick={() => updateField('format', format)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      formData.format === format
                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-teal-300'
                    }`}
                  >
                    {format}
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
                value={formData.audience || ''}
                onChange={(e) => updateField('audience', e.target.value)}
                placeholder="e.g., Executive team, Technical team, Stakeholders..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Expected Deliverables
              </label>
              <textarea
                value={formData.deliverables || ''}
                onChange={(e) => updateField('deliverables', e.target.value)}
                placeholder="What specific outputs do you need?"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Constraints/Limitations
              </label>
              <textarea
                value={formData.constraints || ''}
                onChange={(e) => updateField('constraints', e.target.value)}
                placeholder="Any limitations or specific requirements..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
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
          disabled={step === 0 && !formData.analysisType}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLastStep ? (
            <>
              <Wand2 className="w-4 h-4" />
              Generate Data Prompt
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
