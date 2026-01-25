import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Note: The Agora API endpoint may not be publicly available
    // This is a placeholder - in production you would use the actual API
    // For now, we'll return a mock count
    return NextResponse.json({ count: 3 });
  } catch (error) {
    console.error('Error fetching proposals:', error);
    return NextResponse.json({ count: 3 }, { status: 200 });
  }
}
