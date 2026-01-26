# ENS Self-Delegation Wizard

A premium 3-step wizard that helps ENS token holders activate their governance voting power by self-delegating their tokens. Built with cutting-edge web3 engineering and DeFi-inspired design.

**Live Demo:** [ens-delegate.kirillpolevoy.com](https://ens-delegate.kirillpolevoy.com) | [ens-delegation.vercel.app](https://ens-delegation.vercel.app)

## Features

- 🎨 Premium DeFi-style UI with holographic effects and cyber aesthetics
- ✨ Orchestrated animations with Framer Motion
- 🔗 RainbowKit wallet connection with multiple wallet support
- 📊 Real-time ENS balance and delegation status
- 🗳️ Live active proposal count from ENS DAO indexer
- 🦄 Uniswap integration for users without ENS tokens
- ⛽ Gas estimation with real-time fees
- 🎉 Celebratory success state with confetti animation
- 📱 Fully responsive mobile-first design
- 🖼️ Dynamic Open Graph images for social sharing
- 🔍 SEO-optimized with comprehensive metadata

## Tech Stack

- **Next.js 16** - React framework with Turbopack
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first styling
- **wagmi v2** - React hooks for Ethereum
- **viem** - TypeScript Ethereum utilities
- **RainbowKit** - Beautiful wallet connection UI
- **Framer Motion** - Production-ready animations
- **Alchemy** - Reliable RPC provider
- **ENS Governor Indexer** - Real-time proposal data

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
- View your ENS token balance and delegation status
- See live count of active ENS DAO proposals (clickable link)
- Validate sufficient ETH for transaction fees
- Auto-detect if already self-delegated
- Buy ENS tokens directly via Uniswap if needed

### Step 2: Understand
- Visual representation of token → vote conversion
- Clear explanation of governance power activation
- Real-time gas fee estimate
- One-click delegation transaction

### Step 3: Done
- Celebrate with confetti animation! 🎉
- View transaction details on Etherscan
- Navigate to ENS DAO proposals to start voting

## Smart Contracts & Data Sources

### ENS Token Contract (Mainnet)
**Address:** `0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72`

**Functions Used:**
- `balanceOf(address)` - Read ENS token balance
- `delegates(address)` - Read current delegation address
- `delegate(address)` - Self-delegate tokens (write)

### ENS DAO Governance Data
**Source:** [ENS Governor Indexer](https://github.com/gskril/ens-governor-app)
**Endpoint:** `https://ponder-ens-governor.up.railway.app/proposals`

The app fetches real-time active proposal counts from the ENS Governor contract indexer, which tracks executable on-chain proposals. Users can click through to [dao.ens.gregskril.com](https://dao.ens.gregskril.com) to view and vote on proposals.

### Token Purchase
**Uniswap Integration:** Direct link to ENS/ETH pair on Uniswap v3
Users without ENS tokens see a "Buy ENS on Uniswap" button for easy token acquisition.

## Project Structure

```
├── app/
│   ├── api/
│   │   └── proposals/      # ENS Governor indexer API route
│   │       └── route.ts    # Fetches active proposal count
│   ├── layout.tsx          # Root layout with metadata and providers
│   ├── page.tsx            # Main wizard orchestration
│   ├── providers.tsx       # wagmi and RainbowKit configuration
│   ├── globals.css         # Global styles with custom utilities
│   ├── icon.tsx            # Dynamic favicon generation
│   └── opengraph-image.tsx # Dynamic OG image generation
├── components/
│   ├── WizardSteps/
│   │   ├── Step1Connect.tsx    # Wallet connection & validation
│   │   ├── Step2Understand.tsx # Delegation explanation & action
│   │   └── Step3Done.tsx       # Success state with confetti
│   ├── StepIndicator.tsx   # Animated progress indicator
│   ├── WalletInfo.tsx      # Balance, delegation, and gas status
│   ├── GasEstimate.tsx     # Real-time gas fee display
│   └── ProposalCount.tsx   # Active proposals (clickable)
├── hooks/
│   ├── useENSBalance.ts    # ENS token balance hook
│   ├── useGasEstimate.ts   # Gas estimation hook
│   ├── useActiveProposals.ts # Proposal count from API
│   └── useWindowSize.ts    # Responsive window size hook
├── lib/
│   └── contracts/
│       └── ens.ts          # ENS token contract config and ABI
└── public/
    ├── favicon.svg         # Static favicon fallback
    └── og-image.svg        # Static OG image fallback
```

## Deployment

The app is deployed on Vercel with automatic deployments from the `main` branch.

**Production URLs:**
- Primary: [ens-delegate.kirillpolevoy.com](https://ens-delegate.kirillpolevoy.com)
- Vercel: [ens-delegation.vercel.app](https://ens-delegation.vercel.app)

**Environment Variables Required:**
```bash
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

### Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kirillpolevoy/ens-delegation)

1. Click the deploy button above
2. Add environment variables
3. Deploy!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
