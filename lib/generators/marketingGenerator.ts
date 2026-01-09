import { MarketingFormData } from '@/types';

export function generateMarketingPrompt(data: MarketingFormData): string {
  const sections: string[] = [];

  // Header
  sections.push(`# Marketing Campaign Prompt: ${data.campaignType || 'Campaign'}\n\n`);
  sections.push('---\n\n');

  // Campaign Overview
  sections.push('## Campaign Overview\n\n');
  sections.push('| Parameter | Details |\n');
  sections.push('|-----------|----------|\n');
  sections.push(`| **Campaign Type** | ${data.campaignType || 'Not specified'} |\n`);
  sections.push(`| **Platform** | ${data.platform || 'Not specified'} |\n`);
  sections.push(`| **Tone** | ${data.tone || 'Not specified'} |\n`);
  sections.push(`| **Budget** | ${data.budget || 'Not specified'} |\n`);
  sections.push(`| **Timeline** | ${data.timeline || 'Not specified'} |\n`);
  sections.push('\n');

  // Product/Service
  if (data.product) {
    sections.push('## Product/Service\n\n');
    sections.push(data.product);
    sections.push('\n\n');
  }

  // Target Audience
  if (data.targetAudience) {
    sections.push('## Target Audience\n\n');
    sections.push(data.targetAudience);
    sections.push('\n\n');
    sections.push('### Audience Considerations\n');
    sections.push('- Demographics and psychographics\n');
    sections.push('- Pain points and desires\n');
    sections.push('- Where they spend time online\n');
    sections.push('- What motivates their purchasing decisions\n\n');
  }

  // USPs
  if (data.uniqueSellingPoints) {
    sections.push('## Unique Selling Points\n\n');
    const usps = data.uniqueSellingPoints.split('\n').filter(u => u.trim());
    usps.forEach(usp => {
      const cleanUsp = usp.trim().replace(/^[-•*]\s*/, '');
      if (cleanUsp) {
        sections.push(`- ${cleanUsp}\n`);
      }
    });
    sections.push('\n');
  }

  // Brand Voice
  if (data.brandVoice) {
    sections.push('## Brand Voice Guidelines\n\n');
    sections.push(data.brandVoice);
    sections.push('\n\n');
  }

  // Campaign Goals
  if (data.goals) {
    sections.push('## Campaign Goals & KPIs\n\n');
    sections.push(data.goals);
    sections.push('\n\n');
    sections.push('### Suggested Metrics to Track\n');
    sections.push('- Reach and impressions\n');
    sections.push('- Engagement rate\n');
    sections.push('- Click-through rate (CTR)\n');
    sections.push('- Conversion rate\n');
    sections.push('- Cost per acquisition (CPA)\n');
    sections.push('- Return on ad spend (ROAS)\n\n');
  }

  // Competitor Info
  if (data.competitorInfo) {
    sections.push('## Competitive Landscape\n\n');
    sections.push(data.competitorInfo);
    sections.push('\n\n');
  }

  // Call to Action
  if (data.callToAction) {
    sections.push('## Call to Action\n\n');
    sections.push(`**Primary CTA:** ${data.callToAction}\n\n`);
  }

  // Platform-Specific Content
  sections.push('---\n\n');
  sections.push('## Content Generation Prompts\n\n');

  // Ad Copy Prompt
  sections.push('### Ad Copy\n\n');
  sections.push('```\n');
  let adPrompt = `Create compelling ${data.platform || 'marketing'} ad copy for a ${data.campaignType || 'campaign'}.\n\n`;
  adPrompt += `Product/Service: ${data.product || '[Your product]'}\n`;
  adPrompt += `Target Audience: ${data.targetAudience || '[Your audience]'}\n`;
  adPrompt += `Tone: ${data.tone || 'Professional'}\n`;
  if (data.uniqueSellingPoints) {
    adPrompt += `USPs: ${data.uniqueSellingPoints.replace(/\n/g, ', ')}\n`;
  }
  adPrompt += `CTA: ${data.callToAction || 'Learn More'}\n\n`;
  adPrompt += 'Create 3 variations with:\n';
  adPrompt += '- Headline (max 40 characters)\n';
  adPrompt += '- Body copy (max 125 characters)\n';
  adPrompt += '- Description (max 30 characters)\n';
  sections.push(adPrompt);
  sections.push('```\n\n');

  // Social Media Prompt
  sections.push('### Social Media Posts\n\n');
  sections.push('```\n');
  let socialPrompt = `Create engaging social media content for ${data.platform || 'social media'}.\n\n`;
  socialPrompt += `Brand: [Your Brand]\n`;
  socialPrompt += `Product: ${data.product || '[Your product]'}\n`;
  socialPrompt += `Target Audience: ${data.targetAudience || '[Your audience]'}\n`;
  socialPrompt += `Tone: ${data.tone || 'Engaging'}\n`;
  socialPrompt += `Goals: ${data.goals || 'Increase engagement'}\n\n`;
  socialPrompt += 'Create:\n';
  socialPrompt += '- 3 post variations\n';
  socialPrompt += '- Relevant hashtags\n';
  socialPrompt += '- Best posting times suggestion\n';
  socialPrompt += '- Engagement hooks\n';
  sections.push(socialPrompt);
  sections.push('```\n\n');

  // Email Marketing Prompt
  sections.push('### Email Marketing\n\n');
  sections.push('```\n');
  let emailPrompt = `Create an email marketing sequence for ${data.campaignType || 'marketing campaign'}.\n\n`;
  emailPrompt += `Product: ${data.product || '[Your product]'}\n`;
  emailPrompt += `Target Audience: ${data.targetAudience || '[Your audience]'}\n`;
  emailPrompt += `Tone: ${data.tone || 'Professional'}\n`;
  emailPrompt += `CTA: ${data.callToAction || 'Shop Now'}\n\n`;
  emailPrompt += 'Create a 3-email sequence:\n';
  emailPrompt += '1. Welcome/Introduction email\n';
  emailPrompt += '2. Value/Benefit focused email\n';
  emailPrompt += '3. Urgency/Offer email\n\n';
  emailPrompt += 'Each email should include:\n';
  emailPrompt += '- Subject line (+ A/B variation)\n';
  emailPrompt += '- Preview text\n';
  emailPrompt += '- Email body\n';
  emailPrompt += '- CTA button text\n';
  sections.push(emailPrompt);
  sections.push('```\n\n');

  // Landing Page Prompt
  sections.push('### Landing Page Copy\n\n');
  sections.push('```\n');
  let landingPrompt = `Write landing page copy for ${data.product || '[product]'}.\n\n`;
  landingPrompt += `Campaign: ${data.campaignType || 'Marketing'}\n`;
  landingPrompt += `Target Audience: ${data.targetAudience || '[Your audience]'}\n`;
  landingPrompt += `Tone: ${data.tone || 'Persuasive'}\n`;
  if (data.uniqueSellingPoints) {
    landingPrompt += `Key Benefits: ${data.uniqueSellingPoints.replace(/\n/g, ', ')}\n`;
  }
  landingPrompt += `\nInclude:\n`;
  landingPrompt += '- Compelling headline & subheadline\n';
  landingPrompt += '- Hero section copy\n';
  landingPrompt += '- Features/Benefits section\n';
  landingPrompt += '- Social proof section\n';
  landingPrompt += '- FAQ section (5 questions)\n';
  landingPrompt += `- CTA: ${data.callToAction || 'Get Started'}\n`;
  sections.push(landingPrompt);
  sections.push('```\n\n');

  // Campaign Checklist
  sections.push('## Campaign Launch Checklist\n\n');
  sections.push('- [ ] Define clear campaign objectives\n');
  sections.push('- [ ] Set up tracking and analytics\n');
  sections.push('- [ ] Create all ad variations\n');
  sections.push('- [ ] Set up A/B tests\n');
  sections.push('- [ ] Configure targeting parameters\n');
  sections.push('- [ ] Set budget and bidding strategy\n');
  sections.push('- [ ] Schedule campaign\n');
  sections.push('- [ ] Monitor initial performance\n');
  sections.push('- [ ] Optimize based on data\n\n');

  // Footer
  sections.push('---\n');
  sections.push('*Generated by AI Prompter - https://github.com/Saqibnawazkhan/AI-Prompter*\n');

  return sections.join('');
}
