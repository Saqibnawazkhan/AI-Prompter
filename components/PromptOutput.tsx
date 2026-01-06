'use client';

import { useState } from 'react';

interface PromptOutputProps {
  prompt: string;
  onReset: () => void;
}

export default function PromptOutput({ prompt, onReset }: PromptOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
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
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-between items-center bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800">
          ✅ Your AI Prompt is Ready!
        </h2>
        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg ${
              copied
                ? 'bg-green-500 text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {copied ? '✓ Copied!' : '📋 Copy to Clipboard'}
          </button>
          <button
            onClick={handleDownload}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            💾 Download as .md
          </button>
          <button
            onClick={onReset}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            🔄 Create New
          </button>
        </div>
      </div>

      {/* Prompt Display */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <h3 className="text-white font-semibold text-lg">Generated Prompt Preview</h3>
        </div>
        <div className="p-8">
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 max-h-[600px] overflow-y-auto">
            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 leading-relaxed">
              {prompt}
            </pre>
          </div>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">📝 How to Use This Prompt</h3>
        <ol className="list-decimal list-inside space-y-2 text-blue-800">
          <li>Copy the prompt using the button above</li>
          <li>Open ChatGPT, Claude, or any AI coding assistant</li>
          <li>Paste the entire prompt into the chat</li>
          <li>The AI will build your application following the specifications</li>
          <li>Review the code and make adjustments as needed</li>
        </ol>
      </div>
    </div>
  );
}
