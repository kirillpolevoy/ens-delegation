import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://vote.ensdao.org/api/v1/proposals?filter=active', {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch proposals');
    }

    const data = await response.json();
    return NextResponse.json({ count: data?.proposals?.length || 0 });
  } catch (error) {
    console.error('Error fetching proposals:', error);
    return NextResponse.json({ count: null, error: 'Unable to fetch proposals' }, { status: 500 });
  }
}
