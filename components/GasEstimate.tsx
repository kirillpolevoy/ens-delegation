'use client';

import { motion } from 'framer-motion';
import { useGasEstimate } from '@/hooks/useGasEstimate';
import { Fuel } from 'lucide-react';

export function GasEstimate() {
  const { estimateUSD, estimateETH, isLoading } = useGasEstimate();

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-yellow-500/20 rounded-full">
          <Fuel className="w-6 h-6 text-yellow-500" />
        </div>
        <div>
          <div className="text-gray-400 text-sm">Estimated Gas Fee</div>
          {isLoading ? (
            <div className="h-6 w-24 bg-gray-800 animate-pulse rounded mt-1" />
          ) : (
            <motion.div
              className="text-xl font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ${estimateUSD?.toFixed(2)} <span className="text-gray-500 text-sm">({estimateETH} ETH)</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
