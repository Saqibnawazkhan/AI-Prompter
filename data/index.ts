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

// Template counts for stats
export const templateStats = {
  totalTemplates: 40,
  categories: 8,
  platforms: ['ChatGPT', 'Claude', 'Midjourney', 'DALL-E', 'Stable Diffusion'],
};
