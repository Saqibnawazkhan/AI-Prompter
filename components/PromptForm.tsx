'use client';

import { useState } from 'react';
import { FormData } from '@/types';

interface PromptFormProps {
  onGenerate: (data: FormData) => void;
}

export default function PromptForm({ onGenerate }: PromptFormProps) {
  const [formData, setFormData] = useState<FormData>({
    appType: 'Web App',
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Application Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Application Type <span className="text-red-500">*</span>
          </label>
          <select
            name="appType"
            value={formData.appType}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          >
            <option>Web App</option>
            <option>Mobile App</option>
            <option>Desktop App</option>
            <option>Full Stack App</option>
          </select>
        </div>

        {/* Platform */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Platform / Tech Stack <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            placeholder="e.g., React, Next.js, Flutter, MERN"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        {/* App Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            App Name
          </label>
          <input
            type="text"
            name="appName"
            value={formData.appName}
            onChange={handleChange}
            placeholder="e.g., TaskMaster Pro"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        {/* Complexity Level */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Complexity Level <span className="text-red-500">*</span>
          </label>
          <select
            name="complexityLevel"
            value={formData.complexityLevel}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          >
            <option>Basic</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
      </div>

      {/* App Purpose */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          App Purpose / Problem it Solves
        </label>
        <textarea
          name="appPurpose"
          value={formData.appPurpose}
          onChange={handleChange}
          placeholder="Describe what problem your app solves and its main purpose..."
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
        />
      </div>

      {/* Target Users */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Target Users
        </label>
        <input
          type="text"
          name="targetUsers"
          value={formData.targetUsers}
          onChange={handleChange}
          placeholder="e.g., Students, Developers, Small Business Owners"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      {/* Core Features */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Core Features (Must-Have) <span className="text-red-500">*</span>
        </label>
        <textarea
          name="coreFeatures"
          value={formData.coreFeatures}
          onChange={handleChange}
          placeholder="Enter each feature on a new line:&#10;- User registration and login&#10;- Dashboard with analytics&#10;- Data export functionality"
          rows={5}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none font-mono text-sm"
        />
      </div>

      {/* Optional Features */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Optional Features (Nice-to-Have)
        </label>
        <textarea
          name="optionalFeatures"
          value={formData.optionalFeatures}
          onChange={handleChange}
          placeholder="Enter each feature on a new line:&#10;- Dark mode&#10;- Email notifications&#10;- Social media sharing"
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none font-mono text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Authentication */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Authentication Required?
          </label>
          <select
            name="authentication"
            value={formData.authentication}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          >
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>

        {/* Database */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Database
          </label>
          <select
            name="database"
            value={formData.database}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          >
            <option>None</option>
            <option>Firebase</option>
            <option>MongoDB</option>
            <option>PostgreSQL</option>
            <option>MySQL</option>
            <option>Supabase</option>
            <option>SQLite</option>
          </select>
        </div>
      </div>

      {/* Design Preferences */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Design Preferences (UI Style, Colors, Theme)
        </label>
        <input
          type="text"
          name="designPreferences"
          value={formData.designPreferences}
          onChange={handleChange}
          placeholder="e.g., Modern minimalist, Blue/Purple gradient, Dark mode, Material Design"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      {/* AI Features */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          AI Features / Automation
        </label>
        <textarea
          name="aiFeatures"
          value={formData.aiFeatures}
          onChange={handleChange}
          placeholder="Describe any AI features like chatbots, recommendations, image recognition, etc."
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
        />
      </div>

      {/* APIs & Integrations */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          APIs & Third-Party Integrations
        </label>
        <textarea
          name="apisIntegrations"
          value={formData.apisIntegrations}
          onChange={handleChange}
          placeholder="Enter each integration on a new line:&#10;- Stripe for payments&#10;- SendGrid for emails&#10;- Google Maps API"
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none font-mono text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Performance Requirements */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Performance Requirements
          </label>
          <input
            type="text"
            name="performanceRequirements"
            value={formData.performanceRequirements}
            onChange={handleChange}
            placeholder="e.g., Load time < 2s, Handle 10k users"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        {/* Security Requirements */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Security Requirements
          </label>
          <input
            type="text"
            name="securityRequirements"
            value={formData.securityRequirements}
            onChange={handleChange}
            placeholder="e.g., HTTPS, JWT tokens, Data encryption"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
      </div>

      {/* Deployment Preference */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Deployment Preference
        </label>
        <input
          type="text"
          name="deploymentPreference"
          value={formData.deploymentPreference}
          onChange={handleChange}
          placeholder="e.g., Vercel, Netlify, AWS, Google Play Store, App Store"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          🚀 Generate AI Prompt
        </button>
      </div>
    </form>
  );
}
