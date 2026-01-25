import { ensTokenAbi } from './abi/ensToken';

export const ENS_TOKEN_ADDRESS = '0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72' as const;

export const ensTokenConfig = {
  address: ENS_TOKEN_ADDRESS,
  abi: ensTokenAbi,
} as const;
