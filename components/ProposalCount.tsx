'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useActiveProposals } from '@/hooks/useActiveProposals';
import { Vote, ExternalLink } from 'lucide-react';

export function ProposalCount() {
  const [mounted, setMounted] = useState(false);
  const { count, isLoading, error } = useActiveProposals();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.a
      href="https://dao.ens.gregskril.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card p-3 sm:p-3.5 md:p-4 relative group overflow-hidden block cursor-pointer"
      initial={mounted ? { opacity: 0, scale: 0.95 } : false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.01 }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(82, 152, 255, 0.5) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }} />
      </div>

      <div className="flex items-center gap-3 sm:gap-4 md:gap-6 relative z-10">
        <motion.div
          className="p-3 md:p-4 bg-gradient-to-br from-ens-blue/20 to-ens-purple/10 rounded-xl md:rounded-2xl relative"
          initial={{ rotate: -10, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.6 }}
        >
          <Vote className="w-5 h-5 md:w-7 md:h-7 text-ens-blue" strokeWidth={2.5} />

          {/* Icon glow */}
          <motion.div
            className="absolute inset-0 bg-ens-blue/30 rounded-2xl blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        <div className="flex-1">
          {isLoading ? (
            <div className="h-8 w-56 bg-space-700/50 animate-pulse rounded-xl" />
          ) : error ? (
            <span className="text-gray-500 text-sm font-medium">{error}</span>
          ) : (
            <motion.div
              initial={mounted ? { x: -20, opacity: 0 } : false}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex items-baseline gap-3"
            >
              <motion.span
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mono"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 150, delay: 0.8 }}
                style={{
                  textShadow: '0 0 20px rgba(82, 152, 255, 0.6)'
                }}
              >
                {count}
              </motion.span>
              <span className="text-white text-sm sm:text-base md:text-lg font-medium flex items-center gap-2">
                queued proposal{count !== 1 ? 's' : ''}
                <motion.span
                  className="inline-flex items-center gap-1"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                </motion.span>
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-ens-blue/5 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
    </motion.a>
  );
}
