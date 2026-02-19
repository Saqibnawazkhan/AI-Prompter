// Barrel export for all data

// Categories
export { categories } from './categories';
export { type CategoryInfo } from '@/types';

// Category templates (image, writing, marketing, data)
export {
  imageTemplates,
  writingTemplates,
  marketingTemplates,
  dataTemplates,
  getTemplatesForCategory,
  categoryHasTemplates,
  type BaseTemplate,
  type ImageTemplate,
} from './templates';

export { type WritingTemplate } from './writingTemplates';
export { type MarketingTemplate } from './marketingTemplates';
export { type DataTemplate } from './dataTemplates';

// Development templates
export { templates as developmentTemplates, getTemplateById, type Template } from './devTemplates';

// Template counts for stats
export const templateStats = {
  totalTemplates: 42,
  categories: 8,
  platforms: ['ChatGPT', 'Claude', 'Groq AI', 'Midjourney', 'DALL-E', 'Stable Diffusion'],
  aiModels: ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'mixtral-8x7b-32768', 'gemma2-9b-it'],
} as const;
