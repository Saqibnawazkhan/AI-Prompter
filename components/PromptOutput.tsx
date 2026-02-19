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
  Minimize2,
  RotateCcw
} from 'lucide-react';
import toast from 'react-hot-toast';
import PromptStats from './PromptStats';

interface PromptOutputProps {
  prompt: string;
  onReset: () => void;
  onRegenerate?: () => void;
}

export default function PromptOutput({ prompt, onReset, onRegenerate }: PromptOutputProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

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

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownload = () => {
    downloadFile(prompt, 'ai-prompt.md', 'text/markdown');
    toast.success('Downloaded as Markdown!');
  };

  const handleDownloadJSON = () => {
    const json = JSON.stringify({
      prompt,
      metadata: {
        wordCount: prompt.split(/\s+/).length,
        charCount: prompt.length,
        generatedAt: new Date().toISOString(),
        source: 'AI Prompter',
      },
    }, null, 2);
    downloadFile(json, 'ai-prompt.json', 'application/json');
    toast.success('Downloaded as JSON!');
  };

  const handleDownloadTxt = () => {
    downloadFile(prompt, 'ai-prompt.txt', 'text/plain');
    toast.success('Downloaded as Text!');
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
  const lineCount = prompt.split('\n').length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

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
                {wordCount} words • {charCount} chars • {lineCount} lines • {readingTime} min read
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

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all"
              >
                <Download className="w-4 h-4" />
                Download
              </motion.button>
              {showDownloadMenu && (
                <div className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-1 min-w-[160px] z-10">
                  <button onClick={() => { handleDownload(); setShowDownloadMenu(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">
                    Markdown (.md)
                  </button>
                  <button onClick={() => { handleDownloadTxt(); setShowDownloadMenu(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">
                    Plain Text (.txt)
                  </button>
                  <button onClick={() => { handleDownloadJSON(); setShowDownloadMenu(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">
                    JSON (.json)
                  </button>
                </div>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              <Share2 className="w-4 h-4" />
              Share
            </motion.button>

            {onRegenerate && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRegenerate}
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium bg-amber-500 text-white hover:bg-amber-600 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Regenerate
              </motion.button>
            )}

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

      {/* Prompt Stats */}
      <PromptStats prompt={prompt} className="mb-2" />

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
