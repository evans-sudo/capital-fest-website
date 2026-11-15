'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { ArrowUpRight, MoveUpRight } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { headlinerFlyer, supportingFlyers } from '@/lib/flyers';
import { eventPhoto } from '@/lib/photos';
import { BrandMark } from './BrandMark';

const MotionMoveUpRight = motion.create(MoveUpRight);

export function EventAnnouncement({ onTickets }: { onTickets: () => void }) {
  const section = useRef<HTMLElement>(null);
  const inView = useInView(section, { once: true, margin: '0px 0px -25% 0px' });
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ['start end', 'end start'] });
  const leftY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const leftRotation = useTransform(scrollYProgress, [0, 1], [0, 3]);
  const rightY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const rightRotation = useTransform(scrollYProgress, [0, 1], [0, -3]);
  const word = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] as const } },
  };
  return <section ref={section} className="announcement" id="experience">
    <div className="announcement__topline"><span>001 / THE EXPERIENCE</span><span>CAPITAL FEST</span></div>
    <p className="announcement__small">IT'S NOT JUST AN EVENT. IT'S A FEELING.</p>
    <motion.h2 data-scroll-reveal className="massive-heading announcement__heading" initial={reduceMotion ? false : 'hidden'} animate={inView || reduceMotion ? 'visible' : 'hidden'} variants={{ visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.05 } } }}>
      {['ARE', 'YOU', 'READY'].map((text, i) => <span key={text} style={{ color: 'inherit' }}>{i > 0 && ' '}<motion.span data-scroll-reveal style={{ display: 'inline-block' }} variants={word}>{text}</motion.span></span>)}<br/>
      {['FOR', 'THE'].map((text) => <span key={text} style={{ color: 'inherit' }}><motion.span data-scroll-reveal style={{ display: 'inline-block' }} variants={word}>{text}</motion.span>{' '}</span>)}<motion.em data-scroll-reveal style={{ display: 'inline-block' }} variants={word}>ENERGY</motion.em><motion.span data-scroll-reveal style={{ display: 'inline-block' }} variants={word}>?!</motion.span>
    </motion.h2>
    <div className="announcement__grid"><div className="announcement__aside"><motion.span data-scroll-reveal className="sparkle decorative" aria-hidden="true" style={{ display: 'inline-block', y: reduceMotion ? 0 : leftY, rotate: reduceMotion ? 0 : leftRotation }}>✳</motion.span><p>ONE CITY.<br/>ONE SOUND.<br/>ENDLESS ENERGY.</p><div className="announcement__zigzag" aria-hidden="true">〰〰〰</div></div>
      <motion.div data-scroll-reveal className={`festival-flyer${siteConfig.officialFlyer ? ' festival-flyer--official' : ''}`} aria-label={siteConfig.officialFlyer ? 'Capital Fest 3.0 Mayorkun headline artist flyer' : 'Capital Fest festival artwork preview'} initial={reduceMotion ? false : { opacity: 0, scale: 0.92, rotate: -1.5 }} animate={inView || reduceMotion ? { opacity: 1, scale: 1, rotate: 0 } : undefined} transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}>
        {siteConfig.officialFlyer ? <a className="festival-flyer__link" href={siteConfig.officialFlyer} target="_blank" rel="noopener noreferrer" aria-label="View Mayorkun flyer (opens in a new tab)"><Image src={siteConfig.officialFlyer} alt={headlinerFlyer.alt} fill sizes="(max-width:600px) 88vw, (max-width:800px) 540px, 570px" className="festival-flyer__img"/></a> : <><Image src={eventPhoto.src} alt={eventPhoto.alt} fill sizes="(max-width:700px) 88vw, 510px" className="festival-flyer__img"/><div className="festival-flyer__overlay"><span className="festival-flyer__edition">THE NEXT EDITION</span><BrandMark className="festival-flyer__logo"/><div className="festival-flyer__tagline">A NIGHT TO REMEMBER.</div><div className="festival-flyer__detail">OFFICIAL EVENT DETAILS TO BE ANNOUNCED</div></div></>}
      </motion.div><div className="announcement__aside announcement__aside--right"><span>THE MOMENT</span><span>IS OURS</span><MotionMoveUpRight data-scroll-reveal size={54} strokeWidth={1.5} style={{ y: reduceMotion ? 0 : rightY, rotate: reduceMotion ? 0 : rightRotation }}/></div>
    </div>
    <section className="artist-flyers" aria-labelledby="supporting-artists-title">
      <p className="eyebrow dark">THE LINEUP</p>
      <h3 id="supporting-artists-title">ALSO ON STAGE.</h3>
      <div className="artist-flyers__grid">
        {supportingFlyers.map((flyer) => <figure className="artist-flyer" key={flyer.src}>
          <a className="artist-flyer__artwork" href={flyer.src} target="_blank" rel="noopener noreferrer" aria-label={`View ${flyer.name} flyer (opens in a new tab)`}>
            <Image src={flyer.src} alt={flyer.alt} width={flyer.width} height={flyer.height} sizes="(max-width:700px) 88vw, 30vw" loading="lazy"/>
          </a>
          <figcaption><h4>{flyer.name}</h4><p>Supporting artist</p></figcaption>
        </figure>)}
      </div>
    </section>
    <div className="announcement__closing"><span>BIG ENERGY. REAL CONNECTION.</span><span>CREATED FOR THE CULTURE.</span></div>
    <div className="ticket-cta" id="tickets"><div><p className="eyebrow dark">DON'T MISS THE NEXT WAVE</p><h3>TICKETS<span>!</span></h3><p>Good times are better when you're there.</p></div><motion.button data-scroll-reveal type="button" onClick={onTickets} className="ticket-cta__button" initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '0px 0px -20% 0px' }} transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.34, 1.56, 0.64, 1] }}>TICKET UPDATES <ArrowUpRight size={21}/></motion.button></div>
  </section>;
}
