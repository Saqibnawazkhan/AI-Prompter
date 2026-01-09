'use client';

import { motion } from 'framer-motion';
import { Users, FileText, Sparkles, Globe, Layers, Zap } from 'lucide-react';

const stats = [
  { icon: Layers, value: '8', label: 'Prompt Categories', color: 'text-purple-500', gradient: 'from-purple-500 to-blue-500' },
  { icon: Sparkles, value: '40+', label: 'Templates', color: 'text-yellow-500', gradient: 'from-yellow-500 to-orange-500' },
  { icon: Zap, value: '5', label: 'AI Platforms', color: 'text-blue-500', gradient: 'from-blue-500 to-cyan-500' },
  { icon: Globe, value: '100%', label: 'Free & Open Source', color: 'text-green-500', gradient: 'from-green-500 to-emerald-500' },
];

export default function Stats() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Built for Every Use Case
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive prompt generation for all your AI needs
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all text-center group"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto mb-3`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
