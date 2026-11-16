import { NextResponse } from 'next/server';
import { getCapitalFestEvent } from '@/lib/frontdesk';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const event = await getCapitalFestEvent(AbortSignal.timeout(10000));
    return NextResponse.json(event, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Could not load FrontDesk event:', error);
    return NextResponse.json(
      { message: 'Ticket details are temporarily unavailable. Please try again.' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
