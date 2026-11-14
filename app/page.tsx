'use client';

import { useState } from 'react';
import { SiteHeader } from '@/components/SiteHeader';
import { Hero } from '@/components/Hero';
import { SymbolStrip } from '@/components/SymbolStrip';
import { EventAnnouncement } from '@/components/EventAnnouncement';
import { Highlights } from '@/components/Highlights';
import { TextMarquee } from '@/components/TextMarquee';
import { FeaturedPhoto } from '@/components/FeaturedPhoto';
import { Newsletter } from '@/components/Newsletter';
import { Footer } from '@/components/Footer';
import { TicketPanel } from '@/components/TicketPanel';

export default function HomePage() {
  const [ticketsOpen, setTicketsOpen] = useState(false);
  const openTickets = () => setTicketsOpen(true);
  return <main>
    <SiteHeader onTickets={openTickets}/>
    <Hero onTickets={openTickets}/>
    <SymbolStrip/>
    <SymbolStrip reverse/>
    <EventAnnouncement onTickets={openTickets}/>
    <Highlights/>
    <TextMarquee/>
    <FeaturedPhoto/>
    <Newsletter/>
    <Footer onTickets={openTickets}/>
    <TicketPanel isOpen={ticketsOpen} onClose={() => setTicketsOpen(false)}/>
  </main>;
}
