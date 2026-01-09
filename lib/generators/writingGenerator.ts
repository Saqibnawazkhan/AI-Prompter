import { WritingFormData } from '@/types';

export function generateWritingPrompt(data: WritingFormData): string {
  const sections: string[] = [];

  // Header
  sections.push(`# Writing Prompt: ${data.contentType || 'Content'}\n\n`);
  sections.push('---\n\n');

  // Content Overview
  sections.push('## Content Overview\n\n');
  sections.push('| Specification | Details |\n');
  sections.push('|--------------|----------|\n');
  sections.push(`| **Content Type** | ${data.contentType || 'Not specified'} |\n`);
  sections.push(`| **Length** | ${data.length || 'Not specified'} |\n`);
  sections.push(`| **Format** | ${data.format || 'Not specified'} |\n`);
  sections.push(`| **Tone** | ${data.tone || 'Not specified'} |\n`);
  sections.push(`| **Target Audience** | ${data.targetAudience || 'General'} |\n`);
  sections.push('\n');

  // Main Prompt
  sections.push('## Writing Instructions\n\n');
  sections.push('Write ');

  // Build the instruction
  const articleType = data.contentType?.toLowerCase() || 'content';
  sections.push(`a ${articleType}`);

  if (data.length) {
    sections.push(` (${data.length})`);
  }

  sections.push(' about:\n\n');

  // Topic
  if (data.topic) {
    sections.push(`### Topic\n${data.topic}\n\n`);
  }

  // Purpose
  if (data.purpose) {
    sections.push(`### Purpose\n${data.purpose}\n\n`);
  }

  // Target Audience Details
  if (data.targetAudience) {
    sections.push('### Target Audience\n\n');
    sections.push(`Write for: ${data.targetAudience}\n\n`);
    sections.push('**Consider:**\n');
    sections.push('- Their knowledge level on the topic\n');
    sections.push('- What problems they\'re trying to solve\n');
    sections.push('- What value they\'re seeking from this content\n\n');
  }

  // Tone & Style
  sections.push('## Tone & Style Guidelines\n\n');
  if (data.tone) {
    sections.push(`**Tone:** ${data.tone}\n\n`);
  }
  if (data.style) {
    sections.push(`**Style:** ${data.style}\n\n`);
  }
  if (data.format) {
    sections.push(`**Format:** ${data.format}\n\n`);
  }

  // Key Points
  if (data.keyPoints) {
    sections.push('## Key Points to Cover\n\n');
    const points = data.keyPoints.split('\n').filter(p => p.trim());
    points.forEach((point, index) => {
      const cleanPoint = point.trim().replace(/^[-•*]\s*/, '');
      if (cleanPoint) {
        sections.push(`${index + 1}. ${cleanPoint}\n`);
      }
    });
    sections.push('\n');
  }

  // SEO Requirements
  if (data.keywords) {
    sections.push('## SEO Optimization\n\n');
    sections.push('**Target Keywords:**\n');
    const keywords = data.keywords.split(',').map(k => k.trim()).filter(k => k);
    keywords.forEach(keyword => {
      sections.push(`- ${keyword}\n`);
    });
    sections.push('\n');
    sections.push('**SEO Guidelines:**\n');
    sections.push('- Include primary keyword in title and first paragraph\n');
    sections.push('- Use keywords naturally throughout the content\n');
    sections.push('- Include keyword variations and related terms\n');
    sections.push('- Optimize meta description with primary keyword\n\n');
  }

  // Call to Action
  if (data.callToAction) {
    sections.push('## Call to Action\n\n');
    sections.push(`End the content with a clear CTA: **${data.callToAction}**\n\n`);
  }

  // Structure Guidelines
  sections.push('## Structure Requirements\n\n');
  sections.push('The content should include:\n\n');
  sections.push('1. **Engaging Introduction** - Hook the reader immediately\n');
  sections.push('2. **Clear Structure** - Use headings and subheadings\n');
  sections.push('3. **Supporting Details** - Include examples, data, or stories\n');
  sections.push('4. **Actionable Insights** - Give readers something to do\n');
  sections.push('5. **Strong Conclusion** - Summarize and include CTA\n\n');

  // Additional Notes
  if (data.additionalNotes) {
    sections.push('## Additional Requirements\n\n');
    sections.push(data.additionalNotes);
    sections.push('\n\n');
  }

  // Copy-Ready Prompt
  sections.push('---\n\n');
  sections.push('## Ready-to-Use Prompt\n\n');
  sections.push('Copy this prompt to use with ChatGPT, Claude, or any AI:\n\n');
  sections.push('```\n');

  let copyPrompt = `Write a ${data.contentType || 'piece of content'}`;
  if (data.length) {
    copyPrompt += ` (${data.length})`;
  }
  copyPrompt += ` about "${data.topic || 'the topic'}"`;

  if (data.targetAudience) {
    copyPrompt += ` for ${data.targetAudience}`;
  }

  copyPrompt += '.\n\n';

  if (data.tone) {
    copyPrompt += `Tone: ${data.tone}\n`;
  }
  if (data.format) {
    copyPrompt += `Format: ${data.format}\n`;
  }
  if (data.purpose) {
    copyPrompt += `Purpose: ${data.purpose}\n`;
  }

  if (data.keyPoints) {
    copyPrompt += `\nKey points to cover:\n${data.keyPoints}\n`;
  }

  if (data.keywords) {
    copyPrompt += `\nSEO Keywords: ${data.keywords}\n`;
  }

  if (data.callToAction) {
    copyPrompt += `\nEnd with CTA: ${data.callToAction}\n`;
  }

  if (data.additionalNotes) {
    copyPrompt += `\nAdditional notes: ${data.additionalNotes}\n`;
  }

  sections.push(copyPrompt);
  sections.push('```\n\n');

  // Footer
  sections.push('---\n');
  sections.push('*Generated by AI Prompter - https://github.com/Saqibnawazkhan/AI-Prompter*\n');

  return sections.join('');
}
