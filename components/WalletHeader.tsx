'use client';

import { useState, useEffect } from 'react';
import { useAccount, useDisconnect, useEnsName } from 'wagmi';
import { motion } from 'framer-motion';
import { X, Circle } from 'lucide-react';
import { mainnet } from 'wagmi/chains';

interface WalletHeaderProps {
  onDisconnect: () => void;
}

export function WalletHeader({ onDisconnect }: WalletHeaderProps) {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [mounted, setMounted] = useState(false);

  // Fetch ENS name if available
  const { data: ensName, isLoading: ensLoading } = useEnsName({
    address,
    chainId: mainnet.id,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDisconnectClick = () => {
    disconnect();
    onDisconnect();
  };

  // Don't render until mounted on client to avoid hydration mismatch
  if (!mounted || !isConnected || !address) return null;

  const truncatedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
  const displayName = ensName || truncatedAddress;

  return (
    <motion.div
      className="flex items-center gap-2 relative z-50"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: 'auto' }}
    >
          {/* Status Badge */}
          <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-space-800/60 to-space-700/40 border border-ens-blue/20 backdrop-blur-md group">
            {/* Status Indicator */}
            <motion.div
              className="relative"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Circle
                className="w-2 h-2 text-emerald-400 fill-emerald-400"
                strokeWidth={0}
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-emerald-400"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>

            {/* Address or ENS Name */}
            <motion.span
              className="text-xs font-medium text-gray-300 tracking-wide"
              style={{ fontFamily: ensName ? 'Epilogue' : 'JetBrains Mono' }}
              initial={false}
              animate={{ opacity: ensLoading ? 0.5 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {ensLoading ? truncatedAddress : displayName}
            </motion.span>

            {/* ENS Badge */}
            {ensName && !ensLoading && (
              <motion.div
                className="flex items-center justify-center px-1.5 py-0.5 rounded bg-ens-blue/10 border border-ens-blue/30"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <span className="text-[9px] font-bold text-ens-blue uppercase tracking-wider">
                  ENS
                </span>
              </motion.div>
            )}

            {/* Subtle glow */}
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-ens-blue/5 via-ens-purple/5 to-ens-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
              style={{ filter: 'blur(8px)' }}
            />
          </div>

      {/* Disconnect Button */}
      <button
        onClick={handleDisconnectClick}
        className="relative flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 hover:bg-rose-500/30 border-2 border-rose-500/40 hover:border-rose-500/60 transition-all cursor-pointer"
        title="Disconnect wallet"
        type="button"
      >
        <X className="w-4 h-4 text-rose-300 pointer-events-none" strokeWidth={2.5} />
      </button>
    </motion.div>
  );
}
