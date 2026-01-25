'use client';

import { useState, useEffect } from 'react';
import { useGasPrice } from 'wagmi';
import { formatEther } from 'viem';

export function useGasEstimate() {
  const [ethPrice, setEthPrice] = useState<number | null>(null);

  // Use estimated gas for delegate transaction (typical: ~50,000 gas)
  const estimatedGas = BigInt(50000);

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

  if (!gasPrice || !ethPrice) {
    return { estimateUSD: null, estimateETH: null, isLoading: true };
  }

  const totalGas = estimatedGas * gasPrice;
  const totalETH = formatEther(totalGas);
  const totalUSD = parseFloat(totalETH) * ethPrice;

  return {
    estimateUSD: totalUSD,
    estimateETH: totalETH,
    isLoading: false,
  };
}
