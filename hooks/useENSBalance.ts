import { useReadContract } from 'wagmi';
import { ensTokenConfig } from '@/lib/contracts/ens';
import { formatUnits } from 'viem';

export function useENSBalance(address?: `0x${string}`) {
  const { data, isLoading, isError } = useReadContract({
    ...ensTokenConfig,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const formatted = data ? formatUnits(data, 18) : '0';

  return {
    balance: data || BigInt(0),
    formatted,
    isLoading,
    isError,
  };
}
