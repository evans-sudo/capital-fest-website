export type FrontDeskTicket = {
  ref: string;
  name: string;
  description: string | null;
  priceMinor: number;
  currency: string;
  remaining: number | null;
  soldOut: boolean;
  salesStartAt: string | null;
  salesEndAt: string | null;
};

export type FrontDeskEvent = {
  title: string;
  slug: string;
  startAt: string;
  timezone: string;
  location: { venueName: string | null; city: string | null } | null;
  ticketTypes: FrontDeskTicket[];
};

export async function getCapitalFestEvent(signal?: AbortSignal): Promise<FrontDeskEvent> {
  const key = process.env.NEXT_PUBLIC_FRONTDESK_PUBLISHABLE_KEY;
  if (!key) throw new Error('FrontDesk is not configured.');
  const response = await fetch('https://api.frontdesk.africa/v1/store/events/capitalfest', {
    headers: { Authorization: `Bearer ${key}` },
    signal,
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('Ticket details are temporarily unavailable.');
  const event = await response.json() as FrontDeskEvent;
  if (event.slug !== 'capitalfest' || !Array.isArray(event.ticketTypes)) {
    throw new Error('Ticket details are temporarily unavailable.');
  }
  return event;
}
