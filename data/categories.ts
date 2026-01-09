import { CategoryInfo, PromptCategory } from '@/types';

export const categories: CategoryInfo[] = [
  {
    id: 'development',
    name: 'Development',
    description: 'Generate prompts for building apps, websites, APIs, and software projects',
    icon: 'Code',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'image',
    name: 'Image Generation',
    description: 'Create detailed prompts for AI image generators like DALL-E, Midjourney, Stable Diffusion',
    icon: 'Image',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'writing',
    name: 'Writing & Content',
    description: 'Generate prompts for articles, blog posts, copywriting, and content creation',
    icon: 'FileText',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Create prompts for campaigns, ads, social media, and marketing strategies',
    icon: 'Megaphone',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Generate prompts for business plans, proposals, reports, and strategies',
    icon: 'Briefcase',
    color: 'from-slate-500 to-gray-600',
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Create prompts for lesson plans, courses, tutorials, and educational content',
    icon: 'GraduationCap',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    id: 'creative',
    name: 'Creative Writing',
    description: 'Generate prompts for stories, scripts, poetry, and creative narratives',
    icon: 'Sparkles',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'data',
    name: 'Data & Analytics',
    description: 'Create prompts for data analysis, visualization, and insights',
    icon: 'BarChart3',
    color: 'from-teal-500 to-cyan-500',
  },
];

export const getCategoryById = (id: PromptCategory): CategoryInfo | undefined => {
  return categories.find((cat) => cat.id === id);
};

export const getCategoryColor = (id: PromptCategory): string => {
  const category = getCategoryById(id);
  return category?.color || 'from-gray-500 to-gray-600';
};
