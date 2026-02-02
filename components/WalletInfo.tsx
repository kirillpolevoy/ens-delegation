'use client';

import { useState, useEffect } from 'react';
import { useAccount, useBalance, useReadContract } from 'wagmi';
import { useENSBalance } from '@/hooks/useENSBalance';
import { ensTokenConfig } from '@/lib/contracts/ens';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { formatEther } from 'viem';

export function WalletInfo() {
  const [mounted, setMounted] = useState(false);
  const { address } = useAccount();
  const { formatted: ensBalance, isLoading: ensLoading } = useENSBalance(address);
  const { data: ethBalance, isLoading: ethLoading } = useBalance({ address });

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

  if (!address || !mounted) return null;

  const isDelegated = delegateAddress && delegateAddress !== '0x0000000000000000000000000000000000000000';
  const isSelfDelegated = delegateAddress?.toLowerCase() === address.toLowerCase();
  const ethBalanceFormatted = ethBalance ? formatEther(ethBalance.value) : '0';
  const hasSufficientGas = ethBalance ? ethBalance.value > BigInt(0.001 * 10 ** 18) : false;

  return (
    <div className="space-y-1.5">
      {/* ENS Balance */}
      <motion.div
        className="glass-card p-2.5 sm:p-3 relative group"
        initial={mounted ? { opacity: 0, x: -20 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-xs font-medium tracking-wider uppercase">ENS Balance</span>
          {ensLoading ? (
            <div className="h-7 w-32 bg-space-700/50 animate-pulse rounded-lg" />
          ) : (
            <motion.span
              className="text-xl font-bold text-white mono"
              initial={mounted ? { opacity: 0, scale: 0.8 } : false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 150, damping: 15, delay: 0.2 }}
              style={{
                textShadow: '0 0 20px rgba(82, 152, 255, 0.5)'
              }}
            >
              {parseFloat(ensBalance).toLocaleString(undefined, { maximumFractionDigits: 2 })}
              <span className="text-base ml-1.5 text-gray-300">ENS</span>
            </motion.span>
          )}
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-ens-blue/5 to-ens-cyan/5 rounded-xl" />
        </div>
      </motion.div>

      {/* Status */}
      <motion.div
        className="glass-card p-2.5 sm:p-3 relative group"
        initial={mounted ? { opacity: 0, x: -20 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-xs font-medium tracking-wider uppercase">Status</span>
          {delegateLoading ? (
            <div className="h-7 w-36 bg-space-700/50 animate-pulse rounded-lg" />
          ) : (
            <motion.div
              className="flex items-center gap-2"
              initial={mounted ? { opacity: 0, x: 20 } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {isSelfDelegated ? (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.4 }}
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-400" strokeWidth={2.5} />
                  </motion.div>
                  <span className="text-emerald-400 font-semibold text-base">Active</span>
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.4 }}
                  >
                    <AlertCircle className="w-5 h-5 text-amber-400" strokeWidth={2.5} />
                  </motion.div>
                  <span className="text-amber-400 font-semibold text-base">Inactive</span>
                </>
              )}
            </motion.div>
          )}
        </div>

        {/* Status indicator glow */}
        {isSelfDelegated && (
          <motion.div
            className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl blur-xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        {!isSelfDelegated && (
          <motion.div
            className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-xl blur-xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* ETH Balance - Only show if not self-delegated */}
      {!isSelfDelegated && (
        <motion.div
          className="glass-card p-2.5 sm:p-3 relative group"
          initial={mounted ? { opacity: 0, x: -20 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs font-medium tracking-wider uppercase">ETH for Gas</span>
            {ethLoading ? (
              <div className="h-7 w-32 bg-space-700/50 animate-pulse rounded-lg" />
            ) : (
              <motion.div
                className="flex items-center gap-2"
                initial={mounted ? { opacity: 0, x: 20 } : false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
                >
                  {hasSufficientGas ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400" strokeWidth={2.5} />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400" strokeWidth={2.5} />
                  )}
                </motion.div>
                <span className={`font-semibold text-base mono ${hasSufficientGas ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {parseFloat(ethBalanceFormatted).toFixed(4)}
                  <span className="text-sm ml-1 opacity-90">ETH</span>
                </span>
              </motion.div>
            )}
          </div>

          {/* Gas status indicator */}
          {!hasSufficientGas && (
            <motion.div
              className="absolute -inset-0.5 bg-gradient-to-r from-rose-500/20 to-red-500/20 rounded-xl blur-xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.div>
      )}
    </div>
  );
}
