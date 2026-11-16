import { NextResponse } from 'next/server';

type CheckoutInput = { ticketTypeRef?: unknown; quantity?: unknown; name?: unknown; email?: unknown; dateOfBirth?: unknown };

export async function POST(request: Request) {
  const key = process.env.FRONTDESK_SECRET_KEY;
  if (!key) return NextResponse.json({ message: 'Ticket checkout is not configured.' }, { status: 503 });
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ message: 'Invalid request origin.' }, { status: 403 });
  }
  const idempotencyKey = request.headers.get('idempotency-key');
  if (!idempotencyKey || !/^[0-9a-f-]{36}$/.test(idempotencyKey)) {
    return NextResponse.json({ message: 'Invalid checkout request.' }, { status: 400 });
  }
  let input: CheckoutInput;
  try { input = await request.json() as CheckoutInput; }
  catch { return NextResponse.json({ message: 'Invalid form data.' }, { status: 400 }); }
  const { ticketTypeRef, quantity, name, email, dateOfBirth } = input;
  if (typeof ticketTypeRef !== 'string' || !/^[0-9a-f-]{36}$/.test(ticketTypeRef)
    || !Number.isInteger(quantity) || (quantity as number) < 1 || (quantity as number) > 10
    || typeof name !== 'string' || name.trim().length < 2 || name.length > 100
    || typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    || typeof dateOfBirth !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth)) {
    return NextResponse.json({ message: 'Enter valid ticket and buyer details.' }, { status: 400 });
  }
  const body = {
    tickets: [{ ticketTypeRef, quantity }],
    contact: { name: name.trim(), email: email.trim().toLowerCase() },
    dateOfBirth,
    returnUrl: new URL('/tickets/return', request.url).toString(),
  };
  try {
    const result = await fetch('https://api.frontdesk.africa/v1/store/events/capitalfest/checkout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
      },
      body: JSON.stringify(body),
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
    });
    const data = await result.json() as { hostedUrl?: unknown; error?: { message?: string } };
    if (!result.ok) return NextResponse.json({ message: data.error?.message || 'Checkout could not be opened.' }, { status: result.status });
    if (typeof data.hostedUrl !== 'string' || !data.hostedUrl.startsWith('https://')) throw new Error('Invalid hosted checkout URL');
    return NextResponse.json({ hostedUrl: data.hostedUrl });
  } catch {
    return NextResponse.json({ message: 'Checkout is temporarily unavailable. Please try again.' }, { status: 502 });
  }
}
