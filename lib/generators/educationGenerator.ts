import { EducationFormData } from '@/types';

export function generateEducationPrompt(data: EducationFormData): string {
  const sections: string[] = [];

  // Header
  sections.push(`# Education Prompt: ${data.contentType || 'Educational Content'}\n\n`);
  sections.push('---\n\n');

  // Overview
  sections.push('## Content Overview\n\n');
  sections.push('| Specification | Details |\n');
  sections.push('|--------------|----------|\n');
  sections.push(`| **Content Type** | ${data.contentType || 'Not specified'} |\n`);
  sections.push(`| **Subject** | ${data.subject || 'Not specified'} |\n`);
  sections.push(`| **Grade Level** | ${data.gradeLevel || 'Not specified'} |\n`);
  sections.push(`| **Duration** | ${data.duration || 'Not specified'} |\n`);
  sections.push(`| **Teaching Style** | ${data.teachingStyle || 'Not specified'} |\n`);
  sections.push(`| **Assessment** | ${data.assessmentType || 'Not specified'} |\n`);
  sections.push('\n');

  // Learning Objectives
  if (data.learningObjectives) {
    sections.push('## Learning Objectives\n\n');
    sections.push('By the end of this content, students will be able to:\n\n');
    const objectives = data.learningObjectives.split('\n').filter(o => o.trim());
    objectives.forEach((obj, index) => {
      const cleanObj = obj.trim().replace(/^[-•*]\s*/, '');
      if (cleanObj) {
        sections.push(`${index + 1}. ${cleanObj}\n`);
      }
    });
    sections.push('\n');
  }

  // Prerequisites
  if (data.prerequisites) {
    sections.push('## Prerequisites\n\n');
    sections.push(`Students should already know/have:\n${data.prerequisites}\n\n`);
  }

  // Activities
  if (data.activities) {
    sections.push('## Activities & Exercises\n\n');
    sections.push(data.activities);
    sections.push('\n\n');
  }

  // Resources
  if (data.resources) {
    sections.push('## Resources & Materials\n\n');
    const resources = data.resources.split('\n').filter(r => r.trim());
    resources.forEach(res => {
      const cleanRes = res.trim().replace(/^[-•*]\s*/, '');
      if (cleanRes) {
        sections.push(`- ${cleanRes}\n`);
      }
    });
    sections.push('\n');
  }

  // Accommodations
  if (data.accommodations) {
    sections.push('## Differentiation & Accommodations\n\n');
    sections.push(data.accommodations);
    sections.push('\n\n');
  }

  // Content-specific structure
  sections.push('---\n\n');
  sections.push('## Suggested Structure\n\n');

  const contentType = data.contentType?.toLowerCase() || '';

  if (contentType.includes('lesson plan')) {
    sections.push('### Lesson Plan Structure\n\n');
    sections.push('1. **Opening/Hook** (5-10 min)\n');
    sections.push('   - Engage students with a question, video, or activity\n');
    sections.push('2. **Introduction** (10-15 min)\n');
    sections.push('   - Present key concepts and vocabulary\n');
    sections.push('3. **Direct Instruction** (15-20 min)\n');
    sections.push('   - Model the skill or concept\n');
    sections.push('4. **Guided Practice** (15-20 min)\n');
    sections.push('   - Students practice with teacher support\n');
    sections.push('5. **Independent Practice** (15-20 min)\n');
    sections.push('   - Students work independently\n');
    sections.push('6. **Closure** (5-10 min)\n');
    sections.push('   - Review, assess understanding, preview next lesson\n\n');
  } else if (contentType.includes('quiz') || contentType.includes('test')) {
    sections.push('### Assessment Structure\n\n');
    sections.push('1. **Instructions** - Clear directions for students\n');
    sections.push('2. **Section A: Multiple Choice** (if applicable)\n');
    sections.push('3. **Section B: Short Answer** (if applicable)\n');
    sections.push('4. **Section C: Essay/Extended Response** (if applicable)\n');
    sections.push('5. **Answer Key** - Include point values and rubric\n\n');
  } else if (contentType.includes('course outline')) {
    sections.push('### Course Outline Structure\n\n');
    sections.push('1. **Course Overview** - Description and goals\n');
    sections.push('2. **Learning Outcomes** - What students will achieve\n');
    sections.push('3. **Weekly/Unit Schedule** - Topics and timeline\n');
    sections.push('4. **Assessment Plan** - How students will be evaluated\n');
    sections.push('5. **Required Materials** - Textbooks, resources\n');
    sections.push('6. **Policies** - Attendance, late work, etc.\n\n');
  } else {
    sections.push('### General Structure\n\n');
    sections.push('1. **Introduction** - Set context and objectives\n');
    sections.push('2. **Main Content** - Core material and concepts\n');
    sections.push('3. **Examples/Practice** - Application opportunities\n');
    sections.push('4. **Summary** - Key takeaways\n');
    sections.push('5. **Assessment** - Check for understanding\n\n');
  }

  // Ready-to-use prompt
  sections.push('---\n\n');
  sections.push('## Ready-to-Use Prompt\n\n');
  sections.push('Copy this prompt to use with ChatGPT, Claude, or any AI:\n\n');
  sections.push('```\n');

  let copyPrompt = `Create a ${data.contentType || 'educational content'}`;
  if (data.subject) {
    copyPrompt += ` about "${data.subject}"`;
  }
  if (data.gradeLevel) {
    copyPrompt += ` for ${data.gradeLevel} students`;
  }
  copyPrompt += '.\n\n';

  if (data.duration) {
    copyPrompt += `Duration: ${data.duration}\n`;
  }
  if (data.teachingStyle) {
    copyPrompt += `Teaching Style: ${data.teachingStyle}\n`;
  }

  if (data.learningObjectives) {
    copyPrompt += `\nLearning Objectives:\n${data.learningObjectives}\n`;
  }

  if (data.prerequisites) {
    copyPrompt += `\nPrerequisites: ${data.prerequisites}\n`;
  }

  if (data.activities) {
    copyPrompt += `\nActivities/Exercises:\n${data.activities}\n`;
  }

  if (data.assessmentType) {
    copyPrompt += `\nAssessment Type: ${data.assessmentType}\n`;
  }

  if (data.accommodations) {
    copyPrompt += `\nAccommodations: ${data.accommodations}\n`;
  }

  if (data.resources) {
    copyPrompt += `\nResources Needed: ${data.resources}\n`;
  }

  if (data.additionalNotes) {
    copyPrompt += `\nAdditional Notes: ${data.additionalNotes}\n`;
  }

  copyPrompt += '\nPlease create comprehensive, engaging, and age-appropriate educational content.';

  sections.push(copyPrompt);
  sections.push('\n```\n\n');

  // Tips
  sections.push('## Tips for Educators\n\n');
  sections.push('1. **Align with Standards**: Ensure content meets curriculum standards\n');
  sections.push('2. **Differentiate**: Provide options for different learning levels\n');
  sections.push('3. **Engage Actively**: Include hands-on activities when possible\n');
  sections.push('4. **Check Understanding**: Use formative assessments throughout\n');
  sections.push('5. **Be Flexible**: Adjust based on student needs and responses\n\n');

  // Footer
  sections.push('---\n');
  sections.push('*Generated by AI Prompter - https://github.com/Saqibnawazkhan/AI-Prompter*\n');

  return sections.join('');
}
