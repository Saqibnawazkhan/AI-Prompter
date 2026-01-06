'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is AI Prompter?',
    answer: 'AI Prompter is a free tool that helps you create professional, structured prompts for AI coding assistants like ChatGPT, Claude, and others. It transforms your app ideas into clear development specifications.',
  },
  {
    question: 'Is AI Prompter free to use?',
    answer: 'Yes! AI Prompter is completely free and open source. You can use it without any limitations or sign-up required.',
  },
  {
    question: 'Which AI assistants work with the generated prompts?',
    answer: 'The prompts work with any AI coding assistant including ChatGPT, Claude, GitHub Copilot, Gemini, and others. The structured format ensures clear communication with any AI.',
  },
  {
    question: 'Do I need coding experience to use this tool?',
    answer: 'No! AI Prompter is designed for everyone - from experienced developers to students and product managers. The templates guide you through creating professional prompts.',
  },
  {
    question: 'Can I save my generated prompts?',
    answer: 'Yes! AI Prompter automatically saves your prompt history in your browser. You can access and reuse previous prompts anytime from the history panel.',
  },
  {
    question: 'Is my data stored anywhere?',
    answer: 'No, all data stays in your browser using localStorage. We don\'t collect, store, or transmit any of your prompts or personal information.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 bg-gray-50/50 dark:bg-gray-800/30">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Everything you need to know about AI Prompter
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="font-medium text-gray-800 dark:text-white pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="px-6 pb-4 text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
