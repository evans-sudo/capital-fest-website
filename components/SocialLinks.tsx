import type { ReactNode } from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import styles from './SocialLinks.module.css';

function TikTokIcon() {
  return <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true"><path d="M16.6 2c.25 2.12 1.45 3.55 3.4 3.8v3.14a8.13 8.13 0 0 1-3.4-1.02v7.43a6.25 6.25 0 1 1-5.37-6.18v3.2a3.08 3.08 0 1 0 2.18 2.98V2h3.19Z"/></svg>;
}

function XIcon() {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l8.2-9.4L.8 2h6.5l4.5 6.7L18.9 2ZM17.8 20h1.7L6.3 4H4.5l13.3 16Z"/></svg>;
}

export function SocialLinks({ className = '' }: { className?: string }) {
  const platforms: { label: string; url: string | null; icon: ReactNode }[] = [
    { label: 'Instagram', url: siteConfig.instagramUrl, icon: <Instagram size={20} aria-hidden="true"/> },
    { label: 'TikTok', url: siteConfig.tiktokUrl, icon: <TikTokIcon/> },
    { label: 'X', url: siteConfig.xUrl, icon: <XIcon/> },
    { label: 'Facebook', url: siteConfig.facebookUrl, icon: <Facebook size={19} aria-hidden="true"/> },
    { label: 'YouTube', url: siteConfig.youtubeUrl, icon: <Youtube size={21} aria-hidden="true"/> },
  ];
  const linkedPlatforms = platforms.filter(
    (platform): platform is typeof platform & { url: string } => Boolean(platform.url?.trim()),
  );

  if (linkedPlatforms.length === 0) return null;

  return <nav className={`${styles.socials} ${className}`} aria-label="Capital Fest social media">
    <ul className={styles.list}>
      {linkedPlatforms.map(({ label, url, icon }) => <li key={label}>
        <a className={styles.item} href={url} target="_blank" rel="noopener noreferrer" aria-label={`Capital Fest on ${label} (opens in a new tab)`} title={label}>{icon}</a>
      </li>)}
    </ul>
  </nav>;
}
