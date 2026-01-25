# ENS Self-Delegation Wizard Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a magical 3-step wizard that helps ENS token holders delegate their tokens to themselves with premium UI and exciting animations.

**Architecture:** Next.js app router with wagmi/viem for blockchain interactions, RainbowKit for wallet connection, and Framer Motion for animations. Frontend-design skill for premium UI.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, wagmi v2, viem, RainbowKit, Framer Motion, Alchemy RPC

---

## Task 1: Initialize Next.js Project

**Files:**
- Create: entire project structure via CLI
- Create: `.env.local`
- Create: `.gitignore`

**Step 1: Create Next.js app with TypeScript and Tailwind**

```bash
cd /Users/kpolevoy/ENS
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

When prompted:
- Would you like to use TypeScript? Yes
- Would you like to use ESLint? Yes
- Would you like to use Tailwind CSS? Yes
- Would you like to use `src/` directory? No
- Would you like to use App Router? Yes
- Would you like to customize the default import alias? No

**Step 2: Install web3 dependencies**

```bash
npm install wagmi viem @tanstack/react-query @rainbow-me/rainbowkit
```

**Step 3: Install animation dependencies**

```bash
npm install framer-motion react-confetti
```

**Step 4: Create environment file**

Create `.env.local`:
```bash
NEXT_PUBLIC_ALCHEMY_API_KEY=your_api_key_here
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

**Step 5: Update .gitignore**

Add to `.gitignore`:
```
.env.local
.env*.local
```

**Step 6: Commit**

```bash
git add .
git commit -m "feat: initialize Next.js project with web3 dependencies"
```

---

## Task 2: Configure Tailwind for Dark Theme

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

**Step 1: Update Tailwind config**

In `tailwind.config.ts`, update the config:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'ens-blue': '#5298FF',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(82, 152, 255, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(82, 152, 255, 0.6)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
```

**Step 2: Update global CSS**

Replace content in `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-gray-950 text-white;
  }
}

@layer utilities {
  .glass-card {
    @apply bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl;
  }

  .magic-gradient {
    background: linear-gradient(
      135deg,
      rgba(82, 152, 255, 0.1) 0%,
      rgba(147, 51, 234, 0.1) 50%,
      rgba(82, 152, 255, 0.1) 100%
    );
    background-size: 200% 200%;
    animation: gradient-shift 10s ease infinite;
  }

  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
}
```

**Step 3: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "feat: configure Tailwind dark theme and custom styles"
```

---

## Task 3: Set Up wagmi and RainbowKit Providers

**Files:**
- Create: `app/providers.tsx`
- Modify: `app/layout.tsx`

**Step 1: Create providers component**

Create `app/providers.tsx`:

```typescript
'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { ReactNode } from 'react';

const config = getDefaultConfig({
  appName: 'ENS Self-Delegation',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({
          accentColor: '#5298FF',
          accentColorForeground: 'white',
          borderRadius: 'large',
        })}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

**Step 2: Update layout to use providers**

Modify `app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ENS Self-Delegation",
  description: "Activate your ENS voting power by delegating to yourself",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

**Step 3: Commit**

```bash
git add app/providers.tsx app/layout.tsx
git commit -m "feat: add wagmi and RainbowKit providers"
```

---

## Task 4: Create ENS Contract Configuration

**Files:**
- Create: `lib/contracts/ens.ts`
- Create: `lib/contracts/abi/ensToken.ts`

**Step 1: Create contract ABI**

Create `lib/contracts/abi/ensToken.ts`:

```typescript
export const ensTokenAbi = [
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'delegator', type: 'address' }],
    name: 'delegates',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'delegatee', type: 'address' }],
    name: 'delegate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
```

**Step 2: Create contract config**

Create `lib/contracts/ens.ts`:

```typescript
import { ensTokenAbi } from './abi/ensToken';

export const ENS_TOKEN_ADDRESS = '0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72' as const;

export const ensTokenConfig = {
  address: ENS_TOKEN_ADDRESS,
  abi: ensTokenAbi,
} as const;
```

**Step 3: Commit**

```bash
git add lib/contracts/abi/ensToken.ts lib/contracts/ens.ts
git commit -m "feat: add ENS token contract configuration and ABI"
```

---

## Task 5: Create Step Indicator Component

**Files:**
- Create: `components/StepIndicator.tsx`

**Step 1: Create step indicator component**

Create `components/StepIndicator.tsx`:

```typescript
'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
        const isCompleted = step < currentStep;
        const isCurrent = step === currentStep;

        return (
          <div key={step} className="flex items-center gap-4">
            <motion.div
              className={`
                relative w-12 h-12 rounded-full flex items-center justify-center
                transition-all duration-300
                ${isCompleted ? 'bg-ens-blue' : isCurrent ? 'bg-ens-blue/20 border-2 border-ens-blue' : 'bg-gray-800 border-2 border-gray-700'}
              `}
              animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {isCompleted ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                >
                  <Check className="w-6 h-6 text-white" />
                </motion.div>
              ) : (
                <span className="text-lg font-semibold">{step}</span>
              )}

              {isCurrent && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-ens-blue"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>

            {step < totalSteps && (
              <div className={`w-16 h-0.5 ${isCompleted ? 'bg-ens-blue' : 'bg-gray-700'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/StepIndicator.tsx
git commit -m "feat: add animated step indicator component"
```

---

## Task 6: Create Wallet Info Component

**Files:**
- Create: `components/WalletInfo.tsx`
- Create: `hooks/useENSBalance.ts`

**Step 1: Create ENS balance hook**

Create `hooks/useENSBalance.ts`:

```typescript
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
```

**Step 2: Create wallet info component**

Create `components/WalletInfo.tsx`:

```typescript
'use client';

import { useAccount, useBalance, useReadContract } from 'wagmi';
import { useENSBalance } from '@/hooks/useENSBalance';
import { ensTokenConfig } from '@/lib/contracts/ens';
import { motion } from 'framer-motion';
import { Wallet, CheckCircle, XCircle } from 'lucide-react';
import { formatEther } from 'viem';

export function WalletInfo() {
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
        initial={{ opacity: 0, y: 20 }}
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
              initial={{ opacity: 0, scale: 0.5 }}
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
        initial={{ opacity: 0, y: 20 }}
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
        initial={{ opacity: 0, y: 20 }}
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
```

**Step 3: Commit**

```bash
git add hooks/useENSBalance.ts components/WalletInfo.tsx
git commit -m "feat: add wallet info component with ENS and ETH balance"
```

---

## Task 7: Create Proposal Count Component

**Files:**
- Create: `hooks/useActiveProposals.ts`
- Create: `components/ProposalCount.tsx`

**Step 1: Create active proposals hook**

Create `hooks/useActiveProposals.ts`:

```typescript
'use client';

import { useState, useEffect } from 'react';

export function useActiveProposals() {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProposals() {
      try {
        setIsLoading(true);
        // Agora API endpoint for ENS governance
        const response = await fetch('https://vote.ensdao.org/api/v1/proposals?filter=active');

        if (!response.ok) {
          throw new Error('Failed to fetch proposals');
        }

        const data = await response.json();
        setCount(data?.proposals?.length || 0);
        setError(null);
      } catch (err) {
        console.error('Error fetching proposals:', err);
        setError('Unable to fetch proposals');
        setCount(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProposals();
  }, []);

  return { count, isLoading, error };
}
```

**Step 2: Create proposal count component**

Create `components/ProposalCount.tsx`:

```typescript
'use client';

import { motion } from 'framer-motion';
import { useActiveProposals } from '@/hooks/useActiveProposals';
import { Vote } from 'lucide-react';

export function ProposalCount() {
  const { count, isLoading, error } = useActiveProposals();

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-ens-blue/20 rounded-full">
          <Vote className="w-6 h-6 text-ens-blue" />
        </div>
        <div>
          {isLoading ? (
            <div className="h-6 w-48 bg-gray-800 animate-pulse rounded" />
          ) : error ? (
            <span className="text-gray-500 text-sm">{error}</span>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <span className="text-lg font-semibold">
                <motion.span
                  className="text-ens-blue text-2xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {count}
                </motion.span>
                {' '}active proposal{count !== 1 ? 's' : ''} right now
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
```

**Step 3: Commit**

```bash
git add hooks/useActiveProposals.ts components/ProposalCount.tsx
git commit -m "feat: add active proposals count component"
```

---

## Task 8: Create Step 1 - Connect

**Files:**
- Create: `components/WizardSteps/Step1Connect.tsx`

**Step 1: Create Step 1 component**

Create `components/WizardSteps/Step1Connect.tsx`:

```typescript
'use client';

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
  const { address, isConnected } = useAccount();
  const { balance: ensBalance } = useENSBalance(address);
  const { data: ethBalance } = useBalance({ address });

  const hasENS = ensBalance > BigInt(0);
  const hasSufficientGas = ethBalance ? ethBalance.value > BigInt(0.001 * 10 ** 18) : false;
  const canContinue = isConnected && hasENS && hasSufficientGas;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <WalletInfo />
            <ProposalCount />

            {!hasENS && (
              <motion.div
                className="glass-card p-4 border-red-500/50"
                initial={{ opacity: 0, y: 10 }}
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
                initial={{ opacity: 0, y: 10 }}
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
```

**Step 2: Commit**

```bash
git add components/WizardSteps/Step1Connect.tsx
git commit -m "feat: add Step 1 Connect component with validation"
```

---

## Task 9: Create Gas Estimate Component

**Files:**
- Create: `hooks/useGasEstimate.ts`
- Create: `components/GasEstimate.tsx`

**Step 1: Create gas estimate hook**

Create `hooks/useGasEstimate.ts`:

```typescript
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
```

**Step 2: Create gas estimate component**

Create `components/GasEstimate.tsx`:

```typescript
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
```

**Step 3: Commit**

```bash
git add hooks/useGasEstimate.ts components/GasEstimate.tsx
git commit -m "feat: add gas estimate component with USD conversion"
```

---

## Task 10: Create Step 2 - Understand

**Files:**
- Create: `components/WizardSteps/Step2Understand.tsx`

**Step 1: Create Step 2 component**

Create `components/WizardSteps/Step2Understand.tsx`:

```typescript
'use client';

import { motion } from 'framer-motion';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ensTokenConfig } from '@/lib/contracts/ens';
import { useENSBalance } from '@/hooks/useENSBalance';
import { GasEstimate } from '../GasEstimate';
import { Sparkles, Loader2 } from 'lucide-react';
import { useEffect } from 'react';

interface Step2UnderstandProps {
  onSuccess: (txHash: string) => void;
}

export function Step2Understand({ onSuccess }: Step2UnderstandProps) {
  const { address } = useAccount();
  const { formatted: ensBalance } = useENSBalance(address);

  const { data: hash, writeContract, isPending, isError, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isSuccess && hash) {
      onSuccess(hash);
    }
  }, [isSuccess, hash, onSuccess]);

  const handleDelegate = () => {
    if (!address) return;

    writeContract({
      ...ensTokenConfig,
      functionName: 'delegate',
      args: [address],
    });
  };

  const tokenCount = parseFloat(ensBalance);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          Empower Your Voice
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          By delegating your ENS tokens to yourself, you activate your voting power in ENS governance.
          This means you can vote on proposals that shape the future of the Ethereum Name Service.
        </p>
      </div>

      <motion.div
        className="glass-card p-8 text-center relative overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-ens-blue/10 to-purple-500/10"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="relative z-10">
          <Sparkles className="w-12 h-12 text-ens-blue mx-auto mb-4" />
          <motion.p
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Your{' '}
            <span className="text-ens-blue">
              {tokenCount.toLocaleString(undefined, { maximumFractionDigits: 2 })} ENS tokens
            </span>
            {' '}={' '}
            <span className="text-purple-400">
              {tokenCount.toLocaleString(undefined, { maximumFractionDigits: 2 })} votes
            </span>
          </motion.p>
        </div>
      </motion.div>

      <GasEstimate />

      {isError && (
        <motion.div
          className="glass-card p-4 border-red-500/50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-red-400 text-center text-sm">
            {error?.message || 'Transaction failed. Please try again.'}
          </p>
        </motion.div>
      )}

      <motion.button
        className="
          w-full py-6 px-8 rounded-xl font-bold text-xl
          bg-gradient-to-r from-ens-blue to-purple-500
          hover:from-ens-blue/80 hover:to-purple-500/80
          text-white shadow-2xl shadow-ens-blue/50
          relative overflow-hidden
          disabled:opacity-50 disabled:cursor-not-allowed
        "
        onClick={handleDelegate}
        disabled={isPending || isConfirming}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />

        <span className="relative z-10 flex items-center justify-center gap-2">
          {isPending || isConfirming ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              {isPending ? 'Confirm in wallet...' : 'Delegating...'}
            </>
          ) : (
            'Delegate to Myself'
          )}
        </span>
      </motion.button>

      <p className="text-gray-500 text-sm text-center">
        This transaction will be recorded on the Ethereum blockchain
      </p>
    </motion.div>
  );
}
```

**Step 2: Commit**

```bash
git add components/WizardSteps/Step2Understand.tsx
git commit -m "feat: add Step 2 Understand with delegation transaction"
```

---

## Task 11: Create Step 3 - Done

**Files:**
- Create: `components/WizardSteps/Step3Done.tsx`

**Step 1: Create Step 3 component**

Create `components/WizardSteps/Step3Done.tsx`:

```typescript
'use client';

import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from '@/hooks/useWindowSize';
import { CheckCircle, ExternalLink, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface Step3DoneProps {
  txHash: string;
}

export function Step3Done({ txHash }: Step3DoneProps) {
  const { width, height } = useWindowSize();
  const [copied, setCopied] = useState(false);

  const etherscanUrl = `https://etherscan.io/tx/${txHash}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(txHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8 relative"
    >
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
        colors={['#5298FF', '#9333EA', '#FFFFFF']}
      />

      <motion.div
        className="text-center space-y-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
        >
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto" strokeWidth={2} />
        </motion.div>

        <motion.h1
          className="text-5xl font-bold bg-gradient-to-r from-green-400 to-ens-blue bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          You're All Set!
        </motion.h1>

        <motion.p
          className="text-gray-400 text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Your voting power is now active. You can participate in ENS governance!
        </motion.p>
      </motion.div>

      {/* Transaction Details */}
      <motion.div
        className="glass-card p-6 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="text-center">
          <div className="text-gray-400 text-sm mb-2">Transaction Hash</div>
          <div className="flex items-center justify-center gap-2">
            <code className="text-ens-blue text-sm bg-gray-900 px-3 py-2 rounded">
              {txHash.slice(0, 10)}...{txHash.slice(-8)}
            </code>
            <motion.button
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              onClick={handleCopy}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </motion.button>
          </div>
        </div>

        <motion.a
          href={etherscanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center justify-center gap-2
            w-full py-3 px-6 rounded-xl
            bg-gray-800 hover:bg-gray-700
            text-gray-300 hover:text-white
            transition-all duration-300
          "
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View on Etherscan
          <ExternalLink className="w-4 h-4" />
        </motion.a>
      </motion.div>

      {/* Call to Action */}
      <motion.a
        href="https://agora.ensdao.org/"
        target="_blank"
        rel="noopener noreferrer"
        className="
          block w-full py-6 px-8 rounded-xl font-bold text-xl text-center
          bg-gradient-to-r from-ens-blue to-purple-500
          hover:from-ens-blue/80 hover:to-purple-500/80
          text-white shadow-2xl shadow-ens-blue/50
          relative overflow-hidden
        "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 0% 50%, rgba(82, 152, 255, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 50%, rgba(82, 152, 255, 0.3) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <span className="relative z-10 flex items-center justify-center gap-2">
          See Active Proposals on ENS Agora
          <ExternalLink className="w-5 h-5" />
        </span>
      </motion.a>
    </motion.div>
  );
}
```

**Step 2: Create window size hook**

Create `hooks/useWindowSize.ts`:

```typescript
'use client';

import { useState, useEffect } from 'react';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
```

**Step 3: Commit**

```bash
git add components/WizardSteps/Step3Done.tsx hooks/useWindowSize.ts
git commit -m "feat: add Step 3 Done with confetti celebration"
```

---

## Task 12: Create Main Wizard Page

**Files:**
- Modify: `app/page.tsx`

**Step 1: Update main page**

Replace content in `app/page.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { StepIndicator } from '@/components/StepIndicator';
import { Step1Connect } from '@/components/WizardSteps/Step1Connect';
import { Step2Understand } from '@/components/WizardSteps/Step2Understand';
import { Step3Done } from '@/components/WizardSteps/Step3Done';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [txHash, setTxHash] = useState<string>('');

  const handleStep1Continue = () => {
    setCurrentStep(2);
  };

  const handleStep2Success = (hash: string) => {
    setTxHash(hash);
    setCurrentStep(3);
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 magic-gradient" />
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-ens-blue/20 rounded-full blur-3xl"
          animate={{
            y: [0, 100, 0],
            x: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            y: [0, -100, 0],
            x: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <StepIndicator currentStep={currentStep} totalSteps={3} />

        <div className="glass-card p-8 md:p-12 min-h-[600px]">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <Step1Connect key="step1" onContinue={handleStep1Continue} />
            )}
            {currentStep === 2 && (
              <Step2Understand key="step2" onSuccess={handleStep2Success} />
            )}
            {currentStep === 3 && (
              <Step3Done key="step3" txHash={txHash} />
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <motion.footer
          className="text-center mt-8 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Built with ♥ for ENS governance
        </motion.footer>
      </div>
    </main>
  );
}
```

**Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat: create main wizard page with step transitions"
```

---

## Task 13: Add Missing lucide-react Icons

**Files:**
- None (package installation)

**Step 1: Install lucide-react**

```bash
npm install lucide-react
```

**Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add lucide-react for icons"
```

---

## Task 14: Create README Documentation

**Files:**
- Create: `README.md`

**Step 1: Create README**

Create `README.md`:

```markdown
# ENS Self-Delegation Wizard

A magical 3-step wizard that helps ENS token holders activate their voting power by delegating their tokens to themselves.

## Features

- 🎨 Premium dark theme UI with glassmorphism
- ✨ Magical animations and transitions
- 🔗 RainbowKit wallet connection
- 📊 Real-time ENS balance and delegation status
- ⛽ Gas estimation with USD conversion
- 🎉 Celebratory success state with confetti
- 📱 Fully responsive design

## Tech Stack

- **Next.js 14** - React framework with app router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **wagmi v2** - React hooks for Ethereum
- **viem** - TypeScript utilities for Ethereum
- **RainbowKit** - Wallet connection UI
- **Framer Motion** - Animations
- **Alchemy** - RPC provider

## Getting Started

### Prerequisites

- Node.js 18+
- An Alchemy API key
- A WalletConnect project ID

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file:

```bash
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## How It Works

### Step 1: Connect
- Connect your wallet via RainbowKit
- View your ENS token balance
- Check your current delegation status
- See active ENS governance proposals
- Validate sufficient ETH for gas

### Step 2: Understand
- Learn about self-delegation
- See your voting power (tokens = votes)
- Review gas estimate in USD
- Execute the delegation transaction

### Step 3: Done
- Celebrate with confetti! 🎉
- View your transaction on Etherscan
- Navigate to ENS Agora to vote on proposals

## Smart Contract

**ENS Token (Mainnet):** `0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72`

**Functions Used:**
- `balanceOf(address)` - Read ENS balance
- `delegates(address)` - Read current delegate
- `delegate(address)` - Write to set delegate

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main wizard page
│   ├── providers.tsx       # wagmi and RainbowKit providers
│   └── globals.css         # Global styles
├── components/
│   ├── WizardSteps/        # Wizard step components
│   ├── StepIndicator.tsx   # Progress indicator
│   ├── WalletInfo.tsx      # Balance and delegation display
│   ├── GasEstimate.tsx     # Gas fee display
│   └── ProposalCount.tsx   # Active proposals
├── hooks/
│   ├── useENSBalance.ts    # ENS balance hook
│   ├── useGasEstimate.ts   # Gas estimation hook
│   ├── useActiveProposals.ts # Agora API hook
│   └── useWindowSize.ts    # Window size hook
└── lib/
    └── contracts/          # Contract configs and ABIs
```

## License

MIT
```

**Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add comprehensive README"
```

---

## Task 15: Final Testing and Polish

**Files:**
- None (testing phase)

**Step 1: Test the application**

Run the development server:
```bash
npm run dev
```

**Step 2: Test each step**

1. **Step 1:**
   - Connect wallet
   - Verify ENS balance displays
   - Verify delegation status shows
   - Verify ETH balance check works
   - Verify proposal count loads
   - Test validation (try with no ENS, insufficient ETH)

2. **Step 2:**
   - Verify gas estimate displays
   - Click "Delegate to Myself"
   - Confirm transaction in wallet
   - Verify pending state shows
   - Wait for confirmation

3. **Step 3:**
   - Verify confetti plays
   - Verify transaction hash displays
   - Test copy button
   - Test Etherscan link
   - Test Agora link

**Step 3: Test responsive design**

- Resize browser to mobile width
- Verify all components are readable
- Verify buttons are touch-friendly
- Verify animations work on mobile

**Step 4: Build for production**

```bash
npm run build
```

Expected: Build completes successfully with no errors

**Step 5: Final commit**

```bash
git add .
git commit -m "feat: complete ENS self-delegation wizard"
```

---

## Implementation Complete

The ENS self-delegation wizard is now fully implemented with:

✅ Next.js project with TypeScript and Tailwind
✅ wagmi and RainbowKit integration
✅ ENS token contract integration
✅ 3-step wizard with validation
✅ Premium dark theme UI with glassmorphism
✅ Magical animations and transitions
✅ Gas estimation with USD conversion
✅ Active proposal count from Agora
✅ Transaction handling with success celebration
✅ Mobile responsive design
✅ Comprehensive documentation

**Next Steps:**
1. Get your Alchemy API key from https://www.alchemy.com/
2. Get your WalletConnect project ID from https://cloud.walletconnect.com/
3. Add them to `.env.local`
4. Run `npm run dev` and test!
