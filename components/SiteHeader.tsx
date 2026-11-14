'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { BrandMark } from './BrandMark';

const nav = [
  { label: 'HOME', href: '#home' },
  { label: 'THE FEST', href: '#experience' },
  { label: 'HIGHLIGHTS', href: '#highlights' },
  { label: 'SIGN UP', href: '#signup' },
];

export function SiteHeader({ onTickets }: { onTickets: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  useEffect(() => {
    if (!open) return;
    function key(event: KeyboardEvent) { if (event.key === 'Escape') setOpen(false); }
    window.addEventListener('keydown', key);
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = old; };
  }, [open]);
  return <>
    <header className={`site-header ${scrolled || open ? 'site-header--solid' : ''}`}>
      <Link href="#home" className="header-brand" aria-label="Capital Fest home" onClick={() => setOpen(false)}><BrandMark /></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
      </nav>
      <button type="button" className="nav-ticket-btn" onClick={onTickets}>TICKETS <ArrowUpRight size={16} strokeWidth={2.3}/></button>
      <button type="button" className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </header>
    <div className={`mobile-nav-panel ${open ? 'mobile-nav-panel--open' : ''}`} id="mobile-navigation" aria-hidden={!open}>
      <nav aria-label="Mobile navigation">{nav.map((n, i) => <a key={n.href} href={n.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}><span>0{i + 1}</span>{n.label}<ArrowUpRight size={20}/></a>)}</nav>
      <button type="button" tabIndex={open ? 0 : -1} className="mobile-nav-ticket" onClick={() => { setOpen(false); onTickets(); }}>TICKETS <ArrowUpRight size={24}/></button>
      <div className="mobile-nav-bottom">MUSIC. CULTURE. COMMUNITY.</div>
    </div>
  </>;
}
