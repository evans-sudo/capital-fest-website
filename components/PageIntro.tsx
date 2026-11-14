'use client';

import { useEffect, useState } from 'react';
import { BrandMark } from './BrandMark';

/** The reference's 0.5s logo entrance, 0.35s hold, and 0.8s upward exit. */
export function PageIntro() {
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setComplete(true);
      return;
    }
    const timer = window.setTimeout(() => setComplete(true), 1650);
    return () => window.clearTimeout(timer);
  }, []);
  if (complete) return null;
  return <div className="page-intro" aria-hidden="true"><BrandMark className="page-intro__logo"/></div>;
}
