'use client';

import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { WalletInfo } from '../WalletInfo';
import { WalletHeader } from '../WalletHeader';
import { ProposalCount } from '../ProposalCount';
import { motion } from 'framer-motion';
import { useENSBalance } from '@/hooks/useENSBalance';
import { useActiveProposals } from '@/hooks/useActiveProposals';
import { useBalance } from 'wagmi';
import { ensTokenConfig } from '@/lib/contracts/ens';
import { ExternalLink } from 'lucide-react';

interface Step1ConnectProps {
  onContinue: () => void;
  onAlreadyDelegated: () => void;
  onDisconnect: () => void;
}

export function Step1Connect({ onContinue, onAlreadyDelegated, onDisconnect }: Step1ConnectProps) {
  const [mounted, setMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const { balance: ensBalance, formatted: ensBalanceFormatted } = useENSBalance(address);
  const { data: ethBalance } = useBalance({ address });

  const { data: delegateAddress, isLoading: delegateLoading } = useReadContract({
    ...ensTokenConfig,
    functionName: 'delegates',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const { data: txHash, writeContract, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const { count: proposalCount } = useActiveProposals();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isSuccess && txHash) {
      onContinue();
    }
  }, [isSuccess, txHash, onContinue]);

  const hasENS = ensBalance > BigInt(0);
  const hasSufficientGas = ethBalance ? ethBalance.value > BigInt(0.001 * 10 ** 18) : false;
  const isSelfDelegated = delegateAddress?.toLowerCase() === address?.toLowerCase();
  const canActivate = isConnected && hasENS && hasSufficientGas && !delegateLoading;

  const handleActivateVotes = () => {
    if (!address || !canActivate) return;

    writeContract({
      ...ensTokenConfig,
      functionName: 'delegate',
      args: [address],
    });
  };

  return (
    <motion.div
      initial={mounted ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6"
    >
      {/* Wallet Status Bar - Clean separation from content */}
      {mounted && isConnected && (
        <div className="flex justify-end">
          <WalletHeader onDisconnect={onDisconnect} />
        </div>
      )}

      <div className="text-center space-y-2 relative">
        <motion.div
          initial={mounted ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            <span className="text-white inline-block drop-shadow-lg">
              Turn Your ENS
            </span>
            <br />
            <span className="text-white inline-block drop-shadow-[0_0_30px_rgba(82,152,255,0.5)]">
              Into Votes
            </span>
          </h1>
        </motion.div>
        <motion.p
          className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed px-4"
          initial={mounted ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {!mounted || !isConnected
            ? "Own ENS tokens? That means you get a vote."
            : isSelfDelegated
            ? "Your votes are ready. Use them."
            : !hasENS
            ? "You'll need ENS tokens to participate."
            : `You have ${parseFloat(ensBalanceFormatted).toLocaleString(undefined, { maximumFractionDigits: 2 })} ENS. Let's activate them.`}
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

            {/* State-specific messages and CTAs */}
            {isSelfDelegated ? (
              // Already delegated state
              <>
                <motion.div
                  className="glass-card p-3 sm:p-4 text-center"
                  initial={mounted ? { opacity: 0, y: 10 } : false}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-gray-200 text-sm sm:text-base font-medium">
                    You're all set. Go make your voice heard.
                  </p>
                </motion.div>

                <motion.a
                  href="https://dao.ens.gregskril.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    relative w-full py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl font-bold text-base
                    bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-2xl shadow-green-500/50
                    transition-all duration-500 overflow-hidden flex items-center justify-center gap-2
                  "
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={mounted ? { opacity: 0, y: 20 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
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
              </>
            ) : !hasENS ? (
              // No ENS state
              <>
                <ProposalCount />
                <motion.div
                  className="glass-card p-3 sm:p-4 text-center space-y-3"
                  initial={mounted ? { opacity: 0, y: 10 } : false}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-gray-200 text-sm sm:text-base font-medium leading-relaxed">
                    {proposalCount > 0
                      ? `You'll need ENS tokens to vote. There ${proposalCount === 1 ? 'is' : 'are'} ${proposalCount} active ${proposalCount === 1 ? 'proposal' : 'proposals'} right now.`
                      : "You'll need ENS tokens to participate in ENS governance."}
                  </p>

                  <motion.a
                    href="https://app.uniswap.org/swap?inputCurrency=ETH&outputCurrency=0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-semibold text-sm transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get ENS on Uniswap
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>

                  <button
                    disabled
                    className="w-full py-2.5 px-4 rounded-lg bg-space-700/50 text-gray-500 cursor-not-allowed border border-space-700 font-semibold text-sm"
                  >
                    Activate My Votes
                  </button>
                </motion.div>
              </>
            ) : (
              // Has ENS, not delegated state
              <>
                {!hasSufficientGas && (
                  <motion.div
                    className="glass-card p-3 border-yellow-500/50"
                    initial={mounted ? { opacity: 0, y: 10 } : false}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-yellow-400 text-center text-sm">
                      Add at least 0.001 ETH to your wallet to cover transaction fees.
                    </p>
                  </motion.div>
                )}

                <motion.div
                  className="glass-card p-3 sm:p-4 text-center"
                  initial={mounted ? { opacity: 0, y: 10 } : false}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-gray-200 text-sm sm:text-base font-medium leading-relaxed">
                    You have <span className="text-ens-blue font-bold">{parseFloat(ensBalanceFormatted).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span> ENS. That's <span className="text-ens-purple font-bold">{parseFloat(ensBalanceFormatted).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span> votes waiting to be activated.
                  </p>
                </motion.div>

                <motion.button
                  className={`
                    relative w-full py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl font-bold text-base
                    transition-all duration-500 overflow-hidden
                    ${canActivate
                      ? 'bg-gradient-to-r from-ens-blue to-ens-purple text-white shadow-2xl shadow-ens-blue/50'
                      : 'bg-space-700/50 text-gray-500 cursor-not-allowed border border-space-700'
                    }
                  `}
                  disabled={!canActivate || isPending || isConfirming}
                  onClick={handleActivateVotes}
                  whileHover={canActivate ? { scale: 1.02, y: -2 } : {}}
                  whileTap={canActivate ? { scale: 0.98 } : {}}
                  initial={mounted ? { opacity: 0, y: 20 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  {canActivate && !isPending && !isConfirming && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-2 mono">
                    {isPending || isConfirming
                      ? isPending
                        ? 'Confirm in wallet...'
                        : 'Activating...'
                      : 'Activate My Votes'}
                  </span>
                </motion.button>
              </>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
