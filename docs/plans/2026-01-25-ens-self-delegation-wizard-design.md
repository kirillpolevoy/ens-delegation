# ENS Self-Delegation Wizard - Design Document

> **⚠️ HISTORICAL DOCUMENT:** This design plan was the foundation for the project. The final implementation evolved significantly:
> - Upgraded to premium DeFi aesthetic with holographic effects
> - ENS Governor Indexer replaced Agora API for proposal data
> - Added Uniswap buy link, OG image generation, custom domain
> - Enhanced mobile responsiveness and copy improvements
>
> See README.md for final architecture and features.

---

**Date:** 2026-01-25
**Status:** Implemented with Enhancements

## Overview

A magical 3-step wizard web app that helps ENS token holders activate their voting power by delegating tokens to themselves. Premium UI with exciting animations for first-time web3 users.

## Product Requirements

### User Flow

**Step 1: Connect**
- Connect wallet via RainbowKit
- Display after connection:
  - ENS token balance
  - Current delegation status (none, self, or delegated to address)
  - ETH balance with gas sufficiency indicator
  - Active proposal count from ENS governance
- Validation: Block progress if no ENS tokens or insufficient ETH

**Step 2: Understand**
- Plain English explanation of self-delegation
- Show token count = vote count
- Gas estimate in USD
- "Delegate to Myself" button
- Handle transaction flow (pending → success/error)

**Step 3: Done**
- Success celebration animation
- Transaction hash with Etherscan link
- "See Active Proposals on ENS Agora" button

### Key Behaviors

- Users with existing delegation to others: Allow re-delegating to self
- Users without tokens: Hard block with clear message
- Users with insufficient ETH: Block with gas requirement message
- Mobile responsive throughout

## Tech Stack

### Frontend
- **Framework:** Next.js 14+ (app router) with TypeScript
- **Styling:** Tailwind CSS with dark theme
- **Animation:** Framer Motion for transitions and effects

### Web3
- **React Hooks:** wagmi v2 (useAccount, useBalance, useReadContract, useWriteContract)
- **Ethereum Utils:** viem for type-safe contract interactions
- **Wallet UX:** RainbowKit
- **RPC Provider:** Alchemy (mainnet)

### External APIs
- Agora API for ENS proposal data
- Alchemy API for blockchain calls

## Architecture

### Component Structure

```
app/
├── layout.tsx                    # Providers (RainbowKit, wagmi), global theme
├── page.tsx                      # Main wizard container
└── components/
    ├── WizardSteps/
    │   ├── Step1Connect.tsx      # Wallet connection + data display
    │   ├── Step2Understand.tsx   # Explanation + delegate button
    │   └── Step3Done.tsx         # Success confirmation
    ├── StepIndicator.tsx         # Progress dots (1-2-3)
    ├── WalletInfo.tsx           # Address, ENS balance, delegation status
    ├── GasEstimate.tsx          # Gas cost in USD
    └── ProposalCount.tsx        # Active proposals from Agora
```

### State Management

**Wizard State:**
```typescript
const [currentStep, setCurrentStep] = useState(1)
const [txHash, setTxHash] = useState<string | null>(null)
```

**Blockchain Data (wagmi hooks):**
- `useAccount()` - connected wallet address
- `useBalance()` - ETH balance for gas check
- `useReadContract()` + `balanceOf` - ENS token balance
- `useReadContract()` + `delegates` - current delegation address
- `useWriteContract()` - call `delegate(userAddress)`
- `useWaitForTransactionReceipt()` - wait for tx confirmation

**Custom Hooks:**
- `useActiveProposals()` - fetch from Agora API

### Contract Integration

**ENS Token Contract:**
- Address: `0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72`
- Network: Ethereum Mainnet
- Methods:
  - `balanceOf(address)` - read token balance
  - `delegates(address)` - read current delegate
  - `delegate(address)` - write to set delegate

### Data Flow

1. **Connection:** User connects wallet → fetch all read data
2. **Validation:** Check ENS balance > 0 && ETH balance >= gas estimate
3. **Delegation:** User clicks delegate → MetaMask prompt → pending → confirmed
4. **Success:** Save txHash → auto-advance to Step 3

### Validation Logic

```typescript
const canProceedFromStep1 =
  isConnected &&
  ensBalance > 0 &&
  ethBalance >= estimatedGasNeeded
```

### Error Handling

- **No wallet:** Show connect button
- **No ENS tokens:** "You need ENS tokens to delegate"
- **Insufficient ETH:** "You need ~$X ETH for gas fees"
- **Transaction rejected:** "Transaction cancelled" (stay on Step 2)
- **Transaction failed:** Show error with retry button

## UI/UX Design

### Visual Theme

**Colors:**
- Background: `bg-gray-950` with animated gradient overlay
- Cards: `bg-gray-900/50` with glassmorphism (backdrop blur)
- Borders: `border-gray-800`
- Accent: ENS blue (#5298FF) for CTAs and highlights
- Glows: `shadow-[0_0_15px_rgba(82,152,255,0.3)]`

**Typography:**
- Font: Inter or similar modern sans-serif
- Hierarchy: Clear heading sizes, readable body text

### Magical Elements

**Ambient Effects:**
- Animated gradient background (deep blue → purple → blue cycle)
- Floating particle effects (subtle slow-moving orbs)
- Glassmorphism on all cards
- Aurora/northern lights effect behind main wizard

**Interactive Magic:**
- **Wallet Connect:** Ripple animation on connection
- **Balance Load:** Numbers count up from 0 (animated counter)
- **Token Display:** Glowing pulse when balance loads
- **Delegate Button:** Holographic shimmer on hover, particle trail
- **Transaction Pending:** Rotating cosmic animation

### Step-Specific Effects

**Step 1 - The Awakening:**
- Flash of light when balance loads
- Delegation status badge glows if not delegated
- Active proposals number pulses gently

**Step 2 - The Empowerment:**
- "XXX tokens = XXX votes" text sparkles on appear
- Delegate button has rotating animated gradient border
- On click: button expands, sends energy waves
- During tx: cosmic loading (swirling stars/galaxies)

**Step 3 - The Celebration:**
- Confetti explosion (ENS blue colors)
- Glowing checkmark draws itself with trail effect
- Transaction hash appears with typewriter effect
- "See Active Proposals" button pulses invitingly
- Occasional firework sparkles around success message

### Animations & Transitions

**Step Transitions:**
- Framer Motion `<AnimatePresence>`
- Slide + fade: previous slides left/fades, next slides in from right
- Duration: 300ms, ease-in-out
- Progress dots: filled → pulsing → completed (checkmark)

**Loading States:**
- Skeleton loaders with shimmer effect
- Spinner on transaction button when pending
- Pulsing border on loading cards

**Micro-interactions:**
- Buttons: scale on hover (1.02x), press (0.98x)
- Cards: lift on hover (shadow increase)
- Copy button on tx hash: "Copied!" tooltip

### Mobile Responsive

- Vertical stack on small screens
- Full-width cards with proper padding
- Touch-friendly buttons (min 44px height)
- Modal wallet connection

## Implementation Phases

### Phase 1: Project Setup
- Create Next.js project with app router
- Install dependencies: wagmi, viem, RainbowKit, Tailwind, Framer Motion
- Configure Alchemy provider (placeholder API key)
- Set up basic layout with dark theme

### Phase 2: Wallet Connection
- Add RainbowKit provider and styling
- Create connect wallet button
- Show connected address
- Style connection flow

### Phase 3: Read Blockchain Data
- Fetch ENS token balance
- Fetch current delegate address
- Fetch ETH balance
- Create display components with loading states
- Add validation logic

### Phase 4: Governance Context
- Research Agora API endpoint
- Fetch active proposal count
- Display with error handling

### Phase 5: Delegation Transaction
- Set up contract write for delegate()
- Create transaction button with states
- Handle success (tx hash, Etherscan link)
- Handle errors with clear messages

### Phase 6: Wizard Flow
- Build 3-step wizard component
- Animate transitions between steps
- Gate each step on validation
- Add progress indicator

### Phase 7: Polish
- Add magical animations and effects
- Ensure mobile responsiveness
- Test all states and edge cases
- Final design touches

## Success Criteria

- Wallet connects smoothly via RainbowKit
- All blockchain data displays correctly with loading states
- Validation prevents progress when requirements not met
- Delegation transaction completes successfully
- Transaction hash links to Etherscan
- UI feels premium, magical, and exciting
- Mobile experience is smooth and usable
- Error states are clear and helpful
