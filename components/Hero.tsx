import Image from 'next/image';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { heroPhoto } from '@/lib/photos';
import { siteConfig } from '@/lib/site-config';
import { BrandMark } from './BrandMark';

export function Hero({ onTickets }: { onTickets: () => void }) {
  return <section id="home" className="hero" aria-label="Capital Fest introduction">
    {siteConfig.heroVideo ? <video className="hero__media" autoPlay loop muted playsInline poster={heroPhoto.src} aria-hidden="true"><source src={siteConfig.heroVideo} type="video/mp4"/></video> : <Image src={heroPhoto.src} alt="Capital Fest live performance with a full crowd and stage effects" fill sizes="100vw" priority quality={90} className="hero__media"/>}
    <div className="hero__wash"/>
    <div className="hero__inner">
      <span className="hero__pill"><span className="live-dot"/> FEEL THE ENERGY</span>
      <div className="hero__center"><span className="hero__topline">THE SOUND OF A GENERATION</span><BrandMark className="hero__brand"/><span className="hero__brush">MORE THAN A FESTIVAL.</span></div>
      <div className="hero__bottom"><div className="hero__bottomcopy"><span className="eyebrow">THE MUSIC. THE CULTURE. THE PEOPLE.</span><p>Where every beat becomes a memory.</p></div><button type="button" className="hero__ticket" onClick={onTickets}>TICKET INFO <ArrowUpRight size={17}/></button><a className="hero__scroll" href="#experience" aria-label="Scroll to discover Capital Fest"><span>SCROLL TO EXPLORE</span><span className="hero__scroll-circle"><ArrowDown size={20}/></span></a></div>
    </div>
    <div className="hero__side-text" aria-hidden="true">LAGOS · LIVE MUSIC · UNFORGETTABLE MOMENTS</div>
  </section>;
}
