// Prompt Categories
export type PromptCategory =
  | 'development'
  | 'image'
  | 'writing'
  | 'marketing'
  | 'business'
  | 'education'
  | 'creative'
  | 'data';

export interface CategoryInfo {
  id: PromptCategory;
  name: string;
  description: string;
  icon: string;
  color: string;
}

// Development Prompt Data
export interface DevelopmentFormData {
  appType: string;
  platform: string;
  appName: string;
  appPurpose: string;
  targetUsers: string;
  coreFeatures: string;
  optionalFeatures: string;
  designPreferences: string;
  authentication: string;
  database: string;
  aiFeatures: string;
  apisIntegrations: string;
  performanceRequirements: string;
  securityRequirements: string;
  deploymentPreference: string;
  complexityLevel: string;
}

// Image Generation Prompt Data
export interface ImageFormData {
  subject: string;
  style: string;
  mood: string;
  colorPalette: string;
  composition: string;
  lighting: string;
  perspective: string;
  details: string;
  background: string;
  artisticReference: string;
  quality: string;
  aspectRatio: string;
  negativePrompts: string;
}

// Writing Prompt Data
export interface WritingFormData {
  contentType: string;
  topic: string;
  tone: string;
  targetAudience: string;
  length: string;
  purpose: string;
  keyPoints: string;
  style: string;
  format: string;
  keywords: string;
  callToAction: string;
  additionalNotes: string;
}

// Marketing Prompt Data
export interface MarketingFormData {
  campaignType: string;
  product: string;
  targetAudience: string;
  platform: string;
  tone: string;
  uniqueSellingPoints: string;
  callToAction: string;
  budget: string;
  goals: string;
  competitorInfo: string;
  brandVoice: string;
  timeline: string;
}

// Business Prompt Data
export interface BusinessFormData {
  documentType: string;
  businessName: string;
  industry: string;
  purpose: string;
  targetAudience: string;
  keyObjectives: string;
  context: string;
  tone: string;
  constraints: string;
  deliverables: string;
  timeline: string;
  additionalInfo: string;
}

// Education Prompt Data
export interface EducationFormData {
  contentType: string;
  subject: string;
  gradeLevel: string;
  learningObjectives: string;
  duration: string;
  teachingStyle: string;
  assessmentType: string;
  resources: string;
  prerequisites: string;
  accommodations: string;
  activities: string;
  additionalNotes: string;
}

// Creative Writing Prompt Data
export interface CreativeFormData {
  genre: string;
  format: string;
  theme: string;
  setting: string;
  characters: string;
  plotElements: string;
  tone: string;
  perspective: string;
  length: string;
  style: string;
  inspiration: string;
  constraints: string;
}

// Data Analysis Prompt Data
export interface DataFormData {
  analysisType: string;
  dataDescription: string;
  dataSource: string;
  objectives: string;
  metrics: string;
  visualization: string;
  tools: string;
  format: string;
  audience: string;
  timeframe: string;
  constraints: string;
  deliverables: string;
}

// Union type for all form data
export type FormData =
  | DevelopmentFormData
  | ImageFormData
  | WritingFormData
  | MarketingFormData
  | BusinessFormData
  | EducationFormData
  | CreativeFormData
  | DataFormData;

// Generic prompt result
export interface PromptResult {
  category: PromptCategory;
  prompt: string;
  formData: FormData;
  timestamp: number;
}
