'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { heroPhoto } from '@/lib/photos';
import { siteConfig } from '@/lib/site-config';
import { BrandMark } from './BrandMark';

export function Hero() {
  const background = useRef<HTMLVideoElement>(null);
  const hero = useRef<HTMLElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = background.current;
    if (!video || !hero.current || failed) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = true;
    const sync = () => {
      if (preference.matches || !visible || document.hidden) video.pause();
      else void video.play().catch(() => { /* Poster remains visible if autoplay is blocked. */ });
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(hero.current);
    preference.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      video.pause();
    };
  }, [failed]);

  return <section id="home" className="hero" ref={hero} aria-label="Capital Fest introduction">
      <Image src={heroPhoto.src} alt="Capital Fest live performance with a full crowd and stage effects" fill sizes="100vw" priority unoptimized className="hero__poster"/>
      {siteConfig.heroVideo && !failed && <video ref={background} className="hero__media" loop muted playsInline preload="metadata" poster={heroPhoto.src} aria-hidden="true" tabIndex={-1} disablePictureInPicture onError={() => setFailed(true)}><source src={siteConfig.heroVideo} type="video/mp4" onError={() => setFailed(true)}/></video>}
      <div className="hero__wash"/>
      <div className="hero__inner">
        <span className="hero__pill"><span className="live-dot"/> FEEL THE ENERGY</span>
        <div className="hero__center"><span className="hero__topline">THE SOUND OF A GENERATION</span><h1 className="hero__title"><BrandMark className="hero__brand"/></h1><span className="hero__brush">MORE THAN A FESTIVAL.</span></div>
        <div className="hero__bottom">
          <div className="hero__bottomcopy"><span className="eyebrow">THE MUSIC. THE CULTURE. THE PEOPLE.</span><p>Where every beat becomes a memory.</p></div>
          <p className="hero__venue"><span className="eyebrow">THE VENUE</span><span>{siteConfig.eventVenue}</span></p>
          <a className="hero__scroll" href="#experience" aria-label="Scroll to discover Capital Fest"><span>SCROLL TO EXPLORE</span><span className="hero__scroll-circle"><ArrowDown size={20}/></span></a>
        </div>
      </div>
      <div className="hero__side-text" aria-hidden="true">LIVE MUSIC · THE CULTURE · UNFORGETTABLE MOMENTS</div>
    </section>;
}
