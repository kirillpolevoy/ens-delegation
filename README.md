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
