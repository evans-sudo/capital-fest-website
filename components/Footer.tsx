'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { siteConfig } from '@/lib/site-config';
import { BrandMark } from './BrandMark';
import { SymbolStrip } from './SymbolStrip';
import { SocialLinks } from './SocialLinks';

export function Footer({ onTickets }: { onTickets: () => void }) {
  const footer = useRef<HTMLElement>(null);
  const inView = useInView(footer, { once: true, margin: '0px 0px -20% 0px' });
  const reduceMotion = useReducedMotion();
  const column = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] as const } },
  };
  return <motion.footer data-scroll-reveal ref={footer} className="footer" initial={reduceMotion ? false : 'hidden'} animate={inView || reduceMotion ? 'visible' : 'hidden'}>
    <SymbolStrip footer/>
    <div className="footer__body">
      <motion.div data-scroll-reveal className="footer__brand" variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.5, ease: [0.34, 1.25, 0.64, 1] } } }}><a href="#home" aria-label="Back to top"><BrandMark/></a><p>MORE THAN MUSIC.<br/>MORE THAN A MOMENT.</p><SocialLinks/></motion.div>
      <motion.div data-scroll-reveal className="footer__nav" variants={{ visible: { transition: { delayChildren: reduceMotion ? 0 : 0.2, staggerChildren: reduceMotion ? 0 : 0.08 } } }}>
        <motion.div data-scroll-reveal variants={column}><h3>MAIN PAGES</h3><a href="#home">Home</a><button type="button" onClick={onTickets}>Tickets</button><a href="#highlights">Highlights</a><a href="#signup">Sign Up</a></motion.div>
        <motion.div data-scroll-reveal variants={column}><h3>COMPANY</h3><a href="#experience">About Capital Fest</a><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms & Conditions</Link></motion.div>
        <motion.div data-scroll-reveal variants={column}><h3>CONTACT & OTHER</h3>{siteConfig.email ? <a href={`mailto:${siteConfig.email}`}>Contact us <ArrowUpRight size={14}/></a> : <a href="#signup">Get updates <ArrowUpRight size={14}/></a>}<span>Made for the culture.</span></motion.div>
      </motion.div>
    </div>
    <motion.div data-scroll-reveal className="footer__bottom" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.65 } } }}><span>© {new Date().getFullYear()} CAPITAL FEST. ALL RIGHTS RESERVED.</span><span className="footer__bottom-links"><Link href="/privacy">PRIVACY</Link><Link href="/terms">TERMS</Link><a href="#home">BACK TO TOP ↑</a></span></motion.div>
  </motion.footer>;
}
