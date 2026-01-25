'use client';

import { useState, useEffect } from 'react';
import { useAccount, useBalance, useReadContract } from 'wagmi';
import { useENSBalance } from '@/hooks/useENSBalance';
import { ensTokenConfig } from '@/lib/contracts/ens';
import { motion } from 'framer-motion';
import { Wallet, CheckCircle, XCircle } from 'lucide-react';
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

  if (!address) return null;

  const isDelegated = delegateAddress && delegateAddress !== '0x0000000000000000000000000000000000000000';
  const isSelfDelegated = delegateAddress?.toLowerCase() === address.toLowerCase();
  const ethBalanceFormatted = ethBalance ? formatEther(ethBalance.value) : '0';
  const hasSufficientGas = ethBalance ? ethBalance.value > BigInt(0.001 * 10 ** 18) : false;

  return (
    <div className="space-y-4">
      {/* ENS Balance */}
      <motion.div
        className="glass-card p-6"
        initial={mounted ? { opacity: 0, y: 20 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-400">ENS Balance</span>
          {ensLoading ? (
            <div className="h-8 w-32 bg-gray-800 animate-pulse rounded" />
          ) : (
            <motion.span
              className="text-2xl font-bold text-ens-blue"
              initial={mounted ? { opacity: 0, scale: 0.5 } : false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              {parseFloat(ensBalance).toLocaleString(undefined, { maximumFractionDigits: 2 })} ENS
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* Delegation Status */}
      <motion.div
        className="glass-card p-6"
        initial={mounted ? { opacity: 0, y: 20 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Delegation Status</span>
          {delegateLoading ? (
            <div className="h-6 w-40 bg-gray-800 animate-pulse rounded" />
          ) : (
            <div className="flex items-center gap-2">
              {isSelfDelegated ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-green-500">Self-delegated</span>
                </>
              ) : isDelegated ? (
                <>
                  <Wallet className="w-5 h-5 text-yellow-500" />
                  <span className="text-yellow-500">Delegated to {delegateAddress?.slice(0, 6)}...{delegateAddress?.slice(-4)}</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-500">Not delegated</span>
                </>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* ETH Balance */}
      <motion.div
        className="glass-card p-6"
        initial={mounted ? { opacity: 0, y: 20 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-400">ETH for Gas</span>
          {ethLoading ? (
            <div className="h-6 w-32 bg-gray-800 animate-pulse rounded" />
          ) : (
            <div className="flex items-center gap-2">
              {hasSufficientGas ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              <span className={hasSufficientGas ? 'text-green-500' : 'text-red-500'}>
                {parseFloat(ethBalanceFormatted).toFixed(4)} ETH
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
