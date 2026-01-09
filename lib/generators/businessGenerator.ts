import { BusinessFormData } from '@/types';

export function generateBusinessPrompt(data: BusinessFormData): string {
  const sections: string[] = [];

  // Header
  sections.push(`# Business Document Prompt: ${data.documentType || 'Document'}\n\n`);
  sections.push('---\n\n');

  // Document Overview
  sections.push('## Document Overview\n\n');
  sections.push('| Specification | Details |\n');
  sections.push('|--------------|----------|\n');
  sections.push(`| **Document Type** | ${data.documentType || 'Not specified'} |\n`);
  sections.push(`| **Business Name** | ${data.businessName || 'Not specified'} |\n`);
  sections.push(`| **Industry** | ${data.industry || 'Not specified'} |\n`);
  sections.push(`| **Tone** | ${data.tone || 'Professional'} |\n`);
  sections.push(`| **Target Audience** | ${data.targetAudience || 'Not specified'} |\n`);
  sections.push(`| **Timeline** | ${data.timeline || 'Not specified'} |\n`);
  sections.push('\n');

  // Purpose
  if (data.purpose) {
    sections.push('## Purpose\n\n');
    sections.push(data.purpose);
    sections.push('\n\n');
  }

  // Key Objectives
  if (data.keyObjectives) {
    sections.push('## Key Objectives\n\n');
    const objectives = data.keyObjectives.split('\n').filter(o => o.trim());
    objectives.forEach((obj, index) => {
      const cleanObj = obj.trim().replace(/^[-•*]\s*/, '');
      if (cleanObj) {
        sections.push(`${index + 1}. ${cleanObj}\n`);
      }
    });
    sections.push('\n');
  }

  // Context
  if (data.context) {
    sections.push('## Background Context\n\n');
    sections.push(data.context);
    sections.push('\n\n');
  }

  // Expected Deliverables
  if (data.deliverables) {
    sections.push('## Expected Deliverables\n\n');
    const deliverables = data.deliverables.split('\n').filter(d => d.trim());
    deliverables.forEach(del => {
      const cleanDel = del.trim().replace(/^[-•*]\s*/, '');
      if (cleanDel) {
        sections.push(`- ${cleanDel}\n`);
      }
    });
    sections.push('\n');
  }

  // Constraints
  if (data.constraints) {
    sections.push('## Constraints & Requirements\n\n');
    sections.push(data.constraints);
    sections.push('\n\n');
  }

  // Document-specific structure based on type
  sections.push('---\n\n');
  sections.push('## Recommended Structure\n\n');

  const docType = data.documentType?.toLowerCase() || '';

  if (docType.includes('business plan')) {
    sections.push('### Business Plan Structure\n\n');
    sections.push('1. **Executive Summary**\n');
    sections.push('2. **Company Description**\n');
    sections.push('3. **Market Analysis**\n');
    sections.push('4. **Organization & Management**\n');
    sections.push('5. **Service/Product Line**\n');
    sections.push('6. **Marketing & Sales Strategy**\n');
    sections.push('7. **Funding Request** (if applicable)\n');
    sections.push('8. **Financial Projections**\n');
    sections.push('9. **Appendix**\n\n');
  } else if (docType.includes('proposal')) {
    sections.push('### Proposal Structure\n\n');
    sections.push('1. **Executive Summary**\n');
    sections.push('2. **Problem Statement**\n');
    sections.push('3. **Proposed Solution**\n');
    sections.push('4. **Methodology/Approach**\n');
    sections.push('5. **Timeline & Milestones**\n');
    sections.push('6. **Budget & Pricing**\n');
    sections.push('7. **Team & Qualifications**\n');
    sections.push('8. **Terms & Conditions**\n');
    sections.push('9. **Call to Action**\n\n');
  } else if (docType.includes('swot')) {
    sections.push('### SWOT Analysis Structure\n\n');
    sections.push('1. **Introduction & Context**\n');
    sections.push('2. **Strengths** (Internal positive factors)\n');
    sections.push('3. **Weaknesses** (Internal negative factors)\n');
    sections.push('4. **Opportunities** (External positive factors)\n');
    sections.push('5. **Threats** (External negative factors)\n');
    sections.push('6. **Analysis & Insights**\n');
    sections.push('7. **Strategic Recommendations**\n');
    sections.push('8. **Action Plan**\n\n');
  } else if (docType.includes('report')) {
    sections.push('### Business Report Structure\n\n');
    sections.push('1. **Title Page**\n');
    sections.push('2. **Executive Summary**\n');
    sections.push('3. **Introduction**\n');
    sections.push('4. **Methodology**\n');
    sections.push('5. **Findings/Results**\n');
    sections.push('6. **Analysis & Discussion**\n');
    sections.push('7. **Conclusions**\n');
    sections.push('8. **Recommendations**\n');
    sections.push('9. **Appendices**\n\n');
  } else {
    sections.push('### General Structure\n\n');
    sections.push('1. **Introduction**\n');
    sections.push('2. **Background/Context**\n');
    sections.push('3. **Main Content**\n');
    sections.push('4. **Analysis/Discussion**\n');
    sections.push('5. **Conclusions**\n');
    sections.push('6. **Next Steps/Recommendations**\n\n');
  }

  // Ready-to-use prompt
  sections.push('---\n\n');
  sections.push('## Ready-to-Use Prompt\n\n');
  sections.push('Copy this prompt to use with ChatGPT, Claude, or any AI:\n\n');
  sections.push('```\n');

  let copyPrompt = `Create a ${data.documentType || 'business document'}`;
  if (data.businessName) {
    copyPrompt += ` for ${data.businessName}`;
  }
  if (data.industry) {
    copyPrompt += ` in the ${data.industry} industry`;
  }
  copyPrompt += '.\n\n';

  copyPrompt += `Purpose: ${data.purpose || 'To be specified'}\n`;
  copyPrompt += `Target Audience: ${data.targetAudience || 'Business stakeholders'}\n`;
  copyPrompt += `Tone: ${data.tone || 'Professional'}\n`;

  if (data.keyObjectives) {
    copyPrompt += `\nKey Objectives:\n${data.keyObjectives}\n`;
  }

  if (data.context) {
    copyPrompt += `\nContext:\n${data.context}\n`;
  }

  if (data.deliverables) {
    copyPrompt += `\nExpected Deliverables:\n${data.deliverables}\n`;
  }

  if (data.constraints) {
    copyPrompt += `\nConstraints:\n${data.constraints}\n`;
  }

  if (data.timeline) {
    copyPrompt += `\nTimeline: ${data.timeline}\n`;
  }

  if (data.additionalInfo) {
    copyPrompt += `\nAdditional Information:\n${data.additionalInfo}\n`;
  }

  copyPrompt += '\nPlease provide a comprehensive, well-structured document following industry best practices.';

  sections.push(copyPrompt);
  sections.push('\n```\n\n');

  // Tips
  sections.push('## Tips for Best Results\n\n');
  sections.push('1. **Be Specific**: Provide detailed context for better output\n');
  sections.push('2. **Include Data**: Add relevant numbers, metrics, or facts\n');
  sections.push('3. **Iterate**: Refine sections individually for better quality\n');
  sections.push('4. **Review**: Always review and customize AI-generated content\n');
  sections.push('5. **Brand Voice**: Ensure the output matches your brand guidelines\n\n');

  // Footer
  sections.push('---\n');
  sections.push('*Generated by AI Prompter - https://github.com/Saqibnawazkhan/AI-Prompter*\n');

  return sections.join('');
}
