'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Copy,
  Check,
  Download,
  RefreshCw,
  Share2,
  FileText,
  Maximize2,
  Minimize2
} from 'lucide-react';
import toast from 'react-hot-toast';

interface PromptOutputProps {
  prompt: string;
  onReset: () => void;
}

export default function PromptOutput({ prompt, onReset }: PromptOutputProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([prompt], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-development-prompt.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Downloaded successfully!');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AI Development Prompt',
          text: prompt,
        });
      } catch {
        // User cancelled sharing
      }
    } else {
      handleCopy();
    }
  };

  const wordCount = prompt.split(/\s+/).length;
  const charCount = prompt.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto space-y-6"
    >
      {/* Success Header */}
      <div className="glass rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center"
            >
              <Check className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Prompt Generated!
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {wordCount} words • {charCount} characters
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-purple-500 text-white hover:bg-purple-600'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all"
            >
              <Download className="w-4 h-4" />
              Download
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              <Share2 className="w-4 h-4" />
              Share
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onReset}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              New
            </motion.button>
          </div>
        </div>
      </div>

      {/* Prompt Display */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-500 to-blue-500">
          <div className="flex items-center gap-2 text-white">
            <FileText className="w-5 h-5" />
            <span className="font-semibold">Generated Prompt</span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white"
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

        <div className={`p-6 ${isExpanded ? '' : 'max-h-[500px]'} overflow-y-auto`}>
          <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
            {prompt}
          </pre>
        </div>
      </div>

      {/* Usage Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <span className="text-2xl">📝</span>
          How to Use This Prompt
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { step: '1', text: 'Copy the prompt using the button above' },
            { step: '2', text: 'Open ChatGPT, Claude, or your preferred AI' },
            { step: '3', text: 'Paste the entire prompt into the chat' },
            { step: '4', text: 'Watch the AI build your application!' },
          ].map((item) => (
            <div
              key={item.step}
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
            >
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm">
                {item.step}
              </div>
              <span className="text-gray-700 dark:text-gray-300 text-sm">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
