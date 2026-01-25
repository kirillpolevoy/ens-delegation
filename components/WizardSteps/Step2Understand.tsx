'use client';

import { motion } from 'framer-motion';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ensTokenConfig } from '@/lib/contracts/ens';
import { useENSBalance } from '@/hooks/useENSBalance';
import { GasEstimate } from '../GasEstimate';
import { Sparkles, Loader2 } from 'lucide-react';
import { useEffect } from 'react';

interface Step2UnderstandProps {
  onSuccess: (txHash: string) => void;
}

export function Step2Understand({ onSuccess }: Step2UnderstandProps) {
  const { address } = useAccount();
  const { formatted: ensBalance } = useENSBalance(address);

  const { data: hash, writeContract, isPending, isError, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isSuccess && hash) {
      onSuccess(hash);
    }
  }, [isSuccess, hash, onSuccess]);

  const handleDelegate = () => {
    if (!address) return;

    writeContract({
      ...ensTokenConfig,
      functionName: 'delegate',
      args: [address],
    });
  };

  const tokenCount = parseFloat(ensBalance);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          Empower Your Voice
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          By delegating your ENS tokens to yourself, you activate your voting power in ENS governance.
          This means you can vote on proposals that shape the future of the Ethereum Name Service.
        </p>
      </div>

      <motion.div
        className="glass-card p-8 text-center relative overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-ens-blue/10 to-purple-500/10"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="relative z-10">
          <Sparkles className="w-12 h-12 text-ens-blue mx-auto mb-4" />
          <motion.p
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Your{' '}
            <span className="text-ens-blue">
              {tokenCount.toLocaleString(undefined, { maximumFractionDigits: 2 })} ENS tokens
            </span>
            {' '}={' '}
            <span className="text-purple-400">
              {tokenCount.toLocaleString(undefined, { maximumFractionDigits: 2 })} votes
            </span>
          </motion.p>
        </div>
      </motion.div>

      <GasEstimate />

      {isError && (
        <motion.div
          className="glass-card p-4 border-red-500/50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-red-400 text-center text-sm">
            {error?.message || 'Transaction failed. Please try again.'}
          </p>
        </motion.div>
      )}

      <motion.button
        className="
          w-full py-6 px-8 rounded-xl font-bold text-xl
          bg-gradient-to-r from-ens-blue to-purple-500
          hover:from-ens-blue/80 hover:to-purple-500/80
          text-white shadow-2xl shadow-ens-blue/50
          relative overflow-hidden
          disabled:opacity-50 disabled:cursor-not-allowed
        "
        onClick={handleDelegate}
        disabled={isPending || isConfirming}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />

        <span className="relative z-10 flex items-center justify-center gap-2">
          {isPending || isConfirming ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              {isPending ? 'Confirm in wallet...' : 'Delegating...'}
            </>
          ) : (
            'Delegate to Myself'
          )}
        </span>
      </motion.button>

      <p className="text-gray-500 text-sm text-center">
        This transaction will be recorded on the Ethereum blockchain
      </p>
    </motion.div>
  );
}
