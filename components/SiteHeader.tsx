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

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let previousY = window.scrollY;
    const handler = () => {
      const y = Math.max(0, window.scrollY);
      setScrolled(y > 50);
      if (Math.abs(y - previousY) > 3 || y <= 100) {
        setHidden(y > 100 && y > previousY);
        previousY = y;
      }
    };
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
    <header className={`site-header ${scrolled || open ? 'site-header--solid' : ''} ${hidden && !open ? 'site-header--hidden' : ''}`} onFocusCapture={() => setHidden(false)}>
      <Link href="#home" className="header-brand" aria-label="Capital Fest home" onClick={() => setOpen(false)}><BrandMark /></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        <a href="#tickets">TICKETS</a>
      </nav>
      <button type="button" className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </header>
    <div className={`mobile-nav-panel ${open ? 'mobile-nav-panel--open' : ''}`} id="mobile-navigation" aria-hidden={!open}>
      <nav aria-label="Mobile navigation">{nav.map((n, i) => <a key={n.href} href={n.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} style={{ transitionDelay: open ? `${0.12 + i * 0.06}s` : '0s' }}><span>0{i + 1}</span>{n.label}<ArrowUpRight size={20}/></a>)}</nav>
      <a href="#tickets" tabIndex={open ? 0 : -1} className="mobile-nav-ticket" onClick={() => setOpen(false)}>TICKETS <ArrowUpRight size={24}/></a>
      <div className="mobile-nav-bottom">MUSIC. CULTURE. COMMUNITY.</div>
    </div>
  </>;
}
