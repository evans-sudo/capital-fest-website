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
import { PageIntro } from '@/components/PageIntro';

export default function HomePage() {
  const [ticketsOpen, setTicketsOpen] = useState(false);
  const openTickets = () => setTicketsOpen(true);
  return <main>
    <PageIntro/>
    <SiteHeader/>
    <Hero/>
    <SymbolStrip/>
    <SymbolStrip reverse/>
    <EventAnnouncement onTickets={openTickets}/>
    <TextMarquee/>
    <Highlights/>
    <FeaturedPhoto/>
    <Newsletter/>
    <Footer/>
    <TicketPanel isOpen={ticketsOpen} onClose={() => setTicketsOpen(false)}/>
  </main>;
}
