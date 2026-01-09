import { MarketingFormData } from '@/types';

export interface MarketingTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  data: Partial<MarketingFormData>;
}

export const marketingTemplates: MarketingTemplate[] = [
  {
    id: 'product-launch',
    name: 'Product Launch',
    description: 'Launch campaign for new products',
    preview: '🚀',
    data: {
      campaignType: 'Product Launch',
      platform: 'Multi-channel',
      objective: 'Awareness',
      tone: 'Exciting',
      budget: 'Medium',
    },
  },
  {
    id: 'social-campaign',
    name: 'Social Media Campaign',
    description: 'Engaging social media marketing',
    preview: '📱',
    data: {
      campaignType: 'Social Media',
      platform: 'Instagram/TikTok',
      objective: 'Engagement',
      tone: 'Casual',
      budget: 'Flexible',
    },
  },
  {
    id: 'email-campaign',
    name: 'Email Marketing',
    description: 'Conversion-focused email sequences',
    preview: '📧',
    data: {
      campaignType: 'Email Marketing',
      platform: 'Email',
      objective: 'Conversion',
      tone: 'Professional',
      budget: 'Low',
    },
  },
  {
    id: 'brand-awareness',
    name: 'Brand Awareness',
    description: 'Build brand recognition and reach',
    preview: '🎯',
    data: {
      campaignType: 'Brand Awareness',
      platform: 'Multi-channel',
      objective: 'Awareness',
      tone: 'Inspirational',
      budget: 'High',
    },
  },
  {
    id: 'lead-generation',
    name: 'Lead Generation',
    description: 'Capture and nurture leads',
    preview: '🧲',
    data: {
      campaignType: 'Lead Generation',
      platform: 'LinkedIn/Google Ads',
      objective: 'Lead Generation',
      tone: 'Professional',
      budget: 'Medium',
    },
  },
  {
    id: 'seasonal-promo',
    name: 'Seasonal Promotion',
    description: 'Holiday and seasonal campaigns',
    preview: '🎄',
    data: {
      campaignType: 'Promotional',
      platform: 'Multi-channel',
      objective: 'Sales',
      tone: 'Festive',
      budget: 'Medium',
    },
  },
  {
    id: 'influencer-collab',
    name: 'Influencer Campaign',
    description: 'Influencer partnership strategy',
    preview: '⭐',
    data: {
      campaignType: 'Influencer Marketing',
      platform: 'Instagram/YouTube',
      objective: 'Awareness',
      tone: 'Authentic',
      budget: 'High',
    },
  },
  {
    id: 'content-marketing',
    name: 'Content Marketing',
    description: 'SEO and content strategy',
    preview: '📝',
    data: {
      campaignType: 'Content Marketing',
      platform: 'Blog/Website',
      objective: 'SEO/Traffic',
      tone: 'Educational',
      budget: 'Low',
    },
  },
];
