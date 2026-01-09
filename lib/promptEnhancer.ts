// Prompt enhancement utilities

export interface EnhancementOption {
  id: string;
  name: string;
  description: string;
  apply: (prompt: string) => string;
}

export const enhancementOptions: EnhancementOption[] = [
  {
    id: 'more-detail',
    name: 'Add More Detail',
    description: 'Make the prompt more detailed and specific',
    apply: (prompt: string) => {
      const additions = [
        '\n\n## Additional Context\n',
        'Please provide:\n',
        '- Detailed explanations for each step\n',
        '- Code comments explaining the logic\n',
        '- Alternative approaches where applicable\n',
        '- Potential edge cases to consider\n',
      ];
      return prompt + additions.join('');
    },
  },
  {
    id: 'step-by-step',
    name: 'Step-by-Step Format',
    description: 'Request a step-by-step breakdown',
    apply: (prompt: string) => {
      const prefix = '**Important:** Please provide a step-by-step breakdown of your response, numbering each major step clearly.\n\n';
      return prefix + prompt;
    },
  },
  {
    id: 'beginner-friendly',
    name: 'Beginner Friendly',
    description: 'Make explanations more accessible',
    apply: (prompt: string) => {
      const additions = [
        '\n\n## Note\n',
        'Please explain concepts in a beginner-friendly way:\n',
        '- Use simple language and avoid jargon where possible\n',
        '- Provide analogies or real-world examples\n',
        '- Break down complex concepts into smaller parts\n',
        '- Include helpful resources for further learning\n',
      ];
      return prompt + additions.join('');
    },
  },
  {
    id: 'expert-level',
    name: 'Expert Level',
    description: 'Assume advanced knowledge',
    apply: (prompt: string) => {
      const prefix = '**Note:** I have advanced technical knowledge. Please skip basic explanations and focus on sophisticated implementations, optimizations, and best practices.\n\n';
      return prefix + prompt;
    },
  },
  {
    id: 'production-ready',
    name: 'Production Ready',
    description: 'Focus on production-grade quality',
    apply: (prompt: string) => {
      const additions = [
        '\n\n## Production Requirements\n',
        'Ensure the solution is production-ready:\n',
        '- Implement proper error handling\n',
        '- Add input validation\n',
        '- Include logging and monitoring hooks\n',
        '- Follow security best practices\n',
        '- Consider scalability and performance\n',
        '- Add appropriate test coverage suggestions\n',
      ];
      return prompt + additions.join('');
    },
  },
  {
    id: 'with-tests',
    name: 'Include Tests',
    description: 'Add testing requirements',
    apply: (prompt: string) => {
      const additions = [
        '\n\n## Testing Requirements\n',
        'Please include:\n',
        '- Unit tests for core functionality\n',
        '- Integration tests where applicable\n',
        '- Test cases for edge cases\n',
        '- Mock data examples\n',
        '- Testing best practices for this context\n',
      ];
      return prompt + additions.join('');
    },
  },
  {
    id: 'with-documentation',
    name: 'Add Documentation',
    description: 'Include documentation',
    apply: (prompt: string) => {
      const additions = [
        '\n\n## Documentation Requirements\n',
        'Please provide:\n',
        '- API documentation (if applicable)\n',
        '- Code comments for complex logic\n',
        '- README content with setup instructions\n',
        '- Usage examples\n',
        '- Architecture overview\n',
      ];
      return prompt + additions.join('');
    },
  },
  {
    id: 'concise',
    name: 'Keep Concise',
    description: 'Request brief, focused response',
    apply: (prompt: string) => {
      const prefix = '**Important:** Please keep the response concise and focused. Avoid unnecessary explanations - just provide the essential information and code.\n\n';
      return prefix + prompt;
    },
  },
];

export function enhancePrompt(prompt: string, enhancementIds: string[]): string {
  let enhanced = prompt;

  for (const id of enhancementIds) {
    const enhancement = enhancementOptions.find(e => e.id === id);
    if (enhancement) {
      enhanced = enhancement.apply(enhanced);
    }
  }

  return enhanced;
}
