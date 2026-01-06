'use client';

import { motion } from 'framer-motion';
import { Users, FileText, Sparkles, Globe } from 'lucide-react';

const stats = [
  { icon: Users, value: '10K+', label: 'Active Users', color: 'text-blue-500' },
  { icon: FileText, value: '50K+', label: 'Prompts Generated', color: 'text-purple-500' },
  { icon: Sparkles, value: '8', label: 'Templates', color: 'text-yellow-500' },
  { icon: Globe, value: '24/7', label: 'Available', color: 'text-green-500' },
];

export default function Stats() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
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
