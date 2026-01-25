'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useActiveProposals } from '@/hooks/useActiveProposals';
import { Vote } from 'lucide-react';

export function ProposalCount() {
  const [mounted, setMounted] = useState(false);
  const { count, isLoading, error } = useActiveProposals();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      className="glass-card p-6"
      initial={mounted ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-ens-blue/20 rounded-full">
          <Vote className="w-6 h-6 text-ens-blue" />
        </div>
        <div>
          {isLoading ? (
            <div className="h-6 w-48 bg-gray-800 animate-pulse rounded" />
          ) : error ? (
            <span className="text-gray-500 text-sm">{error}</span>
          ) : (
            <motion.div
              initial={mounted ? { scale: 0.8, opacity: 0 } : false}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <span className="text-lg font-semibold">
                <motion.span
                  className="text-ens-blue text-2xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {count}
                </motion.span>
                {' '}active proposal{count !== 1 ? 's' : ''} right now
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
