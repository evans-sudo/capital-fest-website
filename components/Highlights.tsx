'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { galleryOrder } from '@/lib/photos';

export function Highlights() {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const advance = (direction: number) => {
    if (!scroller.current) return;
    const first = scroller.current.querySelector<HTMLElement>('.highlight-card');
    const gap = Number.parseFloat(getComputedStyle(scroller.current).columnGap) || 18;
    const distance = (first?.getBoundingClientRect().width ?? 360) + gap;
    scroller.current.scrollBy({ left: distance * direction, behavior: 'smooth' });
  };
  const update = () => {
    if (!scroller.current) return;
    const first = scroller.current.querySelector<HTMLElement>('.highlight-card');
    const gap = Number.parseFloat(getComputedStyle(scroller.current).columnGap) || 18;
    const distance = (first?.getBoundingClientRect().width ?? 360) + gap;
    setActive(Math.min(galleryOrder.length - 1, Math.max(0, Math.round(scroller.current.scrollLeft / distance))));
  };
  return <section className="highlights" id="highlights"><div className="highlights__head"><div><p className="eyebrow">002 / THE MOMENTS</p><motion.h2 className="massive-heading" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, ease: "easeOut" }}>HIGHLIGHTS<br/>FROM THE <span>FEST.</span></motion.h2><p className="highlights__sub">All the love. All the lights. All the moments we can't forget.</p></div><span className="highlight-star" aria-hidden="true">✳</span></div>
    <div className="highlights__toolbar"><span>REAL PEOPLE. REAL MOMENTS.</span><div className="highlights__controls"><span className="gallery-count"><b>{String(active+1).padStart(2,'0')}</b><span>/</span>{String(galleryOrder.length).padStart(2,'0')}</span><button type="button" aria-label="Previous photo" onClick={() => advance(-1)}><ArrowLeft size={21}/></button><button type="button" aria-label="Next photo" onClick={() => advance(1)}><ArrowRight size={21}/></button></div></div>
    <div className="highlights__track" ref={scroller} onScroll={update} tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Capital Fest photo highlights">
      {galleryOrder.map((photo, i)=><div className={`highlight-card highlight-card--${i%5}`} key={photo.id} role="group" aria-roledescription="slide" aria-label={`Photo ${i+1} of ${galleryOrder.length}: ${photo.alt}`}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width:700px) 84vw, (max-width:1200px) 45vw, 32vw" loading="lazy"/><span className="highlight-card__number">CF/{String(i+1).padStart(2,'0')}</span><span className="highlight-card__arrow"><ArrowUpRight size={18}/></span></div>)}
    </div><div className="highlights__footer"><span>THE MEMORIES SPEAK FOR THEMSELVES.</span><span>SWIPE TO EXPLORE <ArrowRight size={17}/></span></div>
  </section>;
}
