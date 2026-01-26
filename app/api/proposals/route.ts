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
      return NextResponse.json({ count: 1 });
    }

    const proposals = await response.json();

    // Count active proposals (not executed, not canceled, and within voting period)
    const now = Math.floor(Date.now() / 1000);
    const activeCount = proposals.filter((p: any) => {
      return !p.executedAtTimestamp &&
             !p.canceledAtTimestamp &&
             p.startTimestamp <= now &&
             p.endTimestamp >= now;
    }).length;

    return NextResponse.json({ count: activeCount });
  } catch (error) {
    console.error('Error fetching proposals:', error);
    // Fallback to known count if API fails
    return NextResponse.json({ count: 1 }, { status: 200 });
  }
}
