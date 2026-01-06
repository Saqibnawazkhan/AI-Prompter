'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  Smartphone,
  Globe,
  Monitor,
  Sparkles,
  Check
} from 'lucide-react';
import { FormData } from '@/types';

interface StepWizardProps {
  onComplete: (data: FormData) => void;
}

const appTypes = [
  { id: 'Web App', icon: Globe, color: 'from-blue-500 to-cyan-500' },
  { id: 'Mobile App', icon: Smartphone, color: 'from-purple-500 to-pink-500' },
  { id: 'Desktop App', icon: Monitor, color: 'from-orange-500 to-red-500' },
];

const platforms = {
  'Web App': ['Next.js', 'React', 'Vue.js', 'Angular', 'MERN Stack', 'Django', 'Laravel'],
  'Mobile App': ['React Native', 'Flutter', 'iOS (Swift)', 'Android (Kotlin)', 'Expo'],
  'Desktop App': ['Electron', 'Tauri', '.NET', 'Qt', 'Java FX'],
};

const databases = ['None', 'Firebase', 'MongoDB', 'PostgreSQL', 'MySQL', 'Supabase', 'SQLite'];
const complexities = ['Basic', 'Intermediate', 'Advanced'];

export default function StepWizard({ onComplete }: StepWizardProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState<FormData>({
    appType: '',
    platform: '',
    appName: '',
    appPurpose: '',
    targetUsers: '',
    coreFeatures: '',
    optionalFeatures: '',
    designPreferences: '',
    authentication: 'No',
    database: 'None',
    aiFeatures: '',
    apisIntegrations: '',
    performanceRequirements: '',
    securityRequirements: '',
    deploymentPreference: '',
    complexityLevel: 'Basic',
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    onComplete(formData);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.appType !== '';
      case 2: return formData.platform !== '';
      case 3: return formData.appName !== '' && formData.appPurpose !== '';
      case 4: return formData.coreFeatures !== '';
      case 5: return true;
      default: return false;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Step {step} of {totalSteps}
          </span>
          <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
            {Math.round((step / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="glass rounded-2xl p-8 shadow-xl min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 1: App Type */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    What type of app are you building?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Select the platform for your application
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {appTypes.map((type) => (
                    <motion.button
                      key={type.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => updateField('appType', type.id)}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        formData.appType === type.id
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30'
                          : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mx-auto mb-3`}>
                        <type.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="font-semibold text-gray-800 dark:text-white">
                        {type.id}
                      </span>
                      {formData.appType === type.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2"
                        >
                          <Check className="w-5 h-5 text-purple-500" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Platform */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    Choose your tech stack
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Select the framework or platform you want to use
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {platforms[formData.appType as keyof typeof platforms]?.map((platform) => (
                    <motion.button
                      key={platform}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => updateField('platform', platform)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        formData.platform === platform
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30'
                          : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                      }`}
                    >
                      <span className="font-medium text-gray-800 dark:text-white">
                        {platform}
                      </span>
                    </motion.button>
                  ))}
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Or type your own..."
                    value={!platforms[formData.appType as keyof typeof platforms]?.includes(formData.platform) ? formData.platform : ''}
                    onChange={(e) => updateField('platform', e.target.value)}
                    className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-purple-500 outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Step 3: App Details */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    Tell us about your app
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Give your app a name and describe what it does
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      App Name *
                    </label>
                    <input
                      type="text"
                      value={formData.appName}
                      onChange={(e) => updateField('appName', e.target.value)}
                      placeholder="e.g., TaskMaster Pro"
                      className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-purple-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      What problem does it solve? *
                    </label>
                    <textarea
                      value={formData.appPurpose}
                      onChange={(e) => updateField('appPurpose', e.target.value)}
                      placeholder="Describe the main purpose of your app..."
                      rows={3}
                      className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-purple-500 outline-none transition-colors resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Who are your target users?
                    </label>
                    <input
                      type="text"
                      value={formData.targetUsers}
                      onChange={(e) => updateField('targetUsers', e.target.value)}
                      placeholder="e.g., Students, Developers, Small Businesses"
                      className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-purple-500 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Features */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    What features do you need?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    List the main features (one per line)
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Core Features (Must-Have) *
                    </label>
                    <textarea
                      value={formData.coreFeatures}
                      onChange={(e) => updateField('coreFeatures', e.target.value)}
                      placeholder="- User authentication&#10;- Dashboard&#10;- Data export"
                      rows={4}
                      className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-purple-500 outline-none transition-colors resize-none font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Optional Features (Nice-to-Have)
                    </label>
                    <textarea
                      value={formData.optionalFeatures}
                      onChange={(e) => updateField('optionalFeatures', e.target.value)}
                      placeholder="- Dark mode&#10;- Notifications&#10;- Analytics"
                      rows={3}
                      className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-purple-500 outline-none transition-colors resize-none font-mono text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Technical Details */}
            {step === 5 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    Final Details
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Configure your technical requirements
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Authentication
                    </label>
                    <div className="flex gap-3">
                      {['Yes', 'No'].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => updateField('authentication', opt)}
                          className={`flex-1 p-3 rounded-xl border-2 transition-all ${
                            formData.authentication === opt
                              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30'
                              : 'border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Database
                    </label>
                    <select
                      value={formData.database}
                      onChange={(e) => updateField('database', e.target.value)}
                      className="w-full p-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-purple-500 outline-none"
                    >
                      {databases.map((db) => (
                        <option key={db} value={db}>{db}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Complexity Level
                    </label>
                    <select
                      value={formData.complexityLevel}
                      onChange={(e) => updateField('complexityLevel', e.target.value)}
                      className="w-full p-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-purple-500 outline-none"
                    >
                      {complexities.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Design Style
                    </label>
                    <input
                      type="text"
                      value={formData.designPreferences}
                      onChange={(e) => updateField('designPreferences', e.target.value)}
                      placeholder="e.g., Modern, Minimal, Dark"
                      className="w-full p-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-purple-500 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    AI Features (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.aiFeatures}
                    onChange={(e) => updateField('aiFeatures', e.target.value)}
                    placeholder="e.g., Chatbot, Recommendations, Image Recognition"
                    className="w-full p-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-purple-500 outline-none"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={prevStep}
            disabled={step === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              step === 1
                ? 'opacity-50 cursor-not-allowed'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </motion.button>

          {step < totalSteps ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={nextStep}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                canProceed()
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleComplete}
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-medium bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg transition-all"
            >
              <Sparkles className="w-5 h-5" />
              Generate Prompt
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
