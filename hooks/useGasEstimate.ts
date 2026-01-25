'use client';

import { useState, useEffect } from 'react';
import { useAccount, useEstimateGas, useGasPrice } from 'wagmi';
import { ensTokenConfig } from '@/lib/contracts/ens';
import { formatEther } from 'viem';

export function useGasEstimate() {
  const { address } = useAccount();
  const [ethPrice, setEthPrice] = useState<number | null>(null);

  // Estimate gas for delegate transaction
  const { data: gasEstimate } = useEstimateGas({
    ...ensTokenConfig,
    functionName: 'delegate',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const { data: gasPrice } = useGasPrice();

  // Fetch ETH price
  useEffect(() => {
    async function fetchETHPrice() {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();
        setEthPrice(data.ethereum.usd);
      } catch (error) {
        console.error('Error fetching ETH price:', error);
      }
    }
    fetchETHPrice();
  }, []);

  if (!gasEstimate || !gasPrice || !ethPrice) {
    return { estimateUSD: null, estimateETH: null, isLoading: true };
  }

  const totalGas = gasEstimate * gasPrice;
  const totalETH = formatEther(totalGas);
  const totalUSD = parseFloat(totalETH) * ethPrice;

  return {
    estimateUSD: totalUSD,
    estimateETH: totalETH,
    isLoading: false,
  };
}
