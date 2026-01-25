'use client';

import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { WalletInfo } from '../WalletInfo';
import { ProposalCount } from '../ProposalCount';
import { motion } from 'framer-motion';
import { useENSBalance } from '@/hooks/useENSBalance';
import { useBalance } from 'wagmi';

interface Step1ConnectProps {
  onContinue: () => void;
}

export function Step1Connect({ onContinue }: Step1ConnectProps) {
  const [mounted, setMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const { balance: ensBalance } = useENSBalance(address);
  const { data: ethBalance } = useBalance({ address });

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasENS = ensBalance > BigInt(0);
  const hasSufficientGas = ethBalance ? ethBalance.value > BigInt(0.001 * 10 ** 18) : false;
  const canContinue = isConnected && hasENS && hasSufficientGas;

  return (
    <motion.div
      initial={mounted ? { opacity: 0, x: 50 } : false}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-ens-blue to-purple-500 bg-clip-text text-transparent">
          Activate Your Voting Power
        </h1>
        <p className="text-gray-400 text-lg">
          Connect your wallet to delegate your ENS tokens to yourself
        </p>
      </div>

      <div className="flex justify-center">
        {!isConnected ? (
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
                className="glass-card p-4 border-red-500/50"
                initial={mounted ? { opacity: 0, y: 10 } : false}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-red-400 text-center">
                  You need ENS tokens to delegate. Get ENS tokens first.
                </p>
              </motion.div>
            )}

            {!hasSufficientGas && hasENS && (
              <motion.div
                className="glass-card p-4 border-yellow-500/50"
                initial={mounted ? { opacity: 0, y: 10 } : false}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-yellow-400 text-center">
                  You need at least 0.001 ETH for gas fees.
                </p>
              </motion.div>
            )}

            <motion.button
              className={`
                w-full py-4 px-8 rounded-xl font-semibold text-lg
                transition-all duration-300
                ${canContinue
                  ? 'bg-ens-blue hover:bg-ens-blue/80 text-white shadow-lg shadow-ens-blue/50'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }
              `}
              disabled={!canContinue}
              onClick={onContinue}
              whileHover={canContinue ? { scale: 1.02 } : {}}
              whileTap={canContinue ? { scale: 0.98 } : {}}
            >
              Continue
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
