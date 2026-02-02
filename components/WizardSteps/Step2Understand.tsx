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
  onBack?: () => void;
}

export function Step2Understand({ onSuccess, onBack }: Step2UnderstandProps) {
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-4"
    >
      <div className="text-center space-y-3 relative">
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Ready to activate
        </motion.h1>
        <motion.div
          className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-4 space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p>
            Your <span className="text-ens-blue font-semibold">{tokenCount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span> ENS becomes <span className="text-ens-purple font-semibold">{tokenCount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span> votes. You'll be able to vote on proposals directly. This is a one-time setup.
          </p>
          <p className="text-gray-400 text-sm">
            You can change this anytime.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="holographic-card p-4 sm:p-5 md:p-6 text-center relative overflow-hidden"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-ens-blue/10 via-ens-purple/10 to-ens-cyan/10"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          style={{ backgroundSize: '200% 200%' }}
        />

        {/* Floating sparkles */}
        <motion.div
          className="relative z-10 space-y-6"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 150, delay: 0.4 }}
          >
            <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-ens-blue mx-auto mb-4 md:mb-6" strokeWidth={2} />
          </motion.div>

          <motion.div
            className="text-xl sm:text-2xl md:text-3xl font-bold space-y-2 md:space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <span className="text-white">Your</span>
              <motion.span
                className="text-ens-blue mono font-bold"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(82, 152, 255, 0.5)',
                    '0 0 40px rgba(82, 152, 255, 0.8)',
                    '0 0 20px rgba(82, 152, 255, 0.5)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {tokenCount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </motion.span>
              <span className="text-white">ENS</span>
            </div>

            <motion.div
              className="text-3xl text-white"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              =
            </motion.div>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <motion.span
                className="text-ens-purple mono font-bold"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(147, 51, 234, 0.5)',
                    '0 0 40px rgba(147, 51, 234, 0.8)',
                    '0 0 20px rgba(147, 51, 234, 0.5)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                {tokenCount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </motion.span>
              <span className="text-white">votes</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Corner accents */}
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-ens-blue/30 rounded-tr-2xl" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-ens-purple/30 rounded-bl-2xl" />
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
          relative w-full py-4 sm:py-5 md:py-6 px-6 sm:px-8 md:px-10 rounded-xl md:rounded-2xl font-bold text-base sm:text-lg md:text-xl
          bg-gradient-to-r from-ens-blue via-ens-purple to-ens-cyan
          text-white shadow-2xl
          relative overflow-hidden
          disabled:opacity-50 disabled:cursor-not-allowed
          border border-ens-blue/30
        "
        style={{
          backgroundSize: '200% 100%',
          boxShadow: '0 0 40px rgba(82, 152, 255, 0.4), 0 0 80px rgba(147, 51, 234, 0.3)',
        }}
        onClick={handleDelegate}
        disabled={isPending || isConfirming}
        whileHover={{
          scale: 1.02,
          y: -4,
          boxShadow: '0 0 60px rgba(82, 152, 255, 0.6), 0 0 120px rgba(147, 51, 234, 0.4)',
        }}
        whileTap={{ scale: 0.98 }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          backgroundPosition: {
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{ x: ['-200%', '200%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />

        {/* Glowing edges */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: [
              'inset 0 0 20px rgba(255, 255, 255, 0.1)',
              'inset 0 0 40px rgba(255, 255, 255, 0.2)',
              'inset 0 0 20px rgba(255, 255, 255, 0.1)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <span className="relative z-10 flex items-center justify-center gap-3 mono">
          {isPending || isConfirming ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Loader2 className="w-7 h-7" strokeWidth={3} />
              </motion.div>
              <span className="font-semibold">
                {isPending ? 'Confirm in wallet...' : 'Activating...'}
              </span>
            </>
          ) : (
            <>
              <span className="font-bold">Confirm</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </>
          )}
        </span>
      </motion.button>

      {onBack && (
        <motion.button
          onClick={onBack}
          className="text-gray-400 hover:text-white text-sm text-center transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          ← Back
        </motion.button>
      )}
    </motion.div>
  );
}
