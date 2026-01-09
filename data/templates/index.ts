// Barrel export for all templates
export { imageTemplates, type ImageTemplate } from '../imageTemplates';
export { writingTemplates, type WritingTemplate } from '../writingTemplates';
export { marketingTemplates, type MarketingTemplate } from '../marketingTemplates';
export { dataTemplates, type DataTemplate } from '../dataTemplates';

import { PromptCategory, FormData } from '@/types';
import { imageTemplates } from '../imageTemplates';
import { writingTemplates } from '../writingTemplates';
import { marketingTemplates } from '../marketingTemplates';
import { dataTemplates } from '../dataTemplates';

export interface BaseTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  data: Partial<FormData>;
}

// Get templates for any category
export function getTemplatesForCategory(category: PromptCategory): BaseTemplate[] {
  switch (category) {
    case 'image':
      return imageTemplates as BaseTemplate[];
    case 'writing':
      return writingTemplates as BaseTemplate[];
    case 'marketing':
      return marketingTemplates as BaseTemplate[];
    case 'data':
      return dataTemplates as BaseTemplate[];
    default:
      return [];
  }
}

// Check if category has templates
export function categoryHasTemplates(category: PromptCategory): boolean {
  const categoriesWithTemplates: PromptCategory[] = ['development', 'image', 'writing', 'marketing', 'data'];
  return categoriesWithTemplates.includes(category);
}
