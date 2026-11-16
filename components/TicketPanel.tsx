'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import type { FrontDeskEvent } from '@/lib/frontdesk';

async function loadTickets(signal: AbortSignal): Promise<FrontDeskEvent> {
  const response = await fetch('/api/tickets/event', { signal, cache: 'no-store' });
  if (!response.ok) throw new Error('Ticket details are temporarily unavailable. Please try again.');
  return response.json() as Promise<FrontDeskEvent>;
}

export function TicketPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [event, setEvent] = useState<FrontDeskEvent | null>(null);
  const [error, setError] = useState('');
  const [tierRef, setTierRef] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [checkoutError, setCheckoutError] = useState('');
  const [loading, setLoading] = useState(false);
  const checkoutAttempt = useRef('');
  const openCheckout = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!checkoutAttempt.current) checkoutAttempt.current = crypto.randomUUID();
    setLoading(true); setCheckoutError('');
    try {
      const response = await fetch('/api/tickets/checkout', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': checkoutAttempt.current },
        body: JSON.stringify({ ticketTypeRef: tierRef, quantity, name, email, dateOfBirth }),
      });
      const data = await response.json() as { hostedUrl?: string; message?: string };
      if (!response.ok || !data.hostedUrl) throw new Error(data.message || 'Checkout could not be opened.');
      window.location.assign(data.hostedUrl);
    } catch (cause) {
      setCheckoutError(cause instanceof Error ? cause.message : 'Checkout could not be opened.');
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!isOpen) return;
    const controller = new AbortController();
    setError('');
    loadTickets(controller.signal).then(data => { setEvent(data); setTierRef(current => current || data.ticketTypes.find(tier => !tier.soldOut)?.ref || ''); }).catch((cause: unknown) => {
      if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : 'Ticket details are temporarily unavailable.');
    });
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtn.current?.focus();
    function handleKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', handleKey);
    return () => { controller.abort(); window.removeEventListener('keydown', handleKey); document.body.style.overflow = old; };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return <div className="ticket-overlay" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="ticket-panel" role="dialog" aria-modal="true" aria-labelledby="ticket-title">
      <div className="ticket-panel-top"><span className="eyebrow dark">CAPITAL FEST</span><button ref={closeBtn} onClick={onClose} aria-label="Close tickets panel" className="round-icon"><X size={23}/></button></div>
      <div className="ticket-panel-body"><span className="ticket-sparkle" aria-hidden="true">✳</span><p className="eyebrow dark">YOUR SPOT IN THE CROWD</p><h2 id="ticket-title">TICKETS<span>!</span></h2>
        {event ? <>
          <p className="ticket-panel__event">{new Intl.DateTimeFormat('en-NG', { dateStyle: 'full', timeStyle: 'short', timeZone: event.timezone }).format(new Date(event.startAt))}<br/>{event.location?.venueName}{event.location?.city ? `, ${event.location.city}` : ''}</p>
          <ul className="ticket-panel__tiers">{event.ticketTypes.map(tier => <li key={tier.ref}>
            <span><strong>{tier.name}</strong>{tier.description && <small>{tier.description}</small>}</span>
            <span><strong>{new Intl.NumberFormat('en-NG', { style: 'currency', currency: tier.currency, maximumFractionDigits: 0 }).format(tier.priceMinor / 100)}</strong><small>{tier.soldOut ? 'Sold out' : tier.salesStartAt && Date.now() < Date.parse(tier.salesStartAt) ? 'Sales opening soon' : tier.salesEndAt && Date.now() > Date.parse(tier.salesEndAt) ? 'Sales closed' : 'Available'}</small></span>
          </li>)}</ul>
          <p className="ticket-panel__notice">Prices exclude checkout fees. FrontDesk shows the final total before payment.</p>
          <form className="ticket-panel__checkout" onSubmit={openCheckout}>
            <label>Ticket type<select required value={tierRef} onChange={e => { setTierRef(e.target.value); checkoutAttempt.current = ''; }}>{event.ticketTypes.map(tier => <option key={tier.ref} value={tier.ref} disabled={tier.soldOut}>{tier.name}{tier.soldOut ? ' — sold out' : ''}</option>)}</select></label>
            <label>Quantity<input type="number" min={1} max={10} required value={quantity} onChange={e => { setQuantity(Number(e.target.value)); checkoutAttempt.current = ''; }}/></label>
            <label>Full name<input required minLength={2} maxLength={100} autoComplete="name" value={name} onChange={e => { setName(e.target.value); checkoutAttempt.current = ''; }}/></label>
            <label>Email for tickets<input type="email" required maxLength={254} autoComplete="email" value={email} onChange={e => { setEmail(e.target.value); checkoutAttempt.current = ''; }}/></label>
            <label>Date of birth (18+ event)<input type="date" required max={new Date().toISOString().slice(0, 10)} value={dateOfBirth} onChange={e => { setDateOfBirth(e.target.value); checkoutAttempt.current = ''; }}/></label>
            {checkoutError && <p role="alert">{checkoutError}</p>}
            <button className="btn-dark" type="submit" disabled={loading || !tierRef}>{loading ? 'OPENING CHECKOUT…' : 'CONTINUE TO PAYMENT'} <ArrowUpRight size={18}/></button>
          </form>
        </> : <p role="status">{error || 'Loading live ticket details…'}</p>}
        {!event && <a href="#signup" onClick={onClose} className="btn-dark">GET UPDATES <ArrowUpRight size={18}/></a>}
      </div><p className="ticket-panel-footer">GOOD MUSIC. GOOD PEOPLE. GREAT MEMORIES.</p>
    </div>
  </div>;
}
