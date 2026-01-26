'use client';

import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract } from 'wagmi';
import { WalletInfo } from '../WalletInfo';
import { ProposalCount } from '../ProposalCount';
import { motion } from 'framer-motion';
import { useENSBalance } from '@/hooks/useENSBalance';
import { useBalance } from 'wagmi';
import { ensTokenConfig } from '@/lib/contracts/ens';

interface Step1ConnectProps {
  onContinue: () => void;
  onAlreadyDelegated: () => void;
}

export function Step1Connect({ onContinue, onAlreadyDelegated }: Step1ConnectProps) {
  const [mounted, setMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const { balance: ensBalance } = useENSBalance(address);
  const { data: ethBalance } = useBalance({ address });

  const { data: delegateAddress, isLoading: delegateLoading } = useReadContract({
    ...ensTokenConfig,
    functionName: 'delegates',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasENS = ensBalance > BigInt(0);
  const hasSufficientGas = ethBalance ? ethBalance.value > BigInt(0.001 * 10 ** 18) : false;
  const isSelfDelegated = delegateAddress?.toLowerCase() === address?.toLowerCase();
  const canContinue = isConnected && hasENS && hasSufficientGas && !delegateLoading;

  return (
    <motion.div
      initial={mounted ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-4"
    >
      <div className="text-center space-y-2 relative">
        <motion.div
          initial={mounted ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            <span className="text-white inline-block drop-shadow-lg">
              Activate Your
            </span>
            <br />
            <span className="text-white inline-block drop-shadow-[0_0_30px_rgba(82,152,255,0.5)]">
              Voting Power
            </span>
          </h1>
        </motion.div>
        <motion.p
          className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed px-4"
          initial={mounted ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Self-delegate your ENS tokens to unlock governance voting
        </motion.p>

        {/* Decorative elements */}
        <motion.div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-ens-blue/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <div className="flex justify-center">
        {!mounted || !isConnected ? (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ConnectButton />
          </motion.div>
        ) : (
          <motion.div
            className="w-full space-y-6"
            initial={mounted ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
          >
            <WalletInfo />
            <ProposalCount />

            {!hasENS && (
              <motion.div
                className="glass-card p-4 border-red-500/50 space-y-3"
                initial={mounted ? { opacity: 0, y: 10 } : false}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-red-400 text-center text-sm sm:text-base">
                  No ENS tokens found. Purchase ENS tokens to participate in governance.
                </p>
                <motion.a
                  href="https://app.uniswap.org/swap?outputCurrency=0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72&chain=mainnet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-semibold text-sm transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.63 15.51L7.09 17.01C4.57 18.93 4.42 22.54 6.75 24.65C8.34 26.06 10.67 26.38 12.63 25.5L13.85 27L15.31 25.5L13.09 23.21C13.4 22.87 13.67 22.5 13.9 22.09L18.22 26.59L19.68 25.09L15.36 20.59C15.66 19.96 15.86 19.28 15.95 18.56L20.85 23.65L22.31 22.15L17.41 17.06C17.41 17.03 17.41 17 17.41 16.97C17.41 15.61 16.88 14.35 16 13.41L17.5 11.84L14.26 8.5L12.76 10.07C11.82 9.19 10.56 8.66 9.2 8.66C8.88 8.66 8.57 8.69 8.27 8.75L3.17 3.5L1.71 5L6.81 10.25C6.29 10.82 5.88 11.5 5.63 12.25L1 7.5L-.46 9L4.17 13.75C4.11 14.32 4.17 14.91 4.34 15.48L.5 11.5L-1 13L5.63 15.51M9.2 10.66C11.53 10.66 13.41 12.61 13.41 15.01C13.41 17.41 11.53 19.36 9.2 19.36C6.87 19.36 5 17.41 5 15.01C5 12.61 6.87 10.66 9.2 10.66Z" fill="currentColor"/>
                  </svg>
                  Buy ENS on Uniswap
                </motion.a>
              </motion.div>
            )}

            {!hasSufficientGas && hasENS && (
              <motion.div
                className="glass-card p-4 border-yellow-500/50"
                initial={mounted ? { opacity: 0, y: 10 } : false}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-yellow-400 text-center text-sm sm:text-base">
                  Add at least 0.001 ETH to your wallet to cover transaction fees.
                </p>
              </motion.div>
            )}

            <motion.button
              className={`
                relative w-full py-4 sm:py-5 px-6 sm:px-8 md:px-10 rounded-xl md:rounded-2xl font-bold text-base sm:text-lg
                transition-all duration-500 overflow-hidden
                ${canContinue
                  ? isSelfDelegated
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-2xl shadow-green-500/50'
                    : 'bg-gradient-to-r from-ens-blue to-ens-purple text-white shadow-2xl shadow-ens-blue/50'
                  : 'bg-space-700/50 text-gray-500 cursor-not-allowed border border-space-700'
                }
              `}
              disabled={!canContinue}
              onClick={isSelfDelegated ? onAlreadyDelegated : onContinue}
              whileHover={canContinue ? { scale: 1.02, y: -2 } : {}}
              whileTap={canContinue ? { scale: 0.98 } : {}}
              initial={mounted ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {canContinue && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2 mono">
                {isSelfDelegated ? '✓ Already Delegated' : 'Continue →'}
              </span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
