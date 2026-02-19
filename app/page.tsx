'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '@/components/Hero';
import CategorySelector from '@/components/CategorySelector';
import PageTransition from '@/components/PageTransition';
import { categoryHasTemplates } from '@/data/templates';
import { PromptCategory, FormData, DevelopmentFormData, ImageFormData, WritingFormData, MarketingFormData, BusinessFormData, EducationFormData, CreativeFormData, DataFormData } from '@/types';
import { generatePrompt } from '@/lib/generators';
import { useApp } from '@/components/AppWrapper';
import toast from 'react-hot-toast';

// Dynamic imports for code splitting - load forms only when needed
const TemplateSelector = dynamic(() => import('@/components/TemplateSelector'));
const UniversalTemplateSelector = dynamic(() => import('@/components/UniversalTemplateSelector'));
const StepWizard = dynamic(() => import('@/components/StepWizard'));
const PromptOutput = dynamic(() => import('@/components/PromptOutput'));
const ImagePromptForm = dynamic(() => import('@/components/forms/ImagePromptForm'));
const WritingPromptForm = dynamic(() => import('@/components/forms/WritingPromptForm'));
const MarketingPromptForm = dynamic(() => import('@/components/forms/MarketingPromptForm'));
const BusinessPromptForm = dynamic(() => import('@/components/forms/BusinessPromptForm'));
const EducationPromptForm = dynamic(() => import('@/components/forms/EducationPromptForm'));
const CreativePromptForm = dynamic(() => import('@/components/forms/CreativePromptForm'));
const DataPromptForm = dynamic(() => import('@/components/forms/DataPromptForm'));

type AppState = 'hero' | 'categories' | 'templates' | 'categoryTemplates' | 'form' | 'output';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('hero');
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory>('development');
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [templateData, setTemplateData] = useState<Partial<FormData> | undefined>();
  const [currentFormData, setCurrentFormData] = useState<FormData | null>(null);

  const { addToHistory, showLoading, hideLoading, fireConfetti, selectedHistoryItem, clearSelectedHistoryItem } = useApp();

  // Welcome toast for first-time visitors
  useEffect(() => {
    const hasVisited = localStorage.getItem('ai-prompter-visited');
    if (!hasVisited) {
      setTimeout(() => {
        toast('Welcome to AI Prompter! Your prompts are now AI-enhanced.', {
          icon: '🚀',
          duration: 4000,
        });
        localStorage.setItem('ai-prompter-visited', 'true');
      }, 1500);
    }
  }, []);

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
    // Development has its own templates, others use universal
    if (category === 'development') {
      setAppState('templates');
    } else if (categoryHasTemplates(category)) {
      setAppState('categoryTemplates');
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

    let prompt: string;

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: selectedCategory, formData }),
      });

      if (!response.ok) throw new Error(`API returned ${response.status}`);

      const data = await response.json();
      prompt = data.prompt;

      if (data.error) {
        toast(data.error, { icon: '⚠️' });
      }
    } catch {
      // Fallback to client-side generation
      prompt = generatePrompt(selectedCategory, formData);
      toast('Using offline prompt generation', { icon: '⚠️' });
    }

    setGeneratedPrompt(prompt);
    setCurrentFormData(formData);
    addToHistory(formData, prompt, selectedCategory);

    hideLoading();
    setAppState('output');

    setTimeout(() => {
      fireConfetti();
    }, 300);
  };

  const handleRegenerate = () => {
    if (currentFormData) {
      handleGeneratePrompt(currentFormData);
    }
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
      case 'data':
        return (
          <DataPromptForm
            onComplete={(data) => handleGeneratePrompt(data as DataFormData)}
            onBack={handleBackToCategories}
            initialData={templateData as Partial<DataFormData>}
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

        {appState === 'categoryTemplates' && (
          <PageTransition key="categoryTemplates" className="py-12">
            <UniversalTemplateSelector
              category={selectedCategory}
              onSelectTemplate={handleSelectTemplate}
              onSkip={handleSkipTemplates}
              onBack={handleBackToCategories}
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
            <PromptOutput prompt={generatedPrompt} onReset={handleReset} onRegenerate={handleRegenerate} />
          </PageTransition>
        )}
      </AnimatePresence>
    </div>
  );
}
