import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch proposals from the ENS DAO indexer
    // Based on https://github.com/gskril/ens-governor-app
    const response = await fetch('https://ponder-ens-governor.up.railway.app/proposals', {
      next: { revalidate: 300 } // Cache for 5 minutes
    });

    if (!response.ok) {
      // If the indexer is down, return 0 active proposals
      return NextResponse.json({ activeCount: 0 });
    }

    const proposals = await response.json();

    // Count active proposals (voting is currently happening)
    const now = Math.floor(Date.now() / 1000);
    const activeCount = proposals.filter((p: any) => {
      return !p.executedAtTimestamp &&
             !p.canceledAtTimestamp &&
             now >= p.startTimestamp &&
             now < p.endTimestamp;  // Voting is active
    }).length;

    return NextResponse.json({ activeCount });
  } catch (error) {
    console.error('Error fetching proposals:', error);
    // Fallback to 0 active proposals if API fails
    return NextResponse.json({ activeCount: 0 }, { status: 200 });
  }
}
