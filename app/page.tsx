'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '@/components/Hero';
import TemplateSelector from '@/components/TemplateSelector';
import StepWizard from '@/components/StepWizard';
import PromptOutput from '@/components/PromptOutput';
import { FormData } from '@/types';

type AppState = 'hero' | 'templates' | 'form' | 'output';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('hero');
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [templateData, setTemplateData] = useState<Partial<FormData> | undefined>();

  const handleGetStarted = () => {
    setAppState('templates');
  };

  const handleSelectTemplate = (data: Partial<FormData>) => {
    setTemplateData(data);
    setAppState('form');
  };

  const handleSkipTemplates = () => {
    setTemplateData(undefined);
    setAppState('form');
  };

  const handleGeneratePrompt = (formData: FormData) => {
    const prompt = generatePrompt(formData);
    setGeneratedPrompt(prompt);
    setAppState('output');
  };

  const handleReset = () => {
    setAppState('hero');
    setGeneratedPrompt('');
    setTemplateData(undefined);
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

        {appState === 'templates' && (
          <motion.div
            key="templates"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="py-12"
          >
            <TemplateSelector
              onSelectTemplate={handleSelectTemplate}
              onSkip={handleSkipTemplates}
            />
          </motion.div>
        )}

        {appState === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="py-12 px-4"
          >
            <StepWizard
              onComplete={handleGeneratePrompt}
              initialData={templateData}
            />
          </motion.div>
        )}

        {appState === 'output' && (
          <motion.div
            key="output"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="py-12 px-4"
          >
            <PromptOutput prompt={generatedPrompt} onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function generatePrompt(data: FormData): string {
  const sections: string[] = [];

  // Header
  sections.push(`# ${data.appName || 'Application'} - Development Prompt\n`);
  sections.push('---\n\n');

  // Project Overview
  sections.push('## 📋 Project Overview\n\n');
  sections.push(`| Property | Value |\n`);
  sections.push(`|----------|-------|\n`);
  sections.push(`| **App Name** | ${data.appName || 'Not specified'} |\n`);
  sections.push(`| **Type** | ${data.appType} |\n`);
  sections.push(`| **Platform** | ${data.platform} |\n`);
  sections.push(`| **Complexity** | ${data.complexityLevel} |\n`);
  if (data.targetUsers) {
    sections.push(`| **Target Users** | ${data.targetUsers} |\n`);
  }
  sections.push('\n');

  if (data.appPurpose) {
    sections.push(`### Purpose\n${data.appPurpose}\n\n`);
  }

  // Tech Stack
  sections.push('## 🛠️ Tech Stack\n\n');
  sections.push(`- **Framework/Platform:** ${data.platform}\n`);
  if (data.database && data.database !== 'None') {
    sections.push(`- **Database:** ${data.database}\n`);
  }
  if (data.authentication === 'Yes') {
    sections.push('- **Authentication:** Required (implement secure user auth)\n');
  }
  sections.push('\n');

  // Functional Requirements
  sections.push('## ✅ Functional Requirements\n\n');
  sections.push('### Core Features (Must-Have)\n\n');
  if (data.coreFeatures) {
    const features = data.coreFeatures.split('\n').filter(f => f.trim());
    features.forEach(feature => {
      const cleanFeature = feature.trim().replace(/^[-•*]\s*/, '');
      if (cleanFeature) {
        sections.push(`- [ ] ${cleanFeature}\n`);
      }
    });
  }
  sections.push('\n');

  if (data.optionalFeatures) {
    sections.push('### Optional Features (Nice-to-Have)\n\n');
    const features = data.optionalFeatures.split('\n').filter(f => f.trim());
    features.forEach(feature => {
      const cleanFeature = feature.trim().replace(/^[-•*]\s*/, '');
      if (cleanFeature) {
        sections.push(`- [ ] ${cleanFeature}\n`);
      }
    });
    sections.push('\n');
  }

  // Non-Functional Requirements
  sections.push('## 🔒 Non-Functional Requirements\n\n');
  sections.push('### Performance\n');
  if (data.performanceRequirements) {
    sections.push(`${data.performanceRequirements}\n`);
  } else {
    sections.push('- Fast loading times (< 3s initial load)\n');
    sections.push('- Responsive and smooth UI interactions\n');
    sections.push('- Optimized for mobile devices\n');
  }
  sections.push('\n');

  sections.push('### Security\n');
  if (data.securityRequirements) {
    sections.push(`${data.securityRequirements}\n`);
  } else {
    sections.push('- Input validation and sanitization\n');
    sections.push('- Secure data handling\n');
    sections.push('- HTTPS encryption\n');
  }
  sections.push('\n');

  // UI/UX Guidelines
  sections.push('## 🎨 UI/UX Guidelines\n\n');
  if (data.designPreferences) {
    sections.push(`**Design Style:** ${data.designPreferences}\n\n`);
  } else {
    sections.push('**Design Style:** Modern, clean, and intuitive\n\n');
  }
  sections.push('**Requirements:**\n');
  sections.push('- Fully responsive (mobile-first approach)\n');
  sections.push('- Consistent design language\n');
  sections.push('- Accessible (WCAG 2.1 guidelines)\n');
  sections.push('- Dark mode support (optional)\n');
  sections.push('\n');

  // AI Features
  if (data.aiFeatures) {
    sections.push('## 🤖 AI & Automation\n\n');
    sections.push(`${data.aiFeatures}\n\n`);
  }

  // Database Structure
  if (data.database && data.database !== 'None') {
    sections.push('## 💾 Database Schema\n\n');
    sections.push(`**Database:** ${data.database}\n\n`);
    sections.push('Design the schema to include:\n');
    sections.push('- User data models (if auth enabled)\n');
    sections.push('- Core entity models based on features\n');
    sections.push('- Proper relationships and indexes\n');
    sections.push('- Data validation rules\n\n');
  }

  // APIs & Integrations
  if (data.apisIntegrations) {
    sections.push('## 🔌 APIs & Integrations\n\n');
    const apis = data.apisIntegrations.split('\n').filter(a => a.trim());
    apis.forEach(api => {
      const cleanApi = api.trim().replace(/^[-•*]\s*/, '');
      if (cleanApi) {
        sections.push(`- ${cleanApi}\n`);
      }
    });
    sections.push('\n');
  }

  // Deployment
  sections.push('## 🚀 Deployment\n\n');
  if (data.deploymentPreference) {
    sections.push(`**Target Platform:** ${data.deploymentPreference}\n\n`);
  }
  sections.push('**Checklist:**\n');
  sections.push('1. Set up environment variables\n');
  sections.push('2. Configure build process\n');
  sections.push('3. Test in staging environment\n');
  sections.push('4. Deploy to production\n');
  sections.push('5. Set up monitoring\n\n');

  // Deliverables
  sections.push('## 📦 Deliverables\n\n');
  sections.push('- [ ] Complete source code\n');
  sections.push('- [ ] All core features implemented\n');
  sections.push('- [ ] Responsive UI/UX\n');
  sections.push('- [ ] Documentation\n');
  sections.push('- [ ] Deployment-ready build\n');
  if (data.authentication === 'Yes') {
    sections.push('- [ ] Authentication system\n');
  }
  sections.push('\n');

  // Implementation Guide
  sections.push('---\n\n');
  sections.push('## 🎯 Implementation Guide\n\n');
  sections.push('Build this application following these steps:\n\n');
  sections.push('1. **Setup** - Initialize project with ' + data.platform + '\n');
  sections.push('2. **Structure** - Set up folder structure and routing\n');
  sections.push('3. **Core Features** - Implement must-have features first\n');
  sections.push('4. **UI/UX** - Build responsive, accessible interface\n');
  if (data.authentication === 'Yes') {
    sections.push('5. **Auth** - Implement authentication system\n');
  }
  if (data.database && data.database !== 'None') {
    sections.push('6. **Database** - Set up ' + data.database + ' and models\n');
  }
  sections.push('7. **Testing** - Test all features thoroughly\n');
  sections.push('8. **Deploy** - Prepare and deploy to production\n\n');

  sections.push('---\n');
  sections.push('*Generated by AI Prompter - https://github.com/Saqibnawazkhan/AI-Prompter*\n');

  return sections.join('');
}
