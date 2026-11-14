'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'motion/react';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import { galleryOrder } from '@/lib/photos';
import styles from './Highlights.module.css';

export function Highlights() {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);
  const reducedMotion = useReducedMotion();
  const galleryVisible = useInView(scroller, { amount: 0.15 });
  const canAutoplay = autoplay && reducedMotion === false;

  const getPositions = useCallback(() => {
    const track = scroller.current;
    if (!track) return null;
    const cards = Array.from(track.querySelectorAll<HTMLElement>('.highlight-card'));
    if (!cards.length) return null;
    const firstLeft = cards[0].getBoundingClientRect().left;
    const maximum = Math.max(0, track.scrollWidth - track.clientWidth);
    return {
      track,
      maximum,
      positions: cards.map((card) => Math.min(maximum, card.getBoundingClientRect().left - firstLeft)),
    };
  }, []);

  const advance = useCallback((direction: number) => {
    const geometry = getPositions();
    if (!geometry) return;
    const { track, positions, maximum } = geometry;
    if (maximum <= 1) return;
    const current = track.scrollLeft;
    const next = direction > 0
      ? positions.find((position) => position > current + 3) ?? 0
      : [...positions].reverse().find((position) => position < current - 3) ?? maximum;
    track.scrollTo({ left: next, behavior: reducedMotion ? 'instant' : 'smooth' });
  }, [getPositions, reducedMotion]);

  const update = useCallback(() => {
    const geometry = getPositions();
    if (!geometry) return;
    const { track, positions, maximum } = geometry;
    if (maximum > 0 && track.scrollLeft >= maximum - 3) {
      setActive(positions.length - 1);
      return;
    }
    let closest = 0;
    positions.forEach((position, index) => {
      if (Math.abs(position - track.scrollLeft) < Math.abs(positions[closest] - track.scrollLeft)) closest = index;
    });
    setActive(closest);
  }, [getPositions]);

  useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden);
    onVisibility();
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    const track = scroller.current;
    if (!track) return;
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => observer.disconnect();
  }, [update]);

  useEffect(() => {
    if (!canAutoplay || !galleryVisible || !pageVisible || hovered || focused) return;
    const timer = window.setInterval(() => advance(1), 8500);
    return () => window.clearInterval(timer);
  }, [advance, canAutoplay, galleryVisible, pageVisible, hovered, focused]);

  return <section className="highlights" id="highlights"
    onPointerEnter={(event) => { if (event.pointerType !== 'touch') setHovered(true); }}
    onPointerLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)}
    onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <div className="highlights__head"><div><p className="eyebrow">002 / THE MOMENTS</p><motion.h2 className={`massive-heading ${styles.reveal}`} initial={reducedMotion ? false : { opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '0px 0px -25% 0px' }} transition={{ duration: reducedMotion ? 0 : 0.6, ease: 'easeOut' }}>HIGHLIGHTS<br/>FROM THE <span>FEST.</span></motion.h2><p className="highlights__sub">All the love. All the lights. All the moments we can't forget.</p></div><motion.span className={`highlight-star ${styles.reveal}`} aria-hidden="true" initial={reducedMotion ? false : { opacity: 0, x: 40, rotate: 8 }} whileInView={{ opacity: 1, x: 0, rotate: -12 }} viewport={{ once: true, margin: '0px 0px -25% 0px' }} transition={{ duration: reducedMotion ? 0 : 0.7, ease: 'easeOut' }}>✳</motion.span></div>
    <div className={`highlights__toolbar ${styles.toolbar}`}><span>REAL PEOPLE. REAL MOMENTS.</span><div className="highlights__controls"><span className="gallery-count" aria-live={canAutoplay ? 'off' : 'polite'} aria-atomic="true"><b>{String(active+1).padStart(2,'0')}</b><span>/</span>{String(galleryOrder.length).padStart(2,'0')}</span><button type="button" aria-label={canAutoplay ? 'Pause automatic photo slideshow' : 'Play automatic photo slideshow'} aria-pressed={canAutoplay} disabled={Boolean(reducedMotion)} title={reducedMotion ? 'Automatic slideshow is off with reduced motion' : canAutoplay ? 'Pause slideshow' : 'Play slideshow'} onClick={() => setAutoplay(!autoplay)}>{canAutoplay ? <Pause size={18}/> : <Play size={18}/>}</button><button type="button" aria-label="Previous photo" onClick={() => advance(-1)}><ArrowLeft size={21}/></button><button type="button" aria-label="Next photo" onClick={() => advance(1)}><ArrowRight size={21}/></button></div></div>
    <motion.div className={`highlights__track ${styles.track}`} ref={scroller} onScroll={update} tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Capital Fest photo highlights" initial={reducedMotion ? false : 'hidden'} whileInView="visible" viewport={{ once: true, margin: '0px 0px -30% 0px' }} variants={{ hidden: {}, visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.08 } } }}>
      {galleryOrder.map((photo, i)=><motion.div className={`highlight-card highlight-card--${i%5} ${styles.reveal}`} key={photo.id} variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0 : 0.6, ease: 'easeOut' } } }} role="group" aria-roledescription="slide" aria-label={`Photo ${i+1} of ${galleryOrder.length}: ${photo.alt}`}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width:700px) 84vw, (max-width:1200px) 45vw, 32vw" loading="lazy"/><span className="highlight-card__number">CF/{String(i+1).padStart(2,'0')}</span><span className="highlight-card__arrow"><ArrowUpRight size={18}/></span></motion.div>)}
    </motion.div><div className="highlights__footer"><span>THE MEMORIES SPEAK FOR THEMSELVES.</span><span>SWIPE TO EXPLORE <ArrowRight size={17}/></span></div>
  </section>;
}
