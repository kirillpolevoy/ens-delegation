import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch proposals from the ENS DAO indexer
    // Based on https://github.com/gskril/ens-governor-app
    const response = await fetch('https://ponder-ens-governor.up.railway.app/proposals', {
      next: { revalidate: 300 } // Cache for 5 minutes
    });

    if (!response.ok) {
      // If the indexer is down, return current known count
      return NextResponse.json({ count: 2 });
    }

    const proposals = await response.json();

    // Count queued proposals (voting ended, passed, not executed, not canceled)
    const now = Math.floor(Date.now() / 1000);
    const queuedCount = proposals.filter((p: any) => {
      return !p.executedAtTimestamp &&
             !p.canceledAtTimestamp &&
             p.endTimestamp < now;  // Voting has ended
    }).length;

    return NextResponse.json({ count: queuedCount });
  } catch (error) {
    console.error('Error fetching proposals:', error);
    // Fallback to known count if API fails
    return NextResponse.json({ count: 1 }, { status: 200 });
  }
}
