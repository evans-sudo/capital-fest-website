'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { featurePhoto } from '@/lib/photos';

const MotionImage = motion.create(Image);

export function FeaturedPhoto() {
  const reduceMotion = useReducedMotion();
  return <motion.section data-scroll-reveal className="featured" aria-label="Capital Fest performance moment" initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={{ once: true, margin: '0px 0px -30% 0px' }} variants={{ hidden: { clipPath: 'inset(0% 0% 100% 0%)' }, visible: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] } } }}><MotionImage data-scroll-reveal src={featurePhoto.src} alt={featurePhoto.alt} fill sizes="100vw" variants={{ hidden: { scale: 1.1 }, visible: { scale: 1, transition: { duration: reduceMotion ? 0 : 1.2, ease: [0.25, 0.46, 0.45, 0.94] } } }}/><div className="featured__shade"/><div className="featured__content"><span className="eyebrow">THE SOUND THAT MOVES US</span><h2>WE CAME<br/>FOR THE <em>MUSIC.</em><br/>WE STAYED<br/>FOR THE <em>MEMORIES.</em></h2><span className="featured__bottom">THIS IS CAPITAL FEST. <span>✳</span></span></div></motion.section>;
}
