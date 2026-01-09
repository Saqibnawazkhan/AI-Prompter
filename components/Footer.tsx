'use client';

import { Heart, Github, Twitter, Linkedin, ExternalLink, Code, Image, FileText, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const categories = [
    { name: 'Development', icon: Code },
    { name: 'Image Generation', icon: Image },
    { name: 'Writing', icon: FileText },
    { name: 'Marketing', icon: TrendingUp },
  ];

  const links = [
    { label: 'GitHub', href: 'https://github.com/Saqibnawazkhan/AI-Prompter', external: true },
    { label: 'Report Issue', href: 'https://github.com/Saqibnawazkhan/AI-Prompter/issues', external: true },
    { label: 'Contribute', href: 'https://github.com/Saqibnawazkhan/AI-Prompter/pulls', external: true },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-xl">⚡</span>
              </div>
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                AI Prompter
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 max-w-sm">
              The ultimate prompt generator for AI assistants. Create professional prompts for development, images, writing, marketing, and more.
            </p>
            <div className="flex flex-wrap gap-2">
              {['ChatGPT', 'Claude', 'Midjourney', 'DALL-E'].map((tool) => (
                <span
                  key={tool}
                  className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                    <cat.icon className="w-4 h-4" />
                    {cat.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors"
                  >
                    {link.label}
                    {link.external && <ExternalLink className="w-3 h-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>© {currentYear} AI Prompter. Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              </motion.div>
              <span>by</span>
              <a
                href="https://github.com/Saqibnawazkhan"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-purple-600 dark:text-purple-400 hover:underline"
              >
                Saqib Nawaz Khan
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href="https://github.com/Saqibnawazkhan"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
