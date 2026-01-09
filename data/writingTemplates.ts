import { WritingFormData } from '@/types';

export interface WritingTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  data: Partial<WritingFormData>;
}

export const writingTemplates: WritingTemplate[] = [
  {
    id: 'blog-post',
    name: 'Blog Post',
    description: 'Engaging blog article for your website',
    preview: '📝',
    data: {
      contentType: 'Blog Post',
      tone: 'Conversational',
      audience: 'General readers',
      format: 'Article with headings',
      length: 'Medium (800-1500 words)',
    },
  },
  {
    id: 'linkedin-article',
    name: 'LinkedIn Article',
    description: 'Professional thought leadership content',
    preview: '💼',
    data: {
      contentType: 'Article',
      tone: 'Professional',
      audience: 'Business professionals',
      format: 'Article with headings',
      length: 'Medium (800-1500 words)',
    },
  },
  {
    id: 'email-newsletter',
    name: 'Email Newsletter',
    description: 'Engaging newsletter for subscribers',
    preview: '📧',
    data: {
      contentType: 'Email',
      tone: 'Friendly',
      audience: 'Newsletter subscribers',
      format: 'Newsletter format',
      length: 'Short (300-500 words)',
    },
  },
  {
    id: 'product-description',
    name: 'Product Description',
    description: 'Compelling e-commerce product copy',
    preview: '🛍️',
    data: {
      contentType: 'Product Description',
      tone: 'Persuasive',
      audience: 'Potential customers',
      format: 'Features and benefits',
      length: 'Short (300-500 words)',
    },
  },
  {
    id: 'social-caption',
    name: 'Social Media Caption',
    description: 'Engaging captions for social posts',
    preview: '📱',
    data: {
      contentType: 'Social Media Post',
      tone: 'Casual',
      audience: 'Social media followers',
      format: 'Caption with hashtags',
      length: 'Very Short (under 300 words)',
    },
  },
  {
    id: 'press-release',
    name: 'Press Release',
    description: 'Professional news announcement',
    preview: '📰',
    data: {
      contentType: 'Press Release',
      tone: 'Formal',
      audience: 'Media and journalists',
      format: 'Inverted pyramid',
      length: 'Medium (800-1500 words)',
    },
  },
  {
    id: 'website-copy',
    name: 'Website Copy',
    description: 'Landing page or homepage content',
    preview: '🌐',
    data: {
      contentType: 'Web Copy',
      tone: 'Persuasive',
      audience: 'Website visitors',
      format: 'Scannable sections',
      length: 'Medium (800-1500 words)',
    },
  },
  {
    id: 'technical-doc',
    name: 'Technical Documentation',
    description: 'Clear technical guides and docs',
    preview: '📚',
    data: {
      contentType: 'Documentation',
      tone: 'Technical',
      audience: 'Developers/Technical users',
      format: 'Step-by-step guide',
      length: 'Long (1500+ words)',
    },
  },
];
