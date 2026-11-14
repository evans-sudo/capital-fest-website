'use client';

import { useSyncExternalStore } from 'react';

const query = '(prefers-reduced-motion: reduce)';
const subscribe = (changed: () => void) => {
  const preference = window.matchMedia(query);
  preference.addEventListener('change', changed);
  return () => preference.removeEventListener('change', changed);
};
const getSnapshot = () => window.matchMedia(query).matches;
const getServerSnapshot = () => false;

/** Keep animations and autoplay in sync with live system preference changes. */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
