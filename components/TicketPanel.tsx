'use client';

import { useEffect, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export function TicketPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtn.current?.focus();
    function handleKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', handleKey);
    return () => { window.removeEventListener('keydown', handleKey); document.body.style.overflow = old; };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return <div className="ticket-overlay" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="ticket-panel" role="dialog" aria-modal="true" aria-labelledby="ticket-title">
      <div className="ticket-panel-top"><span className="eyebrow dark">CAPITAL FEST</span><button ref={closeBtn} onClick={onClose} aria-label="Close tickets panel" className="round-icon"><X size={23}/></button></div>
      <div className="ticket-panel-body"><span className="ticket-sparkle" aria-hidden="true">✳</span><p className="eyebrow dark">YOUR SPOT IN THE CROWD</p><h2 id="ticket-title">TICKETS<span>!</span></h2>
        {siteConfig.ticketUrl ? <><p>Ready to experience Capital Fest? Secure your ticket through our official ticketing link.</p><a href={siteConfig.ticketUrl} target="_blank" rel="noopener noreferrer" className="btn-dark">GET TICKETS <ArrowUpRight size={18}/></a></> : <><p>Official ticket details haven’t been added yet. Join the list to hear when they're announced.</p><a href="#signup" onClick={onClose} className="btn-dark">GET FIRST ACCESS <ArrowUpRight size={18}/></a></>}
      </div><p className="ticket-panel-footer">GOOD MUSIC. GOOD PEOPLE. GREAT MEMORIES.</p>
    </div>
  </div>;
}
