// Barrel export for all data

// Categories
export { categories, type CategoryInfo } from './categories';

// Templates
export {
  imageTemplates,
  writingTemplates,
  marketingTemplates,
  dataTemplates,
  getTemplatesForCategory,
  categoryHasTemplates,
  type BaseTemplate,
  type ImageTemplate,
  type WritingTemplate,
  type MarketingTemplate,
  type DataTemplate,
} from './templates';

// Development templates (from main templates.ts)
export { templates as developmentTemplates, getTemplateById, type Template } from './templates';

// Template counts for stats
export const templateStats = {
  totalTemplates: 42,
  categories: 8,
  platforms: ['ChatGPT', 'Claude', 'Groq AI', 'Midjourney', 'DALL-E', 'Stable Diffusion'],
  aiModels: ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'mixtral-8x7b-32768', 'gemma2-9b-it'],
} as const;
