'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '@/components/Hero';
import CategorySelector from '@/components/CategorySelector';
import TemplateSelector from '@/components/TemplateSelector';
import StepWizard from '@/components/StepWizard';
import PromptOutput from '@/components/PromptOutput';
import PageTransition from '@/components/PageTransition';
import { ImagePromptForm, WritingPromptForm, MarketingPromptForm, BusinessPromptForm, EducationPromptForm, CreativePromptForm } from '@/components/forms';
import { PromptCategory, FormData, DevelopmentFormData, ImageFormData, WritingFormData, MarketingFormData, BusinessFormData, EducationFormData, CreativeFormData } from '@/types';
import { generatePrompt } from '@/lib/generators';
import { useApp } from '@/components/AppWrapper';

type AppState = 'hero' | 'categories' | 'templates' | 'form' | 'output';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('hero');
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory>('development');
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [templateData, setTemplateData] = useState<Partial<FormData> | undefined>();
  const [currentFormData, setCurrentFormData] = useState<FormData | null>(null);

  const { addToHistory, showLoading, hideLoading, fireConfetti, selectedHistoryItem, clearSelectedHistoryItem } = useApp();

  // Handle viewing history item
  useEffect(() => {
    if (selectedHistoryItem) {
      setGeneratedPrompt(selectedHistoryItem.prompt);
      setCurrentFormData(selectedHistoryItem.formData);
      setAppState('output');
      clearSelectedHistoryItem();
    }
  }, [selectedHistoryItem, clearSelectedHistoryItem]);

  const handleGetStarted = () => {
    setAppState('categories');
  };

  const handleSelectCategory = (category: PromptCategory) => {
    setSelectedCategory(category);
    // Development category goes to templates first
    if (category === 'development') {
      setAppState('templates');
    } else {
      setAppState('form');
    }
  };

  const handleSelectTemplate = (data: Partial<FormData>) => {
    setTemplateData(data);
    setAppState('form');
  };

  const handleSkipTemplates = () => {
    setTemplateData(undefined);
    setAppState('form');
  };

  const handleBackToCategories = () => {
    setAppState('categories');
  };

  const handleGeneratePrompt = async (formData: FormData) => {
    showLoading();

    // Simulate a small delay for effect
    await new Promise(resolve => setTimeout(resolve, 1500));

    const prompt = generatePrompt(selectedCategory, formData);
    setGeneratedPrompt(prompt);
    setCurrentFormData(formData);

    // Save to history
    addToHistory(formData, prompt);

    hideLoading();
    setAppState('output');

    // Fire confetti celebration
    setTimeout(() => {
      fireConfetti();
    }, 300);
  };

  const handleReset = () => {
    setAppState('hero');
    setGeneratedPrompt('');
    setTemplateData(undefined);
    setCurrentFormData(null);
    setSelectedCategory('development');
  };

  const renderForm = () => {
    switch (selectedCategory) {
      case 'development':
        return (
          <StepWizard
            onComplete={(data) => handleGeneratePrompt(data as DevelopmentFormData)}
            initialData={templateData as Partial<DevelopmentFormData>}
          />
        );
      case 'image':
        return (
          <ImagePromptForm
            onComplete={(data) => handleGeneratePrompt(data as ImageFormData)}
            onBack={handleBackToCategories}
            initialData={templateData as Partial<ImageFormData>}
          />
        );
      case 'writing':
        return (
          <WritingPromptForm
            onComplete={(data) => handleGeneratePrompt(data as WritingFormData)}
            onBack={handleBackToCategories}
            initialData={templateData as Partial<WritingFormData>}
          />
        );
      case 'marketing':
        return (
          <MarketingPromptForm
            onComplete={(data) => handleGeneratePrompt(data as MarketingFormData)}
            onBack={handleBackToCategories}
            initialData={templateData as Partial<MarketingFormData>}
          />
        );
      case 'business':
        return (
          <BusinessPromptForm
            onComplete={(data) => handleGeneratePrompt(data as BusinessFormData)}
            onBack={handleBackToCategories}
            initialData={templateData as Partial<BusinessFormData>}
          />
        );
      case 'education':
        return (
          <EducationPromptForm
            onComplete={(data) => handleGeneratePrompt(data as EducationFormData)}
            onBack={handleBackToCategories}
            initialData={templateData as Partial<EducationFormData>}
          />
        );
      case 'creative':
        return (
          <CreativePromptForm
            onComplete={(data) => handleGeneratePrompt(data as CreativeFormData)}
            onBack={handleBackToCategories}
            initialData={templateData as Partial<CreativeFormData>}
          />
        );
      default:
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Coming Soon!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The {selectedCategory} prompt generator is under development.
            </p>
            <button
              onClick={handleBackToCategories}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl"
            >
              Go Back
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {appState === 'hero' && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero onGetStarted={handleGetStarted} />
          </motion.div>
        )}

        {appState === 'categories' && (
          <PageTransition key="categories" className="py-12">
            <CategorySelector onSelectCategory={handleSelectCategory} />
          </PageTransition>
        )}

        {appState === 'templates' && (
          <PageTransition key="templates" className="py-12">
            <TemplateSelector
              onSelectTemplate={handleSelectTemplate}
              onSkip={handleSkipTemplates}
            />
          </PageTransition>
        )}

        {appState === 'form' && (
          <PageTransition key="form" className="py-12 px-4">
            {renderForm()}
          </PageTransition>
        )}

        {appState === 'output' && (
          <PageTransition key="output" className="py-12 px-4">
            <PromptOutput prompt={generatedPrompt} onReset={handleReset} />
          </PageTransition>
        )}
      </AnimatePresence>
    </div>
  );
}
