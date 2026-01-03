'use client';

import { useState } from 'react';
import PromptForm from '@/components/PromptForm';
import PromptOutput from '@/components/PromptOutput';
import { FormData } from '@/types';

export default function Home() {
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [showOutput, setShowOutput] = useState(false);

  const handleGeneratePrompt = (formData: FormData) => {
    const prompt = generatePrompt(formData);
    setGeneratedPrompt(prompt);
    setShowOutput(true);
  };

  const handleReset = () => {
    setShowOutput(false);
    setGeneratedPrompt('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AI Prompt Generator
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Transform your app ideas into professional, structured AI development prompts.
            Perfect for developers, students, and product managers.
          </p>
        </header>

        {!showOutput ? (
          <PromptForm onGenerate={handleGeneratePrompt} />
        ) : (
          <PromptOutput prompt={generatedPrompt} onReset={handleReset} />
        )}
      </div>

      <footer className="text-center py-8 text-gray-500 text-sm">
        <p>Built with Next.js & Tailwind CSS | AI Prompt Generator © 2026</p>
      </footer>
    </div>
  );
}

function generatePrompt(data: FormData): string {
  const sections: string[] = [];

  // Header
  sections.push(`# ${data.appName || 'Application'} - Development Prompt\n`);

  // Project Overview
  sections.push('## 📋 Project Overview\n');
  sections.push(`**Application Name:** ${data.appName || 'Not specified'}\n`);
  sections.push(`**Application Type:** ${data.appType}\n`);
  sections.push(`**Platform:** ${data.platform}\n`);
  if (data.appPurpose) {
    sections.push(`**Purpose:** ${data.appPurpose}\n`);
  }
  if (data.targetUsers) {
    sections.push(`**Target Users:** ${data.targetUsers}\n`);
  }
  sections.push(`**Complexity Level:** ${data.complexityLevel}\n`);
  sections.push('');

  // Tech Stack
  sections.push('## 🛠️ Tech Stack\n');
  sections.push(`**Primary Platform:** ${data.platform}\n`);
  if (data.database && data.database !== 'None') {
    sections.push(`**Database:** ${data.database}\n`);
  }
  if (data.authentication === 'Yes') {
    sections.push('**Authentication:** Required (implement secure user authentication)\n');
  }
  sections.push('');

  // Functional Requirements
  sections.push('## ✅ Functional Requirements\n');
  sections.push('### Core Features (Must-Have)\n');
  if (data.coreFeatures) {
    const features = data.coreFeatures.split('\n').filter(f => f.trim());
    features.forEach(feature => {
      sections.push(`- ${feature.trim().replace(/^[-•*]\s*/, '')}\n`);
    });
  } else {
    sections.push('- Define core features based on app purpose\n');
  }
  sections.push('');

  if (data.optionalFeatures) {
    sections.push('### Optional Features (Nice-to-Have)\n');
    const features = data.optionalFeatures.split('\n').filter(f => f.trim());
    features.forEach(feature => {
      sections.push(`- ${feature.trim().replace(/^[-•*]\s*/, '')}\n`);
    });
    sections.push('');
  }

  // Non-Functional Requirements
  sections.push('## 🔒 Non-Functional Requirements\n');
  if (data.performanceRequirements) {
    sections.push(`**Performance:** ${data.performanceRequirements}\n`);
  }
  if (data.securityRequirements) {
    sections.push(`**Security:** ${data.securityRequirements}\n`);
  }
  if (!data.performanceRequirements && !data.securityRequirements) {
    sections.push('- Fast loading times and responsive UI\n');
    sections.push('- Secure data handling and validation\n');
    sections.push('- Cross-browser/device compatibility\n');
  }
  sections.push('');

  // UI/UX Guidelines
  sections.push('## 🎨 UI/UX Guidelines\n');
  if (data.designPreferences) {
    sections.push(`**Design Style:** ${data.designPreferences}\n`);
  } else {
    sections.push('**Design Style:** Modern, clean, and intuitive\n');
  }
  sections.push('**Responsiveness:** Must work seamlessly on desktop, tablet, and mobile devices\n');
  sections.push('**Accessibility:** Follow WCAG guidelines for accessibility\n');
  sections.push('');

  // AI Features
  if (data.aiFeatures) {
    sections.push('## 🤖 AI & Automation Features\n');
    sections.push(`${data.aiFeatures}\n`);
    sections.push('');
  }

  // Database Structure
  if (data.database && data.database !== 'None') {
    sections.push('## 💾 Database Structure (High-Level)\n');
    sections.push(`Using **${data.database}** as the database solution.\n`);
    sections.push('');
    sections.push('Design schema based on:\n');
    sections.push('- User data (if authentication is enabled)\n');
    sections.push('- Core application entities\n');
    sections.push('- Relationships between data models\n');
    sections.push('- Indexing for performance optimization\n');
    sections.push('');
  }

  // APIs & Integrations
  if (data.apisIntegrations) {
    sections.push('## 🔌 APIs & Integrations\n');
    const apis = data.apisIntegrations.split('\n').filter(a => a.trim());
    apis.forEach(api => {
      sections.push(`- ${api.trim().replace(/^[-•*]\s*/, '')}\n`);
    });
    sections.push('');
  }

  // Deployment Instructions
  sections.push('## 🚀 Deployment Instructions\n');
  if (data.deploymentPreference) {
    sections.push(`**Target Platform:** ${data.deploymentPreference}\n`);
  }
  sections.push('');
  sections.push('**Steps:**\n');
  sections.push('1. Set up environment variables and configuration\n');
  sections.push('2. Run build process and ensure no errors\n');
  sections.push('3. Test all features in staging environment\n');
  if (data.deploymentPreference) {
    sections.push(`4. Deploy to ${data.deploymentPreference}\n`);
  } else {
    sections.push('4. Deploy to production environment\n');
  }
  sections.push('5. Monitor performance and error logs\n');
  sections.push('');

  // Deliverables
  sections.push('## 📦 Deliverables\n');
  sections.push('- Fully functional application with all core features implemented\n');
  sections.push('- Clean, well-documented, and maintainable code\n');
  sections.push('- Responsive UI that works across all devices\n');
  if (data.authentication === 'Yes') {
    sections.push('- Secure authentication system\n');
  }
  if (data.database && data.database !== 'None') {
    sections.push('- Database schema and migrations\n');
  }
  sections.push('- README with setup and installation instructions\n');
  sections.push('- Deployment-ready build\n');
  sections.push('');

  // Constraints & Notes
  sections.push('## ⚠️ Constraints & Notes\n');
  sections.push(`**Budget/Complexity:** ${data.complexityLevel} level project\n`);
  sections.push('**Code Quality:** Follow best practices and industry standards\n');
  sections.push('**Testing:** Implement proper error handling and edge case management\n');
  sections.push('**Documentation:** Include inline comments for complex logic\n');
  sections.push('');

  // Assumptions
  sections.push('## 📝 Assumptions\n');
  const assumptions: string[] = [];
  if (!data.appPurpose) assumptions.push('- App purpose will be defined during development');
  if (!data.designPreferences) assumptions.push('- Modern, minimal design style preferred');
  if (!data.database || data.database === 'None') assumptions.push('- No persistent data storage required');
  if (assumptions.length > 0) {
    assumptions.forEach(assumption => sections.push(`${assumption}\n`));
  } else {
    sections.push('- All necessary information has been provided\n');
  }
  sections.push('');

  // Final Instructions
  sections.push('---\n');
  sections.push('## 🎯 Implementation Instructions\n');
  sections.push('');
  sections.push('Use this prompt to build the application step-by-step:\n');
  sections.push('1. Set up the project with the specified tech stack\n');
  sections.push('2. Implement core features first\n');
  sections.push('3. Add authentication and database integration (if required)\n');
  sections.push('4. Implement UI/UX according to design guidelines\n');
  sections.push('5. Add optional features\n');
  sections.push('6. Test thoroughly across all devices\n');
  sections.push('7. Optimize for performance and security\n');
  sections.push('8. Prepare for deployment\n');
  sections.push('');
  sections.push('**Ready to build! 🚀**');

  return sections.join('');
}
