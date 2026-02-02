'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqItems = [
  {
    question: 'Is this safe?',
    answer: "Completely safe. Your tokens stay in your wallet. Delegation only updates a permission setting in the ENS contract - you're telling it 'I want to vote with my own tokens.'",
  },
  {
    question: 'Does this cost money?',
    answer: 'Just gas for one transaction (typically $1-3). After that, voting costs nothing.',
  },
  {
    question: 'What if I buy more ENS later?',
    answer: "Your tokens are automatically delegated. No action needed on your end!",
  },
];

export function FAQ() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="glass-card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 sm:px-5 md:px-6 py-4 flex items-center justify-between text-left hover:bg-space-700/30 transition-colors"
        whileHover={{ backgroundColor: 'rgba(15, 23, 42, 0.3)' }}
      >
        <span className="text-gray-300 font-medium text-sm sm:text-base">
          How does this work?
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 md:px-6 pb-4 space-y-4 border-t border-space-700/50 pt-4">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="space-y-2 p-3 rounded-lg hover:bg-space-700/20 transition-colors"
                >
                  <h3 className="text-white font-semibold text-sm sm:text-base">
                    {item.question}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
