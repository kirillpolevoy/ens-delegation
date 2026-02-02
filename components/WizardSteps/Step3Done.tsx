'use client';

import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from '@/hooks/useWindowSize';
import { CheckCircle, ExternalLink, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { ProposalCount } from '../ProposalCount';

interface Step3DoneProps {
  txHash?: string;
}

export function Step3Done({ txHash }: Step3DoneProps) {
  const { width, height } = useWindowSize();
  const [copied, setCopied] = useState(false);

  const etherscanUrl = txHash ? `https://etherscan.io/tx/${txHash}` : '';

  const handleCopy = () => {
    if (txHash) {
      navigator.clipboard.writeText(txHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8 relative"
    >
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
        colors={['#5298FF', '#9333EA', '#FFFFFF']}
      />

      <motion.div
        className="text-center space-y-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
        >
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto" strokeWidth={2} />
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl font-bold text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          You're in.
        </motion.h1>

        <motion.p
          className="text-gray-300 text-lg sm:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Your votes are active. Time to use them.
        </motion.p>
      </motion.div>

      {/* Transaction Details */}
      {txHash && (
        <motion.div
          className="glass-card p-5 sm:p-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
        <div className="text-center">
          <div className="text-gray-400 text-sm mb-2">
            <span className="font-semibold">Confirmed:</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <code className="text-ens-blue text-xs sm:text-sm bg-space-800/50 px-3 py-2 rounded mono">
              {txHash.slice(0, 10)}...{txHash.slice(-8)}
            </code>
            <motion.button
              className="p-2 hover:bg-space-700 rounded-lg transition-colors"
              onClick={handleCopy}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Copy transaction hash"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </motion.button>
          </div>
        </div>

        <motion.a
          href={etherscanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center justify-center gap-2
            w-full py-3 px-6 rounded-xl
            bg-space-700/50 hover:bg-space-700
            text-gray-300 hover:text-white
            transition-all duration-300 border border-space-600
          "
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View on Etherscan
          <ExternalLink className="w-4 h-4" />
        </motion.a>
      </motion.div>
      )}

      {/* Proposal motivation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <ProposalCount />
      </motion.div>

      {/* Call to Action */}
      <motion.a
        href="https://dao.ens.gregskril.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="
          block w-full py-5 sm:py-6 px-6 sm:px-8 rounded-xl md:rounded-2xl font-bold text-lg sm:text-xl text-center
          bg-gradient-to-r from-ens-blue to-ens-purple
          hover:from-ens-blue/90 hover:to-ens-purple/90
          text-white shadow-2xl shadow-ens-blue/50
          relative overflow-hidden
        "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 0% 50%, rgba(82, 152, 255, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 50%, rgba(82, 152, 255, 0.3) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ['-200%', '200%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />

        <span className="relative z-10 flex items-center justify-center gap-2 mono">
          Vote Now
          <ExternalLink className="w-5 h-5" />
        </span>
      </motion.a>
    </motion.div>
  );
}
