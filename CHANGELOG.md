# Changelog

All notable changes to the ENS Self-Delegation Wizard.

## [1.0.0] - 2026-01-25

### Major Features

#### Data Source Change
- **Replaced Agora API with ENS Governor Indexer**
  - Previous: Attempted to use Agora API (endpoint unavailable)
  - Current: Uses [ENS Governor Indexer](https://github.com/gskril/ens-governor-app) at `https://ponder-ens-governor.up.railway.app`
  - Benefit: Real-time executable on-chain proposal counts
  - Implementation: `/app/api/proposals/route.ts`

#### UI/UX Enhancements
- Premium DeFi-inspired design with holographic card effects
- Cyber grid background with floating orbs
- Orchestrated animation sequences with Framer Motion
- Mobile-first responsive design optimized for all screen sizes

#### New Features
- **Uniswap Integration**: Direct buy link for users without ENS tokens
- **Dynamic Assets**:
  - `/app/icon.tsx` - Generated favicon with Next.js Image Response
  - `/app/opengraph-image.tsx` - Dynamic OG images for social sharing
- **Clickable Proposal Count**: Links to `dao.ens.gregskril.com`
- **Auto-detection**: Identifies already self-delegated users
- **Improved Copy**: Enhanced messaging throughout all wizard steps

#### Technical Upgrades
- Next.js 14 → **Next.js 16** with Turbopack
- Tailwind CSS v3 → **Tailwind CSS v4**
- Enhanced TypeScript types and error handling
- Fixed SSR hydration issues with mounted state checks

#### Deployment
- Custom domain: `ens-delegate.kirillpolevoy.com`
- Vercel production deployment with auto-SSL
- Comprehensive SEO and social media metadata

### API Reference Changes

**Old (Planned but Not Implemented):**
```typescript
// Agora API - endpoint not publicly available
fetch('https://vote.ensdao.org/api/v1/proposals?stage=active')
```

**New (Current Implementation):**
```typescript
// ENS Governor Indexer - actively maintained
fetch('https://ponder-ens-governor.up.railway.app/proposals')

// Filters for active proposals:
const active = proposals.filter(p =>
  !p.executedAtTimestamp &&
  !p.canceledAtTimestamp &&
  p.startTimestamp <= now &&
  p.endTimestamp >= now
)
```

### Link Changes

| Old Link | New Link | Context |
|----------|----------|---------|
| `https://agora.ensdao.org/` | `https://dao.ens.gregskril.com/` | Step 3 "See Active Proposals" |
| N/A | `https://app.uniswap.org/swap?outputCurrency=0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72` | New Uniswap buy link |

### Breaking Changes

None - this is the initial production release.

## Project History

- **Jan 25, 2026 (Morning)**: Initial planning and design
- **Jan 25, 2026 (Afternoon)**: Core implementation
- **Jan 25, 2026 (Evening)**: Premium design overhaul and production features
- **Jan 25, 2026 (Night)**: Final polish, documentation, and deployment

---

For detailed planning documents, see `/docs/plans/`. Note that these reflect the original vision and differ from the final implementation in key areas documented above.
