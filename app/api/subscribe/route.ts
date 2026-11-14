import { NextResponse } from 'next/server';

/**
 * No false positives: subscription is only successful after the configured
 * service returns a successful response. Configure a trusted URL in .env.local.
 * For production, add a platform rate limiter/bot protection at the edge.
 */
export async function POST(request: Request) {
  let payload: unknown;
  try { payload = await request.json(); }
  catch { return NextResponse.json({message:'Invalid form data.'},{status:400}); }
  if (typeof payload !== 'object' || !payload) return NextResponse.json({message:'Invalid form data.'},{status:400});
  const {name,email,consent,website} = payload as Record<string, unknown>;
  if (website) return NextResponse.json({message:'Thanks for your interest.'});
  if (typeof name !== 'string' || name.trim().length < 2 || name.length > 100 || typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({message:'Please provide a valid name and email address.'},{status:400});
  }
  if (typeof consent !== 'boolean') return NextResponse.json({message:'Invalid marketing preference.'},{status:400});
  if (!process.env.NEWSLETTER_WEBHOOK_URL) return NextResponse.json({message:'Signups are not live yet. Please check back after the official launch.'},{status:503});
  try {
    const result = await fetch(process.env.NEWSLETTER_WEBHOOK_URL, {
      method:'POST', headers:{'Content-Type':'application/json',...(process.env.NEWSLETTER_API_TOKEN ? {'Authorization':`Bearer ${process.env.NEWSLETTER_API_TOKEN}`} : {})},
      body:JSON.stringify({name:name.trim(), email:email.trim().toLowerCase(), marketingConsent:consent, source:'capital-fest-website'}),
      signal: AbortSignal.timeout(8000),
      cache:'no-store',
    });
    if (!result.ok) throw new Error(`Provider returned ${result.status}`);
    return NextResponse.json({message:'Thanks for signing up! You’re now on the Capital Fest updates list.'});
  } catch {
    return NextResponse.json({message:'We couldn’t complete your signup right now. Please try again later.'},{status:502});
  }
}
